import { View, Text, StyleSheet, Image } from "react-native"
import Colors from "../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';

const OwnerDetails = ({ pet }) => {
   return <View style={styles.container}>
      <View style={styles.OwnerDetails}>
         <Image style={styles.image} source={{ uri: pet?.UserImage }}></Image>
         <View>
            <Text
               style={{
                  fontFamily: 'outfit-bold',
                  fontSize: 15
               }}
            >{pet.Username}</Text>
            <Text
               style={{
                  fontFamily: 'outfit',
                  fontSize: 13,
                  color: Colors.GRAY
               }}
            >Pet Owner</Text>
         </View>
      </View>
      <Ionicons name="send" size={24} color={Colors.PRIMARY} />
   </View>
}
export default OwnerDetails;
const styles = StyleSheet.create({
   container: {
      margin: 20,
      marginTop: 0,
      borderWidth: 1,
      borderColor: Colors.PRIMARY,
      borderRadius: 10,
      padding: 10,
      backgroundColor: Colors.WHITE,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 60
   },
   image: {
      height: 50,
      width: 50,
      borderRadius: 99
   },
   OwnerDetails: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center'
   },
})