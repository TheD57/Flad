import {TouchableOpacity, ScrollView, View, Text, StyleSheet, Image, SafeAreaView, FlatList, Animated} from 'react-native';


export default function littleCard ({image,titre}){
    return (
    <View style={styles.similarContainer}>
        <Image source={{uri: image}} style={styles.similarPoster}></Image>
        <Text numberOfLines={2} style={styles.similarTitleFilm}>{titre}
        </Text>
    </View>
    )
}
const styles = StyleSheet.create({

    similarContainer: {
        width: 90,
        marginHorizontal: 7
    },
    similarTitleFilm: {
        color: "#DADADA",
        paddingTop: 5,
        fontWeight: "300"
    },
    similarPoster: {
        height: 130,
        width: 90,
        borderRadius: 8
    }
})
