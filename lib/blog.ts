import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export function getPostBySlug(slug: string, locale: string) {
  try {
    // تحديد المسار بناءً على اللغة والاسم (مثلاً: content/blog/FR/le-general.md)
    const fullPath = path.join(contentDirectory, locale.toUpperCase(), `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // استخدام gray-matter لفصل البيانات الوصفية عن النص
    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: data,
      content,
    };
  } catch (e) {
    return null;
  }
}

export function getAllPosts(locale: string) {
  const localeDirectory = path.join(contentDirectory, locale.toUpperCase());
  
  if (!fs.existsSync(localeDirectory)) return [];

  const fileNames = fs.readdirSync(localeDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(localeDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      metadata: data,
    };
  });
}