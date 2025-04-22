import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from "../../constants/Colors";
import { Link } from "expo-router";

const AddPet = () => {
   return <Link href={'/add-new-pet'} style={styles.container}>
      <MaterialIcons name="pets" size={20} color={Colors.PRIMARY} />
      <Text style={{
         color: Colors.PRIMARY,
         fontFamily: 'outfit-medium',
         fontSize: 18,

      }}>Add New Pet</Text>
   </Link>
}
export default AddPet;
const styles = StyleSheet.create({
   container: {
      marginBottom: 60,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      backgroundColor: Colors.LIGHT_PRIMARY,
      borderWidth: 2,
      borderStyle: 'dotted',
      borderColor: Colors.PRIMARY,
      paddingVertical: 15,
      borderRadius: 10,
      textAlign: 'center'
   }
})