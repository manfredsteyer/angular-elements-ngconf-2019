import {AppPage} from './app.po';
import {browser, logging} from 'protractor';
import * as axe from 'axe-core';
import * as assert from 'assert';
import {AxeResults} from 'axe-core';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Präsentation');
  });

  it('prüfe Barrierefreiheit', async () => {
    page.navigateTo();
    browser.executeScript(axe.source);


    // @ts-ignore
    const result: AxeResults = await browser.executeAsyncScript((resolve: any) => {

      axe.run({exclude: []}, {}, (error, results) => {
        if (error) {
          throw error;
        }
        resolve(results);
      });
    }) as Promise<AxeResults>;

    assert.equal(result.violations.length, 0,
      `Axe: Folgende ${result.violations.length} Fehler gefunden: ${JSON.stringify(result.violations, null, 1)}`
    );

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
