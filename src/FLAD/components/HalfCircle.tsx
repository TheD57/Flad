import { View } from 'react-native'

interface HalfCirlceProps {
  backgroundColor: string;
}

const HalfCirlce = ({ backgroundColor }: HalfCirlceProps) => {

  return (
    <View style={{
      width: RADIUS * 2,
      height: RADIUS * 2,
      overflow: "hidden",

    }}>
      <View style={{ backgroundColor: backgroundColor, width: RADIUS * 2, height: RADIUS * 2, borderRadius: RADIUS, }}>

      </View>
    </View>
  );
};


export default HalfCirlce;