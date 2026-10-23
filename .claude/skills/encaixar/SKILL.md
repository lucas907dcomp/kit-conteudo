---
name: encaixar
description: Coloca fotos de produto (óculos) dentro de um modelo de arte que a loja já usa, com os espaços para cada foto, preço e texto, e gera um PNG por arte em lote. Use quando pedirem "coloca os óculos no modelo", "faz as artes dos produtos", "preenche o modelo com essas fotos", "arte de vitrine".
---

# Encaixar produto no modelo

Motor: `encaixar.mjs` (nesta pasta). Um modelo HTML com `{{chave}}` + uma lista em JSON → um PNG por item.
Exemplo completo: `modelos/exemplo/` (rodar e olhar antes de montar o primeiro modelo real).

## 1. Transformar o modelo do dono em HTML (uma vez por modelo)
O dono manda o modelo (PNG, PDF ou print do Canva). **Recrie em HTML** em `modelos/<nome>/modelo.html`, não cole
foto em cima de PNG: em HTML o texto fica nítido, o preço muda sem refazer arte e as cores vêm de `marca/tokens.css`.
- Elemento `id="arte"` com o tamanho final (feed 1080×1350, story 1080×1920, quadrado 1080×1080).
- `{{foto1}}`, `{{foto2}}`... em cada espaço de foto; `{{preco}}`, `{{nome}}`... nos textos.
- Texto que pode crescer recebe `data-texto="nome"` e caixa com tamanho fixo: o script falha se estourar.
- **Meça o original**: posições e tamanhos dos espaços em px no PNG dele (abra e meça), não de olho.
- Confira: renderize com fotos de teste e ponha lado a lado com o original. Só siga quando bater.
- Se o modelo tiver elementos de imagem (textura, moldura), recorte do original para `modelos/<nome>/` e use no HTML.

## 2. Preparar as fotos dos óculos
- Melhor caso: foto em fundo branco ou transparente, produto de frente, mesma luz em todas.
- Recorte de fundo, se precisar: `pip install "rembg[cpu]"` e `rembg i entrada.jpg saida.png`. **Lente transparente
  costuma sair mal no recorte**: olhar cada uma ampliada; se a lente sumiu, use a foto com fundo branco e `object-fit: contain`.
- Nunca "melhorar" o produto com IA (mudar cor, formato, marca): é o que o cliente vai receber.

## 3. Gerar em lote
`dados.json` em `modelos/<nome>/` (ou junto das fotos): `[{ "saida": "rayban-aviador", "foto1": "fotos/a.png", "preco": "R$ 399" }]`
`node .claude/skills/encaixar/encaixar.mjs modelos/<nome>/modelo.html <dados.json> saida/<lote>`
Preço e nome só os que o dono passou. Nunca inventar preço nem "desconto".

## 4. Olhar e entregar
Montar uma folha de contato de todo o lote e olhar cada arte (produto centralizado? cortado? texto legível?).
Mostrar ao dono. Aprovado: copiar para `posts/` e commitar.
