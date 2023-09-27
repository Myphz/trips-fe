export function addOptionals<T extends object>(optionals: T) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(optionals).filter(([_, val]) => !!val)) as Partial<T>;
}
