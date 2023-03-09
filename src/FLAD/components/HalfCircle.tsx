import { useState } from 'react';
import { View, StyleSheet } from 'react-native'

interface HalfCirlceProps {
  backgroundColor: string;
}

const HalfCirlce = ({ backgroundColor }: HalfCirlceProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View style={{
      width: RADUIS * 2,
      height: RADUIS * 2,
      overflow: "hidden",

    }}>
      <View style={{ backgroundColor: backgroundColor, width: RADUIS * 2, height: RADUIS * 2, borderRadius: RADUIS, }}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    placeholder: "placeholde"
  },
})

export default HalfCirlce;