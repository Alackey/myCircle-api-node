export default class Config {
  private static instance: Config;
  public database: string;

  constructor() { }

  static get Instance() {
    if (this.instance === null || this.instance === undefined) {
      this.instance = new Config();

      // Assign variables
      this.instance.database = "mycircle";
      if (process.env.NODE_ENV === "test") {
        this.instance.database = this.instance.database + "_test";
      }
    }
    return this.instance;
  }
}