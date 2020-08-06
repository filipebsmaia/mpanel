type RemoveOptional<T, P> = T & Required<Pick<T, Extract<keyof T, P>>>;
type SetOptional<T, P> = T & Partial<Pick<T, Extract<keyof T, P>>>;
