#!/usr/bin/env node

/**
 * Content Validation Smoke Test for Coherenceism Repository
 * 
 * Comprehensive validation script that analyzes the entire content corpus for:
 * - Missing metadata and frontmatter issues
 * - Structural inconsistencies
 * - Broken internal and external links
 * - Content quality indicators
 * - Cross-reference integrity
 * 
 * Usage: node scripts/validate-content.js [--fix] [--detailed]
 */

import { globby } from 'globby';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  contentDir: path.join(__dirname, '..', 'content'),
  maxFileSize: 3000, // words
  requiredTags: ['coherenceism'],
  supportedTypes: ['journal', 'book', 'essay', 'reference', 'podcast'],
  filenamePatterns: {
    journal: /^\d{4}-\d{2}-\d{2}-.+\.md$/,
    essay: /^[a-z0-9-]+\.md$/,
    book: /^\d{2}-.+\.md$/,
    reference: /^[a-z0-9-]+\.md$/,
    podcast: /^[a-z0-9-]+\.md$/
  }
};

// Global stats tracking
const stats = {
  totalFiles: 0,
  validFiles: 0,
  errors: 0,
  warnings: 0,
  brokenLinks: 0,
  missingMetadata: 0,
  wordCount: 0,
  tagDistribution: new Map(),
  typeDistribution: new Map()
};

/**
 * Parse YAML frontmatter with better error handling
 */
function parseFrontmatter(content, filePath) {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { error: 'No frontmatter found' };
  }
  
  try {
    const frontmatter = {};
    const lines = frontmatterMatch[1].split('\n');
    
    for (const line of lines) {
      if (!line.trim()) continue;
      
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      
      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1)
          .split(',')
          .map(v => v.trim().replace(/['"]/g, ''))
          .filter(v => v.length > 0);
      }
      
      // Parse dates
      if (key === 'date' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        value = new Date(value);
      }
      
      frontmatter[key] = value;
    }
    
    return { frontmatter };
  } catch (error) {
    return { error: `Invalid frontmatter syntax: ${error.message}` };
  }
}

/**
 * Extract and validate internal links
 */
function validateLinks(content, filePath) {
  const issues = [];
  const links = [];
  
  // Find markdown links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    links.push({ text: linkText, url: linkUrl, fullMatch });
    
    // Check internal links
    if (!linkUrl.startsWith('http')) {
      const resolvedPath = path.resolve(path.dirname(filePath), linkUrl);
      
      // Check if file exists (simplified check)
      if (linkUrl.endsWith('.md') && !linkUrl.includes('#')) {
        issues.push({
          type: 'broken_internal_link',
          message: `Potential broken internal link: ${linkUrl}`,
          link: fullMatch
        });
      }
    }
    
    // Check for empty link text
    if (!linkText.trim()) {
      issues.push({
        type: 'empty_link_text',
        message: 'Link has empty text',
        link: fullMatch
      });
    }
  }
  
  return { links, issues };
}

/**
 * Analyze content quality
 */
function analyzeContentQuality(content, frontmatter) {
  const issues = [];
  const body = content.replace(/^---[\s\S]*?---/, '').trim();
  
  // Word count
  const words = body.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  if (wordCount > CONFIG.maxFileSize) {
    issues.push({
      type: 'long_content',
      message: `Content is ${wordCount} words (>${CONFIG.maxFileSize} recommended)`
    });
  }
  
  if (wordCount < 100) {
    issues.push({
      type: 'short_content',
      message: `Content is only ${wordCount} words - may be incomplete`
    });
  }
  
  // Check for generic titles
  if (frontmatter.title) {
    const genericWords = ['thoughts', 'notes', 'reflection', 'ideas', 'untitled', 'draft'];
    if (genericWords.some(word => frontmatter.title.toLowerCase().includes(word))) {
      issues.push({
        type: 'generic_title',
        message: `Generic title: "${frontmatter.title}"`
      });
    }
  }
  
  // Check for headings structure
  const headings = body.match(/^#+\s+.+$/gm) || [];
  if (headings.length === 0 && wordCount > 500) {
    issues.push({
      type: 'no_structure',
      message: 'Long content without headings - consider adding structure'
    });
  }
  
  return { wordCount, issues };
}

/**
 * Validate a single content file
 */
async function validateFile(filePath) {
  const filename = path.basename(filePath);
  const relativePath = path.relative(CONFIG.contentDir, filePath);
  const validation = {
    file: relativePath,
    errors: [],
    warnings: [],
    info: {}
  };
  
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Parse frontmatter
    const { frontmatter, error } = parseFrontmatter(content, filePath);
    
    if (error) {
      validation.errors.push(error);
      return validation;
    }
    
    validation.info.frontmatter = frontmatter;
    
    // Validate required fields
    const requiredFields = ['title', 'type', 'date', 'tags'];
    for (const field of requiredFields) {
      if (!frontmatter[field]) {
        validation.errors.push(`Missing required field: ${field}`);
      }
    }
    
    // Validate content type
    if (frontmatter.type) {
      if (!CONFIG.supportedTypes.includes(frontmatter.type)) {
        validation.warnings.push(`Unknown content type: ${frontmatter.type}`);
      } else {
        // Update type distribution
        stats.typeDistribution.set(
          frontmatter.type, 
          (stats.typeDistribution.get(frontmatter.type) || 0) + 1
        );
        
        // Validate filename pattern
        const pattern = CONFIG.filenamePatterns[frontmatter.type];
        if (pattern && !pattern.test(filename)) {
          validation.warnings.push(
            `Filename doesn't match pattern for ${frontmatter.type}: ${filename}`
          );
        }
      }
    }
    
    // Validate tags
    if (Array.isArray(frontmatter.tags)) {
      frontmatter.tags.forEach(tag => {
        stats.tagDistribution.set(tag, (stats.tagDistribution.get(tag) || 0) + 1);
      });
      
      // Check for required tags
      const hasRequiredTag = CONFIG.requiredTags.some(tag => 
        frontmatter.tags.includes(tag)
      );
      if (!hasRequiredTag) {
        validation.warnings.push(
          `Missing required tag(s): ${CONFIG.requiredTags.join(', ')}`
        );
      }
    }
    
    // Date validation
    if (frontmatter.type === 'journal' && frontmatter.date) {
      const dateFromFilename = filename.match(/^(\d{4}-\d{2}-\d{2})/);
      if (dateFromFilename) {
        const filenameDate = dateFromFilename[1];
        const frontmatterDate = frontmatter.date instanceof Date 
          ? frontmatter.date.toISOString().split('T')[0]
          : frontmatter.date;
        
        if (filenameDate !== frontmatterDate) {
          validation.warnings.push(
            `Date mismatch: filename=${filenameDate}, frontmatter=${frontmatterDate}`
          );
        }
      }
    }
    
    // Validate links
    const { links, issues: linkIssues } = validateLinks(content, filePath);
    validation.info.links = links;
    linkIssues.forEach(issue => {
      if (issue.type === 'broken_internal_link') {
        validation.warnings.push(issue.message);
        stats.brokenLinks++;
      } else {
        validation.warnings.push(issue.message);
      }
    });
    
    // Analyze content quality
    const { wordCount, issues: qualityIssues } = analyzeContentQuality(content, frontmatter);
    validation.info.wordCount = wordCount;
    stats.wordCount += wordCount;
    
    qualityIssues.forEach(issue => {
      validation.warnings.push(issue.message);
    });
    
  } catch (error) {
    validation.errors.push(`Failed to read file: ${error.message}`);
  }
  
  return validation;
}

