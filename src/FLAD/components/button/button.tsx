import { Image , StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Icons from '../../assets/icons/icons/icon';
import { RiveRef } from 'rive-react-native';

interface ButtonProps {
    name : string;
}
  
const FladButton = ({name} : ButtonProps) => {
    const riveRef = React.useRef<RiveRef>(null);

    const handlePlay = () => { riveRef.current?.play() };
    return (
        <Pressable onPress={handlePlay}> 
        <Image source={Icons.discovery} style={[styles.image]} />
      </Pressable>
    );
  };
  
const styles = StyleSheet.create({
  button : {
    justifyContent : 'center',
    alignItems : 'center',
  },
  image : {
    borderRadius : 24,
    resizeMode: 'cover',
    width: 65,
    height: 65,
    backgroundColor: 'black',
}
})

export default FladButton;




