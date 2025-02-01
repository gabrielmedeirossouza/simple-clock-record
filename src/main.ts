import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { validationPipe } from "./@core/presentation/pipes/validation.pipe";
import { RegistryBootstrap } from "./registry-bootstrap";

RegistryBootstrap.bootstrap();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(validationPipe);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch(console.error);
