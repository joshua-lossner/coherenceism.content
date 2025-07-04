import { config } from 'dotenv';
config({ path: '.env.local' });  // explicitly load .env.local

import OpenAI from 'openai';
import { Client } from 'pg';
import { globby } from 'globby';
import fs from 'fs/promises';
import { encode, decode } from 'gpt-tokenizer';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const client = new Client({
  connectionString: process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL
});

await client.connect();

async function embed(text) {
  const { data } = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text
  });
  return data[0].embedding;
}

async function main() {
  // Check if TEST_FILE is set for single file processing
  const files = process.env.TEST_FILE 
    ? [process.env.TEST_FILE]
    : await globby(['content/**/*.md']);
  // tokenizer functions are imported directly

  for (const slug of files) {
    const raw = await fs.readFile(slug, 'utf8');
    // ---- NEW 400-token chunking with 50-token overlap ----
    const tokens = encode(raw);
    const maxLen = 400;
    const overlap = 50;

    let chunkIndex = 0;
    for (let start = 0; start < tokens.length; start += maxLen - overlap) {
      const end = Math.min(start + maxLen, tokens.length);
      const chunkTokens = tokens.slice(start, end);
      const chunkText  = decode(chunkTokens);

      const vector = await embed(chunkText);

      await client.query(
        `INSERT INTO coherence_vectors
           (slug, chunk_index, content, embedding, commit_sha, branch)
         VALUES ($1, $2, $3, $4, NULL, 'main')
         ON CONFLICT (slug, chunk_index) DO UPDATE
           SET content   = EXCLUDED.content,
               embedding = EXCLUDED.embedding,
               updated_at = NOW()`,
        [slug, chunkIndex, chunkText, `[${vector.join(',')}]`]
      );

      console.log('Upserted', slug, 'chunk', chunkIndex);
      chunkIndex += 1;
      if (process.env.TEST_FILE) break;          // keep smoke-tests short
    }
  }
}

main()
  .then(() => client.end())
  .catch(err => { console.error(err); client.end(); });