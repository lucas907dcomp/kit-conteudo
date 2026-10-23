// Renderiza um carrossel: posts/<slug>/post.json -> posts/<slug>/slides/NN.png (1080x1350) + preview.html
// Uso: node .claude/skills/carrossel/render.mjs posts/<slug>
import { chromium } from 'playwright'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const raiz = process.cwd()
const dir = resolve(process.argv[2] ?? '')
if (!existsSync(join(dir, 'post.json'))) throw new Error(`Sem post.json em ${dir}`)
const post = JSON.parse(readFileSync(join(dir, 'post.json'), 'utf8'))
const marca = JSON.parse(readFileSync(join(raiz, 'marca/marca.json'), 'utf8'))
const tokens = readFileSync(join(raiz, 'marca/tokens.css'), 'utf8')
const css = readFileSync(new URL('./slides.css', import.meta.url), 'utf8')

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// *trecho* = destaque na cor da marca; \n = quebra de linha
const rich = (s = '') => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>').replace(/\n/g, '<br>')
const url = (p) => pathToFileURL(resolve(dir, p)).href
const logoDe = (escuro) => {
  const arq = (escuro && marca.logoClaro) || marca.logo
  return arq ? `<img class="logo-img" src="${pathToFileURL(join(raiz, 'marca', arq)).href}" alt="${esc(marca.nome)}">` : `<span class="logo-txt">${esc(marca.nome)}</span>`
}

function slideHtml(s, i, n) {
  const escuro = s.fundo === 'escuro'
  const num = s.tipo === 'cta' ? '' : `${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`
  const partes = [
    s.foto && `<figure class="foto"><img src="${url(s.foto)}"></figure>`,
    s.kicker && `<p class="kicker">${esc(s.kicker)}</p>`,
    s.titulo && `<h1>${rich(s.titulo)}</h1>`,
    s.texto && `<p class="texto">${rich(s.texto)}</p>`,
    s.itens && `<ul>${s.itens.map((t) => `<li><span class="check">✓</span>${rich(t)}</li>`).join('')}</ul>`,
    s.botao && `<p class="botao">${esc(s.botao)}</p>`,
  ].filter(Boolean).join('')
  const rodape = s.tipo === 'capa' ? 'Arraste →' : s.tipo === 'cta' ? (marca.cta ?? 'Link na bio') : ''
  return `<section class="slide tipo-${s.tipo ?? 'texto'} ${escuro ? 'escuro' : ''}">
<header>${logoDe(escuro)}<span class="num">${num}</span></header><main>${partes}</main>
${rodape ? `<footer><span>${esc(marca.instagram ?? '')}</span><span>${esc(rodape)}</span></footer>` : ''}</section>`
}

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${tokens}\n${css}</style></head>
<body>${post.slides.map((s, i) => slideHtml(s, i, post.slides.length)).join('\n')}</body></html>`
writeFileSync(join(dir, 'preview.html'), html)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } })
await page.goto(pathToFileURL(join(dir, 'preview.html')).href, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

// Medir, não confiar no olho: fontes da marca carregadas e nenhum texto estourando o slide.
const check = await page.evaluate(() => {
  const st = getComputedStyle(document.documentElement)
  const fontes = ['--fonte-titulo', '--fonte-texto'].map((v) => st.getPropertyValue(v).split(',')[0].trim().replace(/["']/g, ''))
  return {
    semFonte: fontes.filter((f) => f && !['serif', 'sans-serif'].includes(f) && !document.fonts.check(`40px "${f}"`)),
    estouro: [...document.querySelectorAll('.slide')].map((s, i) => (s.scrollHeight > s.clientHeight + 1 ? i + 1 : 0)).filter(Boolean),
  }
})
if (check.semFonte.length) throw new Error(`Fonte não carregou: ${check.semFonte.join(', ')} (confira o @import em marca/tokens.css)`)
if (check.estouro.length) throw new Error(`Texto estoura o slide: ${check.estouro.join(', ')} (encurte o texto)`)

mkdirSync(join(dir, 'slides'), { recursive: true })
const slides = await page.$$('.slide')
for (const [i, el] of slides.entries()) await el.screenshot({ path: join(dir, 'slides', `${String(i + 1).padStart(2, '0')}.png`) })
await browser.close()
console.log(`${slides.length} slides em ${join(dir, 'slides')}`)
