import { randomBytes, createHash } from "node:crypto";
import { HashService } from "../domain/services/hash.service";

export class Sha256HashService implements HashService {
  public hash(data: string): string {
    const salt = randomBytes(32).toString("hex");
    const hash = createHash("sha256").update(`${salt}.${data}`).digest("hex");

    return `${salt}.${hash}`;
  }

  public verify(data: string, hash: string): boolean {
    const [salt, originalHash] = hash.split(".");
    const newHash = createHash("sha256")
      .update(`${salt}.${data}`)
      .digest("hex");

    return newHash === originalHash;
  }
}
