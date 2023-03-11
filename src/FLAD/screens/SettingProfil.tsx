import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Svg, Path } from 'react-native-svg';
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';

import normalize from '../components/Normalize';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GraphicalCharterDark } from '../assets/GraphicalCharterDark';
import { GraphicalCharterLight } from '../assets/GraphicalCharterLight';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)


export default function SettingProfil() {
    //Dark Mode
    const [isDark, setIsDark] = useState(null);
    useEffect(() => {
        const retrieveDarkMode = async () => {
            const darkModeValue = await AsyncStorage.getItem('dark');
            if (darkModeValue !== null) {
                setIsDark(JSON.parse(darkModeValue));
            }
        };
        retrieveDarkMode();
    }, []);
    const style = isDark ? GraphicalCharterDark : GraphicalCharterLight;

    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    // @ts-ignore
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const styles = StyleSheet.create({
        mainSafeArea: {
            flex: 1,
            backgroundColor: style.body,
        },
        container: {
            marginTop: 20,
            marginHorizontal: normalize(25),
            flex: 1,
            backgroundColor: style.body,
        },
        buttonSetting: {
            width: normalize(17),
            height: normalize(17),
            marginRight: 5
        },
        modalContent: {
            position: 'absolute',
            top: '5%',
            left: '-5%',
            right: '-5%',
            height: '100%',
            backgroundColor: style.body,
            borderRadius: 12
        },
        modalView: {
            flexDirection: 'row',
            marginTop: 20,
            marginLeft: 30,
            marginBottom: normalize(45)
        },
        exit: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        textExit: {
            fontSize: normalize(20),
            color: '#454545',
            fontWeight: 'bold'
        },
        profilHead: {
            alignItems: 'center',
        },
        title: {
            fontSize: normalize(30),
            fontWeight: 'bold',
            color: style.Text,
        },
        imageWrapper: {
            width: 126,
            height: 126,
            borderRadius: 63,
            borderWidth: 3,
            borderColor: style.Text,
            overflow: 'hidden',
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        imageProfil: {
            width: 120,
            height: 120,
        },
        editButton: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#7C7C7C',
            alignItems: 'center',
            justifyContent: 'center'
        },
        body: {
            paddingVertical: 9,
            paddingLeft: normalize(10),
            backgroundColor: style.Card,
            borderRadius: 13,
            alignItems: 'flex-start',
            marginBottom: normalize(45)
        },
        textOption: {
            fontSize: normalize(18),
            color: style.Text,
            fontWeight: 'bold',
            marginLeft: 12
        },
        deleteOption: {
            paddingVertical: 9,
            paddingLeft: 5,
            backgroundColor: style.Card,
            borderRadius: 13,
            flexDirection: 'row',
            alignItems: 'center',
        },
        textOptionPassword: {
            fontSize: normalize(18),
            color: '#1c77fb',
            marginLeft: 12
        },
        buttonDeleteOption: {
            backgroundColor: '#DF0404',
            padding: 5,
            borderRadius: 10,
            marginLeft: 15
        },
        textDeleteOption: {
            fontSize: normalize(18),
            color: '#F80404',
            marginLeft: 12
        },
        optionId: {
            flexDirection: 'row',
            marginBottom: 20,
        },
        optionMail: {
            flexDirection: 'row',
        },
        textInputId: {
            marginLeft: 50,
            width: '57%',
            color: 'white',
            fontSize: normalize(18),
        },
        textInputMail: {
            marginLeft: 100,
            color: 'white',
            width: '57%',
            fontSize: normalize(18)
        },
        passwordOption: {
            paddingVertical: 9,
            paddingLeft: normalize(10),
            backgroundColor: style.Card,
            borderRadius: 13,
            alignItems: 'flex-start',
            marginBottom: normalize(45)
        },
        passwordIcon: {
            backgroundColor: '#8e8d92',
            padding: 5,
            paddingHorizontal: 8,
            borderRadius: 10,
            marginLeft: 10
        },
        optionView: {
            flexDirection: 'row',
            marginTop: 5
        },
        cancelText: {
            fontSize: normalize(20),
            color: '#1c77fb'
        },
        updateText: {
            marginLeft: 60,
            fontSize: normalize(20),
            color: '#404040'
        },
        titlePassword: {
            fontSize: normalize(22),
            color: style.Text,
            marginLeft: 50
        },
        warning: {
            color: '#98989f',
            fontSize: normalize(15)
        },
        warningView: {
            marginTop: 10,
            paddingHorizontal: 40
        },
        bodyModal: {
            paddingVertical: 12,
            paddingLeft: 30,
            marginHorizontal: normalize(25),
            backgroundColor: style.Card,
            borderRadius: 13,
            alignItems: 'flex-start'
        },
        optionModalWithUnderline: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: style.Line,
            paddingBottom: 10,
            marginBottom: 10
        },
        optionModal: {
            flexDirection: 'row'
        },
        textOptionModal: {
            fontSize: normalize(18),
            color: style.Text,
            fontWeight: 'bold',
        },
        textInputNewModal: {
            marginLeft: 40,
            color: style.Text,
            width: '67.5%',
            fontSize: normalize(18)
        },
        textInputConfirmModal: {
            marginLeft: 30,
            color: style.Text,
            fontSize: normalize(18)
        },
        textInputOldModal: {
            marginLeft: 55,
            color: style.Text,
            width: '67.5%',
            fontSize: normalize(18)
        }
    })

    return (
        <DismissKeyboard>
            <SafeAreaView style={styles.mainSafeArea}>
                <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                            <View style={styles.exit}>
                                <Image style={styles.buttonSetting} source={require('../assets/icons/icons/buttonProfil_Inverse.png')} />
                                <Text style={styles.textExit}>Exit</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.profilHead}>
                            <Text style={styles.title}>Profil</Text>
                            <View style={styles.imageWrapper}>
                                {image && <Image source={{ uri: image }} style={styles.imageProfil} />}
                            </View>
                            <View style={styles.editButton}>
                                <TouchableOpacity onPress={pickImage} >
                                    <Image
                                        source={require('../assets/icons/icons/edit.png')} style={{ resizeMode: "stretch", height: '85%', aspectRatio: 1 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.optionId}>
                                <Text style={styles.textOption}>Identifiant</Text>
                                <TextInput placeholderTextColor='#828288' placeholder='Flady' style={styles.textInputId} />
                            </View>
                            <View style={styles.optionMail}>
                                <Text style={styles.textOption}>Mail</Text>
                                <TextInput placeholderTextColor='#828288' placeholder='emre.kartal@etu.uca.fr' style={styles.textInputMail} />
                            </View>
                        </View>

                        <View style={styles.passwordOption}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleModal}>
                                <View style={styles.passwordIcon}>
                                    <Svg width="14" height="20" viewBox="0 0 14 26" >
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M3.27129 1.75541C4.23026 1.10258 5.34904 0.723459 6.50733 0.658814C7.66563 0.594169 8.81964 0.846441 9.84531 1.38851C10.7879 1.8833 11.593 2.6042 12.1889 3.48739C12.9939 4.70913 13.3604 6.16796 13.2283 7.62511C13.0962 9.08225 12.4733 10.4514 11.4617 11.5084C11.031 11.9508 10.5387 12.3292 9.99839 12.6274L10.1591 14.3578L9.96312 14.9126L9.00438 15.8973L10.5193 17.3723L10.5326 18.3689L9.05762 19.8838L10.5725 21.3588L10.5858 22.3554L7.63588 25.3852L6.63925 25.3985L4.30933 23.13L4.09638 22.6355L3.96398 12.721C3.36598 12.4165 2.82055 12.0182 2.34835 11.5414C1.68473 10.8774 1.17578 10.0751 0.857766 9.19177C0.539757 8.30846 0.420525 7.36587 0.508571 6.4312C0.596616 5.49652 0.88977 4.59278 1.36714 3.78439C1.8445 2.976 2.49533 2.28386 3.27129 1.75541ZM11.8389 7.50421C11.9428 6.36957 11.6584 5.23325 11.0323 4.28134L11.0412 4.28222C10.5801 3.58952 9.95326 3.02302 9.21756 2.63419C8.48185 2.24536 7.66065 2.04653 6.82857 2.05576C5.99649 2.06499 5.1799 2.28199 4.453 2.68704C3.72611 3.0921 3.11195 3.67236 2.66632 4.37512C2.07477 5.33215 1.8204 6.45957 1.94372 7.57788C2.06704 8.69619 2.56095 9.7411 3.34682 10.5462C3.79752 11.0047 4.33268 11.3684 4.92505 11.6127L5.36528 12.2577L5.5017 22.3236L7.1176 23.8969L9.08424 21.8771L7.56933 20.4021L7.55602 19.4055L9.031 17.8905L7.5161 16.4156L7.50279 15.4189L8.72702 14.1616L8.56231 12.2778L8.97256 11.5736C9.52979 11.3206 10.0346 10.9652 10.4608 10.526C11.249 9.70384 11.7349 8.63846 11.8389 7.50421ZM8.25568 5.66411C8.22318 5.47735 8.15334 5.29906 8.05034 5.13991C7.94734 4.98077 7.8133 4.84403 7.65623 4.73789C7.49916 4.63174 7.3223 4.55837 7.13622 4.52216C6.95014 4.48596 6.75867 4.48765 6.57326 4.52716C6.38785 4.56666 6.21232 4.64315 6.05716 4.75206C5.902 4.86098 5.7704 5.00007 5.67024 5.16101C5.57007 5.32196 5.50341 5.50146 5.47422 5.68877C5.44503 5.87608 5.45393 6.06735 5.50038 6.25114C5.58972 6.60469 5.81261 6.90986 6.12222 7.10253C6.43182 7.29521 6.80405 7.3604 7.16071 7.28441C7.51737 7.20843 7.8307 6.99717 8.03488 6.69503C8.23906 6.39289 8.31821 6.02337 8.25568 5.66411Z" fill="white" />
                                    </Svg>
                                </View>
                                <View style={styles.optionView}>
                                    <Text style={styles.textOptionPassword}>Modifier le mot de passe</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.deleteOption}>
                            <View style={styles.buttonDeleteOption}>
                                <Svg width="20" height="22" viewBox="0 0 25 31">
                                    <Path d="M21.4265 16.0194V21.7371V28.4078L19.8044 29.8373H10.6125L21.4265 16.0194Z" fill="#686868" />
                                    <Path d="M9.41089 3.4031V1H15.4186V3.4031" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M21.4264 8.81006V27.4341C21.4264 28.7613 20.3504 29.8372 19.0233 29.8372H5.80618C4.47901 29.8372 3.40308 28.7613 3.40308 27.4341V8.81006" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M1 3.40308H23.8295V5.80618H1V3.40308Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M15.4185 10.7626V26.8333" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M9.41089 10.7626V26.8333" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </View>
                            <TouchableOpacity onPress={() => console.log("Tkt t deconnecter")}>
                                <Text style={styles.textDeleteOption}>Supprimer le compte</Text>
                            </TouchableOpacity>
                        </View>
                        <Modal isVisible={isModalVisible}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalView}>
                                    <TouchableOpacity onPress={handleModal}>
                                        <View>
                                            <Text style={styles.cancelText}>Annuler</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.titlePassword}>Mot de passe</Text>
                                    <TouchableOpacity>
                                        <View>
                                            <Text style={styles.updateText}>Modifier</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.bodyModal}>
                                    <View style={styles.optionModalWithUnderline}>
                                        <Text style={styles.textOptionModal}>Ancien</Text>
                                        <TextInput placeholderTextColor='#828288' placeholder="saisir l'ancien mot de passe" style={styles.textInputOldModal} />
                                    </View>
                                    <View style={styles.optionModalWithUnderline}>
                                        <Text style={styles.textOptionModal}>Nouveau</Text>
                                        <TextInput placeholderTextColor='#828288' placeholder='saisir le mot de passe' style={styles.textInputNewModal} />
                                    </View>
                                    <View style={styles.optionModal}>
                                        <Text style={styles.textOptionModal}>Confirmer</Text>
                                        <TextInput placeholderTextColor='#828288' placeholder='mot de passe' style={styles.textInputConfirmModal} />
                                    </View>
                                </View>
                                <View style={styles.warningView}>
                                    <Text style={styles.warning}>Votre mot de passe doit comporter au moins 8 caractères, dont au moins un chiffre, une majuscule et une minuscule.</Text>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </DismissKeyboard>
    );
};