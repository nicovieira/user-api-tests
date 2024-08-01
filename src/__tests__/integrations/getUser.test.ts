import { userReturnSchema } from "../../schemas/user.schemas";
import { invalidTokenMock, loginUserMock } from "../__mocks__/user.mocks";
import { request } from "../utils/request";

describe("Integration test: get user", () => {
  test("should be able to get user successfully", async () => {
    const { user, token } = await loginUserMock();

    const data = await request
      .get("/users")
      .set("Authorization", token)
      .expect(200)
      .then((response) => response.body);

    expect(data).toStrictEqual(userReturnSchema.parse(user));
  });

  test("Should throw error when there is no token", async () => {
    const data = await request
      .get("/users")
      .expect(401)
      .then((response) => response.body);

    expect(data.message).toBe("Token is required.");
  });

  test("Should throw error when token is invalid or expired", async () => {
    const token = await invalidTokenMock();

    await request
      .get("/users")
      .set("Authorization", token)
      .expect(401)
      .then((response) => response.body);
  });
});
