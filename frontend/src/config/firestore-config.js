import { db } from './firebase-config';  
import { collection, getDocs, addDoc } from 'firebase/firestore';


export const getBetsFromFirestore = async () => {
  const betsCollection = collection(db, 'bets');  
  const snapshot = await getDocs(betsCollection);
  const betsList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  return betsList;
};

// Add a new bet to Firestore
export const createNewBet = async (betName) => {
  const betsCollection = collection(db, 'bets');
  await addDoc(betsCollection, {
    name: betName,
    status: 'Pending',  
    createdAt: new Date(),
  });
};
