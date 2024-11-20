import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import { API_URL } from '../constants';

export default function AccountPage() {
  const [form, setForm] = useState({
    accountID: "",
    accountNumber: "",
    balance: "",
  });
  const [id, setID] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAccount() {
      const response = await fetch(`${API_URL}/account/user/${user.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (data.length > 0) {
        setID(data[0]._id);
        setForm(data[0] || {}); 
      } else {
        setForm({ accountID: "", accountNumber: "", balance: "" }); 
      }
    }
    getAccount();
  }, [user.token, user.id]);

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const { accountID, accountNumber, balance } = form;
    const account = { accountID, accountNumber, balance };

    try {
      let response;
      if (id) {
        response = await fetch(`${API_URL}/account/${id}`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(account),
        });
      } else {
        response = await fetch(`${API_URL}/account`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(account),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsEditing(false);
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Account Details</h2>
      
      {!isEditing ? (
        <div className="bg-gray-50 p-6 rounded-md shadow-sm mb-4">
          {form.accountID ? (
            <>
              <p className="text-lg font-medium text-gray-700">
                <strong>Account ID:</strong> {form.accountID}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Account Number:</strong> {form.accountNumber}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Balance:</strong> ${form.balance}
              </p>

              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
              >
                Edit Account
              </button>
            </>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-700">No account found. Please create an account.</p>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
              >
                Create Account
              </button>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
            <div>
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                {id ? "Edit Account Information" : "Create Account Information"}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {id ? "Edit your account details below." : "Fill out the form below to create a new account."}
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
              <div className="sm:col-span-4">
                <label htmlFor="accountID" className="block text-sm font-medium leading-6 text-slate-900">
                  Account ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="accountID"
                    id="accountID"
                    className="block w-full rounded-md border border-slate-300 py-1.5 px-3 focus:ring-indigo-600 sm:text-sm"
                    placeholder="Enter account ID"
                    value={form.accountID}
                    onChange={(e) => updateForm({ accountID: e.target.value })}
                    disabled={id ? true : false} 
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="accountNumber" className="block text-sm font-medium leading-6 text-slate-900">
                  Account Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    className="block w-full rounded-md border border-slate-300 py-1.5 px-3 focus:ring-indigo-600 sm:text-sm"
                    placeholder="Enter account number"
                    value={form.accountNumber}
                    onChange={(e) => updateForm({ accountNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="balance" className="block text-sm font-medium leading-6 text-slate-900">
                  Balance
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="balance"
                    id="balance"
                    className="block w-full rounded-md border border-slate-300 py-1.5 px-3 focus:ring-indigo-600 sm:text-sm"
                    placeholder="Enter balance"
                    value={form.balance}
                    onChange={(e) => updateForm({ balance: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <input
            type="submit"
            value={id ? "Update Account" : "Create Account"}
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          />
        </form>
      )}
    </div>
  );
}
