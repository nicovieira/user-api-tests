import jwt from "jsonwebtoken";
import { prisma } from "../../database/prisma";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword";

export const userMock = {
  id: "a2009ea6-5105-5ef5-9c21-39898f1f0d09",
  name: "John Doe",
  email: "johndoe@email.com",
};

export const completeUserMock = async () => {
  const password = await hashPassword("fb7c849KD");

  return {
    id: "a2009ea6-5105-5ef5-9c21-39898f1f0d09",
    name: "John Doe",
    email: "johndoe@email.com",
    password,
  };
};

export const createUserBodyMock = async () => {
  const password = await hashPassword("fb7c849KD");

  return {
    id: "a2009ea6-5105-5ef5-9c21-39898f1f0d09",
    name: "John Doe",
    email: "johndoe@email.com",
    password,
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

export const userLoginBodyWrongPasswordMock = {
  email: "johndoe@email.com",
  password: "fb7c849K",
};

export const loginUserMock = async () => {
  const data = await createUserBodyMock();

  const user = await prisma.user.create({ data: data });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

  return { user, token };
};

export const invalidTokenMock = async () => {
  const token = jwt.sign({}, "INVALID_SECRET");

  return token;
};

export const invalidUserRegisterBodyMock = {
  name: 123,
  email: 123,
  password: 123,
};
