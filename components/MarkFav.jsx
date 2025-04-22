import { Pressable, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Shared from "../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MarkFav = ({ pet, color = 'black' }) => {
   const { user } = useUser()
   const [favList, setFavList] = useState([])
   const getFav = async () => {
      const result = await Shared.getFavList(user)
      setFavList(result?.Favorites ? result?.Favorites : [])
   }
   useEffect(() => {
      user && getFav()
   }, [user])
   const addToFav = async () => {
      const favorite = favList;
      favorite.push(pet.id)
      await Shared.updateFav(user, favorite)
      getFav()
   }
   const removeFromFav = async () => {
      const favorite = favList.filter(item => item != pet.id);
      await Shared.updateFav(user, favorite)
      getFav()
   }
   return <View>
      {favList?.includes(pet.id) ?
         <Pressable onPress={removeFromFav}>
            <FontAwesome name="heart" size={24} color="red" />
         </Pressable>
         :
         <Pressable onPress={addToFav}>
            <AntDesign name="hearto" size={24} color={color} />
         </Pressable>}
   </View>
}
export default MarkFav;