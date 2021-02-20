import { TestCase } from './trt15-test-case';
import { browser } from 'protractor';

export abstract class TestSuite {
  private name: string;

  public testCases: TestCase[];

  constructor(name: string) {
    this.name = name;
    this.init();
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public addTestCase(testCase: TestCase) {
    this.testCases.push(testCase);
  }
  public addAllTestCases(testCases: TestCase[]) {
    this.testCases = testCases;
  }

  public getTestCases(): TestCase[] {
    return this.testCases;
  }

  protected abstract init(): void;

  async run(): Promise<void> {
    describe(this.getName(), () => {
      browser.waitForAngularEnabled(false);
      // afterEach(async function(done) {
      //   done();
      // }, 6000);
      for (const tc of this.testCases) {
        it(tc.getName(), async (done) => {
          setTimeout(function() {
            done();
          }, tc.defaultTimeout);
          await tc.run();
          done();
        });
      }
    });
  }
}
