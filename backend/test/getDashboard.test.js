const app = require("../app");
const mockServer = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const User = require("../model/user");

test("new user gets empty list", async () => {
  // given
  // fake mongo server
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const connection = await mongoose.connect(uri);

  // create dummy data
  const johnDoe = new User({
    username: "johnDoe",
    email: "john@doe.com",
    googleId: "dgsvfhjqbkj657",
  });
  await johnDoe.save();

  // fake server
  const client = mockServer.agent(app);
  client.set("authorization", johnDoe._id);
  // can be multiple client.set();

  // when
  const response = await client.get("/api/dashboards");

  // then
  expect(response.status).toBe(200);
  const responseData = response.body;
  expect(responseData.user.dashboards).toStrictEqual([]);

  // stop fake mongo
  await connection.disconnect();
  await mongod.stop();
});