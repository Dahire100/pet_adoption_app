import React, { useEffect, useState } from "react"
import { Text, View, Image, FlatList, Dimensions, TouchableOpacity } from "react-native"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../../firebaseConfig";
import Colors from "./../../constants/Colors.ts"
import { StyleSheet } from "react-native"
const Categories1 = ({ category }) => {
   const [categoryList, setCategoryList] = useState([])
   const [selectedCategory, setSelectedCategory] = useState('Dog')
   const fetchCategories = async () => {
      setCategoryList([])
      const snapshot = await getDocs(collection(db, 'Categories'));
      snapshot.forEach((item) => (
         setCategoryList(categoryList => [...categoryList, item.data()])
      ))
   }
   useEffect(() => {
      fetchCategories()
   }, [])
   return (
      <View
         style={{
            marginTop: 10
         }}
      >
         <Text
            style={styles.title}
         >Categories</Text>
         <FlatList
            data={categoryList}
            horizontal={true}
            renderItem={({ item, index }) => (
               <TouchableOpacity
                  style={{
                     margin: 3
                  }}
                  onPress={() => {
                     setSelectedCategory(item.name)
                     category(item.name)
                  }}
               >
                  <View
                     style={[styles.imageContainer,
                     selectedCategory === item.name && styles.selectedCategoryContainer
                     ]}
                  >
                     <Image source={{ uri: item?.image }}
                        style={{
                           height: 40,
                           width: 40,
                        }}
                     ></Image>
                  </View>
                  <Text
                     style={styles.categoryText}
                  >{item.name}</Text>
               </TouchableOpacity>
            )}
         >

         </FlatList>

      </View>
   )
}
export default Categories1;
const styles = StyleSheet.create({
   imageContainer: {
      padding: 16,
      borderRadius: 15,
      backgroundColor: Colors.LIGHT_PRIMARY,
      borderWidth: 1,
      borderColor: Colors.PRIMARY
   },
   categoryText: {
      textAlign: 'center',
      fontFamily: 'outfit-medium',
      fontSize: 15,
      marginTop: 3
   },
   categoryContainer: {
      marginTop: 3
   },
   selectedCategoryContainer: {
      backgroundColor: Colors.SECONDARY,
      borderColor: Colors.SECONDARY
   },
   title: {
      fontFamily: 'outfit-bold',
      fontSize: 20,
      marginTop: 5
   }
})