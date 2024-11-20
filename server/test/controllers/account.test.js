// File name: account.test.js
// Testing from Folder: Controller

import { expect } from "chai";
import sinon from "sinon";
import { createAccount, getAccount, getAllAccounts, updateAccount, deleteAccount } from "../../controllers/account.js";
import Account from "../../models/account.js";

describe("Account Controller Tests", () => {
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

    /** 1.1: createAccount */
    describe("1.1: createAccount", () => {
        it("should return 500 on a database error", async () => {
            sinon.stub(Account.prototype, "save").rejects(new Error("Database error"));

            req.body = { accountID: 123, accountNumber: 456789, balance: 1000 };
            await createAccount(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 1.2: getAccount */
    describe("1.2: getAccount", () => {
        it("should fetch the account by ID successfully", async () => {
            sinon.stub(Account, "findOne").resolves({
                _id: "account123",
                accountNumber: 456789,
                balance: 1000,
                userID: "user123",
            });

            req.params = { id: "account123" };
            await getAccount(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith({
                    _id: "account123",
                    accountNumber: 456789,
                    balance: 1000,
                    userID: "user123",
                })
            ).to.be.true;
        });

        it("should return 404 if account does not exist", async () => {
            sinon.stub(Account, "findOne").resolves(null);

            req.params = { id: "nonexistent" };
            await getAccount(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Account not found" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Account, "findOne").rejects(new Error("Database error"));

            req.params = { id: "account123" };
            await getAccount(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 1.3: getAllAccounts */
    describe("1.3: getAllAccounts", () => {
        it("should fetch all accounts for the user successfully", async () => {
            sinon.stub(Account, "find").resolves([
                { _id: "account123", accountNumber: 456789, balance: 1000, userID: "user123" },
                { _id: "account124", accountNumber: 123456, balance: 2000, userID: "user123" },
            ]);

            await getAllAccounts(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith([
                    { _id: "account123", accountNumber: 456789, balance: 1000, userID: "user123" },
                    { _id: "account124", accountNumber: 123456, balance: 2000, userID: "user123" },
                ])
            ).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Account, "find").rejects(new Error("Database error"));

            await getAllAccounts(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 1.4: updateAccount */
    describe("1.4: updateAccount", () => {
        it("should update the account successfully", async () => {
            sinon.stub(Account, "findOneAndUpdate").resolves({
                _id: "account123",
                accountNumber: 456789,
                balance: 1500,
                userID: "user123",
            });

            req.params = { id: "account123" };
            req.body = { balance: 1500 };

            await updateAccount(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith({
                    _id: "account123",
                    accountNumber: 456789,
                    balance: 1500,
                    userID: "user123",
                })
            ).to.be.true;
        });

        it("should return 404 if account does not exist or unauthorized", async () => {
            sinon.stub(Account, "findOneAndUpdate").resolves(null);

            req.params = { id: "nonexistent" };
            req.body = { balance: 1500 };

            await updateAccount(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Account not found or unauthorized" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Account, "findOneAndUpdate").rejects(new Error("Database error"));

            req.params = { id: "account123" };
            req.body = { balance: 1500 };

            await updateAccount(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 1.5: deleteAccount */
    describe("1.5: deleteAccount", () => {
        it("should delete the account successfully", async () => {
            sinon.stub(Account, "findOneAndDelete").resolves({
                _id: "account123",
                accountID: 123,
                accountNumber: 456789,
                balance: 1000,
                userID: "user123",
            });

            req.params = { id: "account123" };
            await deleteAccount(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ message: "Account deleted successfully" })).to.be.true;
        });

        it("should return 404 if account does not exist or unauthorized", async () => {
            sinon.stub(Account, "findOneAndDelete").resolves(null);

            req.params = { id: "nonexistent" };
            await deleteAccount(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Account not found or unauthorized" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Account, "findOneAndDelete").rejects(new Error("Database error"));

            req.params = { id: "account123" };
            await deleteAccount(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });
});
