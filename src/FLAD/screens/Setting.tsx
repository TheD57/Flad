import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity, SafeAreaView } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import normalize from '../components/Normalize';
import { ScrollView, Switch, TextInput } from 'react-native-gesture-handler';
import CardMusic from '../components/CardMusic';
import { ChangeMode, DeleteToken } from '../redux/thunk/authThunk';
import { useSelector } from 'react-redux';
import { GraphicalCharterDark } from '../assets/GraphicalCharterDark';
import { GraphicalCharterLight } from '../assets/GraphicalCharterLight';
import SpotifyService from '../services/spotify/spotify.service';
import { getCurrentUserMusic } from '../redux/thunk/spotThunk';

// @ts-ignore
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export default function Setting() {
    const textInputRef = useRef(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const handleSvgPress = () => {
        //@ts-ignore
        textInputRef.current?.focus();
    };

    const currentMusic = useSelector(state => state.appReducer.userCurrentMusic);

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

    async function ChangeDarkMode() {
        try {
            const currentValue = await AsyncStorage.getItem('dark');
            if (currentValue !== null) {
                const newValue = JSON.stringify(!JSON.parse(currentValue));
                await AsyncStorage.setItem('dark', newValue);
                setIsDark(JSON.parse(newValue));
                dispatch(ChangeMode(JSON.parse(newValue)))
            }
        } catch (error) {
            console.log(`Une erreur s'est produite lors de la mise à jour de la valeur booléenne pour la clé 'dark': `, error);
        }
    }

    //Notification
    const [isCheckedNotif, setIsCheckedNotif] = useState(false);

    const toggleNotif =
        () => setIsCheckedNotif(value => !value);

    //Deconnection
    const Deconnection = () => {
        //@ts-ignore
        dispatch(DeleteToken())
    }
    //Localisation
    const [isCheckedLocalisation, setIsCheckedLocalisation] = useState(false);

    const toggleLocalisation =
        () => setIsCheckedLocalisation(value => !value);

    //Style


    const styles = StyleSheet.create({
        mainSafeArea: {
            flex: 1,
            backgroundColor: style.body,
        },
        container: {
            marginTop: 30,
            marginHorizontal: normalize(25),
            paddingBottom: normalize(400),
            flex: 1,
            backgroundColor: style.body,
        },
        title: {
            fontSize: normalize(30),
            fontWeight: 'bold',
            color: style.Text,
            alignItems: 'center',
        },
        search: {
            paddingVertical: 9,
            backgroundColor: style.Card,
            borderRadius: 13,
            flexDirection: 'row',
            marginTop: 9,
            marginBottom: 22
        },
        inputSearch: {
            placeholderTextColor: 'red',
            color: style.Text,
            width: normalize(350),
        },
        profil: {
            paddingVertical: 9,
            backgroundColor: style.Card,
            borderRadius: 13,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: normalize(45)
        },
        imageProfil: {
            marginLeft: 15,
            marginRight: 7,
            width: 50,
            height: 50
        },
        NameProfil: {
            fontWeight: 'bold',
            color: style.Text,
            fontSize: normalize(22)
        },
        description: {
            color: style.Text,
            fontSize: normalize(15)
        },
        profilContainer: {
            flex: 1,
            marginLeft: 9,
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        buttonSetting: {
            width: normalize(17),
            height: normalize(17),
            marginRight: 22
        },
        body: {
            paddingTop: normalize(10),
            backgroundColor: style.Card,
            borderRadius: 13,
            alignItems: 'flex-start',
            marginBottom: normalize(45),
            paddingLeft: normalize(10),
        },
        view: {
            backgroundColor: '#fe9500',
            padding: 5,
            borderRadius: 10,
            marginLeft: 15,
            marginBottom: normalize(11)
        },
        Option: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        secondOption: {
            marginTop: normalize(11),
            flexDirection: 'row',
            alignItems: 'center',
        },
        textOption: {
            fontSize: normalize(18),
            color: style.Text,
            fontWeight: 'bold',
            marginBottom: normalize(8)
        },
        firstOptionView: {
            flex: 1,
            marginLeft: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: style.Line
        },
        deconnectedOption: {
            paddingVertical: 9,
            paddingLeft: 5,
            backgroundColor: style.Card,
            borderRadius: 13,
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonDeconectedOption: {
            backgroundColor: '#DF0404',
            padding: 5,
            borderRadius: 10,
            marginLeft: 15
        },
        textDeconnectionOption: {
            fontSize: normalize(18),
            color: '#F80404',
            fontWeight: 'bold',
            marginLeft: 12
        },
        notification: {
            backgroundColor: '#fe3c30',
            padding: 5,
            borderRadius: 10,
            marginLeft: 15,
            marginBottom: normalize(11)
        },
        secondOptionView: {
            flex: 1,
            marginLeft: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: style.Line
        },
        lastOptionView: {
            flex: 1,
            marginLeft: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
        },
        localisation: {
            backgroundColor: '#0835A7',
            padding: 5,
            borderRadius: 10,
            marginLeft: 15,
            marginBottom: normalize(11)
        },
        lastOption: {
            marginTop: normalize(11),
            flexDirection: 'row',
            alignItems: 'center',
        },
        musicActually: {
            paddingTop: normalize(17),
            backgroundColor: style.Card,
            borderRadius: 13,
            alignItems: 'flex-start',
            marginBottom: normalize(45)
        },
        titleMusic: {
            flexDirection: 'row',
            marginBottom: 5
        },
        mascot: {
            width: normalize(90),
            height: normalize(90),
            position: 'absolute',
            right: normalize(0),
            top: normalize(10)
        }

    })
    return (
        <DismissKeyboard>
            <SafeAreaView style={styles.mainSafeArea}>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Réglages</Text>
                        <View style={styles.search}>
                            <TouchableOpacity onPress={handleSvgPress}>
                                <Svg width="21" height="21" style={{ marginHorizontal: normalize(10) }} viewBox="0 0 21 21" fill="none">
                                    <Path d="M13.5625 12.25H12.8713L12.6263 12.0137C13.4838 11.0162 14 9.72125 14 8.3125C14 5.17125 11.4537 2.625 8.3125 2.625C5.17125 2.625 2.625 5.17125 2.625 8.3125C2.625 11.4537 5.17125 14 8.3125 14C9.72125 14 11.0162 13.4838 12.0137 12.6263L12.25 12.8713V13.5625L16.625 17.9287L17.9287 16.625L13.5625 12.25ZM8.3125 12.25C6.13375 12.25 4.375 10.4913 4.375 8.3125C4.375 6.13375 6.13375 4.375 8.3125 4.375C10.4913 4.375 12.25 6.13375 12.25 8.3125C12.25 10.4913 10.4913 12.25 8.3125 12.25Z" fill="#828288" />
                                </Svg>
                            </TouchableOpacity>
                            <TextInput placeholderTextColor="#828288" ref={textInputRef} placeholder='Recherche' style={styles.inputSearch}></TextInput>
                            <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <Path d="M13.6563 8.3125V10.0938C13.6563 11.1961 13.2184 12.2532 12.4389 13.0327C11.6595 13.8121 10.6023 14.25 9.5 14.25C8.39769 14.25 7.34054 13.8121 6.56109 13.0327C5.78164 12.2532 5.34375 11.1961 5.34375 10.0938V8.3125H4.15625V10.0938C4.15687 11.4078 4.64161 12.6755 5.51785 13.6547C6.39409 14.6339 7.60038 15.2559 8.90625 15.4019V16.625H6.53125V17.8125H12.4688V16.625H10.0938V15.4019C11.3996 15.2559 12.6059 14.6339 13.4822 13.6547C14.3584 12.6755 14.8431 11.4078 14.8438 10.0938V8.3125H13.6563Z" fill="#828288" />
                                <Path d="M9.5 13.0625C10.2874 13.0625 11.0425 12.7497 11.5992 12.193C12.156 11.6362 12.4688 10.8811 12.4688 10.0938V4.15625C12.4688 3.36889 12.156 2.61378 11.5992 2.05703C11.0425 1.50028 10.2874 1.1875 9.5 1.1875C8.71264 1.1875 7.95753 1.50028 7.40078 2.05703C6.84403 2.61378 6.53125 3.36889 6.53125 4.15625V10.0938C6.53125 10.8811 6.84403 11.6362 7.40078 12.193C7.95753 12.7497 8.71264 13.0625 9.5 13.0625Z" fill="#828288" />
                            </Svg>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('SettingProfil')}>
                            <View style={styles.profil}>
                                <Image source={require('../assets/icons/icons/IconProfil.png')} style={styles.imageProfil} />
                                <View style={styles.profilContainer}>
                                    <Text style={styles.NameProfil}>Emre KARTAL</Text>
                                    <Text style={styles.description}>id. Spotify, mail et mot de passe</Text>
                                </View>
                                <Image style={styles.buttonSetting} source={require('../assets/icons/icons/buttonProfil.png')} />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.body}>
                            <View style={styles.Option}>
                                <View style={styles.view}>
                                    <Svg width="23" height="22" viewBox="0 0 23 18" fill="none">
                                        <Path d="M1 8.63636C1 8.63636 4.81818 1 11.5 1C18.1818 1 22 8.63636 22 8.63636" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <Path d="M1 8.63635C1 8.63635 4.81818 16.2727 11.5 16.2727C18.1818 16.2727 22 8.63635 22 8.63635" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <Path d="M11.4997 11.5C13.0813 11.5 14.3634 10.2179 14.3634 8.63634C14.3634 7.0548 13.0813 5.77271 11.4997 5.77271C9.9182 5.77271 8.63611 7.0548 8.63611 8.63634C8.63611 10.2179 9.9182 11.5 11.4997 11.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </Svg>
                                </View>
                                <View style={styles.firstOptionView}>
                                    <Text style={styles.textOption}>Dark Mode</Text>
                                    <Switch style={{ marginBottom: normalize(10), marginRight: 20 }} value={isDark} onValueChange={ChangeDarkMode} />
                                </View>
                            </View>
                            <View style={styles.secondOption}>
                                <View style={styles.notification}>
                                    <Svg width="23" height="22" viewBox="0 0 1242 1242">
                                        <Path d="M620.553 1181.81C642.27 1181.31 663.11 1173.14 679.388 1158.76C695.665 1144.37 706.331 1124.69 709.498 1103.2H528.159C531.416 1125.28 542.581 1145.42 559.577 1159.88C576.572 1174.34 598.241 1182.13 620.553 1181.81Z" fill="white" />
                                        <Path d="M1132.51 969.785L1120.79 959.443C1087.53 929.815 1058.43 895.838 1034.25 858.43C1007.85 806.806 992.03 750.428 987.712 692.605V522.298C987.572 501.611 985.727 480.971 982.196 460.587C923.799 448.585 871.344 416.77 833.712 370.531C796.079 324.292 775.582 266.468 775.69 206.851C775.69 199.611 775.69 192.371 775.69 185.131C739.695 167.417 701.023 155.769 661.233 150.656V107.217C661.233 95.011 656.384 83.3046 647.752 74.6733C639.121 66.0421 627.415 61.1931 615.208 61.1931C603.002 61.1931 591.295 66.0421 582.664 74.6733C574.033 83.3046 569.184 95.011 569.184 107.217V152.38C480.09 164.948 398.552 209.324 339.622 277.315C280.692 345.307 248.349 432.323 248.565 522.298V692.605C244.247 750.428 228.424 806.806 202.024 858.43C178.266 895.745 149.628 929.716 116.87 959.443L105.149 969.785V1067.01H1132.51V969.785Z" fill="white" />
                                        <Path d="M1034.25 379.226C1129.45 379.226 1206.63 302.051 1206.63 206.851C1206.63 111.65 1129.45 34.4751 1034.25 34.4751C939.053 34.4751 861.878 111.65 861.878 206.851C861.878 302.051 939.053 379.226 1034.25 379.226Z" fill="white" />
                                    </Svg>
                                </View>
                                <View style={styles.secondOptionView}>
                                    <Text style={styles.textOption}>Notification</Text>
                                    <Switch style={{ marginBottom: normalize(10), marginRight: 20 }} value={isCheckedNotif} onValueChange={toggleNotif} />
                                </View>
                            </View>
                            <View style={styles.lastOption}>
                                <View style={styles.localisation}>
                                    <Svg width="24" height="23" viewBox="0 0 472 420" fill="none">
                                        <Path d="M235.735 0C178.774 0 132.601 46.1729 132.601 103.134C132.601 149.184 200.006 233.115 225.83 263.581C231.061 269.752 240.416 269.752 245.639 263.581C271.463 233.115 338.868 149.184 338.868 103.134C338.868 46.1729 292.696 0 235.735 0ZM235.735 137.512C216.745 137.512 201.357 122.124 201.357 103.134C201.357 84.1441 216.745 68.7559 235.735 68.7559C254.724 68.7559 270.112 84.1441 270.112 103.134C270.112 122.124 254.724 137.512 235.735 137.512ZM16.4687 176.76C11.6081 178.704 7.44144 182.06 4.50605 186.394C1.57065 190.729 0.00116411 195.843 0 201.078L0 405.971C0 415.237 9.35571 421.572 17.9584 418.134L130.964 366.698V175.917C123.728 162.837 117.81 150.101 113.57 137.921L16.4687 176.76ZM235.735 294.398C224.218 294.398 213.323 289.34 205.85 280.516C189.758 261.526 172.643 239.901 157.156 217.719V366.69L314.313 419.075V217.727C298.826 239.901 281.719 261.534 265.619 280.524C258.146 289.34 247.251 294.398 235.735 294.398ZM453.511 131.913L340.505 183.349V419.084L455 373.287C459.862 371.344 464.029 367.989 466.964 363.654C469.9 359.319 471.469 354.204 471.469 348.969V144.076C471.469 134.811 462.113 128.475 453.511 131.913Z" fill="white" />
                                    </Svg>

                                </View>
                                <View style={styles.lastOptionView}>
                                    <Text style={styles.textOption}>Localisation</Text>
                                    <Switch style={{ marginBottom: normalize(10), marginRight: 20 }} value={isCheckedLocalisation} onValueChange={toggleLocalisation} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.titleMusic}>
                            <Svg width="32" height="23" viewBox="0 0 28 21">
                                <Path d="M5.84463 0.36924C5.37582 -0.0995746 4.59968 -0.13966 4.10723 0.35111C1.57056 2.8792 0 6.37809 0 10.243C0 14.2583 1.69511 17.8783 4.40753 20.4254C4.90303 20.8906 5.65829 20.8413 6.11707 20.3826C6.65205 19.8476 6.58697 18.9969 6.07118 18.5038C3.89425 16.4228 2.53916 13.4914 2.53916 10.243C2.53916 7.11727 3.79368 4.28541 5.82764 2.22202C6.3189 1.72366 6.36867 0.893273 5.84463 0.36924Z" fill={style.Text} />
                                <Path d="M8.82679 3.35124C8.37113 2.89557 7.6097 2.83865 7.11937 3.32383C5.33696 5.08757 4.23193 7.53654 4.23193 10.2428C4.23193 13.1062 5.46885 15.6811 7.43617 17.4616C7.92997 17.9085 8.65988 17.8396 9.10066 17.3988C9.65615 16.8434 9.55157 15.969 9.03099 15.4783C7.63907 14.1659 6.7711 12.306 6.7711 10.2428C6.7711 8.29502 7.5446 6.52876 8.80209 5.23299C9.28672 4.73363 9.3654 3.88984 8.82679 3.35124Z" fill={style.Text} />
                                <Path d="M18.2575 3.35124C18.7132 2.89557 19.4746 2.83865 19.965 3.32383C21.7473 5.08757 22.8524 7.53654 22.8524 10.2428C22.8524 13.1062 21.6154 15.6811 19.6481 17.4616C19.1543 17.9085 18.4244 17.8396 17.9836 17.3988C17.4282 16.8434 17.5326 15.969 18.0533 15.4783C19.4453 14.1659 20.3132 12.306 20.3132 10.2428C20.3132 8.29502 19.5398 6.52876 18.2822 5.23299C17.7976 4.73363 17.7188 3.88984 18.2575 3.35124Z" fill={style.Text} />
                                <Path d="M21.2398 0.36924C21.7087 -0.0995746 22.4849 -0.13966 22.9773 0.35111C25.5139 2.8792 27.0845 6.37809 27.0845 10.243C27.0845 14.2583 25.3893 17.8783 22.677 20.4254C22.1815 20.8906 21.4262 20.8413 20.9675 20.3826C20.4324 19.8476 20.4975 18.9969 21.0133 18.5038C23.1902 16.4228 24.5453 13.4914 24.5453 10.243C24.5453 7.11727 23.2908 4.28541 21.2567 2.22202C20.7655 1.72366 20.7157 0.893273 21.2398 0.36924Z" fill={style.Text} />
                                <Path d="M13.5422 7.70361C12.1399 7.70361 11.0031 8.84043 11.0031 10.2428C11.0031 11.6451 12.1399 12.7819 13.5422 12.7819C14.9445 12.7819 16.0814 11.6451 16.0814 10.2428C16.0814 8.84043 14.9445 7.70361 13.5422 7.70361Z" fill={style.Text} />
                            </Svg>
                            <Text style={[styles.textOption, { marginLeft: 10 }]}>En cours d’écoute...</Text>
                        </View>

                        <View style={styles.musicActually}>
                            <CardMusic image="{currentMusic.image}" title="{currentMusic.title}" description="PNL" />
                            <Image source={require("../assets/images/FladyShadow.png")} style={styles.mascot} />
                        </View>

                        <View style={styles.deconnectedOption}>
                            <View style={styles.buttonDeconectedOption}>
                                <Svg width="23" height="24" viewBox="0 0 23 24">
                                    <Path d="M4.36916 23.102C4.03419 23.102 3.71379 22.9855 3.43707 22.7671L0.5243 20.3349C0.360787 20.2004 0.229004 20.0315 0.138369 19.8401C0.0477338 19.6488 0.000485206 19.4398 0 19.2281L0 3.87773C0 3.44081 0.18933 3.03302 0.5243 2.75631L3.43707 0.324142C3.87399 -0.0253914 4.47111 -0.0982107 4.98085 0.134811C5.23365 0.251805 5.44759 0.438845 5.59731 0.673748C5.74703 0.908652 5.82624 1.18157 5.82555 1.46012V21.6602C5.82624 21.9388 5.74703 22.2117 5.59731 22.4466C5.44759 22.6815 5.23365 22.8685 4.98085 22.9855C4.79152 23.0583 4.57306 23.102 4.36916 23.102ZM17.4767 15.9221V7.18373C17.4767 6.52835 18.2631 6.20795 18.7146 6.67399L22.574 10.5334C23.142 11.1014 23.142 12.0189 22.574 12.5869L18.7146 16.4463C18.6119 16.547 18.4817 16.615 18.3405 16.6418C18.1992 16.6686 18.0532 16.6529 17.9208 16.5969C17.7885 16.5408 17.6756 16.4468 17.5966 16.3267C17.5175 16.2066 17.4758 16.0658 17.4767 15.9221Z" fill="white" />
                                    <Path d="M5.09735 3.54297H13.1075C13.5153 3.54297 13.8357 3.86337 13.8357 4.27116V7.91213M5.09735 19.5632H13.1075C13.5153 19.5632 13.8357 19.2428 13.8357 18.835V15.1941M21.8458 11.5531H10.1947" stroke="white" stroke-linecap="round" />
                                </Svg>
                            </View>
                            <TouchableOpacity onPress={() => Deconnection()}>
                                <Text style={styles.textDeconnectionOption}>Se deconnecter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </DismissKeyboard>
    );
};
