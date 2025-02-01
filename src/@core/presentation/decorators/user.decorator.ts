/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserSafeEntity } from "@/features/user/domain/user";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): UserSafeEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
