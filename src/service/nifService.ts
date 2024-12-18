import puppeteer from 'puppeteer';
import { Nif } from '../Model/nif';

export async function consultarNif(nif: string): Promise<Nif> {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://portaldocontribuinte.minfin.gov.ao/consultar-nif-do-contribuinte', {
        timeout: 60000, // 60 segundos
        waitUntil: 'domcontentloaded',
      });
    // Aguarde o carregamento completo da página
    await page.waitForSelector('input[id="j_id_2x:txtNIFNumber"]');

    // Insira o NIF no campo de entrada
    await page.type('input[id="j_id_2x:txtNIFNumber"]', nif);

    // Clique no botão de pesquisar
    await page.click('button[id="j_id_2x:j_id_34"]');

    // Aguarde a resposta ser renderizada
    await page.waitForSelector('div.panel-default-header');

    // Extraia os dados da resposta
    const resultado = await page.evaluate(() => {
        const getText = (labelSelector: string): string => {
          const labelElement = document.querySelector(labelSelector);
          return labelElement?.textContent?.trim() || '';
        };
      
        const nif = getText('#taxPayerNidId');
        const nome = getText('div.form-group:nth-child(3) .col-sm-6:last-child label');
        const tipo = getText('div.form-group:nth-child(4) .col-sm-6:last-child label');
        const estado = getText('div.form-group:nth-child(5) .col-sm-6:last-child label');
        const regimeIva = getText('div.form-group:nth-child(6) .col-sm-6:last-child label');
        const residenciaFiscal = getText('div.form-group:nth-child(7) .col-sm-6:last-child label');
      
        return { nif, nome, tipo, estado, regimeIva, residenciaFiscal };
      });
      

    await browser.close();

    return resultado as Nif;
  } catch (error) {
    console.error('Erro ao consultar o NIF:', error);
    throw new Error('Erro ao consultar o NIF.');
  }
}
