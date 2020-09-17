import fs from 'fs';

const copyDir = async (srcDir: string, distDir: string): Promise<void> => {
  const list = await fs.promises.readdir(srcDir);

  const promise = list.map(async file => {
    const src = `${srcDir}/${file}`;
    const dist = `${distDir}/${file}`;
    const stat = await fs.promises.stat(src);

    if (stat && stat.isDirectory()) {
      await fs.promises.stat(dist).catch(async () => {
        await fs.promises.mkdir(dist);
      });
      await copyDir(src, dist);
    } else {
      await fs.promises.copyFile(src, dist);
    }
  });

  await Promise.all(promise);
};
export default copyDir;
