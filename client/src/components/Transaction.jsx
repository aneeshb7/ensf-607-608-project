import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import { API_URL } from '../constants';

export default function Transaction() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    amount: "",
    description: "",
    type: "",
    category: "",
  });
  const [isNew, setIsNew] = useState(true);
  const { user } = useUser();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`${API_URL}/transaction/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const transaction = await response.json();
      if (!transaction) {
        console.warn(`Transaction with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(transaction);
    }
    fetchData();
    return;
  }, [params.id, navigate, user.token]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const { name, date, amount, description, type, category } = form;
    const transaction = {
      name: name,
      date: date,
      amount: amount,
      description: description,
      type: type,
      category: category,
      userID: user.id,
    };

    try {
      let response;
      if (isNew) {
        response = await fetch(`${API_URL}/transaction`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transaction),
        });
      } else {
        response = await fetch(`${API_URL}/transaction/${params.id}`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transaction),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ amount: "", description: "", type: "", category: "" });
      navigate("/");
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create Transaction</h3>
      <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">Transaction</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border border-slate-300 py-1.5 px-3 focus:ring-indigo-600 sm:text-sm"
                  placeholder="Enter transaction name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="date" className="block text-sm font-medium leading-6 text-slate-900">
                Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="block w-full rounded-md border border-slate-300 py-1.5 px-3 focus:ring-indigo-600 sm:text-sm"
                  value={form.date}
                  onChange={(e) => updateForm({ date: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="amount" className="block text-sm font-medium leading-6 text-slate-900">
                Amount
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  className="block w-full rounded-md border border-slate-300 py-1.5 px-3 focus:ring-indigo-600 sm:text-sm"
                  placeholder="How much did you buy/receive?"
                  value={form.amount}
                  onChange={(e) => updateForm({ amount: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-slate-900">
                Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="block w-full rounded-md border border-slate-300 py-1.5 px-3 focus:ring-indigo-600 sm:text-sm"
                  placeholder="What did you buy/receive?"
                  value={form.description}
                  onChange={(e) => updateForm({ description: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <fieldset className="mt-4">
                <legend className="sr-only">Transaction Type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="typeIncome"
                      name="typeOptions"
                      type="radio"
                      value="Income"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.type === "Income"}
                      onChange={(e) => updateForm({ type: e.target.value })}
                    />
                    <label htmlFor="typeIncome" className="ml-3 block text-sm font-medium leading-6 text-slate-900">
                      Income
                    </label>
                    <input
                      id="typeExpense"
                      name="typeOptions"
                      type="radio"
                      value="Expense"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.type === "Expense"}
                      onChange={(e) => updateForm({ type: e.target.value })}
                    />
                    <label htmlFor="typeExpense" className="ml-3 block text-sm font-medium leading-6 text-slate-900">
                      Expense
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-slate-900">
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-slate-600 focus:border-slate-600 sm:text-sm rounded-md"
                  value={form.category}
                  onChange={(e) => updateForm({ category: e.target.value })}
                >
                  <option value="">Select a category</option>
                  <option value="food">Food</option>
                  <option value="luxury">Luxury</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                  <option value="health">Health</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="Save Transaction"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
