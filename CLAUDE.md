# Kit de conteúdo · como trabalhar aqui

Pasta de conteúdo da loja: imagens de produto, carrosséis e vídeos curtos para o Instagram, no padrão premium.
**Responda sempre em português do Brasil.** Resposta curta, recomendação direta (escolha e justifique; não dê menu).

## Antes de qualquer peça, ler
- `cerebro/loja.md`: quem é a loja, público, tom, o que vende. Se estiver vazio, rodar `/marca` primeiro.
- `marca/tokens.css` + `marca/marca.json`: as cores, fontes e logo. **Fonte única.** Nunca escrever cor ou fonte solta numa peça.
- `cerebro/licoes.md`: correções que o dono já fez. Não repetir erro registrado ali.

## Skills deste kit
| Pedido | Skill |
|---|---|
| "organiza minha marca", "design system", cores e fontes | `/marca` |
| "coloca os óculos no modelo", "faz as artes dos produtos" | `/encaixar` |
| "faz um carrossel" | `/carrossel` |
| "faz um vídeo/Reels" | `/video` (usa a skill `motionmaxxing`) |

## Regras que custaram caro para aprender
- **Olhe o resultado antes de dizer que terminou.** Toda peça gera PNG/MP4: abra, monte uma folha de contato (`ffmpeg -i slides/%02d.png -vf "scale=360:-1,tile=8x1" folha.png`) e olhe. Os scripts medem fonte carregada e texto estourando; o resto é olho.
- **Meça o que é mensurável** (tamanho, cor, posição, duração). Ajuste de olho erra.
- **Vídeo se revisa em passos fixos de 0,5s**, do início ao fim, quadro a quadro. Amostra solta deixa passar erro grosseiro.
- **Nunca invente número** (preço, desconto, "90% dos clientes"...). Ou veio do dono, ou de fonte real, ou não entra.
- **Só prometa o que a loja faz.** Prazo, garantia, parcelamento, frete: confirmar com o dono antes de escrever.
- **Mesma tese, cena diferente.** Antes de criar, olhe o que já foi postado (`posts/`). Dois posts seguidos com a mesma cena parecem cópia.
- **Foto de produto nunca disputa com o título.** Foto emoldurada, fundo limpo, uma estrela por slide.
- **Gerar imagem/voz com IA custa dinheiro:** conferir o custo antes de gerar lote. Nunca assinar plano ou "free trial" sem o dono mandar.
- **Nada é publicado sem o dono aprovar** a peça final. Postar, enviar e apagar: sempre confirmar antes.
- **Nunca pedir senha nem chave no chat.** Chave de API vai no arquivo `.env` (o dono cola lá).
- **Instalar antes de criar:** procure skill/biblioteca pronta antes de escrever do zero.

## Memória (`cerebro/`)
Tudo que o dono disser de novo e for durar vai para lá **na hora**, com 1 linha avisando:
- fato da loja, produto, preço, público, decisão → `cerebro/loja.md`
- correção do dono no trabalho → `cerebro/licoes.md` (data + o que errou + como fazer)
- o que foi postado e como foi → `cerebro/postados.md`
Ao fechar um trabalho, conferir se algo dito ficou sem registro.

## Organização
`posts/<AAAA-MM-DD>-<slug>/` (carrossel) · `videos/<AAAA-MM-DD>-<slug>/` · `modelos/<nome>/` · `saida/` (temporário, fora do git).
Commitar ao fim de cada peça aprovada.
