import { RequesterId } from "@common/decorators/requester-id.decorator";
import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  Patch,
} from "@nestjs/common";
import { UserServiceInterface } from "@v1/users/application/interfaces/user-service.interface";
import { CreateUserDto } from "../dtos/requests/create-user.dto";
import { UpdateUserDto } from "../dtos/requests/update-user.dto";
import { UserResponseDto } from "../dtos/responses/user-response.dto";

@Controller("v1/users")
export class UserController {
  constructor(
    @Inject("UserServiceInterface")
    private readonly userService: UserServiceInterface,
  ) {}

  @Post("/")
  async create(
    @RequesterId() requesterId: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(requesterId, createUserDto);
  }

  @Get("/")
  async getAll(@RequesterId() requesterId: string): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers(requesterId);
  }

  @Get("/:userId")
  async getById(@Param("userId") userId: string): Promise<UserResponseDto> {
    return this.userService.getUserById(userId);
  }

  @Patch("/:userId")
  async update(
    @RequesterId() requesterId: string,
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(requesterId, userId, updateUserDto);
  }
}
