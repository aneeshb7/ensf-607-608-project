import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from '../context/UserContext';

const Budget = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.budget.category}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.budget.totalSpent}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.budget.recommendedBudget}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.budget.suggestions}
    </td>
  </tr>
);

export default function BudgetList() {
  const [budgets, setBudgets] = useState([]);
  const [summary, setSummary] = useState(null);
  const [hasFetched, setHasFetched] = useState(false); 
  const { user } = useUser();

  useEffect(() => {
    if(hasFetched) return;
    async function getBudgets() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const response = await fetch(`${import.meta.env.VITE_API_URL}/gemini/generateBudget`, {
        method: "POST",
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: user.id, month: currentMonth, year: currentYear }),
      });

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const data = await response.json();
      const budgets = data.categories;
      setSummary(data.summary);
      setBudgets(budgets);
      setHasFetched(true);
    }
    getBudgets();
    return;
  }, [hasFetched]);

  async function deleteBudget(id) {
    await fetch(`${import.meta.env.VITE_API_URL}/budget/${id}`, {
      method: "DELETE",
    });
    const newBudgets = budgets.filter((tr) => tr._id !== id);
    setBudgets(newBudgets);                                  
  }

  function BudgetList() {
    return budgets.map((budget) => {
      return (
        <Budget
          budget={budget}
          deleteBudget={() => deleteBudget(budget._id)}
          key={budget._id}
        />
      );
    });
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Budget History</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Category
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Total Spent
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Recommended Budget
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Suggestions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {BudgetList()}
            </tbody>
            <tfoot>
              <tr className="border-t font-medium">
                <td className="h-12 px-4 text-left">Total</td>
                <td className="h-12 px-4 text-left">{summary ? summary.totalSpent : ''}</td>
                <td className="h-12 px-4 text-left">{summary ? summary.totalRecommendedBudget: ''}</td>
                <td className="h-12 px-4 text-left"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}