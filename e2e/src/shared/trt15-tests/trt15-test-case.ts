import { Trt15PageObject } from './trt15-page-object';
import path = require('path');

export abstract class TestCase {
  protected name: string;
  protected path = path;
  protected pageObject: Trt15PageObject;
  public defaultTimeout = 20000;

  public constructor(pageObject: Trt15PageObject) {
    this.name = path.basename(__filename);
    this.pageObject = pageObject;
  }

  public abstract async setup(): Promise<void>;

  public abstract async execute(): Promise<void>;

  public abstract async eval(): Promise<void>;

  async run() {
    await this.setup();
    await this.execute();
    await this.eval();
  }

  public getName(): string {
    return this.name;
  }

  async getSpec() {
    this.setup();
    await this.execute().then(async () => {
      await this.eval();
    });
  }
}
