import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebaseConfig"; // ✅ Correct

const getFavList = async (user) => {
   const email = user?.primaryEmailAddress?.emailAddress;
   try {
      const snapshot = await getDoc(doc(db, 'UserFavorites', email))
      if (snapshot?.exists()) {
         return snapshot.data()
      }
      else {
         await setDoc(doc(db, 'UserFavorites', email),
            {
               email: email,
               Favorites: []
            }
         )
      }
   }
   catch (error) {
      console.log(error);

   }
}
const updateFav = async (user, favorites) => {
   const email = user?.primaryEmailAddress?.emailAddress;
   const docRef = doc(db, 'UserFavorites', email)
   try {
      await updateDoc(docRef, {
         Favorites: favorites
      })
   }
   catch (error) {
      console.log(error);

   }
}
export default { getFavList, updateFav };