import { IsString } from "class-validator";

export class SignInUserBody {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
