/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../../../app";

describe("Create User Controller", () => {
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "Test Integration",
      email: "testIntegration@test.com.br",
      password: "test-integration",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create an existing user", async () => {
    await request(app).post("/users").send({
      name: "Test Integration Exist User",
      email: "testIntegrationExisting@test.com.br",
      password: "test-integration-exist",
    });

    const response = await request(app).post("/users").send({
      name: "Test Integration Exist User",
      email: "testIntegrationExisting@test.com.br",
      password: "test-integration-exist",
    });

    expect(response.status).toBe(400);
  });
});
