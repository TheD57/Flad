import Navigation from './Navigation';
import { StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StartNavigation from './StartNavigation';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { getRefreshToken } from '../redux/thunk/authThunk';
import * as Location from 'expo-location';
import { theService } from '../App';
import { getCurrentUserMusic } from '../redux/thunk/spotThunk';
import axios from 'axios';
import Music from '../Model/Music';

// const LOCATION_TASK_NAME = 'flad-background-location-task';

export default function AuthNavigation() {
  //@ts-ignore
  const tokenProcesed: boolean = useSelector(state => state.userReducer.loading);
  // //@ts-ignore
  // const appIsReady: boolean = useSelector(state => state.userReducer.loading);
  //@ts-ignore
  const isLogin: boolean = useSelector(state => state.userReducer.isLogedIn);
  const currentMusic: Music = useSelector(state => state.appReducer.userCurrentMusic);
  const tokenSend: string = useSelector(state => state.userReducer.userFladToken);

  // const userToken : string = useSelector(state => state.userReducer.userFladToken);
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();

  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');


  // // seems background task but not optimized 
  // TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  //   if (error) {
  //     console.log(error);
  //     return;
  //   }
  //   if (data) {
  //     const { locations } = data;
  //     // send location updates to server
  //     console.log(locations);
  //   }
  // });
  // const startLocationUpdates = async () => {
  //   try {
  //     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
  //       accuracy: Location.Accuracy.Balanced,
  //       timeInterval: 5000, // send location updates every 5 seconds
  //       foregroundService: {
  //         notificationTitle: 'Location tracking',
  //         notificationBody: 'Location tracking is active.',
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   startLocationUpdates();
  //   return () => {
  //     Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  //   };
  // }, []);



  useEffect(() => {
    async function prepare() {
      //@ts-ignore
      await dispatch(getRefreshToken())
      if (tokenProcesed && appIsReady) {
        await SplashScreen.hideAsync();
      }      // await SplashScreen.hideAsync();
    }
    prepare();
  }, [appIsReady, tokenProcesed]);

  // const onStackRootView = useCallback(async () => {

  // }, [appIsReady]);
  useEffect(() => {
    
    const sendLocationUpdate = async () => {
      try {
        //@ts-ignore
        await dispatch(getCurrentUserMusic(theService))
        let { status } = await Location.requestForegroundPermissionsAsync();
       
        if (status == 'granted') {
          console.log(appIsReady)
          if (true) {// should app is ready 
            // see deeper the documentation
            // const [status, requestPermission] = Location.useBackgroundPermissions();
            const locationresp = await Location.getCurrentPositionAsync({});
            setLocation(locationresp);
            // send location to server
            console.log(locationresp);
            // if(locationresp !=location ){
              console.log(location);
              const body : Record<string, string | boolean | number | (string | boolean | number)[]> = {
                longitude: locationresp.coords.longitude,
                latitude: locationresp.coords.latitude,
                currentMusic : currentMusic.id 
              }

              console.log(tokenSend)
              console.log('((((((((((((((((((((()))))))))))))))))))))================================###############');
              console.log('((((((((((((((((((((()))))))))))))))))))))================================###############');
              console.log('((((((((((((((((((((())))))))))))))))))))================================###############');
              console.log(location);

              console.log('(((((((((((((((((((()))))))))))))))))))))================================###############'); console.log('((((((((((((((((((((()))))))))))))))))))))================================###############');
              console.log('((((((((((((((((((((()))))))))))))))))))))================================###############');
              console.log('((((((((((((((((((((()))))))))))))))))))))================================###############');
              console.log('**********************************************************************************')
              try {
                const resp = await axios({
                  url: 'https://flad-api-production.up.railway.app/api/users/nextTo',
                  method: 'GET',
                  headers: {
                      Authorization: `Bearer ${tokenSend}`,
                  },
                  params: {
                    longitude: locationresp.coords.longitude,
                    latitude: locationresp.coords.latitude,
                    currentMusic : currentMusic.id 
                  }
                });
                
            console.log('(((((((((((((((((((()))))))))))))))))))))================================###############');
            console.log('((((((((((((((((((((())))))))))))))))))))================================###############');
            console.log(resp.status);
            console.log('**********************************************************************************')
            console.log('**********************************************************************************')
            console.log('**********************************************************************************')

            console.log('((((((((((((((((((((()))))))))))))))))))))================================###############');
            console.log('((((((((((((((((((((()))))))))))))))))))))================================###############');
            console.log(resp);
            console.log(resp.data);
            console.log('((((((((((((((((((((()))))))))))))))))))))================================###############');
            console.log('((((((((((((((((((((()))))))))))))))))))))================================###############');
            console.log('((((((((((((((((((((()))))))))))))))))))))================================###############');
            console.log('=========((((((((((((((((()))))))))))))))))===============================###############');

              } catch (error) {
            console.log('*********************************************************************************************');
            console.log('*********************************************************************************************');
            console.log('********************************************************************************************');
            console.log('*********************************************************************************************');
            console.log('*********************************************************************************************');
            console.log('*********************************************************************************************');
            console.log('*********************************************************************************************');
            console.log(error);
            console.log(error.message);

            console.log('*********************************************************************************************');
            console.log('*********************************************************************************************');
            console.log('*********************************************************************************************');
            console.log('*********************************************************************************************');
            console.log('*********************************************************************************************');
            console.log('*********************************************************************************************');
            console.log('*********************************************************************************************');

                
              }
              

      
            // }
            console.log(locationresp);
            console.log(currentMusic);

            console.log('Sending location update ================================###############');

          }
        }
        else{
          console.log(`Sending location update with error ${status} ================================###############`);
          setErrorMsg('Permission to access location was denied');
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const interval = setInterval(sendLocationUpdate, 5000); // send location updates every 5 seconds
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (tokenProcesed == false) {
    return null;
  }


   

    

  // console.log(userToken, "k9 AuthNav")
  return (
    <SafeAreaProvider onLayout={() => setAppIsReady(true)}>
      {isLogin ? (
        /* {userToken != null ? ( */
        // should set the reference to the function in Navigation to realy perform an on ready
        // test purpose
        <Navigation />
      ) :
        <StartNavigation />
      }
    </SafeAreaProvider>
  )
}
