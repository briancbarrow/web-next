const fs = require("fs");
const path = require("path");

export const copyFiles = (src, dest, ignore = []) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest) || !fs.statSync(src).isDirectory()) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyFiles(
        path.join(src, childItemName),
        path.join(dest, childItemName),
        ignore
      );
    });
  } else {
    const ext = path.extname(src);
    if (!ignore.includes(ext)) {
      fs.copyFileSync(src, dest);
    }
  }
};
