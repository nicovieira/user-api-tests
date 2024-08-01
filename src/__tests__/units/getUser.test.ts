import { container } from "tsyringe";
import { user_services } from "../../services/user.services";
import { prismaMock } from "../__mocks__/prisma";
import { completeUserMock, userMock } from "../__mocks__/user.mocks";

describe("Unit test: Get user", () => {
  test("Should be able to get user successfully", async () => {
    const userServices = container.resolve(user_services);

    const completeUser = await completeUserMock();

    prismaMock.user.findFirst.mockResolvedValue(completeUser);

    const data = await userServices.getUser(completeUser.id);

    expect(data).toStrictEqual(userMock);
  });
});
