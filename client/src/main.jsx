import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import Transaction from "./components/Transaction";
import TransactionList from "./components/TransactionList";
import ChatScreen from "./components/ChatScreen";
import BudgetList from "./components/BudgetList";
import GoalList from "./components/GoalList";
import Goal from "./components/Goal";
import AccountPage from "./components/AccountPage";
import { UserProvider } from "./context/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <TransactionList />,
      },
    ],
  },
  {
    path: "/transactions",
    element: <App />,
    children: [
      {
        path: "/transactions",
        element: <TransactionList />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Transaction />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Transaction />,
      },
    ],
  },
  {
    path: "/budgets",
    element: <App />,
    children: [
      {
        path: "/budgets",
        element: <BudgetList />,
      },
    ],
  },
  {
    path: "/goals",
    element: <App />,
    children: [
      {
        path: "/goals",
        element: <GoalList />,
      },
    ],
  },
  {
    path: "/edit-goal/:id",
    element: <App />,
    children: [
      {
        path: "/edit-goal/:id",
        element: <Goal />,
      },
    ],
  },
  {
    path: "/create-goal",
    element: <App />,
    children: [
      {
        path: "/create-goal",
        element: <Goal />,
      },
    ],
  },
  {
    path: "/chat",
    element: <App />,
    children: [
      {
        path: "/chat",
        element: <ChatScreen />,
      }
    ],
  },
  {
    path: "/account",
    element: <App />,
    children: [
      {
        path: "/account",
        element: <AccountPage />, 
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
