import { View, Text, StyleSheet, Image } from "react-native"
import Colors from "../../constants/Colors";
import MarkFav from "../MarkFav";

const PetInfo = ({ pet }) => {
   return <View>
      <Image
         style={styles.image}
         source={{ uri: pet?.Image }}></Image>
      <View style={styles.infoContainer}>
         <View>
            <Text style={styles.petName}>{pet.Name}</Text>
            <Text style={styles.petinfo}>{pet.Address}</Text>
         </View>
         <View>
            <MarkFav pet={pet}></MarkFav>
         </View>
      </View>
   </View>
}
export default PetInfo
const styles = StyleSheet.create({
   image: {
      height: 310,
      width: "100%",
      objectFit: 'cover'
   },
   infoContainer: {
      padding: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   petName: {
      fontFamily: 'outfit-bold',
      fontSize: 25
   },
   petinfo: {
      fontFamily: 'outfit',
      color: Colors.GRAY
   }
})