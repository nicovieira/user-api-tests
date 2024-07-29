import { container } from "tsyringe";
import { user_services } from "../../services/user.services";
import { completeUserMock, userMock, userRegisterBodyMock } from "../__mocks__/user.mocks";
import { prismaMock } from "../__mocks__/prisma";

describe("Unit test: register user", () => {
  test("should be able to register user successfully", async () => {
    const userServices = container.resolve(user_services);

    prismaMock.user.create.mockResolvedValue(completeUserMock);
    const data = await userServices.register(userRegisterBodyMock);

    expect(data).toStrictEqual(userMock);
  });

  test("register user should throw error when email is already registered", async () => {
    const userServices = container.resolve(user_services);

    prismaMock.user.findFirst.mockResolvedValue(completeUserMock);
    const register = async () => await userServices.register(userRegisterBodyMock);

    expect(register()).rejects.toThrow("This email is already registered");
  });
});
