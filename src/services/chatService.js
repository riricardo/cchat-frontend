import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  or,
} from "firebase/firestore";
import { db } from "../config/firebase";

export function makeUsersKey(users) {
  if (users == null) return null;
  return users.sort().join("_");
}

export async function searchChatByUserKey(users) {
  const q = query(
    collection(db, "chatHeader"),
    where("privateChat.usersKey", "==", makeUsersKey(users))
  );

  const snap = await getDocs(q);

  if (snap.empty) return null;

  const doc = snap.docs[0];

  return {
    ...doc.data(),
    id: doc.id,
  };
}

export async function createChat(group, privateChat) {
  const document = await addDoc(collection(db, "chatHeader"), {
    group,
    privateChat,
    createdAt: serverTimestamp(),
  });

  return document.id;
}

export async function getChatsByUserId(id) {
  const q = query(
    collection(db, "chatHeader"),
    or(
      where("privateChat.usersIds", "array-contains", id),
      where("group.usersIds", "array-contains", id)
    )
  );

  const snap = await getDocs(q);

  const results = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return results.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
}
