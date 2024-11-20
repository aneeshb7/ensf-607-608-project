// File name: budgetCategory.test.js
// Testing from Folder: Controller

import { expect } from "chai";
import sinon from "sinon";
import BudgetCategory from "../../models/budgetCategory.js";
import {
    createBudgetCategory,
    getAllBudgetCategories,
    getBudgetCategoryById,
    updateBudgetCategory,
    deleteBudgetCategory,
} from "../../controllers/budgetCategory.js";

describe("Budget Category Controller Tests", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
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

    /** 3.1: createBudgetCategory */
    describe("3.1: createBudgetCategory", () => {
        it("should return 500 on a database error", async () => {
            sinon.stub(BudgetCategory.prototype, "save").rejects(new Error("Database error"));

            req.body = { name: "Utilities" };
            await createBudgetCategory(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 3.2: getAllBudgetCategories */
    describe("3.2: getAllBudgetCategories", () => {
        it("should fetch all budget categories successfully", async () => {
            sinon.stub(BudgetCategory, "find").resolves([
                { _id: "category123", name: "Utilities" },
                { _id: "category124", name: "Groceries" },
            ]);

            await getAllBudgetCategories(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith([
                    { _id: "category123", name: "Utilities" },
                    { _id: "category124", name: "Groceries" },
                ])
            ).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(BudgetCategory, "find").rejects(new Error("Database error"));

            await getAllBudgetCategories(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 3.3: getBudgetCategoryById */
    describe("3.3: getBudgetCategoryById", () => {
        it("should fetch a budget category by ID successfully", async () => {
            sinon.stub(BudgetCategory, "findById").resolves({
                _id: "category123",
                name: "Utilities",
            });

            req.params.id = "category123";
            await getBudgetCategoryById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ _id: "category123", name: "Utilities" })).to.be.true;
        });

        it("should return 404 if budget category does not exist", async () => {
            sinon.stub(BudgetCategory, "findById").resolves(null);

            req.params.id = "nonexistent";
            await getBudgetCategoryById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Category not found" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(BudgetCategory, "findById").rejects(new Error("Database error"));

            req.params.id = "category123";
            await getBudgetCategoryById(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 3.4: updateBudgetCategory */
    describe("3.4: updateBudgetCategory", () => {
        it("should update a budget category successfully", async () => {
            sinon.stub(BudgetCategory, "findByIdAndUpdate").resolves({
                _id: "category123",
                name: "Updated Category",
            });

            req.params.id = "category123";
            req.body = { name: "Updated Category" };

            await updateBudgetCategory(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ _id: "category123", name: "Updated Category" })).to.be.true;
        });

        it("should return 404 if budget category does not exist", async () => {
            sinon.stub(BudgetCategory, "findByIdAndUpdate").resolves(null);

            req.params.id = "nonexistent";
            req.body = { name: "Updated Category" };

            await updateBudgetCategory(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Category not found" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(BudgetCategory, "findByIdAndUpdate").rejects(new Error("Database error"));

            req.params.id = "category123";
            req.body = { name: "Updated Category" };

            await updateBudgetCategory(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 3.5: deleteBudgetCategory */
    describe("3.5: deleteBudgetCategory", () => {
        it("should delete a budget category successfully", async () => {
            sinon.stub(BudgetCategory, "findByIdAndDelete").resolves({
                _id: "category123",
                name: "Utilities",
            });

            req.params.id = "category123";
            await deleteBudgetCategory(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ message: "Category successfully deleted" })).to.be.true;
        });

        it("should return 404 if budget category does not exist", async () => {
            sinon.stub(BudgetCategory, "findByIdAndDelete").resolves(null);

            req.params.id = "nonexistent";
            await deleteBudgetCategory(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Category not found" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(BudgetCategory, "findByIdAndDelete").rejects(new Error("Database error"));

            req.params.id = "category123";
            await deleteBudgetCategory(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });
});
