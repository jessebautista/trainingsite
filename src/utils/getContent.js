// src/utils/getContent.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function readDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = entries.filter(file => !file.isDirectory()).map(file => path.join(directory, file.name));
  const folders = entries.filter(folder => folder.isDirectory()).map(folder => path.join(directory, folder.name));

  folders.forEach(folder => {
    files.push(...readDirectory(folder));
  });

  return files;
}

export function getContent() {
  const contentDirectory = path.join(process.cwd(), 'src/content');
  const filenames = readDirectory(contentDirectory);

  const content = filenames.map((filename) => {
    const fileContents = fs.readFileSync(filename, 'utf8');
    const { data, content } = matter(fileContents);
    const relativePath = path.relative(contentDirectory, filename);

    return {
      slug: relativePath.replace(/\.md$/, ''),
      title: data.title || path.basename(filename, '.md'),
      content: content,
      frontmatter: data,
      path: relativePath,
    };
  });

  return content;
}
