import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Transaction = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.transaction.amount}
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

  // This method fetches the transactions from the database.
  useEffect(() => {
    async function getTransactions() {
      const response = await fetch(`http://localhost:5050/transaction/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const transactions = await response.json();
      setTransactions(transactions);
    }
    getTransactions();
    return;
  }, [transactions.length]);

  // This method will delete a transaction
  async function deleteTransaction(id) {
    await fetch(`http://localhost:5050/transaction/${id}`, {
      method: "DELETE",
    });
    const newTransactions = transactions.filter((tr) => tr._id !== id);
    setTransactions(newTransactions);                                  
  }

  // This method will map out the transactions on the table
  function TransactionList() {
    return transactions.map((transaction) => {
      return (
        <Transaction
          transaction={transaction}
          deleteTransaction={() => deleteTransaction(transaction._id)}
          key={transaction._id}
        />
      );
    });
  }

  // This following section will display the table with the transactions of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Transaction History</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
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
              {TransactionList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}