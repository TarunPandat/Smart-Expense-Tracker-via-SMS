import TransactionCategories from '../../constants/transactionCategories'
import BANKS from '../../constants/banks'

interface Filters {
    name: string,
    list: any[]
}

export const filters: Filters[] = [
    {name: 'Bank', list: BANKS},
    {name: 'Category', list: TransactionCategories},
    {name: 'Date', list: ['from', 'to']}
]