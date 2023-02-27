import { SharedElement } from "react-navigation-shared-element";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { View,Text,Image,StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import Animated, { interpolate, SensorType, useAnimatedSensor, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { BlurView } from 'expo-blur';

interface SpotProps {
    spot: { name: string, sourceUrl: string, index : number };
}
const halfPi = Math.PI/2;

// const {width : wWidht} = Dimensions.get("window");
//@ts-ignore
const SpotDetailsPage = ({ route }) => {
    const {width, height} = useWindowDimensions();
    console.log("====================================");
    console.log(route);
    
    const spot : { name: string, sourceUrl: string, index : number } = route.params.spot;
    console.log(spot);
    const sensor = useAnimatedSensor(SensorType.ROTATION);
    const styleAniamatedImage = useAnimatedStyle(() => {
        const {yaw, pitch, roll} = sensor.sensor.value;
        const verticalAxis =interpolate(
            pitch,
            [-halfPi,halfPi],
            [-30, 30]
        )
        const horizontalAxis =interpolate(
            roll,
            [-halfPi*2,halfPi*2],
            [-30, 30]
        )
        return {
            top : withSpring( verticalAxis),
            left : withSpring(horizontalAxis),
        };
        
    })
    return (
<View style={{ flex: 1, justifyContent : 'flex-start', alignItems : 'center' }}>
        {/* <SharedElement  id={spot.name} style={{ flex: 1 }}>                 */}
            <Animated.Image
                    source={{
                        uri:spot.sourceUrl ,
                    }}
                    style={[
                        {
                            
                        width: 370,
                        height: 370,
                        borderRadius : 24,
                        resizeMode: 'stretch',
                        },styleAniamatedImage
                    ]}
                    />
                   
        {/* <View style={detailRadicalStyle.container}>
            <Text style={detailRadicalStyle.radicalText}>{props.character}</Text>
            <SvgXml
                xml={props.icon
                    .replace(/fill="#[0-9a-f]{6}"/g, `fill=${detailRadicalStyle.svg.color}`)}
                width="30"
                height="30"
                opacity={0.5}
                style={detailRadicalStyle.radicalIcon}

            />
        </View> */}
        {/* </SharedElement> */}
        </View>

    );
};

export default SpotDetailsPage;