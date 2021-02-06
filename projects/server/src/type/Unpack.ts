// Returns Promise of return type of T
export type Unpack<T> = T extends Promise<infer U> ? U : T;
