import { View, StyleSheet, Text, FlatList } from "react-native";
import { RenderCellProps } from "./littleCard";


interface HorizontalFlatListProps {
  //  React.ReactNode;
  children: (props: RenderCellProps) => React.ReactElement
  title: string;
  data: any[];
}
export const HorizontalFlatList = ({ title, data, children: RenderCell }: HorizontalFlatListProps) => {

  return (
    <View style={styles.similarSection}>
      <Text style={styles.similarTitle} >{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal={true}
        keyExtractor={item => item.id}
        renderItem={({ item }) => RenderCell(item)} /></View>
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