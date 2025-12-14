import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Text, TextInput, useTheme } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import mainStyles from '../../../styles/styles';
import transactionCategories from '../../../constants/transactionCategories';
import { useDispatch } from 'react-redux';
import { addTransactions, editTransaction } from '../../../redux/features/transactions/transactionSlice';
import Yup, { boolean, number, object, string } from 'yup'

interface AddTransactionFormProps {
    toggleModal: () => void
    data?: any
}

interface Errors {
    category?: string
    type?: string
    amount?: string
}

const AddTransactionForm = ({ toggleModal, data }: AddTransactionFormProps) => {

    const [type, setType] = useState(data?.type || null);
    const [typeOpen, setTypeOpen] = useState(false);
    const [types, setTypes] = useState([
        { label: 'Debit', value: 'debit' },
        { label: 'Credit', value: 'credit' }
    ]);
    const [category, setCategory] = useState(data?.category?.id || null);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categories, setCategories] = useState(
        transactionCategories.map(cat => ({ label: cat.name, value: cat.id }))
    );
    const [amount, setAmount] = useState(data?.amount.toString() || '')
    const [errors, setErrors] = useState<Errors>({})

    const dispatch = useDispatch()

    const theme: any = useTheme()

    const errorStyle = {
        color: theme.colors.danger
    }

    const validationSchema = object({
        amount: number().required().positive(),
        type: string().required(),
        category: object().required(),
        manual: boolean().required(),
        _id: string().required(),
        transactionDate: string().required(),
    })

    const onAddTransaction = async () => {
        const cat = transactionCategories?.find((i: any) => i.id === category)
        const transactionDate = new Date().toISOString()
        const transaction = {
            type,
            category: cat,
            amount: parseFloat(amount) || 0,
            manual: true,
            _id: `manual_${category}_${amount}_${transactionDate}`.trim(),
            transactionDate: transactionDate
        }

        try {
            const isValid = await validationSchema.validate(transaction, {
                abortEarly: false
            })
            if (isValid) {

                dispatch(addTransactions([transaction]))
                setAmount('')
                setType(null)
                setCategory(null)
                toggleModal()
            }
        } catch (error: any) {
            const errors = error.inner.reduce((r: any, e: any) => {
                r = {
                    ...r, ...{
                        [e.path]: e.message
                    }
                }
                return r
            }, {})

            setErrors(errors)

        }

    }

    const onEditTransaction = async () => {
        const cat = transactionCategories?.find((i: any) => i.id === category)
        const transaction = {
            type,
            category: cat,
            amount: parseFloat(amount) || 0,
            manual: true,
            _id: data?._id,
            transactionDate: data?.transactionDate  
        }

        try {
            const isValid = await validationSchema.validate(transaction, {
                abortEarly: false
            })
            if (isValid) {

                dispatch(editTransaction(transaction))
                setAmount('')
                setType(null)
                setCategory(null)
                toggleModal()
            }
        } catch (error: any) {
            const errors = error.inner.reduce((r: any, e: any) => {
                r = {
                    ...r, ...{
                        [e.path]: e.message
                    }
                }
                return r
            }, {})

            setErrors(errors)

        }
    }



    return (
        <View style={[mainStyles.mt5, mainStyles.flex1]}>
            <View style={mainStyles.flex1} >
                <View
                    style={mainStyles.mb1}
                >
                    <DropDownPicker
                        open={typeOpen}
                        value={type}
                        items={types}
                        setOpen={setTypeOpen}
                        setValue={setType}
                        setItems={setTypes}
                        placeholder='Select Type'
                    />
                    {errors?.type ? <Text variant='labelSmall' style={errorStyle} >{errors?.type}</Text> : null}
                </View>
                <View style={mainStyles.mb2}>
                    <TextInput label="Amount" value={amount} mode='outlined' keyboardType='numeric'
                        onChangeText={setAmount}
                    />
                    {errors?.amount ? <Text variant='labelSmall' style={errorStyle} >{errors?.amount}</Text> : null}
                </View>
                <View
                    style={mainStyles.mb2}
                >
                    <DropDownPicker
                        open={categoryOpen}
                        value={category}
                        items={categories}
                        setOpen={setCategoryOpen}
                        setValue={setCategory}
                        setItems={setCategories}
                        placeholder='Select Category'
                    />
                    {errors?.category ? <Text variant='labelSmall' style={errorStyle} >{errors?.category}</Text> : null}
                </View>
            </View>
            <TouchableOpacity onPress={data ? onEditTransaction : onAddTransaction} style={{ backgroundColor: 'blue', padding: 10, alignItems: 'center', borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>{data?._id ? 'Edit' : 'Add'} Transaction</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddTransactionForm