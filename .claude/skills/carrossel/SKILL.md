---
name: carrossel
description: Cria carrossel de Instagram (1080x1350) na marca da loja, do tema ao PNG final e legenda. Use quando pedirem "faz um carrossel", "post de vários slides", "conteúdo para salvar", "post educativo".
---

# Carrossel

Motor: `render.mjs` (nesta pasta) lê `posts/<slug>/post.json` e gera `slides/NN.png`. Exemplo: `posts/exemplo/`.

## 1. Ideia antes do slide
- Ler `cerebro/loja.md` e `cerebro/postados.md` (não repetir tema nem cena de post recente).
- Uma ideia por carrossel, com um gancho que pare o dedo na capa. Bons tipos para ótica: guia (formato do rosto,
  como cuidar da lente), bastidor (ajuste da armação, exame), produto (coleção nova), dúvida de cliente (grau vs sol, blue light).
- Fato técnico (saúde ocular, lente, proteção UV) só com fonte confiável, citada para o dono. Nada de promessa de saúde.
- Mostrar ao dono: gancho + 1 linha por slide. Ajustar antes de montar.

## 2. post.json
```json
{ "tema": "...", "slides": [
  { "tipo": "capa", "fundo": "escuro", "kicker": "Guia rápido", "titulo": "Texto com *destaque*." },
  { "tipo": "texto", "foto": "foto.png", "titulo": "...", "texto": "..." },
  { "tipo": "texto", "titulo": "...", "itens": ["...", "..."] },
  { "tipo": "cta", "fundo": "escuro", "titulo": "...", "texto": "...", "botao": "Chamar no direct" } ] }
```
`tipo`: capa | texto | cta · `fundo`: "escuro" ou nada (claro) · `*trecho*` = cor da marca · `\n` = quebra · `foto` relativo ao post.
5 a 8 slides. No máximo dois fundos por post (claro + escuro). Título curto: se não cabe, o script avisa; encurte, não diminua a fonte.

## 3. Render e olhar
`node .claude/skills/carrossel/render.mjs posts/<slug>` → montar folha de contato dos slides → olhar → corrigir.
Legenda em `posts/<slug>/legenda.md`: gancho na 1ª linha, corpo curto, CTA (direct/link na bio/visite a loja), 3–5 hashtags do nicho.

## 4. Aprovação
Mostrar folha + legenda ao dono. Aprovado: commit e registrar em `cerebro/postados.md`.
