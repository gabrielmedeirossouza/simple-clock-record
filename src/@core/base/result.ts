export class Success<T> {
  readonly isSuccess = true;
  readonly isFailure = false;

  constructor(public readonly value: T) {}

  unwrap(): T {
    return this.value;
  }

  unwrapFailure(): never {
    throw new Error("Success.unwrapFailure: Success is not an Failure");
  }

  static unwrap<T extends Result<any, any>[]>(
    results: T,
  ): Extract<T[number], Success<T[number]["value"]>>["value"][] {
    const successes = results.map((result) => {
      if (result.isFailure)
        throw new Error("Success.(static)unwrap: Failure is not and Success.");

      return result.value as unknown;
    });

    return successes;
  }
}

export class Failure<T> {
  readonly isSuccess = false;
  readonly isFailure = true;

  constructor(public readonly value: T) {}

  unwrap(): never {
    throw new Error("Failure.unwrap: Failure is not an Success");
  }

  unwrapFailure(): T {
    return this.value;
  }

  static some<T extends Result<any, any>>(results: T[]): boolean {
    return results.some((result) => result.isFailure);
  }

  static extract<T extends Result<any, any>>(
    results: T[],
  ): Extract<T, Failure<any>>["value"][] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (
      results
        .filter((result) => result.isFailure)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .map((result) => result.value)
    );
  }
}

export type Result<T, K> = Success<T> | Failure<K>;
