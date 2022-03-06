import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, ToastAndroid} from 'react-native';

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
        console.log('fcmToken', fcmToken);

        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (e) {
      console.log('err');
    }
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
    notifyMessage(data.toString());
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
