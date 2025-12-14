import { Alert, ScrollView, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from 'react-native-paper'
import Modal from 'react-native-modal'
import { SafeAreaView } from 'react-native-safe-area-context';
import mainStyles from '../../../styles/styles';
import Text from '../../../components/Text'
import styles from './styles'
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import FaIcon6 from 'react-native-vector-icons/FontAwesome6';
import { filters } from '../constant'
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

interface FiltersProps {
    isVisible: boolean,
    data?: null | any,
    toggleModal: () => void,
    setFilterData: (data: any) => void
}

const Filters = ({ isVisible, toggleModal, data, setFilterData }: FiltersProps) => {
    const { height } = useWindowDimensions();
    const [selectedFilter, setSelectedFilter] = useState<string>('Bank')

    const [filtersSelected, setFiltersSelected] = useState<{ bank: any[], categories: any[], date: { from: any, to: any } }>({
        bank: [],
        categories: [],
        date: {
            from: null,
            to: null
        }
    })
    const [date, setDate] = useState({
        from: { isOpen: false, val: null },
        to: { isOpen: false, val: null }
    })

    const theme: any = useTheme()

    const list = React.useMemo(() => {
        return filters.find((i) => i?.name === selectedFilter)?.list || []
    }, [selectedFilter])

    const onSelectFilter = (data: any) => {
        if (selectedFilter === 'Bank') {
            let bank = [...filtersSelected?.bank]
            let indexOfFilter = bank.findIndex((i: any) => i?.code === data?.code)
            if (indexOfFilter === -1) {
                bank.push(data)
            }
            else {
                bank.splice(indexOfFilter, 1)
            }
            setFiltersSelected({ ...filtersSelected, bank })
        }
        else {
            let cat = [...filtersSelected?.categories]
            let indexOfFilter = cat.findIndex((i: any) => i?.id === data?.id)
            if (indexOfFilter === -1) {
                cat.push(data)
            }
            else {
                cat.splice(indexOfFilter, 1)
            }
            setFiltersSelected({ ...filtersSelected, categories: cat })
        }
    }

    const onApplyDate = () => {
        if (date?.from?.val && date?.to?.val) {
            setFiltersSelected({
                ...filtersSelected, date: {
                    from: `${date?.from?.val}`,
                    to: `${date?.to?.val}`,
                }
            })
        }
        else {
            Alert.alert('Please select both dates')
        }
    }
    const onClearDate = () => {
        setFiltersSelected({
            ...filtersSelected, date: {
                from: null,
                to: null,
            }
        })
        setDate({
            from: { isOpen: false, val: null },
            to: { isOpen: false, val: null }
        })
    }

    const clearAllFilters = () => {
        setFiltersSelected({
            bank: [],
            categories: [],
            date: {
                from: null,
                to: null
            }
        })
        setDate({
            from: { isOpen: false, val: null },
            to: { isOpen: false, val: null }
        })
    }

    React.useEffect(() => {
        setFilterData(filtersSelected)
    }, [filtersSelected])

    return (
        <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
            <SafeAreaView style={[{ height: height * 0.9, backgroundColor: theme.colors.dark, borderRadius: 10 }, mainStyles.p3]}>
                <View style={[mainStyles.row, mainStyles.spaceBetween]}>
                    <Text variant='labelLarge' style={mainStyles.mb4} >Filters</Text>
                    <FaIcon name="times" size={20} onPress={toggleModal} color={theme.colors.white} />
                </View>
                <View style={mainStyles.flex1}>
                    <View style={[mainStyles.row, mainStyles.flex1]} >
                        <View style={[mainStyles.flex1, styles.filterHeaderWrapper]}>
                            {filters.map((filter) => (
                                <View key={filter.name} style={mainStyles.mb5} >
                                    <TouchableOpacity onPress={() => setSelectedFilter(filter?.name)} >
                                        <Text>{filter?.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <View style={mainStyles.mb5} >
                                <TouchableOpacity onPress={clearAllFilters} >
                                    <Text style={{ color: theme.colors.primary }} >Clear filters</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {selectedFilter === 'Date' ? <View style={[mainStyles.flex2, mainStyles.pl2]}>
                            <TouchableOpacity onPress={() => setDate({ ...date, from: { ...date.from, isOpen: true } })} style={mainStyles.mb5} >
                                <Text variant='labelMedium'>From</Text>
                                <Text>{date?.from?.val ? moment(date?.from?.val).format('DD, MMM, YY') : 'Select date'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setDate({ ...date, to: { ...date.to, isOpen: true } })} style={mainStyles.mb5}>
                                <Text variant='labelMedium'>To</Text>
                                <Text>{date?.to?.val ? moment(date?.to?.val).format('DD, MMM, YY') : 'Select date'}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                open={date?.from?.isOpen}
                                date={date?.from?.val || new Date()}
                                onConfirm={(val: any) => {
                                    setDate({ ...date, from: { ...date.from, val, isOpen: false } })
                                }}
                                onCancel={() => {
                                    setDate({ ...date, from: { ...date.from, isOpen: false } })
                                }}
                            />
                            <DatePicker
                                modal
                                open={date?.to?.isOpen}
                                date={date?.to?.val || new Date()}
                                onConfirm={(val: any) => {
                                    setDate({ ...date, to: { ...date.to, val, isOpen: false } })
                                }}
                                onCancel={() => {
                                    setDate({ ...date, to: { ...date.from, isOpen: false } })
                                }}
                            />
                            <View style={[mainStyles.row, mainStyles.spaceBetween, mainStyles.alignCenter, mainStyles.ml5, mainStyles.mr5]} >
                                <TouchableOpacity onPress={onApplyDate} >
                                    <Text color={theme.colors.primary}>Apply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onClearDate} >
                                    <Text color={theme.colors.secondary}>Clear</Text>
                                </TouchableOpacity>
                            </View>
                        </View> : selectedFilter ? <View style={[mainStyles.flex2, mainStyles.pl2]}>
                            <ScrollView>
                                {list?.map((item) => (
                                    <TouchableOpacity onPress={() => onSelectFilter(item)} key={item?.code || item?.id.toString()} style={[mainStyles.row, mainStyles.mb5, mainStyles.alignCenter]} >
                                        {
                                            filtersSelected?.bank.includes(item) || filtersSelected?.categories.includes(item) ?
                                                <FaIcon6 name="square-check" size={20} color={theme.colors.white} style={mainStyles.mr2} />
                                                : <FaIcon name="square" size={20} color={theme.colors.white} style={mainStyles.mr2} />
                                        }
                                        <Text>{item?.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View> : null}
                    </View>

                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default Filters
