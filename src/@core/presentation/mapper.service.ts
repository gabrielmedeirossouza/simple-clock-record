import { Exception } from "../base/exception";
import { Mapper } from "./mapper";

export class MapperService<
  T extends Mapper<Exception<string>, Exception<string>>,
> {
  private readonly mappers: Map<T["code"], T> = new Map();

  constructor(mappers: T[]) {
    for (const mapper of mappers) {
      this.mappers.set(mapper.code, mapper);
    }
  }

  map(from: Parameters<T["map"]>[0]): ReturnType<T["map"]> {
    const mapper = this.mappers.get(from.code);

    if (!mapper)
      throw new Error(`MapperService has no registered [${from.code}] mapper!`);

    return mapper.map(from) as ReturnType<T["map"]>;
  }
}
