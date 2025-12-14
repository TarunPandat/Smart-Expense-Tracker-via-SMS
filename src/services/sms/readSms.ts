//ts-ignore
import SmsAndroid from 'react-native-get-sms-android';
import transactionCategories from '../../constants/transactionCategories';
import { Transaction } from '../../redux/features/transactions/transactionSlice';
import BANKS from '../../constants/banks';

export function getSmsMessages() {
    return new Promise<any[]>((resolve, reject) => {
        SmsAndroid.list(
            JSON.stringify({
                box: 'inbox',
                maxCount: 500,
            }),
            (fail: any) => {
                console.log('====================================');
                console.log('fail: ', fail);
                console.log('====================================');
            },
            (count: any, smsList: any) => {
                const messages = JSON.parse(smsList);
                resolve(messages);
            }
        );
    });
}

export function parseTransactionSMS(msg: any) {
    const { body = '', address = '', date, ...msgData } = msg;

    const text = body.replace(/\n/g, ' ').trim();

    // 1️⃣ Transaction type
    const isCredit = /(credited|received|deposit)/i.test(text);
    const isDebit = /(debited|spent|withdrawn|paid)/i.test(text);

    if (!isCredit && !isDebit) return null;

    const transactionType = isDebit ? 'debit' : 'credit';

    // 2️⃣ Amount
    const amountMatch =
        text.match(/(?:₹|rs\.?|inr)\s?([\d,]+(\.\d{1,2})?)/i);

    const amount = amountMatch
        ? parseFloat(amountMatch[1].replace(/,/g, ''))
        : null;

    // 3️⃣ Available Balance
    const balanceMatch =
        text.match(/(?:avl bal|available balance|avl\.?\s*bal)\s*[:\-]?\s*(?:₹|rs\.?|inr)\s?([\d,]+(\.\d{1,2})?)/i);

    const availableBalance = balanceMatch
        ? parseFloat(balanceMatch[1].replace(/,/g, ''))
        : null;

    // 4️⃣ Bank Name
    const bank = extractBank(body)

    // 5️⃣ Account Number (last digits)
    const accountMatch =
        text.match(/A\/c\s*(?:XX+)?(\d{2,6})/i) ||
        text.match(/Account\s*(?:XX+)?(\d{2,6})/i);

    const accountLastDigits = accountMatch ? accountMatch[1] : null;

    // 6️⃣ Transaction Date (SAFE parsing)
    const transactionDate = new Date(date).toISOString();

    // 7️⃣ Merchant / Source
    const merchant = extractMerchant(body)

    // 8️⃣ Currency
    const currency = /₹|rs\.?|inr/i.test(text) ? 'INR' : 'Unknown';

    const category = getCategory(body);

    return {
        ...msgData,
        type: transactionType,
        amount,
        currency,
        bank,
        accountLastDigits,
        merchant,
        availableBalance,
        transactionDate,
        rawText: body,
        source: address,
        category,
    };
}



