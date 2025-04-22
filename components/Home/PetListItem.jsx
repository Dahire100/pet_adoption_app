import React from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
import MarkFav from "../MarkFav"
import { useRouter } from "expo-router"
const PetListItem = ({ item, callingFrom }) => {
   const router = useRouter()
   const encodedPetImage = encodeURI(item?.Image)
   return <TouchableOpacity
      onPress={() => {
         router.push({
            pathname: '/pet-details',
            params: { ...item, Image: encodedPetImage }
         })
      }}
      style={callingFrom === "favorites" ? styles.touchableFav : callingFrom === "myPosts" ? styles.touchableMyPost : styles.touchable}
   >
      <View style={{
         position: 'absolute',
         top: 15,
         right: 15,
         zIndex: 3
      }}><MarkFav pet={item} color={'white'} /></View>

      <Image
         source={{ uri: item?.Image }}
         style={callingFrom === "favorites" || callingFrom === "myPosts" ? styles.imageFav : styles.image}
      ></Image>
      <Text style={styles.petName}> {item.Name} </Text>
      <View style={{
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center'
      }}>
         <Text style={styles.petBreed}>{item.Breed}</Text>
         <Text style={styles.years}>{item.Age} YRS</Text>
      </View>
   </TouchableOpacity>
}
export default PetListItem;
const styles = StyleSheet.create({
   title: {
      fontFamily: 'outfit-bold',
      fontSize: 20,
      marginTop: 5,
      marginBottom: 10
   },
   image: {
      height: 135,
      width: 150,
      borderRadius: 15,
   },
   imageFav: {
      height: 135,
      width: "100%",
      borderRadius: 15,
   },
   touchable: {
      padding: 10,
      borderRadius: 15,
      backgroundColor: 'white',
      marginRight: 10,
      marginBottom: 10,
   },
   touchableFav: {
      padding: 10,
      borderRadius: 15,
      backgroundColor: 'white',
      marginRight: 10,
      marginBottom: 10,
      width: "49%"
   },
   touchableMyPost: {
      padding: 10,
      borderRadius: 15,
      backgroundColor: 'white',
      marginRight: 10,
      marginBottom: 10,
      width: "100%",
   },
   petName: {
      fontFamily: 'outfit-medium',
      fontSize: 18
   },
   petBreed: {
      color: Colors.GRAY,
      fontFamily: 'outfit',
      flexShrink: 1
   },
   years: {
      fontFamily: 'outfit',
      color: Colors.PRIMARY,
      paddingHorizontal: 7,
      backgroundColor: Colors.LIGHT_PRIMARY,
      borderRadius: 10,
      fontSize: 11
   }
})