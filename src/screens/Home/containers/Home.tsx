import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import BalanceCard from '../components/BalanceCard';
import mainStyles from '../../../styles/styles';
import MonthlyExpenses from '../components/MonthlyExpenses';
import ExpensesChart from '../../../components/ExpenseChart';
import TransactionCard from '../../../components/TransactionCard';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../routes';
import { checkSmsPermission, requestSmsPermission } from '../../../permissions/smsPermission';
import { categoryChartData, getMonthlyAnalytics, getSmsMessages, latestTransaction } from '../../../services/sms/readSms';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTransactions } from '../../../redux/features/transactions/transactionSlice';


const Home = () => {

  const [refreshing, setRefreshing] = React.useState(false)

  const theme: any = useTheme();
  const { navigate }: any = useNavigation();

  const { transactions } = useSelector((state: RootState) => state.transactions); // Placeholder for useSelector
  const dispatch = useDispatch();

  const goToAllTransactions = () => {
    navigate(RouteNames.Transaction);
  }

  const handlePermission = async () => {
    const permission = await checkSmsPermission()

    if (!permission) {
      console.log('SMS permission not granted');
      await requestSmsPermission()
      fetchMessages()
    }
    else {
      fetchMessages()
    }

  }


  const fetchMessages = async () => {
    setRefreshing(true)
    const messages = await getSmsMessages()
    const filterdTransactions = latestTransaction(messages, transactions);

    dispatch(addTransactions(filterdTransactions));
    setRefreshing(false)
  }

  const analytics = React.useMemo(() => {
    return getMonthlyAnalytics(transactions)
  }, [transactions]);
  const expensesData = React.useMemo(() => {
    return categoryChartData(analytics?.spentByCategory || {})
  }, [transactions]);

  React.useEffect(() => {
    handlePermission()
  }, []);

  const recentFiveTransaction = React.useMemo(() => {
    return transactions.slice(0, 5)
  }, [transactions])

  return (
    <ScrollView style={mainStyles.flex1} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchMessages} />} >
      <BalanceCard totalBalance={analytics?.balance} accountLastDigits={transactions[0]?.accountLastDigits} />
      <View style={[mainStyles.p2, mainStyles.spaceBetween]} >
        {expensesData?.length ? <ExpensesChart expensesData={expensesData} /> : null}
        <View style={mainStyles.alignCenter}>
          <MonthlyExpenses amount={analytics?.totalSpent} />
        </View>
      </View>
      <View style={mainStyles.mt2}>
        <Text variant='labelMedium' style={{ color: theme.colors.white, fontSize: 16 }}>Recent Transaction</Text>
        {recentFiveTransaction.map((item) => (
          <View key={item?._id} style={mainStyles.mt2}>
            <TransactionCard data={item} />
          </View>
        ))}
      </View>
      {transactions?.length > 5 ? <View>
        <TouchableOpacity style={[mainStyles.alignCenter, mainStyles.p3]} onPress={goToAllTransactions}>
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>See All Transactions</Text>
        </TouchableOpacity>
      </View> : null}
      {!transactions?.length ? <View style={[mainStyles.alignCenter, mainStyles.mb2]}>
        <Text variant='labelSmall' style={{ color: theme.colors.secondary }} >No transaction found</Text>
      </View> : null}
    </ScrollView>
  )
}

export default Home