export function getCategory(text: string) {
    const t = text.toLowerCase();

    const match = (keywords: string[]) =>
        keywords.some(k => t.includes(k));

    // -------- Income --------
    if (match(['salary', 'payroll'])) {
        return transactionCategories.find(c => c.name === 'Salary');
    }

    if (match(['freelance', 'consulting', 'service income'])) {
        return transactionCategories.find(c => c.name === 'Freelancing');
    }

    if (match(['refund', 'reversal'])) {
        return transactionCategories.find(c => c.name === 'Refunds');
    }

    if (match(['interest credited', 'interest'])) {
        return transactionCategories.find(c => c.name === 'Interest Income');
    }

    // -------- Essential Expenses --------
    if (match(['zomato', 'swiggy', 'grocery', 'bigbasket', 'dmart'])) {
        return transactionCategories.find(c => c.name === 'Food & Groceries');
    }

    if (match(['petrol', 'diesel', 'fuel', 'hpcl', 'bpcl', 'ioc'])) {
        return transactionCategories.find(c => c.name === 'Gas / Fuel');
    }

    if (match(['electricity', 'power bill'])) {
        return transactionCategories.find(c => c.name === 'Electricity Bill');
    }

    if (match(['water bill', 'municipal'])) {
        return transactionCategories.find(c => c.name === 'Water Bill');
    }

    if (match(['rent', 'mortgage'])) {
        return transactionCategories.find(c => c.name === 'Rent / Mortgage');
    }

    if (match(['emi', 'loan installment'])) {
        return transactionCategories.find(c => c.name === 'EMI / Loan Payment');
    }

    if (match(['internet', 'wifi', 'broadband'])) {
        return transactionCategories.find(c => c.name === 'Internet & Wi-Fi');
    }

    if (match(['mobile bill', 'recharge', 'airtel', 'jio', 'vi'])) {
        return transactionCategories.find(c => c.name === 'Mobile Recharge / Phone Bill');
    }

    if (match(['uber', 'ola', 'metro', 'bus', 'rail', 'flight'])) {
        return transactionCategories.find(c => c.name === 'Transportation / Travel');
    }

    if (match(['insurance', 'premium'])) {
        return transactionCategories.find(c => c.name === 'Insurance (Health / Vehicle / Life)');
    }

    // -------- Lifestyle --------
    if (match(['amazon', 'flipkart', 'myntra', 'shopping'])) {
        return transactionCategories.find(c => c.name === 'Shopping');
    }

    if (match(['movie', 'netflix', 'prime', 'spotify', 'hotstar'])) {
        return transactionCategories.find(c => c.name === 'Entertainment');
    }

    if (match(['restaurant', 'cafe', 'dining'])) {
        return transactionCategories.find(c => c.name === 'Dining Out');
    }

    if (match(['gym', 'fitness', 'cult', 'yoga'])) {
        return transactionCategories.find(c => c.name === 'Health & Fitness');
    }

    if (match(['medicine', 'pharmacy', 'hospital', 'doctor'])) {
        return transactionCategories.find(c => c.name === 'Medicine / Healthcare');
    }

    if (match(['school', 'college', 'course', 'tuition'])) {
        return transactionCategories.find(c => c.name === 'Education');
    }

    if (match(['salon', 'spa', 'personal care'])) {
        return transactionCategories.find(c => c.name === 'Personal Care');
    }

    if (match(['subscription', 'auto debit'])) {
        return transactionCategories.find(c => c.name === 'Subscriptions');
    }

    // -------- Financial --------
    if (match(['bank charge', 'service charge', 'penalty'])) {
        return transactionCategories.find(c => c.name === 'Bank Charges');
    }

    if (match(['credit card payment', 'cc payment'])) {
        return transactionCategories.find(c => c.name === 'Credit Card Payment');
    }

    if (match(['investment', 'sip'])) {
        return transactionCategories.find(c => c.name === 'Investments');
    }

    if (match(['saving', 'deposit'])) {
        return transactionCategories.find(c => c.name === 'Savings');
    }

    if (match(['mutual fund', 'stock', 'equity'])) {
        return transactionCategories.find(c => c.name === 'Mutual Funds / Stocks');
    }

    if (match(['tax', 'gst', 'income tax'])) {
        return transactionCategories.find(c => c.name === 'Tax Payment');
    }

    // -------- Home & Utilities --------
    if (match(['lpg', 'gas cylinder'])) {
        return transactionCategories.find(c => c.name === 'Gas Cylinder / LPG');
    }

    if (match(['maintenance', 'society'])) {
        return transactionCategories.find(c => c.name === 'Maintenance');
    }

    if (match(['household', 'utensil'])) {
        return transactionCategories.find(c => c.name === 'Household Items');
    }

    if (match(['repair', 'service'])) {
        return transactionCategories.find(c => c.name === 'Repair & Service');
    }

    // -------- Misc --------
    if (match(['gift'])) {
        return transactionCategories.find(c => c.name === 'Gifts');
    }

    if (match(['donation', 'charity'])) {
        return transactionCategories.find(c => c.name === 'Charity / Donation');
    }

    return transactionCategories.find(c => c.name === 'Unknown Category');
}

