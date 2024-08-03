import { prisma } from "../../database/prisma";
import { request } from "../utils/request";
import { invalidUserRegisterBodyMock, userRegisterBodyMock } from "../__mocks__/user.mocks";

describe("Integration test: Register user", () => {
  test("Should be able to register user successfully", async () => {
    const data = await request
      .post("/users")
      .send(userRegisterBodyMock)
      .expect(201)
      .then((response) => response.body);

    expect(data.id).toBeDefined();
    expect(data.name).toBe(userRegisterBodyMock.name);
    expect(data.email).toBe(userRegisterBodyMock.email);
  });

  test("Should throw error when email is already registered", async () => {
    await prisma.user.create({ data: userRegisterBodyMock });

    const data = await request
      .post("/users")
      .send(userRegisterBodyMock)
      .expect(403)
      .then((response) => response.body);

    expect(data.message).toBe("This email is already registered.");
  });

  test("Should throw error when its missing a body parameter", async () => {
    const data = await request
      .post("/users")
      .expect(409)
      .then((response) => response.body);

    expect(data.issues).toHaveLength(3);
    expect(data.issues[0].message).toBe("Required");
    expect(data.issues[1].message).toBe("Required");
    expect(data.issues[2].message).toBe("Required");
  });

  test("Should throw error when body parameter receive wrong data type", async () => {
    const data = await request
      .post("/users")
      .send(invalidUserRegisterBodyMock)
      .expect(409)
      .then((response) => response.body);

    expect(data.issues).toHaveLength(3);
    expect(data.issues[0].message).toBe("Expected string, received number");
    expect(data.issues[1].message).toBe("Expected string, received number");
    expect(data.issues[2].message).toBe("Expected string, received number");
  });
});
