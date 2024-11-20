// File name: goal.test.js
// Testing from Folder: Controller

import { expect } from "chai";
import sinon from "sinon";
import { createGoal, getGoal, getAllGoals, updateGoal, deleteGoal } from "../../controllers/goal.js";
import Goal from "../../models/goal.js";

describe("Goal Controller Tests", () => {
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

    /** 4.1: createGoal */
    describe("4.1: createGoal", () => {
        it("should return 500 on a database error", async () => {
            sinon.stub(Goal.prototype, "save").rejects(new Error("Database error"));

            req.body = { categoryID: "cat123", targetAmount: 5000 };
            await createGoal(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 4.2: getGoal */
    describe("4.2: getGoal", () => {
        it("should fetch a goal by ID successfully", async () => {
            sinon.stub(Goal, "findOne").resolves({
                _id: "goal123",
                categoryID: "cat123",
                targetAmount: 5000,
                userID: "user123",
            });

            req.params.id = "goal123";
            await getGoal(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith({
                    _id: "goal123",
                    categoryID: "cat123",
                    targetAmount: 5000,
                    userID: "user123",
                })
            ).to.be.true;
        });

        it("should return 404 if goal does not exist", async () => {
            sinon.stub(Goal, "findOne").resolves(null);

            req.params.id = "nonexistent";
            await getGoal(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Goal not found" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Goal, "findOne").rejects(new Error("Database error"));

            req.params.id = "goal123";
            await getGoal(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 4.3: getAllGoals */
    describe("4.3: getAllGoals", () => {
        it("should return 500 on a database error", async () => {
            sinon.stub(Goal, "find").rejects(new Error("Database error"));

            await getAllGoals(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 4.4: updateGoal */
    describe("4.4: updateGoal", () => {
        it("should update a goal successfully", async () => {
            sinon.stub(Goal, "findOneAndUpdate").resolves({
                _id: "goal123",
                categoryID: "cat123",
                targetAmount: 6000,
                userID: "user123",
            });

            req.params.id = "goal123";
            req.body = { targetAmount: 6000 };
            await updateGoal(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith({
                    _id: "goal123",
                    categoryID: "cat123",
                    targetAmount: 6000,
                    userID: "user123",
                })
            ).to.be.true;
        });

        it("should return 404 if goal does not exist", async () => {
            sinon.stub(Goal, "findOneAndUpdate").resolves(null);

            req.params.id = "nonexistent";
            req.body = { targetAmount: 6000 };
            await updateGoal(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Goal not found or unauthorized" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Goal, "findOneAndUpdate").rejects(new Error("Database error"));

            req.params.id = "goal123";
            req.body = { targetAmount: 6000 };
            await updateGoal(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });

    /** 4.5: deleteGoal */
    describe("4.5: deleteGoal", () => {
        it("should delete a goal successfully", async () => {
            sinon.stub(Goal, "findOneAndDelete").resolves({
                _id: "goal123",
                categoryID: "cat123",
                targetAmount: 5000,
                userID: "user123",
            });

            req.params.id = "goal123";
            await deleteGoal(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ message: "Goal deleted successfully" })).to.be.true;
        });

        it("should return 404 if goal does not exist", async () => {
            sinon.stub(Goal, "findOneAndDelete").resolves(null);

            req.params.id = "nonexistent";
            await deleteGoal(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Goal not found or unauthorized" })).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(Goal, "findOneAndDelete").rejects(new Error("Database error"));

            req.params.id = "goal123";
            await deleteGoal(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: "Database error" })).to.be.true;
        });
    });
});
