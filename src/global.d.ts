import messages from "../messages/en.json";

declare module "next-intl" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AppConfig {
    Messages: typeof messages;
  }
}
