import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { uploadFile, uploadFromUrl } from "./fileUpload";

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

export async function getUserById(id) {
  const ref = doc(db, "users", id);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  } else {
    return null;
  }
}

export async function createUser(email, profileImageUrl, name) {
  const document = await addDoc(collection(db, "users"), {
    email,
    profileImageUrl,
    name,
    nameLower: name.toLowerCase(),
    createdAt: serverTimestamp(),
  });

  //Workaround for protected images
  const newUrl = await uploadFromUrl(
    profileImageUrl,
    `users/${document.id}/profile`
  );

  await updateDoc(doc(db, "users", document.id), {
    profileImageUrl: newUrl,
  });
}

export async function changeProfileImage(id, file) {
  const ext = file.type.split("/")[1];
  const url = await uploadFile(file, `users/${id}/profile.${ext}`);

  await updateDoc(doc(db, "users", id), {
    profileImageUrl: url,
  });
}

export async function getUsersByName(name) {
  const search = name.toLowerCase();

  const q = query(
    collection(db, "users"),
    where("nameLower", ">=", search),
    where("nameLower", "<=", search + "\uf8ff")
  );

  const snap = await getDocs(q);

  const results = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return results.sort((a, b) => a.name.localeCompare(b.name));
}