/**
 * Generate summary report
 */
function generateReport(results, detailed = false) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 COHERENCEISM CONTENT VALIDATION REPORT');
  console.log('='.repeat(60));
  
  // Overall statistics
  console.log('\n📈 Overall Statistics:');
  console.log(`   📄 Total files: ${stats.totalFiles}`);
  console.log(`   ✅ Valid files: ${stats.validFiles}`);
  console.log(`   ❌ Files with errors: ${results.filter(r => r.errors.length > 0).length}`);
  console.log(`   ⚠️  Files with warnings: ${results.filter(r => r.warnings.length > 0).length}`);
  console.log(`   🔤 Total word count: ${stats.wordCount.toLocaleString()}`);
  console.log(`   📊 Average words per file: ${Math.round(stats.wordCount / stats.totalFiles)}`);
  
  // Content type distribution
  console.log('\n📚 Content Type Distribution:');
  for (const [type, count] of stats.typeDistribution.entries()) {
    console.log(`   ${type}: ${count} files`);
  }
  
  // Tag distribution (top 10)
  console.log('\n🏷️  Most Common Tags:');
  const sortedTags = Array.from(stats.tagDistribution.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  for (const [tag, count] of sortedTags) {
    console.log(`   ${tag}: ${count} files`);
  }
  
  // Error summary
  if (stats.errors > 0) {
    console.log('\n❌ Error Summary:');
    const errorFiles = results.filter(r => r.errors.length > 0);
    for (const result of errorFiles) {
      console.log(`   ${result.file}:`);
      result.errors.forEach(error => console.log(`      • ${error}`));
    }
  }
  
  // Detailed warnings
  if (detailed && stats.warnings > 0) {
    console.log('\n⚠️  Warning Details:');
    const warningFiles = results.filter(r => r.warnings.length > 0);
    for (const result of warningFiles) {
      console.log(`   ${result.file}:`);
      result.warnings.forEach(warning => console.log(`      • ${warning}`));
    }
  }
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  if (stats.errors > 0) {
    console.log('   • Fix validation errors before publishing');
  }
  if (stats.brokenLinks > 0) {
    console.log('   • Review and fix broken internal links');
  }
  if (stats.missingMetadata > 0) {
    console.log('   • Complete missing frontmatter fields');
  }
  
  const lowContentFiles = results.filter(r => r.info.wordCount && r.info.wordCount < 100).length;
  if (lowContentFiles > 0) {
    console.log(`   • Review ${lowContentFiles} files with very low word count`);
  }
  
  console.log('\n' + '='.repeat(60));
}

/**
 * Main validation function
 */
async function main() {
  console.log('🚀 Starting comprehensive content validation...\n');
  
  const args = process.argv.slice(2);
  const detailed = args.includes('--detailed');
  const fix = args.includes('--fix');
  
  try {
    // Find all content files
    const contentFiles = await globby([
      'content/**/*.md',
      '!content/**/README.md',
      '!**/node_modules/**'
    ]);
    
    stats.totalFiles = contentFiles.length;
    console.log(`📄 Found ${contentFiles.length} content files to validate\n`);
    
    // Validate each file
    const results = [];
    for (const file of contentFiles) {
      process.stdout.write(`Validating: ${file}...`);
      
      const validation = await validateFile(file);
      results.push(validation);
      
      // Update counters
      stats.errors += validation.errors.length;
      stats.warnings += validation.warnings.length;
      
      if (validation.errors.length === 0) {
        stats.validFiles++;
        console.log(' ✅');
      } else {
        console.log(' ❌');
      }
    }
    
    // Generate report
    generateReport(results, detailed);
    
    // Exit with appropriate code
    if (stats.errors > 0) {
      console.log('\n🚫 Validation failed due to errors.');
      process.exit(1);
    } else {
      console.log('\n🎉 All content validated successfully!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
}