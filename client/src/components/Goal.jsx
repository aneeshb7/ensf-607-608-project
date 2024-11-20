import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';

export default function Goal() {
  const [form, setForm] = useState({
    categoryID: "",
    targetAmount: "",
  });
  const [isNew, setIsNew] = useState(true);
  const { user } = useUser();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGoal() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`https://budgettrackerio.onrender.com/api/goal/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }

      const goal = await response.json();
      if (!goal) {
        console.warn(`Goal with id ${id} not found`);
        navigate("/goals");
        return;
      }
      setForm(goal);
    }
    fetchGoal();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const { categoryID, targetAmount } = form;
    const goal = {
      categoryID,
      targetAmount,
      userID: user.id,
    };

    try {
      let response;
      if (isNew) {
        response = await fetch(`https://budgettrackerio.onrender.com/api/goal`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(goal),
        });
      } else {
        response = await fetch(`https://budgettrackerio.onrender.com/api/goal/${params.id}`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(goal),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred:', error);
    } finally {
      setForm({ categoryID: "", targetAmount: "" });
      navigate("/goals");
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">{isNew ? "Create Goal" : "Edit Goal"}</h3>
      <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">Goal</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Set a category and target amount.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-4">
              <label htmlFor="categoryID" className="block text-sm font-medium leading-6 text-slate-900">
                Category
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="categoryID"
                  id="categoryID"
                  className="block w-full rounded-md border border-slate-300 py-1.5 px-3 focus:ring-indigo-600 sm:text-sm"
                  placeholder="Enter category ID"
                  value={form.categoryID}
                  onChange={(e) => updateForm({ categoryID: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="targetAmount" className="block text-sm font-medium leading-6 text-slate-900">
                Target Amount
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="targetAmount"
                  id="targetAmount"
                  className="block w-full rounded-md border border-slate-300 py-1.5 px-3 focus:ring-indigo-600 sm:text-sm"
                  placeholder="Enter target amount"
                  value={form.targetAmount}
                  onChange={(e) => updateForm({ targetAmount: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="Save Goal"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
