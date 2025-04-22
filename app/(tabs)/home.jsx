import { View, Text, ScrollView } from "react-native"
import Header from "../../components/Home/Header";
import Sliders from "../../components/Home/Sliders";
import PetListCategoryVise from "../../components/Home/PetListCategoryVise";
import AddPet from "../../components/Home/AddPet";

const home = () => {
   return <ScrollView
      style={{
         padding: 15,
         paddingTop: 40,
         flexGrow: 1,
      }}
   >
      {/* Header */}
      <Header />
      {/* Slider */}
      <Sliders />
      {/* Category + PetList */}
      <PetListCategoryVise />

      {/* add new pet option */}
      <AddPet></AddPet>
   </ScrollView>
}
export default home;