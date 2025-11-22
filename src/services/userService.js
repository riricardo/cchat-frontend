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
  writeBatch,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { uploadFile, uploadFromUrl } from "./fileUpload";
import { getChatsByUserId } from "./chatService";

async function saveDocs(collection, docs) {
  const batch = writeBatch(db);

  docs.forEach((d) => {
    const { id, ...obj } = d;
    const ref = doc(db, collection, id);
    batch.update(ref, obj);
  });

  await batch.commit();
}

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

  let chats = await getChatsByUserId(id);

  chats = chats
    .filter((chat) => chat.group == null)
    .map((chat) => ({
      ...chat,
      privateChat: {
        ...chat.privateChat,
        users: chat.privateChat.users.map((u) =>
          u.id === id ? { ...u, imageUrl: url } : u
        ),
      },
    }));

  await saveDocs("chatHeader", chats);

  await updateDoc(doc(db, "users", id), {
    profileImageUrl: url,
  });
}

export async function createUserIfNotExists(firebaseUser) {
  if (!firebaseUser) return;

  const user = await getUserByEmail(firebaseUser.email);

  if (user == null) {
    await createUser(
      firebaseUser.email,
      firebaseUser.photoURL,
      firebaseUser.displayName
    );
  }
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

export function listenToUsers(callback) {
  const q = collection(db, "users");

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(data);
  });
}
