import {
  Controller,
  Get,
  Req,
  UsePipes,
  ValidationPipe,
  Param,
  Inject,
  Post,
  Body,
} from "@nestjs/common";
import { Request } from "express";
import { GetUserByIdDto } from "../dtos/requests/get-user-by-id.dto";
import { UserResponseDto } from "../dtos/responses/user-response.dto";
import { UserServiceInterface } from "../../application/interfaces/user-service.interface";
import { CreateUserDto } from "../dtos/requests/create-user.dto";

@Controller("v1/users")
export class UserController {
  constructor(
    @Inject("UserServiceInterface")
    private readonly userService: UserServiceInterface,
  ) {}

  @Post("/")
  async create(
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const requesterId = req["requesterId"];
    return this.userService.createUser(requesterId, createUserDto);
  }

  @Get("/")
  async getAll(@Req() req: Request): Promise<UserResponseDto[]> {
    const requesterId = req["requesterId"];
    return this.userService.getAllUsers(requesterId);
  }

  @Get("/:userId")
  @UsePipes(new ValidationPipe())
  async getById(@Param() params: GetUserByIdDto): Promise<UserResponseDto> {
    return this.userService.getUserById(params);
  }
}
