import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from '../context/UserContext';

const Goal = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.goal.categoryID}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      ${props.goal.targetAmount}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit-goal/${props.goal._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => props.deleteGoal(props.goal._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function GoalList() {
  const [goals, setGoals] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function getGoals() {
      const response = await fetch(`http://localhost:5050/api/goal/user/${user.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }

      const goals = await response.json();
      setGoals(goals);
    }
    getGoals();
  }, [user.id, user.token]);

  async function deleteGoal(id) {
    await fetch(`http://localhost:5050/api/goal/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    });
    setGoals(goals.filter((goal) => goal._id !== id));
  }

  function renderGoals() {
    return goals.map((goal) => (
      <Goal
        goal={goal}
        deleteGoal={() => deleteGoal(goal._id)}
        key={goal._id}
      />
    ));
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Goals</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Category
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Target Amount
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {renderGoals()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
