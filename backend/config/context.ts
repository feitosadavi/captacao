import { chromium, Page } from '@playwright/test';
import path from 'path';
import { Auth } from '../olx/modules/Auth';

type InitBrowserOptions = {
  auth?: boolean
  viewport?: {
    width?: number,
    height?: number
  }
}

async function initBrowser (options?: InitBrowserOptions) {
  return new Promise<Page>(async (resolve, reject) => {
    try {
      const storageStatePath = path.resolve(__dirname, './storageState.json')

      const browser = await chromium.launch({ headless: false })

      const width = options?.viewport?.width ?? 500
      const height = options?.viewport?.height ?? 1200
      const ctx = await browser.newContext({ viewport: { width, height }, storageState: storageStatePath })

      const page = await ctx.newPage()

      if (options?.auth) {
        const auth = new Auth(page);
        await auth.authenticateWithEmailAndPassword()
        // Save signed-in state to 'storageState.json'.
        await page.context().storageState({ path: storageStatePath });
      }

      resolve(page)
    } catch (error) {
      reject(error)
    }
  })
}

export { initBrowser }