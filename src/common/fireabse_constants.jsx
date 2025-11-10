import { getFirestore, collection } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

// Collection references
export const friendsChat = collection(db, "chat");
export const users = collection(db, "Users");
