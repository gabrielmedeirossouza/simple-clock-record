import { Module } from "@nestjs/common";
import { UserModule } from "./features/user/presentation/user.module";

@Module({
  imports: [UserModule],
})
export class AppModule {}
