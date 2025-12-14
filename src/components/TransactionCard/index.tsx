import { View } from 'react-native'
import React from 'react'
import styles from './styles'
import { Text, useTheme } from 'react-native-paper'
import { Transaction } from '../../redux/features/transactions/transactionSlice'
import moment from 'moment'
import { formatMoney } from '../../utils/func'
import FaIcon from 'react-native-vector-icons/FontAwesome5'

interface TransactionCardProps {
  data: Transaction
}

const TransactionCard = ({data}: TransactionCardProps) => {
    const theme: any = useTheme()
    const {merchant, category, transactionDate, amount, type, source, bank} = data

    const amountColor = type === 'debit' ? theme.colors.danger : theme.colors.success
    const amountIcon = type === 'debit' ? 'minus' : 'plus'
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>{merchant || 'Manual'} / {bank || source || 'Unknown'}</Text>
            <Text variant='labelSmall' style={{color: theme.colors.primary}}>{category?.name} | {category?.group}: <Text style={{color: theme.colors.secondary}}>{moment(transactionDate).format('MMM DD, YYYY - h:mm a')}</Text></Text>
        </View>
        <View>
            <Text variant='titleSmall' style={[styles.amount, {color: amountColor}]} ><FaIcon size={15} color={amountColor} name={amountIcon} /> {formatMoney(amount)}</Text>
        </View>
    </View>
  )
}

export default TransactionCard