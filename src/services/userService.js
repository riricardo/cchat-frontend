import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export async function getUserByEmail(email) {
  const q = query(collection(db, "users"), where("email", "==", email));

  const snap = await getDocs(q);

  if (snap.empty) return null;

  const doc = snap.doc[0];

  return {
    ...doc.data(),
    id: doc.id,
  };
}

export async function createUser(email, profileImageUrl) {
  await addDoc(collection(db, "users"), {
    email,
    profileImageUrl,
    createdAt: serverTimestamp(),
  });
}
