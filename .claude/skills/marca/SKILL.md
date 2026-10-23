---
name: marca
description: Monta ou ajusta o design system da loja (cores, fontes, logo, tom) e grava em marca/tokens.css, marca/marca.json e cerebro/loja.md. Use quando pedirem "organiza minha marca", "design system", "cores da loja", "minha identidade visual", ou quando cerebro/loja.md estiver vazio antes da primeira peça.
---

# Marca da loja

Resultado: `marca/tokens.css` (cores e fontes), `marca/marca.json` (nome, @, logo), `cerebro/loja.md` (quem é a loja) e
uma folha de prova `marca/prova.png`. Tudo no kit lê daqui; peça nenhuma escreve cor solta.

## 1. Coletar o que já existe (antes de perguntar)
Peça ao dono e olhe com atenção: logo (PNG/SVG, de preferência com fundo transparente), fotos da loja e dos produtos,
o Instagram atual, uma arte que ele já goste (inclusive o modelo que ele usa hoje). **Extraia as cores medindo**,
não de olho: `python3 -c "from PIL import Image; im=Image.open('arq.png').convert('RGB').quantize(6); print(im.getpalette()[:18])"`.

## 2. Briefing curto (uma pergunta por vez, com exemplo)
1. O que a loja vende e para quem? ("óculos de grau e sol, público 25–45, centro da cidade")
2. Três palavras para como a loja quer ser vista. ("clássica, acessível, atenciosa")
3. Uma marca que ele admira o visual. (vira referência de tom, nunca cópia)
4. O que nunca faria. ("nada de neon", "nada de 'promoção imperdível'")
Grave as respostas em `cerebro/loja.md` na hora.

## 3. Propor (mostrar, não descrever)
- **Cores:** 1 cor da marca (destaque) + 1 fundo claro + 1 fundo escuro + texto. A cor da marca só aparece em destaque,
  botão e detalhe; nunca como fundo inteiro. Contraste de texto ≥ 4,5:1 (medir: skill `color-expert` se instalada, ou calcular).
- **Fontes (Google Fonts):** uma para título com personalidade (serifada elegante, ou grotesca forte) + uma neutra para texto.
  Óculos/moda costumam ir bem com serifa fina no título.
- Preencher `marca/tokens.css` (mesmas variáveis do arquivo atual) e `marca/marca.json`. Logo em `marca/`, com versão
  clara para fundo escuro em `logoClaro` se precisar.
- Rodar a prova: `node .claude/skills/carrossel/render.mjs posts/exemplo` + o modelo de exemplo do `/encaixar`, montar
  `marca/prova.png` lado a lado e mostrar. Propor no máximo 2 direções; o dono escolhe.

## 4. Fechar
Gravar a escolha e o porquê em `cerebro/loja.md` (seção "Marca"). Commit.
