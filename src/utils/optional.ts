export function addOptionals<T>(optionals: Record<string, T>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(optionals).filter(([_, val]) => !!val));
}
