/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { newE2EPage } from '@stencil/core/testing';
import { generateE2EUrl } from '@utils/test';
export const testFab = async (type, selector, rtl = false) => {
  try {
    const pageUrl = generateE2EUrl('fab', type, rtl);
    const page = await newE2EPage({
      url: pageUrl,
    });
    const screenshotCompares = [];
    screenshotCompares.push(await page.compareScreenshot());
    const fab = await getFabComponent(page, selector);
    await fab.click();
    await page.waitForTimeout(250);
    await ensureFabState(fab, 'active');
    screenshotCompares.push(await page.compareScreenshot('open'));
    const fabButton = await getFabButton(fab);
    await fabButton.click();
    await page.waitForTimeout(250);
    await ensureFabState(fab, 'inactive');
    screenshotCompares.push(await page.compareScreenshot('close'));
    for (const screenshotCompare of screenshotCompares) {
      expect(screenshotCompare).toMatchScreenshot();
    }
  }
  catch (err) {
    throw err;
  }
};
export const testDisabledFab = async (type, selector, rtl = false) => {
  try {
    const pageUrl = generateE2EUrl('fab', type, rtl);
    const page = await newE2EPage({
      url: pageUrl,
    });
    const screenshotCompares = [];
    screenshotCompares.push(await page.compareScreenshot('disabled'));
    const fab = await getFabComponent(page, selector);
    await fab.click();
    await ensureFabState(fab, 'inactive');
    screenshotCompares.push(await page.compareScreenshot('disabled, attempt open'));
    for (const screenshotCompare of screenshotCompares) {
      expect(screenshotCompare).toMatchScreenshot();
    }
  }
  catch (err) {
    throw err;
  }
};
const getFabComponent = async (page, selector) => {
  return page.find(selector);
};
const getFabButton = async (fabComponent) => {
  return fabComponent.find('ion-fab-button');
};
const getFabList = async (fabComponent) => {
  return fabComponent.find('ion-fab-list');
};
const ensureFabState = async (fab, state) => {
  const active = state === 'active' ? true : false;
  const fabList = await getFabList(fab);
  expect(fabList.classList.contains('fab-list-active')).toBe(active);
};
