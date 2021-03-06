import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

// это значит что папка создалась в /android/data/com.editor.markdown/
const APP_DIR = Directory.External;
const ENCODING = Encoding.UTF8;
const WORK_DIR = "/markdown-editor/";

const checkPermissions = async () => {
  let permission = await Filesystem.checkPermissions();
  if (permission.publicStorage !== "granted") {
    permission = await Filesystem.requestPermissions();
    console.log("request permission", permission);
  } else {
    console.log("permission ok");
  }
};
const saveTextFile = async (filename: string, text: string) => {
  try {
    await checkPermissions();
    const path = `${WORK_DIR}${filename}.md`;
    const file = await Filesystem.writeFile({
      path: path,
      data: text,
      directory: APP_DIR,
      encoding: ENCODING,
    });
    console.warn("file saved", file);
  } catch (e) {
    console.error("error save file", filename, e);
  }
};

const deleteFile = async (filename: string) => {
  try {
    await checkPermissions();
    const path = `${WORK_DIR}${filename}.md`;
    await Filesystem.deleteFile({
      path: path,
      directory: APP_DIR,
    });
    console.warn("file deleted", filename);
  } catch (e) {
    console.error("error delete file", e);
  }
};

const renameFile = async (prevFilename: string, currentFilename: string) => {
  try {
    const fromPath = `${WORK_DIR}${prevFilename}.md`;
    const toPath = `${WORK_DIR}${currentFilename}.md`;
    console.log("renameFile", fromPath, toPath);
    const file = await Filesystem.rename({
      from: fromPath,
      to: toPath,
      directory: APP_DIR,
      toDirectory: APP_DIR,
    });
    console.warn("file renamed", toPath);
  } catch (e) {
    console.error(
      `error rename file prevFilename: ${prevFilename} currentFilename: ${currentFilename}`,
      e
    );
  }
};

const getFileContent = async (filename: string) => {
  try {
    await checkPermissions();
    const path = `${WORK_DIR}${filename}.md`;
    const contents = await Filesystem.readFile({
      path: path,
      directory: APP_DIR,
      encoding: ENCODING,
    });

    return contents.data;
  } catch (e) {
    console.error("error read file", filename, e);
  }
};

export { saveTextFile, getFileContent, renameFile, deleteFile };
