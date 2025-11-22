import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  or,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
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

async function getDocumentById(collectionName, id) {
  const ref = doc(db, collectionName, id);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  } else {
    return null;
  }
}

export async function getChatById(chatId) {
  return await getDocumentById("chatHeader", chatId);
}

export async function createChatHeader(group, privateChat) {
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

export async function getChatMessages(chatId) {
  const q = query(collection(db, "chatMessage"), where("chatId", "==", chatId));

  const snap = await getDocs(q);

  const results = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return results.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
}

export async function createChatMessage(chatId, userId, text) {
  if (text.trim() == "") return;

  const document = await addDoc(collection(db, "chats", chatId, "messages"), {
    chatId,
    userId,
    text,
    createdAt: serverTimestamp(),
  });

  return document.id;
}

export function listenToMessages(chatId, callback) {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(data);
  });
}

export function listenToChatsByUserId(id, callback) {
  const q = query(
    collection(db, "chatHeader"),
    or(
      where("privateChat.usersIds", "array-contains", id),
      where("group.usersIds", "array-contains", id)
    )
  );

  const unsubscribe = onSnapshot(q, (snap) => {
    const results = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const sorted = results.sort(
      (a, b) => b.createdAt.seconds - a.createdAt.seconds
    );

    callback(sorted);
  });

  return unsubscribe;
}
