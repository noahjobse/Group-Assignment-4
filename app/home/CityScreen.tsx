import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CityInfo from "../../components/CityInfo";
import CityLink from "../../components/CityLink";

interface CityScreenProps {
  city: string;
  link: string;
}

const cityData = {
  Calgary: {
    description: `Calgary is known for its annual Stampede and beautiful mountain views. 
    It is one of Canada’s sunniest cities and a hub for winter sports. 
    The city offers breathtaking landscapes and is a gateway to Banff National Park.`,
    image: require("../../assets/Calgary.jpg"),
  },
  Edmonton: {
    description: `Edmonton is home to the largest mall in North America and stunning river valleys.
    The city hosts several world-class festivals, earning it the nickname "Festival City." 
    It has a vibrant arts scene and one of the best planetariums in Canada.`,
    image: require("../../assets/Edmonton.jpg"),
  },
};

export default function CityScreen({ city, link }: CityScreenProps) {
  console.log("City:", city);
  console.log("City Data:", cityData[city as keyof typeof cityData]);
  console.log("Image Path:", cityData[city as keyof typeof cityData]?.image);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* ✅ City Info Component */}
        <CityInfo
          city={city}
          image={cityData[city as keyof typeof cityData].image}
          description={cityData[city as keyof typeof cityData].description}
        />

        {/* ✅ City Link Component */}
        <CityLink link={link} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
});