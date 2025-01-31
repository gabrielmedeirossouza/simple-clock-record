import { environment } from "@/@core/infrastructure/environment";
import { UserRepository } from "../application/repositories/user.repository";
import { InMemoryUserRepository } from "./in-memory-user.repository";

export class UserRepositoryFactory {
  private static instance?: UserRepository;

  static getInstance(): UserRepository {
    if (this.instance) return this.instance;

    if (environment === "development") {
      this.instance = new InMemoryUserRepository(false);
      return this.instance;
    }

    throw new Error(
      "UserRepositoryFactory.(static)getInstance: Production repository not implemented yet.",
    );
    // return this.instance
  }
}
