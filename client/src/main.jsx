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
import BudgetList from "./components/BudgetList";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);