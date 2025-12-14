import { Transaction } from "../redux/features/transactions/transactionSlice";

export function formatMoney(
  amount: number,
  currency: string = '₹',
  decimals: number = 2
): string {
  if (isNaN(amount)) return `${currency}0.00`;

  return (
    currency +
    amount
      .toFixed(decimals) // ensures fixed decimal places
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') // adds commas
  );
}

export function generateRandomColor(): string {
  const r = Math.floor(Math.random() * 156) + 100; // 100-255 for lighter colors
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

export function mapToChartData(data: any[]): any[] {
  return data.map(item => ({
    name: item.category,
    amount: item.amount,
    color: generateRandomColor(),
    legendFontColor: "#7F7F7F",
    legendFontSize: 10
  }));
}

export function filterTransactions(
  transactions: Transaction[],
  filters: any
): Transaction[] {
  const bankCodes: any = new Set(
    filters?.bank ? filters.bank?.map((b: any) => b.code.toUpperCase()) ?? [] : []
  );

  const categoryIds: any = new Set(
    filters?.categories ? filters.categories?.map((c: any) => c.id) ?? [] : []
  );

  const fromDate =
    filters?.date?.from ? new Date(filters.date.from) : null;

  const toDate =
    filters?.date?.to ? new Date(filters.date.to) : null;

  return transactions.filter(txn => {
    /* 1️⃣ Bank filter */
    const bankValue = txn.source || txn.bank;
    const bankMatch =
      bankCodes?.size === 0 ||
      (bankValue && bankCodes.has(bankValue.toUpperCase()));

    /* 2️⃣ Category filter */
    const categoryMatch =
      categoryIds?.size === 0 ||
      (txn.category && categoryIds.has(txn.category.id));

    /* 3️⃣ Date filter */
    const txnDate = new Date(txn.transactionDate);
    const dateMatch =
      (!fromDate || txnDate >= fromDate) &&
      (!toDate || txnDate <= toDate);

    return bankMatch && categoryMatch && dateMatch;
  });
}

