import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from '../context/UserContext';

const Transaction = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.transaction.name}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.transaction.date ? new Date(props.transaction.date).toLocaleDateString() : 'N/A'}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      ${props.transaction.amount}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.transaction.description}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.transaction.type}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.transaction._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteTransaction(props.transaction._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);


export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function getTransactions() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/user/${user.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const transactions = await response.json();
      setTransactions(transactions);
    }
    getTransactions();
  }, [user.id, user.token]);

  async function deleteTransaction(id) {
    await fetch(`${import.meta.env.VITE_API_URL}/transaction/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    });
    const newTransactions = transactions.filter((tr) => tr._id !== id);
    setTransactions(newTransactions);
  }

  function transactionList() {
    return transactions.map((transaction) => (
      <Transaction
        transaction={transaction}
        deleteTransaction={() => deleteTransaction(transaction._id)}
        key={transaction._id}
      />
    ));
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Transaction History</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Date
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Amount
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Description
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Type
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {transactionList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
