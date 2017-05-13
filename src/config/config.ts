export default class Config {
  private static instance: Config;
  public usersTable: string;

  constructor() { }

  static get Instance() {
    if (this.instance === null || this.instance === undefined) {
      this.instance = new Config();

      // Assign variables
      this.instance.usersTable = "users";
      if (process.env.NODE_ENV === "test") {
        this.instance.usersTable = this.instance.usersTable + "_test";
      }
    }
    return this.instance;
  }
}