import React from "react"
import { Text, View, Image, FlatList, Dimensions, TouchableOpacity } from "react-native"
import Categories1 from "./Categories1"
import { useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebaseConfig";
import { StyleSheet } from "react-native"
import Colors from "../../constants/Colors"


import PetListItem from "./PetListItem"
const PetListCategoryVise = () => {
   const [loader, setLoader] = useState(false)
   const [petList, setPetList] = useState([])
   const fetchPetList = async (category) => {
      setLoader(true)
      try {
         setPetList([])
         const q = query(collection(db, 'PetList'), where('Category', '==', category ? category : 'Dog'))
         const snapshot = await getDocs(q)
         snapshot.forEach((doc) => {
            setPetList(petList => [...petList, doc.data()])
         })
         setLoader(false)
      }
      catch (error) {
         console.log(error);
      }
   }
   useState(() => {
      fetchPetList('Dog')
   }, [])
   //pet details

   return (
      <View style={{
         // paddingBottom: loader ? 90 : 40,
         paddingBottom: 20
      }}>

         <View>
            <Categories1 category={(value) => { fetchPetList(value) }}></Categories1>
         </View>
         <View>
            {/* <Text style={styles.title}>Petlist</Text> */}
            <View>
               <FlatList
                  data={petList}
                  horizontal={true}
                  refreshing={loader}
                  onRefresh={() => fetchPetList('Dog')}
                  renderItem={({ item, index }) => (
                     <PetListItem item={item}></PetListItem>
                  )}
               >

               </FlatList>
            </View>
         </View>
      </View>
   )
}
export default PetListCategoryVise;
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
   touchable: {
      padding: 10,
      borderRadius: 15,
      backgroundColor: 'white',
      marginRight: 10
   },
   petName: {
      fontFamily: 'outfit-medium',
      fontSize: 18
   },
   petBreed: {
      color: Colors.GRAY,
      fontFamily: 'outfit'
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