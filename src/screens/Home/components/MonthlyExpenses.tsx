import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { formatMoney } from '../../../utils/func';

interface MonthlyExpensesProps {
  amount?: number;
}

const MonthlyExpenses = ({amount}: MonthlyExpensesProps) => {
  return (
    <View>
      <Text style={styles.amount}>{formatMoney(amount|| 0)}</Text>
      <Text style={styles.label}>Monthly Expenses</Text>
    </View>
  )
}

export default MonthlyExpenses