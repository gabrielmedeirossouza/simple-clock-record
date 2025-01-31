export interface HashService {
  hash(data: string): string;
  verify(data: string, hash: string): boolean;
}
