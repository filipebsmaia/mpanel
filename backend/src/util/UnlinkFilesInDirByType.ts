import fs from 'fs';

const UnlinkFilesInDirByType = async (
  srcDir: string,
  type: string,
): Promise<void> => {
  try {
    const stat = await fs.promises.stat(srcDir);
    if (!stat || !stat.isDirectory()) {
      throw new Error('Invalid folder');
    }
  } catch (err) {
    return;
  }

  const list = await fs.promises.readdir(srcDir);

  const promise = list.map(async file => {
    const src = `${srcDir}/${file}`;
    if (src.toLowerCase().endsWith(type.toLowerCase())) {
      await fs.promises.unlink(src);
    }
  });

  await Promise.all(promise);
};
export default UnlinkFilesInDirByType;
