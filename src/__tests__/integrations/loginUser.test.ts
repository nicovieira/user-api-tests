import { loginUserMock, userLoginBodyMock } from "../__mocks__/user.mocks";
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
});
