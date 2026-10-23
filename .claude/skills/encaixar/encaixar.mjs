// Preenche um modelo HTML com fotos e textos e salva um PNG por item.
// Uso: node .claude/skills/encaixar/encaixar.mjs modelos/<nome>/modelo.html <dados.json> <pasta-saida>
// modelo.html: um elemento #arte com o tamanho final; {{chave}} onde entra cada valor.
// dados.json: [{ "saida": "nome-do-png", "foto1": "fotos/oculos.png", "preco": "R$ 399" }, ...]
// Valor que termina em .png/.jpg/.jpeg/.webp vira caminho de arquivo (relativo ao dados.json).
import { chromium } from 'playwright'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

const [modeloArq, dadosArq, saida] = process.argv.slice(2).map((p) => p && resolve(p))
if (!saida) throw new Error('Uso: node encaixar.mjs <modelo.html> <dados.json> <pasta-saida>')
const modelo = readFileSync(modeloArq, 'utf8')
const itens = JSON.parse(readFileSync(dadosArq, 'utf8'))
const ehImagem = (v) => typeof v === 'string' && /\.(png|jpe?g|webp)$/i.test(v)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

mkdirSync(saida, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 1 })

for (const [i, item] of itens.entries()) {
  const html = modelo.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    const v = item[k]
    if (v === undefined) throw new Error(`Item ${i + 1}: falta a chave "${k}" no dados.json`)
    if (!ehImagem(v)) return esc(v)
    const arq = resolve(dirname(dadosArq), v)
    if (!existsSync(arq)) throw new Error(`Item ${i + 1}: foto não encontrada: ${arq}`)
    return pathToFileURL(arq).href
  })
  // O HTML temporário fica ao lado do modelo para fontes e imagens relativas do modelo funcionarem.
  const tmp = join(dirname(modeloArq), '.render.html')
  writeFileSync(tmp, html)
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const arte = await page.$('#arte')
  if (!arte) throw new Error('O modelo precisa de um elemento com id="arte"')
  const { w, h } = await arte.evaluate((el) => ({ w: el.offsetWidth, h: el.offsetHeight }))
  await page.setViewportSize({ width: w, height: h })
  // Medir: nenhuma imagem quebrada e nenhum texto estourando a caixa dele.
  const prob = await page.evaluate(() => [
    ...[...document.images].filter((im) => !im.complete || !im.naturalWidth).map((im) => `imagem quebrada: ${im.src.slice(-60)}`),
    ...[...document.querySelectorAll('[data-texto]')].filter((el) => el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1).map((el) => `texto estoura: ${el.dataset.texto}`),
  ])
  if (prob.length) throw new Error(`Item ${i + 1}: ${prob.join('; ')}`)
  const nome = item.saida ?? String(i + 1).padStart(2, '0')
  await arte.screenshot({ path: join(saida, `${nome}.png`) })
  console.log(`ok ${nome}.png (${w}x${h})`)
}
await browser.close()
