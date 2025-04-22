import { useNavigation, useRouter } from "expo-router"
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Pressable, ActivityIndicator, ToastAndroid } from "react-native"
import Colors from './../../constants/Colors'
import { Picker } from "@react-native-picker/picker";
import { db } from "../../firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";


const AddNewPet = () => {
   const router = useRouter()
   const { user } = useUser()
   const [formData, setFormData] = useState(
      { Category: 'Dog', Sex: 'Male' }
   )
   const [gender, setGender] = useState()
   const [categoryList, setCategoryList] = useState([])
   const [selectedCategory, setSelectedCategory] = useState('Dog')
   const [image, setImage] = useState();
   const navigate = useNavigation();
   const [loader, setLoader] = useState(false)
   useEffect(() => {
      navigate.setOptions({
         headerTitle: "Add New Pet"
      })
      fetchCategories()
   }, [])
   const handleFormChange = (fieldName, fieldValue) => {
      setFormData(prev => ({
         ...prev,
         [fieldName]: fieldValue
      }))
      console.log(formData);

   }
   //fetching categories from database

   const fetchCategories = async () => {
      setCategoryList([])
      const snapshot = await getDocs(collection(db, 'Categories'));
      snapshot.forEach((item) => (
         setCategoryList(categoryList => [...categoryList, item.data()])
      ))
   }
   //image picker
   const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      // console.log(result);

      if (!result.canceled) {
         setImage(result.assets[0].uri);
      }
   };
   //funtion to uplaod image
   const uploadImage = async () => {
      setLoader(true)
      const resp = await fetch(image);
      const blobImage = await resp.blob();
      try {
         const storageRef = ref(storage, '/Pet Adopt App/' + Date.now() + '.jpg')
         uploadBytes(storageRef, blobImage).then((spanshot) => {
            console.log('file uploaded');

         }).then((resp) => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {
               saveFormData(downloadUrl);

            })
         })
      }
      catch (e) {
         console.log(e);

      }
   }
   //onsubmit
   const onsubmit = () => {
      if (Object.keys(formData).length != 8 || !image) {
         ToastAndroid.show('Enter All Details', ToastAndroid.SHORT)
         return;
      }
      uploadImage()
   }

   const saveFormData = async (imageUrl) => {
      const docId = Date.now().toString();
      await setDoc(doc(db, 'PetList', docId), {
         ...formData,
         Image: imageUrl,
         Username: user?.fullName,
         Email: user?.primaryEmailAddress?.emailAddress,
         UserImage: user?.imageUrl,
         id: docId
      })
      setLoader(false)
      router.replace('/(tabs)/home')
   }
   return <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Add New Pet for adoption</Text>
      <Pressable onPress={pickImage}>
         {image ?
            <Image source={{ uri: image }} style={styles.selectedImage}></Image>
            : <View style={styles.imageContainer}>
               <Image style={styles.image} source={require('./../../assets/images/paw-256.png')}></Image>
            </View>}
      </Pressable>

      <View style={{ marginTop: 10 }}>
         <Text style={styles.label}>Pet Name *</Text>
         <TextInput style={styles.textInput}
            onChangeText={(value) => { handleFormChange("Name", value) }}
         ></TextInput>
      </View>

      <View style={{ marginTop: 10 }}>
         <Text style={styles.label}>Pet Category *</Text>
         <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) => {
               setSelectedCategory(itemValue)
               handleFormChange('Category', itemValue)
            }
            }
            style={styles.textInput}>
            {categoryList.map((item, index) => (
               <Picker.Item key={index} label={item.name} value={item.name} />
            ))}
         </Picker>
      </View>

      <View style={{ marginTop: 10 }}>
         <Text style={styles.label}>Breed *</Text>
         <TextInput style={styles.textInput}
            onChangeText={(value) => { handleFormChange("Breed", value) }}
         ></TextInput>
      </View>

      <View style={{ marginTop: 10 }}>
         <Text style={styles.label}>Age *</Text>
         <TextInput style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(value) => { handleFormChange("Age", value) }}
         ></TextInput>
      </View>

      <View style={{ marginTop: 10 }}>
         <Text style={styles.label}>Gender *</Text>
         <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
               setGender(itemValue)
               handleFormChange('Sex', itemValue)
            }
            }
            style={styles.textInput}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
         </Picker>
      </View>


      <View style={{ marginTop: 10 }}>
         <Text style={styles.label}>Weight *</Text>
         <TextInput style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(value) => { handleFormChange("Weight", value) }}
         ></TextInput>
      </View>

      <View style={{ marginTop: 10 }}>
         <Text style={styles.label}>Address *</Text>
         <TextInput style={styles.textInput}
            onChangeText={(value) => { handleFormChange("Address", value) }}
         ></TextInput>
      </View>

      <View style={{ marginTop: 10 }}>
         <Text style={styles.label}>About *</Text>
         <TextInput style={styles.textInput}
            numberOfLines={3}
            multiline={true}
            onChangeText={(value) => { handleFormChange("About", value) }}
         ></TextInput>
      </View>

      <Pressable disabled={loader} onPress={onsubmit} style={styles.submitBtn}>
         {loader ? <ActivityIndicator size={'large'} /> : <Text style={styles.btnText}>Submit</Text>}
      </Pressable>

   </ScrollView>
}
export default AddNewPet
const styles = StyleSheet.create({
   container: {
      padding: 20
   },
   image: {
      height: 35,
      width: 35,
   },
   imageContainer: {
      padding: 10,
      borderWidth: 1,
      width: 70,
      height: 70,
      borderColor: Colors.GRAY,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      borderRadius: 10
   },
   titleText: {
      fontFamily: 'outfit-medium',
      fontSize: 18
   },
   label: {
      fontSize: 15,
      fontFamily: 'outfit-medium'
   },
   textInput: {
      backgroundColor: Colors.WHITE,
      fontSize: 15,
      padding: 8,
      borderRadius: 7,
      marginTop: 3
   },
   submitBtn: {
      backgroundColor: Colors.PRIMARY,
      padding: 15,
      marginBottom: 30,
      marginTop: 10,
      borderRadius: 8
   },
   btnText: {
      fontFamily: 'outfit-medium',
      fontSize: 15,
      textAlign: 'center'
   },
   selectedImage: {
      width: 70,
      height: 70,
      borderRadius: 5,
      objectFit: 'cover'
   }
})