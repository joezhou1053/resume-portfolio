#!/usr/bin/env node

/**
 * 简历文档管理辅助脚本
 * 用于生成新的文档条目，方便添加到 constants.ts
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  projectPath: 'C:\\Users\\64528\\Desktop\\MyResume\\joe-portfolio',
  constantsPath: 'C:\\Users\\64528\\Desktop\\MyResume\\joe-portfolio\\src\\constants.ts',
  publicPath: 'C:\\Users\\64528\\Desktop\\MyResume\\joe-portfolio\\public'
};

// 文档类型配置
const DOCUMENT_TYPES = {
  resume: {
    categoryId: 'cat-resume',
    titleEn: 'Professional Resume',
    titleZh: '个人简历'
  },
  portfolio: {
    categoryId: 'cat-portfolio',
    titleEn: 'Portfolio Presentation',
    titleZh: '作品集演示'
  },
  degree: {
    categoryId: 'cat-degree',
    titleEn: 'OSU Degree Certificate',
    titleZh: 'OSU 学位证书'
  },
  coursera: {
    categoryId: 'cat-coursera',
    titleEn: 'Coursera Certificates',
    titleZh: 'Coursera 职业证书'
  }
};

/**
 * 生成唯一ID
 */
function generateId(type, titleEn) {
  const prefix = type === 'resume' ? 'doc' :
                 type === 'portfolio' ? 'port' :
                 type === 'degree' ? 'doc-degree' : 'cert';
  const suffix = titleEn.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 20);
  return `${prefix}-${suffix}`;
}

/**
 * 生成文档条目代码
 */
function generateDocumentEntry(docInfo) {
  const { type, titleEn, titleZh, subtitleEn, subtitleZh, filename, version, date, size } = docInfo;

  const id = generateId(type, titleEn);
  const thumbnailUrl = type === 'degree' ? '/osu-logo.svg' :
    `https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=400&auto=format&fit=crop`;

  return `  {
    id: '${id}',
    title: { en: "${titleEn}", zh: "${titleZh}" },
    subtitle: { en: "${subtitleEn || ''}", zh: "${subtitleZh || ''}" },
    type: "${type}",
    thumbnailUrl: "${thumbnailUrl}",
    versions: [
      { version: ${version}, date: "${date}", name: "${filename}", size: "${size}", isCurrent: true }
    ]
  }`;
}

/**
 * 解析 constants.ts 获取现有文档
 */
function parseExistingDocuments() {
  const constantsPath = path.join(CONFIG.projectPath, 'src', 'constants.ts');

  if (!fs.existsSync(constantsPath)) {
    return [];
  }

  const content = fs.readFileSync(constantsPath, 'utf-8');
  // 简单的匹配，实际使用时可以更复杂
  const matches = content.match(/version:\s*(\d+)/g);

  if (!matches) return [];

  const versions = matches.map(m => parseInt(m.match(/\d+/)[0]));
  return Math.max(...versions);
}

/**
 * 生成新的文档条目（供 Claude Code Agent 使用）
 */
function generateNewDocumentEntry(options) {
  const {
    type,
    titleEn,
    titleZh,
    subtitleEn = '',
    subtitleZh = '',
    filename,
    size = 'Unknown'
  } = options;

  // 获取当前最新版本号
  const currentVersion = parseExistingDocuments() || 0;
  const newVersion = currentVersion + 1;

  // 生成日期
  const date = new Date().toISOString().split('T')[0];

  const docInfo = {
    type,
    titleEn,
    titleZh,
    subtitleEn,
    subtitleZh,
    filename,
    version: newVersion,
    date,
    size
  };

  return generateDocumentEntry(docInfo);
}

/**
 * 命令行界面
 */
function cli() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
简历文档管理工具

用法:
  node add-document.js <type> <titleEn> <titleZh> <filename> [size]

参数:
  type       - 文档类型 (resume|portfolio|degree|coursera)
  titleEn    - 英文标题
  titleZh    - 中文标题
  filename   - PDF文件名
  size       - 文件大小 (可选，默认 "Unknown")

示例:
  node add-document.js resume "Joe Zhou - Resume" "周永祥 - 简历" "Joe_Resume.pdf" "1.2 MB"
`);
    process.exit(0);
  }

  const [type, titleEn, titleZh, filename, size] = args;

  if (!type || !titleEn || !titleZh || !filename) {
    console.error('错误: 缺少必需参数');
    process.exit(1);
  }

  if (!DOCUMENT_TYPES[type]) {
    console.error(`错误: 不支持的文档类型 "${type}"`);
    console.error(`支持的类型: ${Object.keys(DOCUMENT_TYPES).join(', ')}`);
    process.exit(1);
  }

  const entry = generateNewDocumentEntry({
    type,
    titleEn,
    titleZh,
    filename,
    size
  });

  console.log('\n生成的文档条目:');
  console.log('---');
  console.log(entry);
  console.log('---');
  console.log('\n请将上述代码复制到 src/constants.ts 的相应分类中\n');
}

// 如果直接运行此脚本
if (require.main === module) {
  cli();
}

// 导出供其他模块使用
module.exports = {
  generateNewDocumentEntry,
  generateDocumentEntry,
  DOCUMENT_TYPES
};
