import fs from "fs";

// will take an array of files and callback
// func will delete each file exists in array
// when no files left then delete working directory
export function cleanUp(listOfPNGs, callback) {
  let i = listOfPNGs.length;
  const workDir = "./temp/";

  listOfPNGs.forEach((filepath) => {
    // unlink method to remove files exists in array
    // console.log(filepath);
    fs.unlink(`${filepath}`, function (err) {
      // decrease one from length
      i--;
      if (err) {
        callback(err);
        return;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
}

export function listOfFiles(workDir, fileType) {
  return fs
    .readdirSync(workDir)
    .map((a) => a.substr(0, a.length - (fileType.length + 1)) + "")
    .sort((a, b) => {
      return a - b;
    })
    .map((a) => workDir + a.substr(0, a.length) + `.${fileType}`);
}
