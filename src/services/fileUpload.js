import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export async function uploadFile(file, path) {
  const imageRef = ref(storage, path);

  await uploadBytes(imageRef, file);

  const url = await getDownloadURL(imageRef);

  return url;
}
