import { Page } from '@playwright/test';
import { TargetKeys } from '../../domain/target';
async function delay (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const authOptions = {
  'olx': {
    url: 'https://conta.olx.com.br/acesso',
    email: 'https://conta.olx.com.br/acesso',
    password: 'CV204060'
  },
  'webmotors': {
    url: 'capitalveiculos07@gmail.com',
    email: 'davifeitosa.trab@gmail.com',
    password: '40028922dD$'
  }
}

class EmailAndPasswordStrategy {
  constructor(private readonly page: Page) { }

  async authenticateWithEmailAndPassword (target: TargetKeys) {
    try {
      const { url, email, password } = authOptions[target]
      await this.page.goto(url, { waitUntil: 'commit' });
      await this.page.type("input[type='email']", email)
      await this.page.type("input[type='password']", password)
      await this.page.getByText(/^Entrar$/).click();
      await delay(1500)
      // Save signed-in state to 'storageState.json'.
      // await this.page.context().storageState({ path: './storageState.json' });
    } catch (error) {
      console.log('JÁ ESTÁ AUTENTICADO');

    }
  }
}

export class Auth extends EmailAndPasswordStrategy {
  super (page: Page) {
    this.super(page)
  }
}