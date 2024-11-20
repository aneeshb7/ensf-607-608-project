// File name: authentication.test.js
// Testing from Folder: Controller

import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { register, login } from "../../controllers/authentication.js";
import User from "../../models/user.js";

describe("Authentication Controller Tests", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    /** 2.1: register */
    describe("2.1: register", () => {
        it("should return 500 on a database error", async () => {
            sinon.stub(User, "findOne").resolves(null);

            sinon.stub(User.prototype, "save").rejects(new Error("Database error"));

            req.body = {
                username: "johndoe",
                password: "password123",
            };

            await register(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(
                res.json.calledWith({
                    message: "Database error",
                })
            ).to.be.true;
        });
    });

    /** 2.2: login */
    describe("2.2: login", () => {
        it("should return 401 if credentials are invalid", async () => {
            sinon.stub(User, "findOne").resolves({
                username: "johndoe",
                password: "hashed_password",
            });

            sinon.stub(bcrypt, "compare").resolves(false);

            req.body = {
                username: "johndoe",
                password: "wrongpassword",
            };

            await login(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(
                res.json.calledWith({
                    message: "Credentials are invalid.",
                })
            ).to.be.true;
        });

        it("should return 500 on a database error", async () => {
            sinon.stub(User, "findOne").rejects(new Error("Database error"));

            req.body = {
                username: "johndoe",
                password: "password123",
            };

            await login(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(
                res.json.calledWith({
                    message: "Database error",
                })
            ).to.be.true;
        });
    });
});
