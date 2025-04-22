import { View, Text, StyleSheet, Image } from "react-native"
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from "../../constants/Colors";
const PetCharacteristics = ({ pet }) => {
   return <View
      style={styles.container}>
      <View style={styles.section}>
         <View
            style={styles.box}
         >
            <Image source={require('./../../assets/images/calendar.png')}
               style={{
                  height: 30,
                  width: 30
               }}
            ></Image>
            <View style={styles.textContainer}>
               <Text style={styles.title}>Age</Text>
               <Text style={styles.value}>{pet.Age} Years</Text>
            </View>
         </View>
         <View
            style={styles.box}
         >
            <Image source={require('./../../assets/images/bone.png')}
               style={{
                  height: 30,
                  width: 30
               }}
            ></Image>
            <View style={styles.textContainer}>
               <Text style={styles.title}>Breed</Text>
               <Text style={styles.value}>{pet.Breed}</Text>
            </View>
         </View>
      </View>
      <View style={styles.section}>
         <View
            style={styles.box}
         >
            {/* <EvilIcons name="calendar" size={35} color={Colors.PRIMARY} backgroundColor={Colors.LIGHT_PRIMARY}
               style={styles.icons} /> */}
            <Image source={require('./../../assets/images/sex.png')}
               style={{
                  height: 30,
                  width: 30
               }}
            ></Image>
            <View style={styles.textContainer}>
               <Text style={styles.title}>Sex</Text>
               <Text style={styles.value}>{pet.Sex}</Text>
            </View>
         </View>
         <View
            style={styles.box}
         >
            <Image source={require('./../../assets/images/weight.png')}
               style={{
                  height: 30,
                  width: 30
               }}
            ></Image>
            <View style={styles.textContainer}>
               <Text style={styles.title}>Weight</Text>
               <Text style={styles.value}>{pet.Weight} Kg</Text>
            </View>
         </View>
      </View>
   </View>
}
export default PetCharacteristics;
const styles = StyleSheet.create({
   container: {
      padding: 20,
      paddingTop: 0
   },
   section: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      flexDirection: 'row',
      gap: 10,
      marginTop: 10
   },
   box: {
      backgroundColor: Colors.WHITE,
      width: '48%',
      padding: 8,
      borderRadius: 7,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
   },
   icons: {
      borderRadius: 5
   },
   title: {
      color: Colors.GRAY,
      fontFamily: 'outfit',
      fontSize: 11
   },
   value: {
      fontFamily: 'outfit-bold',
      fontSize: 13,
   },
   textContainer: {
      flexShrink: 1,
   }
})