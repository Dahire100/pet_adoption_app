import React, { useEffect, useState } from "react"
import { Text, View, Image, FlatList, Dimensions } from "react-native"
import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore"
import { StyleSheet } from "react-native"
const Sliders = () => {
   const [sliderList, setSliderList] = useState([])
   useEffect(() => {
      getSliders()
   }, [])
   const getSliders = async () => {
      setSliderList([])
      try {
         const snapshot = await getDocs(collection(db, 'Sliders'))
         snapshot.forEach((doc) => {
            setSliderList(sliderList => [...sliderList, doc.data()])
         })
      }
      catch (error) {
         console.log(error);
      }
   }
   return (
      <View
         style={{
            marginTop: 15
         }}>
         <FlatList
            data={sliderList}
            horizontal={true}
            renderItem={({ item, index }) => (
               <View>
                  <Image source={{ uri: item?.image }}
                     style={styles.slideImage}
                  />
               </View>
            )}
         ></FlatList>
      </View>
   )
}
export default Sliders;
const styles = StyleSheet.create({
   slideImage: {
      width: Dimensions.get('screen').width * 0.9,
      height: 170,
      borderRadius: 15,
      marginRight: 15
   }
})
