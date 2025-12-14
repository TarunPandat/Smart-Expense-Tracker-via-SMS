import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { useTheme } from 'react-native-paper'
import Cards from './Cards'
import mainStyles from '../../../styles/styles'
import { formatMoney } from '../../../utils/func';

interface BalanceCardProps {
  totalBalance?: number;
  accountLastDigits?: string;
}

const BalanceCard = ({totalBalance, accountLastDigits}: BalanceCardProps) => {
  const theme = useTheme()
  return (
    <View style={styles.balanceCard}>
      <View style={[mainStyles.flex1, mainStyles.justifyCenter, mainStyles.pl3]}>
        <Text style={styles.label}>Total Balance</Text>
        <Text style={styles.amount}>{formatMoney(totalBalance || 0.00)}</Text>
      </View>
      <View style={[mainStyles.flex1]}>
        <Cards cardLast4Digits={accountLastDigits} />
      </View>
    </View>
  )
}

export default BalanceCard