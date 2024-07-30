import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { app_error } from "../errors/AppErrors";
import {
  tUserLoginBody,
  tUserLoginReturn,
  tUserRegisterBody,
  tUserReturn,
  userReturnSchema,
  userSchema,
} from "../schemas/user.schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@injectable()
export class user_services {
  async register(body: tUserRegisterBody): Promise<tUserReturn> {
    const existingUser = await prisma.user.findFirst({ where: { email: body.email } });

    if (existingUser) {
      throw new app_error("This email is already registered.", 403);
    }

    const hashPassword = await bcrypt.hash(body.password, 10);

    const userData: tUserRegisterBody = {
      ...body,
      password: hashPassword,
    };

    const newUser = await prisma.user.create({ data: userData });

    return userReturnSchema.parse(newUser);
  }

  async login(body: tUserLoginBody): Promise<tUserLoginReturn> {
    const user = await prisma.user.findFirst({ where: { email: body.email } });

    if (!user) {
      throw new app_error("User not registered.");
    }

    const comparePassword = await bcrypt.compare(body.password, user.password);

    if (!comparePassword) {
      throw new app_error("E-mail and password doesn't match.");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    return {
      token,
      user: userReturnSchema.parse(user),
    };
  }

  async getUser(userId: string): Promise<tUserReturn> {
    const user = await prisma.user.findFirst({ where: { id: userId } });

    return userSchema.parse(user);
  }
}
