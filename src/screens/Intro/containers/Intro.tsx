import { View, Text } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import { slides } from '../contants/slides';
import { useNavigation } from '@react-navigation/native';


const Intro = () => {

    const {navigate}: any = useNavigation();

    const renderItem = ({item}: {item: any}) => {
        return (
            <View key={item?.key} style={{flex: 1, backgroundColor: item.backgroundColor, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20}}>{item.title}</Text>
                <Text style={{fontSize: 16, color: '#fff', textAlign: 'center', marginHorizontal: 20}}>{item.text}</Text>
            </View>
        )
    }

    const onDone = () => {
        navigate('Home' as never);
    }

  return (
    <AppIntroSlider data={slides} renderItem={renderItem} onDone={onDone} />
  )
}

export default Intro