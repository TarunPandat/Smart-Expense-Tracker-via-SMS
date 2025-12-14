declare module 'react-native-get-sms-android' {
  interface SmsFilter {
    box?: 'inbox' | 'sent';
    read?: number;
    address?: string;
    body?: string;
    minDate?: number;
    maxDate?: number;
    indexFrom?: number;
    maxCount?: number;
  }

  const SmsAndroid: {
    list(
      filter: string,
      fail: (error: string) => void,
      success: (count: number, smsList: string) => void
    ): void;
  };

  export default SmsAndroid;
}
