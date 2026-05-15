export const APP_NAME = "lightcode";

export type Greeting = {
  name: string;
  message: string;
};

export function greet(name: string): Greeting {
  return { name, message: `Hello from ${APP_NAME}, ${name}!` };
}
