const app = require("../app");
const mockserver = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const User = require("../model/user");

test("new user gets empty list", async () => {
  // given
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const connection = await mongoose.connect(uri);

  /// valami
  const johnDoe = new User({
    username: "johnDoe",
    email: "john@doe.com",
    googleId: "dgsvfhjqbkj657",
  });
  const client = mockserver.agent(app);
  await johnDoe.save();
  client.set("authorization", johnDoe._id);

  // when
  const response = await client.get("/api/dashboards");

  // then
  expect(response.status).toBe(200);

  // console.log(response);
  const responseData = response.body;
  expect(responseData.user.dashboards).toStrictEqual([]);

  await connection.disconnect();
  await mongod.stop();
});