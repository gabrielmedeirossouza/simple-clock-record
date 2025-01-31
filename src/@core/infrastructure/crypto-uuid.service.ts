import { randomUUID } from "node:crypto";
import { UuidService } from "../domain/services/uuid.service";

export class CryptoUuidService implements UuidService {
  public generate(): string {
    return randomUUID();
  }
}