function groupTransactionsBySource(transactions: Transaction[]) {
  return transactions.reduce((acc: any, txn: any) => {
    const source = txn.source || 'Unknown';

    if (!acc[source]) {
      acc[source] = [];
    }

    acc[source].push(txn);

    return acc;
  }, {});
}

function pickBeforeIndexes(arrays: any[], indexes: any[]) {
  return arrays.map((arr, i) => indexes[i] === -1 ? arr : arr.slice(0, indexes[i]));
}



const getTotalBalance = (trans: any[]) => {
  const grouped: any[] = groupTransactionsBySource(trans)
  const lastIndexs: any[] = []
  const avlBal = Object.keys(grouped).reduce((r: any, i: any) => {
    lastIndexs.push(grouped[i].findIndex((i: any) => i?.availableBalance))
    const filterAvlBal = grouped[i].find((i: any) => i?.availableBalance)?.availableBalance || 0
    if(filterAvlBal) r+= filterAvlBal
    return r
  }, 0)
  
  const allTransByArr = Object.keys(grouped).reduce((r: any, i: any) => {
    r.push(grouped[i])
    return r
  } ,[])
  const allTransToCal = pickBeforeIndexes(allTransByArr, lastIndexs)
  const flatAllTransToCal = allTransToCal.reduce((r, i) => r = [...r, ...i] ,[])

  
  let totalBalnce = avlBal
 flatAllTransToCal.forEach((tx: any) => {

   if(tx?.type === 'debit') {
     totalBalnce-= tx.amount
   }
   else totalBalnce+= tx.amount
 })
  
  
  return totalBalnce
}




function isSameMonth(dateStr: string, year: number, month: number) {
    const d = new Date(dateStr);
    return d.getFullYear() === year && d.getMonth() === month;
}

export function getMonthlyAnalytics(
  transactions: any[],
  year = new Date().getFullYear(),
  month = new Date().getMonth()
) {
  let totalSpent = 0;
  let totalIncome = 0;

  const spentByCategory: Record<string, number> = {};

  /**
   * accountKey => {
   *   baseBalance: number | null,
   *   baseDate: Date | null,
   *   adjustments: number
   * }
   */
  const accountMap: Record<
    string,
    { baseBalance: number | null; baseDate: Date | null; adjustments: number }
  > = {};

  // transactions are already sorted latest → oldest
  for (const txn of transactions) {
    if (!isSameMonth(txn.transactionDate, year, month)) continue;

    const accountKey = `${txn.bank}-${txn.accountLastDigits}`;

    if (!accountMap[accountKey]) {
      accountMap[accountKey] = {
        baseBalance: null,
        baseDate: null,
        adjustments: 0,
      };
    }

    const acc = accountMap[accountKey];
    const txnDate = new Date(txn.transactionDate);

    // 1️⃣ Capture FIRST available balance per account (latest)
    if (txn.availableBalance !== null && acc.baseBalance === null) {
      acc.baseBalance = txn.availableBalance;
      acc.baseDate = txnDate;
      continue;
    }

    // 2️⃣ Adjust balance for newer txns after base balance
    if (acc.baseBalance !== null && acc.baseDate && txnDate > acc.baseDate) {
      if (txn.type === 'debit') acc.adjustments -= txn.amount;
      if (txn.type === 'credit') acc.adjustments += txn.amount;
    }

    // 3️⃣ Monthly totals
    if (txn.type === 'debit') {
      totalSpent += txn.amount;

      const categoryName =
        `${txn.category?.name} | ${txn.category?.group}` ||
        'Unknown Category';

      spentByCategory[categoryName] =
        (spentByCategory[categoryName] || 0) + txn.amount;
    }

    if (txn.type === 'credit') {
      totalIncome += txn.amount;
    }
  }

  const totalBalance = getTotalBalance(transactions)

  return {
    month: `${year}-${month + 1}`,
    totalSpent,
    totalIncome,
    balance: totalBalance,
    spentByCategory,
  };
}





