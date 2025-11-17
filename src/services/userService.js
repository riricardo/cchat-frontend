import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { uploadFile } from "./fileUpload";

export async function getUserByEmail(email) {
  const q = query(collection(db, "users"), where("email", "==", email));

  const snap = await getDocs(q);

  if (snap.empty) return null;

  const doc = snap.docs[0];

  return {
    ...doc.data(),
    id: doc.id,
  };
}

export async function createUser(email, profileImageUrl, name) {
  await addDoc(collection(db, "users"), {
    email,
    profileImageUrl,
    name,
    nameLower: name.toLowerCase(),
    createdAt: serverTimestamp(),
  });
}

export async function changeProfileImage(id, file) {
  const ext = file.type.split("/")[1];
  const url = await uploadFile(file, `users/${id}/profile.${ext}`);

  await updateDoc(doc(db, "users", id), {
    profileImageUrl: url,
  });
}
