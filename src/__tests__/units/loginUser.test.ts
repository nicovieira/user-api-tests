import { container } from "tsyringe";
import { user_services } from "../../services/user.services";
import { prismaMock } from "../__mocks__/prisma";
import {
  completeUserMock,
  userLoginBodyMock,
  userLoginBodyWrongPasswordMock,
  userMock,
} from "../__mocks__/user.mocks";

describe("Unit test:login user", () => {
  test("should be able to login user succefully", async () => {
    const userServices = container.resolve(user_services);

    const completeUser = await completeUserMock();

    prismaMock.user.findFirst.mockResolvedValue(completeUser);

    const data = await userServices.login(userLoginBodyMock);

    expect(data.token).toBeDefined();
    expect(data.user).toStrictEqual(userMock);
  });

  test("should throw an error when user does not exist", async () => {
    const userServices = container.resolve(user_services);

    const login = async () => await userServices.login(userLoginBodyMock);

    expect(login()).rejects.toThrow("User not registered.");
  });

  test("should throw an error when password is wrong", async () => {
    const userServices = container.resolve(user_services);

    const completeUser = await completeUserMock();

    prismaMock.user.findFirst.mockResolvedValue(completeUser);

    const login = async () => await userServices.login(userLoginBodyWrongPasswordMock);

    expect(login()).rejects.toThrow("E-mail and password doesn't match.");
  });
});