export function categoryChartData(spentByCategory: Record<string, number>) {
    return Object.entries(spentByCategory).map(([name, amount]) => ({
        category: name,
        amount,
    }));
}

export function getSummary(analytics: any) {
    return [
        { label: 'Income', value: analytics.totalIncome },
        { label: 'Expenses', value: analytics.totalSpent },
        { label: 'Balance', value: analytics.balance ?? 0 },
    ];
}


export function getNewTransactions(mainData: any[], newData: any[]) {
    const existingIds = new Set(mainData.map(item => item._id));
    return newData.filter(item => !existingIds.has(item._id));
}

function extractMerchant(text: string): string {
  const cleanText = text.replace(/\s+/g, ' ').trim();
  let match: RegExpMatchArray | null;

  // 1️⃣ FIRST priority → from MERCHANT (stop before "to")
  match = cleanText.match(
    /\bfrom\s+([A-Za-z][A-Za-z0-9 &._-]*?)(?=\s+to\b|\sfor|\sa\/c|\s\(|\sUPI|$)/i
  );
  if (match) {
    return match[1].trim();
  }

  // 2️⃣ credited to MERCHANT (not a/c)
  match = cleanText.match(
    /credited\s+to\s+(?!a\/c)([A-Za-z][A-Za-z0-9 &._-]*?)(?=\sfor|\sa\/c|\s\(|\sUPI|$)/i
  );
  if (match) {
    return match[1].trim();
  }

  // 3️⃣ credited to a/c XXXX
  match = cleanText.match(/credited\s+to\s+(a\/c\s+[A-Za-z0-9]+)/i);
  if (match) {
    return match[1].trim();
  }

  // 4️⃣ fallback → to a/c XXXX
  match = cleanText.match(/\bto\s+(a\/c\s+[A-Za-z0-9]+)/i);
  if (match) {
    return match[1].trim();
  }

  return 'Unknown';
}

const BANK_CODES = BANKS.map(b => b.code).join('|');
const BANK_REGEX = new RegExp(`\\b(${BANK_CODES})\\b`, 'i');


const TRANSACTION_REGEX =
  /\b(debited|credited|spent|withdrawn|received|paid)\b.*\b(rs\.?|inr)\s?\d+/i;


export const latestTransaction = (
  messages: any[],
  transactions: any[]
) => {
  const filteredMessages = messages.filter(msg => {
    const text = msg?.body || '';
    const address = msg?.address || '';

    // 1️⃣ Must be from a known bank
    const isBank = BANK_REGEX.test(text) || BANK_REGEX.test(address);

    // 2️⃣ Must be a debit / credit transaction with amount
    const isTransaction = TRANSACTION_REGEX.test(text);

    return isBank && isTransaction;
  });

  const parsed = filteredMessages
    .map(msg => {
      const parsedTx = parseTransactionSMS(msg);
      if (!parsedTx) return null;

      return {
        ...parsedTx,
        category: getCategory(msg.body),
        date: new Date(msg.date),
        raw: msg.body,
      };
    })
    .filter(Boolean); // remove nulls

  return getNewTransactions(transactions, parsed);
};




export function extractBank(
  text: string = '',
  sender: string = ''
): { code: string; name: string } | null {
  const haystack = `${text} ${sender}`.toUpperCase();

  for (const bank of BANKS) {
    // Build match keywords dynamically
    const keywords = [
      bank.code,
      bank.name.toUpperCase(),
      ...bank.name.toUpperCase().split(' '),
    ];

    for (const key of keywords) {
      if (key.length > 2 && haystack.includes(key)) {
        return bank;
      }
    }
  }

  return null;
}
