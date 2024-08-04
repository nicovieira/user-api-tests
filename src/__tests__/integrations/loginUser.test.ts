import {
  invalidUserLoginBodyMock,
  loginUserMock,
  userLoginBodyMock,
  userLoginBodyWrongPasswordMock,
} from "../__mocks__/user.mocks";
import { request } from "../utils/request";

describe("Integration test: Login user", () => {
  test("Should be able to login user successfully", async () => {
    const { user } = await loginUserMock();

    const data = await request
      .post("/users/login")
      .send(userLoginBodyMock)
      .expect(200)
      .then((response) => response.body);

    const expectedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    expect(data.token).toBeDefined();
    expect(data.user).toStrictEqual(expectedUser);
  });

  test("Should throw error when user does not exists", async () => {
    const data = await request
      .post("/users/login")
      .send(userLoginBodyMock)
      .expect(404)
      .then((response) => response.body);

    expect(data.message).toBe("User not registered.");
  });

  test("Should be able to login user successfully", async () => {
    await loginUserMock();

    const data = await request
      .post("/users/login")
      .send(userLoginBodyWrongPasswordMock)
      .expect(403)
      .then((response) => response.body);

    expect(data.message).toBe("E-mail and password doesn't match.");
  });

  test("should throw error when its missing a body parameter", async () => {
    const data = await request
      .post("/users/login")
      .expect(409)
      .then((response) => response.body);

    expect(data.issues).toHaveLength(2);
    expect(data.issues[0].message).toBe("Required");
    expect(data.issues[1].message).toBe("Required");
  });

  test("should throw error when body parameter receive wrong data type", async () => {
    const data = await request
      .post("/users/login")
      .send(invalidUserLoginBodyMock)
      .expect(409)
      .then((response) => response.body);

    expect(data.issues).toHaveLength(2);
    expect(data.issues[0].message).toBe("Expected string, received number");
    expect(data.issues[1].message).toBe("Expected string, received number");
  });
});
