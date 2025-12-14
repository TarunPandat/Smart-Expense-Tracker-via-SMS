import { Alert, FlatList, RefreshControl, View } from 'react-native'
import React from 'react'
import mainStyles from '../../../styles/styles'
import TransactionCard from '../../../components/TransactionCard'
import HeaderRight from '../../../components/Header/HeaderRight'
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Header from '../../../components/Header'
import AddTransation from '../components/AddTransation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Badge, Text, useTheme } from 'react-native-paper'
import { Colors } from '../../../constants'
import { getSmsMessages, latestTransaction } from '../../../services/sms/readSms'
import { addTransactions, deleteTransaction } from '../../../redux/features/transactions/transactionSlice'
import { SwipeListView } from 'react-native-swipe-list-view'
import Filters from '../components/Filters'
import { filterTransactions } from '../../../utils/func'

const Transactions = () => {

  const { transactions } = useSelector((state: RootState) => state.transactions)

  const [modal, setModal] = React.useState({
    isVisible: false,
    data: null
  });

  const [filterModal, setFilterModal] = React.useState<any>({
    isVisible: false,
    data: null,
  })

  const [refreshing, setRefreshing] = React.useState(false)

  const dispatch = useDispatch()

  const theme: any = useTheme()

  const fetchMessages = async () => {
    setRefreshing(true)
    const messages = await getSmsMessages()
    const filterdTransactions = latestTransaction(messages, transactions);

    dispatch(addTransactions(filterdTransactions));
    setRefreshing(false)
  }

  const onPressAdd = () => {
    setModal({ ...modal, isVisible: true, data: null })
  }

  const countFilters = React.useMemo(() => {
    const filters: any = {...filterModal?.data}
    let list = Object.keys(filters)
    const count = list.reduce((r, i) => {
      r+=filters[i].length
      return r
    }, 0)

    return count

  }, [filterModal?.data])

  const HeaderR = () => (
    <View style={[mainStyles.row, mainStyles.alignCenter]}>
     <View>
        {countFilters ? <Badge style={{position: 'absolute', left: 10, zIndex: 2}} size={15} >{countFilters}</Badge>: null}
       <FaIcon size={20} name="filter" color={theme.colors.white} style={mainStyles.mr3} onPress={() => setFilterModal({ ...filterModal, isVisible: true })} />
     </View>
      <HeaderRight iconName='plus' Icon={FaIcon} onPress={onPressAdd} />
    </View>
  )

  const onEdit = (rowMap: any, data: any) => {
    if (!data?.item?.manual) {
      Alert.alert('Edit error', 'Can not edit this transaction. Only manual transaction can be edited.')
      rowMap[data.item?.key].closeRow()
    }
    else {
      setModal({ ...modal, isVisible: true, data: data?.item })
      rowMap[data.item?.key].closeRow()
    }
  }

  const onDelete = (rowMap: any, data: any) => {
    if (!data?.item?.manual) {
      Alert.alert('Delete error', 'Can not delete this transaction. Only manual transaction can be deleted.')
      rowMap[data.item?.key].closeRow()
    }
    else {
      dispatch(deleteTransaction(data?.item?._id))
      rowMap[data.item?.key].closeRow()
    }

  }

  const filterdTransactions = React.useMemo(() => {
    return filterTransactions(transactions, filterModal?.data)
  }, [filterModal?.data, transactions])

  const data = React.useMemo(() => {
    return filterdTransactions.map((i, _) => ({ ...i, key: _ }))
  }, [filterdTransactions])

  const setFilterData = (data: any) => {
    setFilterModal({ ...filterModal, data })
  }


  return (
    <View style={mainStyles.flex1}>
      <Header title='All Transations' backButton headerRight={HeaderR} />
      <SwipeListView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchMessages} />}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        data={data}
        renderItem={({ item }) => (
          <TransactionCard data={item} />
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={[mainStyles.row, mainStyles.spaceBetween, mainStyles.alignCenter]} >
            <FaIcon size={25} name="pencil" color={theme.colors.primary} style={[mainStyles.mt4, mainStyles.ml4]} onPress={() => onEdit(rowMap, data)} />

            <FaIcon size={25} name="trash" color={theme.colors.danger} style={[mainStyles.mt4, mainStyles.mr4]} onPress={() => onDelete(rowMap, data)} />
          </View>
        )}
        ListEmptyComponent={() => (<View style={[mainStyles.alignCenter, mainStyles.mb2]}>
          <Text variant='labelSmall' style={{ color: theme.colors.secondary }} >No transaction found</Text>
        </View>)}
      />
      <AddTransation isVisible={modal.isVisible} data={modal?.data} toggleModal={() => setModal({ ...modal, isVisible: !modal.isVisible })} />
      <Filters isVisible={filterModal.isVisible} toggleModal={() => setFilterModal({ ...filterModal, isVisible: !filterModal?.isVisible })} setFilterData={setFilterData} />
    </View>
  )
}

export default Transactions