import {AppPage} from './app.po';
import {browser, logging} from 'protractor';
import * as axe from 'axe-core';
import * as assert from 'assert';
import {AxeResults} from 'axe-core';
import {throws} from 'assert';
import any = jasmine.any;

describe('workspace-project App', () => {
  let page: AppPage;

  async function printAxeRuleSet() {

    // @ts-ignore
    const ruleSet: string = await browser.executeAsyncScript((resolve: any) => {
      resolve(JSON.stringify(axe.getRules(), null, 1));
    }) as Promise<AxeResults>;

    console.log('### Ruleset:' + ruleSet);
  }

  function prepareAxeTests() {
    // Auf ausstehende ticks warten
    browser.pause(50);
    browser.executeScript(axe.source);
  }

  async function pruefeBarrierefreiheit(): Promise<AxeResults> {

    // @ts-ignore
    const result: AxeResults = await browser.executeAsyncScript((resolve: any) => {
      axe.run({exclude: []}, {}, (error, results) => {
        if (error) {
          throw error;
        }
        resolve(results);
      });
    }) as Promise<AxeResults>;

    return result;
  }


  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Präsentation');
  });

  it('Prüfe Barrierefreiheit im default Zustand', async () => {

    page.navigateTo();
    prepareAxeTests();
    // printAxeRuleSet();
    const results = await pruefeBarrierefreiheit();
    assert.equal(results.violations.length, 0,
      `Axe: Folgende ${results.violations.length} Fehler gefunden: ${JSON.stringify(results.violations, null, 1)}`
    );
  });

  it('Prüfe Barrierefreiheit nach Aktion', async () => {
    page.navigateTo();
    await page.clickPraesentationButton();
    // browser.pause(500);
    prepareAxeTests();
    // printAxeRuleSet();
    const results = await pruefeBarrierefreiheit();
    assert.equal(results.violations.length, 0,
      `Axe: Folgende ${results.violations.length} Fehler gefunden: ${JSON.stringify(results.violations, null, 1)}`
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
