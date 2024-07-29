import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { user_services } from "../services/user.services";
import { tUserLoginReturn, tUserReturn } from "../schemas/user.schemas";

@injectable()
export class user_controllers {
  constructor(@inject("UserServices") private userService: user_services) {}

  async register(req: Request, res: Response): Promise<Response<tUserReturn>> {
    const response = await this.userService.register(req.body);

    return res.status(200).json(response);
  }

  async login(req: Request, res: Response): Promise<Response<tUserLoginReturn>> {
    const response = await this.userService.login(req.body);

    return res.status(200).json(response);
  }

  async getUser(req: Request, res: Response): Promise<Response<tUserReturn>> {
    const { id } = res.locals.decode;

    const response = await this.userService.getUser(id);

    return res.status(200).json(response);
  }
}
