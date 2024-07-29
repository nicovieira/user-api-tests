import jwt from "jsonwebtoken";
import { prisma } from "../../database/prisma";

export const userMock = {
  id: "855ae363-9e01-483e-a6d4-1a20d64fa762",
  name: "John Doe",
  email: "johndoe@email.com",
};

export const completeUserMock = {
  id: "855ae363-9e01-483e-a6d4-1a20d64fa762",
  name: "John Doe",
  email: "johndoe@email.com",
  password: "12345678",
};

export const userRegisterBodyMock = {
  name: "John Doe",
  email: "johndoe@email.com",
  password: "12345678",
};

export const loginUserMock = async () => {
  const user = await prisma.user.create({ data: userRegisterBodyMock });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

  return { user, token };
};
