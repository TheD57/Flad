import { useState } from 'react';
import { View, Text, Image, Animated ,PanResponder, Dimensions, StyleSheet, ImageBackground, Button, Pressable, TextInput } from 'react-native'

interface InputProps {
    name : string;
    placeholder : string;
}
  
const FladInput = ({name, placeholder} : InputProps) => {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <View>
        <Text></Text>
        <TextInput style={[styles.input]}>

        </TextInput>
        </View>
    );
  };
  
const styles = StyleSheet.create({
  input : {
    justifyContent : 'center',
    alignItems : 'center',
    placeholder : "placeholde"
  },
})

export default FladInput;