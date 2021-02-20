import { Config, browser, protractor } from 'protractor';
import jasmineReporters = require('jasmine-reporters');

const reportsDirectory = './reports';
const dashboardReportDirectory = reportsDirectory + '/dashboardReport';

export let config: Config = {
  framework: 'jasmine',
  SELENIUM_PROMISE_MANAGER: false,
  capabilities: {
    browserName: 'chrome'
  },
  specs: [
    './tests/st01-spec.js',
    // './tests/st02-spec.js',
    // './tests/st04-spec.js'
  ],
  // allScriptsTimeout: 5000,
  jasmineNodeOpts: {
    showColors: true,
    // defaultTimeoutInterval: 10000,
    isVerbose: true
  },

  noGlobals: true,
  restartBrowserBetweenTests: true,

  onPrepare: function() {
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: reportsDirectory + '/xml',
        filePrefix: 'xmlOutput'
      })
    );

    const fs = require('fs-extra');
    if (!fs.existsSync(dashboardReportDirectory)) {
      fs.mkdirSync(dashboardReportDirectory);
    }

    jasmine.getEnv().addReporter({
      suiteStarted: function(result) {
        console.log(
          '++ Suite started: ' +
            result.description
        );
      },
      specStarted: function(result) {
        console.log(
          '-> Spec started: ' +
            result.description
        );
      },
      specDone: function(result) {
        console.log('= Spec: ' + result.description + ' was ' + result.status);

        for (let i = 0; i < result.failedExpectations.length; i++) {
          console.log('Failure: ' + result.failedExpectations[i].message);
          console.log(result.failedExpectations[i].stack);
        }

        console.log(result.passedExpectations.length);
        if (result.status === 'failed') {
          browser.getCapabilities().then(async function(caps) {
            const browserName = caps.get('browserName');

            await browser.takeScreenshot().then(async function(png) {
              const stream = fs.createWriteStream(
                dashboardReportDirectory +
                  '/' +
                  browserName +
                  '-' +
                  result.fullName +
                  '.png'
              );
              await stream.write(new Buffer(png, 'base64'));
              await stream.end();
            });
          });
        }
      }
    });
  },

  onComplete: function() {
    let browserName: any, browserVersion;
    const capsPromise = browser.getCapabilities();

    capsPromise.then(function(caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      const platform = caps.get('platform');

      const HTMLReport = require('protractor-html-reporter-2');
      const testConfig = {
        reportTitle: 'Relatório de Testes Automatizados',
        outputPath: dashboardReportDirectory,
        outputFilename: 'index',
        screenshotPath: './',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from(
        reportsDirectory + '/xml/xmlOutput.xml',
        testConfig
      );
    });
  }
};

