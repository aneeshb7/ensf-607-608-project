// File name: userManagement.test.js
// Testing from Folder: Controller

import { expect } from "chai";
import sinon from "sinon";
import { getUser, updateUser } from "../../controllers/user.js";
import User from "../../models/user.js";

describe("User Management Controller Tests", () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {}, user: { id: "user123" } };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    /** 6.1: getUser */
    describe("6.1: getUser", () => {
        it("should retrieve user details successfully", async () => {
            sinon.stub(User, "findById").resolves({
                _id: "user123",
                firstName: "Test",
                lastName: "User",
                email: "test@example.com",
            });

            req.params = { id: "user123" };
            await getUser(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith({
                    id: "user123",
                    firstName: "Test",
                    lastName: "User",
                    email: "test@example.com",
                })
            ).to.be.true;
        });
    });

    /** 6.2: updateUser */
    describe("6.2: updateUser", () => {
        it("should update user details successfully", async () => {
            sinon.stub(User, "findByIdAndUpdate").resolves({
                _id: "user123",
                firstName: "Updated",
                lastName: "User",
                email: "updated@example.com",
            });

            req.params = { id: "user123" };
            req.body = { firstName: "Updated", lastName: "User", email: "updated@example.com" };

            await updateUser(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWith({
                    _id: "user123",
                    firstName: "Updated",
                    lastName: "User",
                    email: "updated@example.com",
                })
            ).to.be.true;
        });
    });
});
