var wd = require('macaca-wd')
const browser = 'electron'
describe('macaca desktop sample', function() {
  this.timeout(5 * 60 * 1000);
  const driver = wd.promiseChainRemote({
    host: 'localhost',
    port: process.env.MACACA_SERVER_PORT || 3456
  });
  const initialURL = 'https://www.baidu.com';

  before(() => {
    return driver
      .init({
          platformName: 'desktop',
          browserName: browser,
          userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0 Safari/537.36 Macaca Custom UserAgent',
          deviceScaleFactor: 2
      })
      .setWindowSize(1280, 1280)
  });

  it('#0 should go into macaca', function() {
    return driver
      .get(initialURL)
      .sleep(3000);
  });

  it('#1 should works with macaca', function() {
    return driver
      .elementById('kw')
      .sendKeys('macaca')
      .sleep(3000)
      .elementById('su')
      .click()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('macaca');
      })
      .takeScreenshot();
  });

  it('#2 should go into web', function() {
    return driver
      .get(initialURL)
      .sleep(3000);
  });

  it('#3 should works with web', function() {
    return driver
      .elementById('kw')
      .sendKeys('TesterHome')
      .sleep(3000)
      .elementById('su')
      .click()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('TesterHome');
      })
      .takeScreenshot();
  });

  after((done) => {
    return driver
      .quit(done);
  });
});