import { readFile, readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function getAllPostIds() {
  console.log('getAllPostIds called');
  try {
    const fileNames = await readdir(postsDirectory);
    console.log('Files found:', fileNames);
    const paths = fileNames.map(fileName => ({
      params: { id: fileName.replace(/\.md$/, '') }
    }));
    console.log('Paths generated:', paths);
    return paths;
  } catch (error) {
    console.error('getAllPostIds error:', error);
    return [];
  }
}

export async function getPostData(id) {
  try {
    const fullPath = path.join('posts', `${id}.md`);
    const fileContent = await readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      id,
      ...data,
      content
    };
  } catch (error) {
    console.error('Error reading post data:', error);
    return null;
  }
}

export async function getSortedPostsData() {
  try {
    const fileNames = await readdir('posts');
    const allPostsData = await Promise.all(
      fileNames.map(async (fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join('posts', fileName);
        const fileContent = await readFile(fullPath, 'utf8');
        const { data } = matter(fileContent);

        return {
          id,
          ...data
        };
      })
    );

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error getting sorted posts:', error);
    return [];
  }
}