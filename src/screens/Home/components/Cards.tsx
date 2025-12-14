import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { useTheme } from 'react-native-paper'
import mainStyles from '../../../styles/styles'

interface CardsProps {
    cardLast4Digits?: string;
}

const Cards = ({cardLast4Digits}: CardsProps) => {

    const theme: any = useTheme()
  return (
      <View style={styles.cardWrapper}>
        <View style={[styles.card, {backgroundColor: theme.colors.primary, top: 10, height: 80, left: -10, zIndex: 1}]} />
        <View style={[styles.card, {backgroundColor: theme.colors.lightDanger, top: 0, left: 0, zIndex: 2,}, mainStyles.justifyEnd]} >
            <Text style={{color: theme.colors.white}}>**** **** **** {cardLast4Digits || '****'}</Text>
        </View>
      </View>
  )
}

export default Cards