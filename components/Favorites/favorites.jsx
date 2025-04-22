import { View, Text, FlatList } from "react-native";
import Shared from "../../Shared/Shared"
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PetListItem from "../Home/PetListItem";
const Favorites = () => {
   const { user } = useUser()
   const [loader, setLoader] = useState(false)
   const [favPetList, setFavPetList] = useState([])
   useEffect(() => {
      user && getFavId()
   }, [user])
   //getting fav_ids
   const getFavId = async () => {
      setLoader(true)
      const result = await Shared.getFavList(user);
      getFavPetList(result?.Favorites)
      setLoader(false)
   }
   const getFavPetList = async (ids) => {

      setFavPetList([])
      try {
         setLoader(true)
         const q = query(collection(db, 'PetList'), where('id', 'in', ids))
         const snapshot = await getDocs(q)
         snapshot.forEach(doc => {
            setFavPetList(prev => [...prev, doc.data()])
         })
         setLoader(false)
      }
      catch (e) {
         console.log(e);

      }
   }
   return <View>
      <FlatList
         style={{ padding: 10 }}
         onRefresh={getFavId}
         refreshing={loader}
         data={favPetList}
         numColumns={2}
         renderItem={({ item, index }) => (
            <PetListItem key={index} item={item} callingFrom={"favorites"}></PetListItem>
         )}
      >

      </FlatList>
   </View>
}
export default Favorites;