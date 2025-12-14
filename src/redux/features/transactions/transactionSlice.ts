import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TransactionCategory {
  id: number;
  name: string;
  group: string;
}

export type TransactionType = 'debit' | 'credit';

export interface Transaction {
  _id: number;
  thread_id: number;
  date_sent: number; // timestamp (ms)
  protocol: number;
  read: number;
  status: number;
  type: TransactionType;

  reply_path_present: number;
  locked: number;
  sub_id: number;
  error_code: number;

  creator: string;
  seen: number;

  amount: number;
  currency: string; // e.g. 'INR'
  bank: string;
  accountLastDigits: string;
  merchant: string;
  availableBalance: number | null;

  transactionDate: string; // ISO string
  date: string;            // ISO string

  rawText: string;
  raw: string;
  source: string;

  category: TransactionCategory;
}


export interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
}

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransactions: (state, action: PayloadAction<any>) => {
      state.transactions = [...action.payload, ...state.transactions, ];
    },
    deleteTransaction: (state, action: PayloadAction<any>) => {
      let trans = [...state.transactions]
      let indexToDel = trans.findIndex((i) => i?._id === action?.payload)
      trans.splice(indexToDel, 1)
      state.transactions = trans
    },
    editTransaction: (state, action: PayloadAction<any>) => {
      const {_id, amount, category, type} = action?.payload
      let transList = [...state.transactions]
      let indexToEdit = transList.findIndex((i) => i?._id === _id)
      transList[indexToEdit] = {...transList[indexToEdit], amount, category, type }
      state.transactions = transList
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTransactions, deleteTransaction, editTransaction } = transactionSlice.actions

export default transactionSlice.reducer