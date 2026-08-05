import { test, expect } from '@playwright/test';

test('Teste de QA - Gabriel Fernandes Debiasi - EWEB-1383', async ({ page }) => {

  test.setTimeout(120000);

  await page.goto('https://eweb-1383.staging.zweb.com.br/#/sign-in');

  await page.getByRole('textbox', { name: 'E-mail' })
    .fill('TestesQa@gmail.com');

  await page.locator('input[type="password"]')
    .fill('Sarco2020!');

  await page.getByRole('button', { name: 'Entrar' })
    .click();

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  await page.locator('#z_app_header_wrapper')
    .getByText('Fiscal', { exact: true })
    .click();

  await page.waitForTimeout(3000);

  await page.getByRole('link', { name: 'NF-e' })
    .click();

  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Cadastrar NF-e' })
    .first()
    .click();

  await page.waitForTimeout(5000);
  await page.getByRole('button')
    .nth(4)
    .click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Venda de Produtor Rural', exact: true })
    .getByLabel('-searchbox')
    .fill('Venda de Produtor Rural');
  await page.waitForTimeout(4000);

  await page.getByText('Venda de Produtor Rural', { exact: true })
    .last()
    .click();

  await page.waitForTimeout(3000);

  await page.keyboard.press('Enter');

  await page.waitForTimeout(5000);

  await page.getByRole('button', { name: 'Normal' })
    .getByLabel('-searchbox')
    .press('Enter');

  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'TestesQa@gmail.com' })
    .getByLabel('-searchbox')
    .press('Enter');


  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Destinatário' })
    .click();

  await page.waitForTimeout(3000);

  await page.getByLabel('Destinatário')
    .getByRole('textbox', { name: '-searchbox' })
    .fill('zucchetti');

  await page.waitForTimeout(5000);

  await page.getByLabel('Destinatário')
    .getByRole('textbox', { name: '-searchbox' })
    .press('Enter');

  await page.waitForTimeout(7000);

  await page.getByRole('button', { name: /Itens/ })
    .click();
  await page.waitForTimeout(3000);

  await page.getByRole('button')
    .filter({ hasText: 'Digite descrição, código, có' })
    .click();

  await page.waitForTimeout(2000);
  const campoProduto = page.getByLabel('Itens R$')
    .getByRole('textbox', { name: '-searchbox' });

  await campoProduto.fill('17-2');

  await campoProduto.press('Enter');

  await page.waitForTimeout(5000);

  await expect(
    page.getByText('17-2')
  ).toBeVisible();

  await page.getByRole('textbox', { name: 'Quantidade' })
    .press('Enter');

  await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Valor unitário R$' })
    .press('Enter');

  await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Desconto' })
    .press('Enter');

  await page.waitForTimeout(5000);

  await page.getByRole('button', { name: 'Formas de pagamento' })
    .click();
  await page.waitForTimeout(3000);

  await page.getByRole('button', { name: 'Transmitir' })
    .click();

  await page.waitForTimeout(5000);

  await page.getByText('Visualizar DANFE', { exact: false })
    .click();

  await page.waitForTimeout(3000);

  const page1Promise = page.waitForEvent('popup');

  await page.locator('#modal-wrapper')
    .getByRole('button', { name: 'Transmitir' })
    .click();

  const page1 = await page1Promise;

  await page1.waitForLoadState('networkidle');

  await page1.waitForTimeout(8000);

  await expect(page1)
    .toHaveURL(/.*/);

  console.log(
    'Fluxo E2E executado: emissão de NF-e utilizando produto com controle por grade.'
  );


});