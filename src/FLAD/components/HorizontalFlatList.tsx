import { View, StyleSheet, Dimensions,Text, Image, Pressable, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, FlatList } from "react-native";
import Animated, {
    Layout,
    Transition,
    ZoomIn,
    ZoomOut,
  } from "react-native-reanimated";
  
const { width } = Dimensions.get("window");
const SIZE = width / 3;
import { Feather as Icon } from "@expo/vector-icons";
import Music from "../Model/Music";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { useRef, useState } from "react";


interface HorizontalFlatListProps {
    //  React.ReactNode;
    renderCell: (image: string, titre : string) => React.ReactElement
    title : string;
    data : any[];
  }
export const HorizontalFlatList = ({ title, data, renderCell}: HorizontalFlatListProps) => {   
    

    return (
        <View style={styles.similarSection}>
        <Text style={styles.similarTitle} >{title}</Text>
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item}) =>{
                return renderCell(item.image, image.titre);
            }}
        /></View>
    );
  };
  const styles = StyleSheet.create({
    similarSection: {
        paddingTop: 30
    },
    similarTitle: {
        color: "#2998FD",
        paddingLeft: 35,
        fontSize: 17,
        fontWeight: "600",
        paddingBottom: 20
    }

  });