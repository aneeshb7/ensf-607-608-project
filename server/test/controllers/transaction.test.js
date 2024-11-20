// File name: transaction.test.js
// Testing from Folder: Controller

import { expect } from "chai";
import sinon from "sinon";
import {
    createTransaction,
    getTransaction,
    getAllTransactions,
    updateTransaction,
    deleteTransaction,
} from "../../controllers/transaction.js";
import Transaction from "../../models/transaction.js";

describe("Transaction Controller Tests", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            user: { id: "user123" },
            params: {},
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    /** 5.1: createTransaction */
    describe("5.1: createTransaction", () => {
        it("should return 500 on a database error", async () => {
            sinon.stub(Transaction.prototype, "save").rejects(new Error("Database error"));

            req.body = { name: "Sample Transaction", amount: 500, type: "income", userID: "user123" };
            await createTransaction(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 5.2: getTransaction */
    describe("5.2: getTransaction", () => {
        it("should fetch a transaction by ID successfully", async () => {
            sinon.stub(Transaction, "findOne").resolves({
                _id: "transaction123",
                name: "Sample Transaction",
                amount: 500,
                type: "income",
                userID: "user123",
            });

            req.params = { id: "transaction123" };
            await getTransaction(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith({
                    _id: "transaction123",
                    name: "Sample Transaction",
                    amount: 500,
                    type: "income",
                    userID: "user123",
                })
            ).to.be.true;
        });

        it("should return 404 if transaction does not exist", async () => {
            sinon.stub(Transaction, "findOne").resolves(null);

            req.params = { id: "nonexistent" };
            await getTransaction(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Transaction not found" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Transaction, "findOne").rejects(new Error("Database error"));

            req.params = { id: "transaction123" };
            await getTransaction(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 5.3: getAllTransactions */
    describe("5.3: getAllTransactions", () => {
        it("should fetch all transactions for the user successfully", async () => {
            sinon.stub(Transaction, "find").resolves([
                { _id: "transaction123", name: "Transaction 1", amount: 500, type: "income", userID: "user123" },
                { _id: "transaction124", name: "Transaction 2", amount: 300, type: "expense", userID: "user123" },
            ]);

            req.params = { id: "user123" };
            await getAllTransactions(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith([
                    { _id: "transaction123", name: "Transaction 1", amount: 500, type: "income", userID: "user123" },
                    { _id: "transaction124", name: "Transaction 2", amount: 300, type: "expense", userID: "user123" },
                ])
            ).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Transaction, "find").rejects(new Error("Database error"));

            req.params = { id: "user123" };
            await getAllTransactions(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 5.4: updateTransaction */
    describe("5.4: updateTransaction", () => {
        it("should update a transaction successfully", async () => {
            sinon.stub(Transaction, "findOneAndUpdate").resolves({
                _id: "transaction123",
                name: "Updated Transaction",
                amount: 600,
                type: "income",
                userID: "user123",
            });

            req.params = { id: "transaction123" };
            req.body = { name: "Updated Transaction", amount: 600 };

            await updateTransaction(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith({
                    _id: "transaction123",
                    name: "Updated Transaction",
                    amount: 600,
                    type: "income",
                    userID: "user123",
                })
            ).to.be.true;
        });

        it("should return 404 if transaction does not exist", async () => {
            sinon.stub(Transaction, "findOneAndUpdate").resolves(null);

            req.params = { id: "nonexistent" };
            req.body = { name: "Updated Transaction", amount: 600 };

            await updateTransaction(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Transaction not found or unauthorized" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Transaction, "findOneAndUpdate").rejects(new Error("Database error"));

            req.params = { id: "transaction123" };
            req.body = { name: "Updated Transaction", amount: 600 };

            await updateTransaction(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 5.5: deleteTransaction */
    describe("5.5: deleteTransaction", () => {
        it("should delete a transaction successfully", async () => {
            sinon.stub(Transaction, "findOneAndDelete").resolves({
                _id: "transaction123",
                name: "Transaction to Delete",
                amount: 500,
                type: "income",
                userID: "user123",
            });

            req.params = { id: "transaction123" };
            await deleteTransaction(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ message: "Transaction deleted successfully" })).to.be.true;
        });

        it("should return 404 if transaction does not exist", async () => {
            sinon.stub(Transaction, "findOneAndDelete").resolves(null);

            req.params = { id: "nonexistent" };
            await deleteTransaction(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Transaction not found or unauthorized" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Transaction, "findOneAndDelete").rejects(new Error("Database error"));

            req.params = { id: "transaction123" };
            await deleteTransaction(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });
});
