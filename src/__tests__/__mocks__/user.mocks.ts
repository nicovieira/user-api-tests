import jwt from "jsonwebtoken";
import { prisma } from "../../database/prisma";
import bcrypt from "bcrypt";

export const userMock = {
  id: "a2009ea6-5105-5ef5-9c21-39898f1f0d09",
  name: "John Doe",
  email: "johndoe@email.com",
};

export const completeUserMock = async () => {
  const hashPassword = await bcrypt.hash("fb7c849KD", 10);
  return {
    id: "a2009ea6-5105-5ef5-9c21-39898f1f0d09",
    name: "John Doe",
    email: "johndoe@email.com",
    password: hashPassword,
  };
};
export const userRegisterBodyMock = {
  name: "John Doe",
  email: "johndoe@email.com",
  password: "fb7c849KD",
};
export const userLoginBodyMock = {
  email: "johndoe@email.com",
  password: "fb7c849KD",
};

export const loginUserMock = async () => {
  const user = await prisma.user.create({ data: userRegisterBodyMock });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

  return { user, token };
};
