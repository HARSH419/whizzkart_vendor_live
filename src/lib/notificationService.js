import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
import Sound from 'react-native-sound';
import { AcceptedOrderList, GetOrder } from '../actions';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const notificationSould = () => {
  var whoosh = new Sound('ringbell.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        whoosh.getDuration() +
        'number of channels: ' +
        whoosh.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
    whoosh.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
};

// whoosh.release();



function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  } else {
    AlertIOS.alert(msg);
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('fcmToken', fcmToken);

  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('fcmToken1', fcmToken);

        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (e) {
      console.log('err');
    }
  }
};

export const showToaster = (useFor, message) => {
  try {
    Toast.show({
      type: useFor,
      text1: message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMassage => {
    remoteMassage.notification;

    // if(remoteMassage.data.t == '2'){

    //   this.props.navigation.navigate('LoginScreen')
    // }
  });

  messaging().onMessage(async remoteMassage => {
    console.log('foreground', remoteMassage);
    const data = remoteMassage.notification.title;
    // whoosh.play();
    notificationSould()
    showToaster("success",data?.toString())
    AcceptedOrderList(()=>{
      console.log("from notification AcceptedOrderList");
    })
    GetOrder(()=>{
      console.log("from notification GetOrder");
    })
    // notifyMessage(data.toString());
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });

  //
};
