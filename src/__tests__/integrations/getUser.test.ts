import { loginUserMock } from "../__mocks__/user.mocks";
import { request } from "../utils/request";

describe("Integration test: get user", () => {
  test("should be able to get user successfully", async () => {
    const { user, token } = await loginUserMock();

    const data = await request
      .get("/users")
      .set("Authorization", token)
      .then((response) => response.body);

    expect(data).toStrictEqual(user);
  });
});
