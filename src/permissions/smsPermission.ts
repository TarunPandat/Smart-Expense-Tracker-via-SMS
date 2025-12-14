import { PermissionsAndroid, Platform, Linking, Alert } from 'react-native';

export async function requestSmsPermission() {
  if (Platform.OS !== 'android') return false;

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_SMS
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    Alert.alert(
      'Permission Required',
      'Please enable SMS permission from settings to detect bank transactions.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
      ]
    );
  }

  return false;
}

export async function checkSmsPermission() {
  if (Platform.OS !== 'android') return false;

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_SMS
  );

  return hasPermission;
}

export async function requestNotificationPermission() {
  if (Platform.OS !== 'android') return true;

  if (Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Notification Access',
        message: 'Allow notifications to track your bank transactions',
        buttonPositive: 'Allow',
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  return true;
}
