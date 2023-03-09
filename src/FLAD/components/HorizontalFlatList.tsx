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
import { RenderCellProps } from "./littleCard";


interface HorizontalFlatListProps {
    //  React.ReactNode;
    children:(props: RenderCellProps)  => React.ReactElement
    title : string;
    data : any[];
  }
export const HorizontalFlatList = ({ title, data, children : RenderCell }: HorizontalFlatListProps) => {   
    

    return (
        <View style={styles.similarSection}>
        <Text style={styles.similarTitle} >{title}</Text>
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) => RenderCell(item)}/></View>
    );
  };
  const styles = StyleSheet.create({
    similarSection: {
        paddingTop: 16
    },
    similarTitle: {
        color: "#FFF",
        paddingLeft: 8,
        fontSize: 24,
        fontWeight: "600",
        paddingBottom: 16
    }

  });