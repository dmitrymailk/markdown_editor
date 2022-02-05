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
    const path = `${WORK_DIR}${filename}`;
    const file = await Filesystem.writeFile({
      path: path,
      data: text,
      directory: APP_DIR,
      encoding: ENCODING,
    });
    console.warn("file saved", file);
  } catch (e) {
    console.error("error save file", e);
  }
};

const getFileContent = async (filename: string) => {
  try {
    await checkPermissions();
    const path = `${WORK_DIR}${filename}`;
    const contents = await Filesystem.readFile({
      path: path,
      directory: APP_DIR,
      encoding: ENCODING,
    });

    return contents.data;
  } catch (e) {
    console.error("error read file", e);
  }
};

export { saveTextFile, getFileContent };
