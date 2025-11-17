import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export async function uploadFile(file, path) {
  const imageRef = ref(storage, path);

  await uploadBytes(imageRef, file);

  const url = await getDownloadURL(imageRef);

  return url;
}

export async function uploadFromUrl(url, path) {
  const response = await fetch(url);
  const blob = await response.blob();
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob);
  const newUrl = await getDownloadURL(storageRef);
  return newUrl;
}
