#!/usr/bin/env node

/**
 * Pre-commit Hook for Coherenceism Content Repository
 * 
 * Validates markdown content files before commits to ensure:
 * - Required frontmatter fields (title, date, tags)  
 * - Proper file naming conventions
 * - No binary files in content directories
 * - File size warnings for content over 3000 words
 * - Filename pattern matching for content types
 */

import { globby } from 'globby';
import fs from 'fs/promises';
import path from 'path';

// File naming patterns for different content types
const FILENAME_PATTERNS = {
  journal: /^\d{4}-\d{2}-\d{2}-.+\.md$/,
  essay: /^[a-z0-9-]+\.md$/,
  book: /^\d{2}-.+\.md$/,
  reference: /^[a-z0-9-]+\.md$/,
  podcast: /^[a-z0-9-]+\.md$/
};

// Required frontmatter fields
const REQUIRED_FIELDS = ['title', 'type', 'date', 'tags'];

// Validation thresholds
const MAX_WORDS_WARNING = 3000;
const BINARY_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.mp3', '.mp4', '.zip'];

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;
  
  const frontmatter = {};
  const lines = frontmatterMatch[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // Parse arrays (tags)
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
    }
    
    frontmatter[key] = value;
  }
  
  return frontmatter;
}

/**
 * Count approximate words in content
 */
function countWords(content) {
  // Remove frontmatter and count words in body
  const bodyContent = content.replace(/^---[\s\S]*?---/, '').trim();
  return bodyContent.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Validate a single content file
 */
async function validateFile(filePath) {
  const errors = [];
  const warnings = [];
  const filename = path.basename(filePath);
  const dirname = path.dirname(filePath);
  
  try {
    // Check for binary files
    const ext = path.extname(filename).toLowerCase();
    if (BINARY_EXTENSIONS.includes(ext)) {
      errors.push(`Binary file not allowed in content directory: ${ext}`);
      return { errors, warnings };
    }
    
    // Read and parse content
    const content = await fs.readFile(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    
    if (!frontmatter) {
      errors.push('Missing or invalid frontmatter');
      return { errors, warnings };
    }
    
    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!frontmatter[field]) {
        errors.push(`Missing required frontmatter field: ${field}`);
      }
    }
    
    // Validate file naming based on content type
    const contentType = frontmatter.type;
    if (contentType && FILENAME_PATTERNS[contentType]) {
      if (!FILENAME_PATTERNS[contentType].test(filename)) {
        errors.push(`Filename "${filename}" doesn't match pattern for type "${contentType}"`);
      }
    }
    
    // Check for coherenceism tag requirement  
    const tags = frontmatter.tags;
    if (Array.isArray(tags)) {
      if (!tags.includes('coherenceism')) {
        warnings.push('Missing "coherenceism" tag - all content should relate to core philosophy');
      }
    }
    
    // Date validation for journals
    if (contentType === 'journal') {
      const dateFromFilename = filename.match(/^(\d{4}-\d{2}-\d{2})/);
      const frontmatterDate = frontmatter.date;
      
      if (dateFromFilename && frontmatterDate) {
        if (dateFromFilename[1] !== frontmatterDate) {
          warnings.push(`Date mismatch: filename has ${dateFromFilename[1]}, frontmatter has ${frontmatterDate}`);
        }
      }
    }
    
    // Word count check
    const wordCount = countWords(content);
    if (wordCount > MAX_WORDS_WARNING) {
      warnings.push(`File is ${wordCount} words (>${MAX_WORDS_WARNING} word warning threshold)`);
    }
    
    // Check for overly generic titles
    const title = frontmatter.title;
    if (title) {
      const genericTitles = ['thoughts', 'notes', 'reflection', 'ideas', 'untitled'];
      if (genericTitles.some(generic => title.toLowerCase().includes(generic))) {
        warnings.push(`Generic title "${title}" - consider more specific description`);
      }
    }
    
  } catch (error) {
    errors.push(`Failed to read file: ${error.message}`);
  }
  
  return { errors, warnings };
}

/**
 * Main validation function
 */
async function main() {
  console.log('🔍 Validating content files before commit...\n');
  
  try {
    // Find all markdown files in content directory
    const contentFiles = await globby([
      'content/**/*.md',
      '!content/**/README.md'
    ]);
    
    if (contentFiles.length === 0) {
      console.log('ℹ️  No content files found to validate');
      return;
    }
    
    console.log(`📄 Found ${contentFiles.length} content files to validate\n`);
    
    let totalErrors = 0;
    let totalWarnings = 0;
    const results = [];
    
    // Validate each file
    for (const file of contentFiles) {
      const { errors, warnings } = await validateFile(file);
      
      results.push({ file, errors, warnings });
      totalErrors += errors.length;
      totalWarnings += warnings.length;
      
      // Display results
      if (errors.length === 0 && warnings.length === 0) {
        console.log(`✅ ${file}`);
      } else {
        console.log(`${errors.length > 0 ? '❌' : '⚠️'} ${file}`);
        
        errors.forEach(error => {
          console.log(`   🚫 ${error}`);
        });
        
        warnings.forEach(warning => {
          console.log(`   ⚠️  ${warning}`);
        });
        
        console.log('');
      }
    }
    
    // Summary
    console.log('─'.repeat(50));
    console.log(`📊 Validation Summary:`);
    console.log(`   ✅ Valid files: ${contentFiles.length - results.filter(r => r.errors.length > 0).length}`);
    console.log(`   ❌ Files with errors: ${results.filter(r => r.errors.length > 0).length}`);
    console.log(`   ⚠️  Files with warnings: ${results.filter(r => r.warnings.length > 0).length}`);
    console.log(`   🔢 Total errors: ${totalErrors}`);
    console.log(`   🔔 Total warnings: ${totalWarnings}`);
    
    // Exit with appropriate guidance for coherence cultivation
    if (totalErrors > 0) {
      console.log('\n🚫 Content awaiting alignment before joining the collective dialogue.');
      console.log('   Please address the structural needs above to support contemplative engagement.');
      process.exit(1);
    } else if (totalWarnings > 0) {
      console.log('\n⚠️  Opportunities for deeper coherence detected.');
      console.log('   Consider refining these aspects to enhance clarity and connection.');
      process.exit(0);
    } else {
      console.log('\n🎉 Content ready to join the universal dialogue!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
}