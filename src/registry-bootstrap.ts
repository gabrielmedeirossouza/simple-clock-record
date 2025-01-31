import { DomainRegistry } from "./@core/domain/domain-registry";
import { CryptoUuidService } from "./@core/infrastructure/crypto-uuid.service";
import { Sha256HashService } from "./@core/infrastructure/sha256-hash.service";

export class RegistryBootstrap {
  static bootstrap(): void {
    DomainRegistry.hashService = new Sha256HashService();
    DomainRegistry.uuidService = new CryptoUuidService();
  }
}
