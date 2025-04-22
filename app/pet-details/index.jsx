import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import PetInfo from "../../components/Pet-details/PetInfo";
import PetCharacteristics from "../../components/Pet-details/PetCharacteristics";
import PetAbout from "../../components/Pet-details/PetAbout";
import OwnerDetails from "../../components/Pet-details/OwnerDetails";
import Colors from "../../constants/Colors";

import { useUser } from "@clerk/clerk-expo";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // ✅ fixed import

const PetDetails = () => {
  const router = useRouter();
  const { user } = useUser();
  const pet = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: ""
    });
  }, []);

  // 🐶 Initiating chat between two users
  const handleAdoptMe = async () => {
    const doc1 = `${user?.primaryEmailAddress?.emailAddress}_${pet?.Email}`;
    const doc2 = `${pet?.Email}_${user?.primaryEmailAddress?.emailAddress}`;

    try {
      const q = query(collection(db, 'Chats'), where('id', 'in', [doc1, doc2]));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const chatDoc = querySnapshot.docs[0];
        router.push({
          pathname: 'chats',
          params: { id: chatDoc.id }
        });
        return;
      }

      // If chat doesn't exist, create one
      await setDoc(doc(db, 'Chats', doc1), {
        id: doc1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName
          },
          {
            email: pet?.Email,
            imageUrl: pet?.UserImage,
            name: pet?.Username
          }
        ],
        userIds: [user?.primaryEmailAddress?.emailAddress, pet?.Email]
      });

      router.push({
        pathname: 'chats',
        params: { id: doc1 }
      });
    } catch (error) {
      console.log("Error initiating chat:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <PetInfo pet={pet} />
        <PetCharacteristics pet={pet} />
        <PetAbout pet={pet} />
        <OwnerDetails pet={pet} />
      </ScrollView>

      <TouchableOpacity onPress={handleAdoptMe} style={styles.button}>
        <Text style={styles.text}>Adopt Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  text: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 18
  }
});
