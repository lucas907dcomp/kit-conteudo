# Kit de conteúdo para Instagram (Claude Code)

Imagens de produto, carrosséis e vídeos curtos no padrão premium, feitos pelo Claude Code.
Vem com o que já foi aprendido fazendo isso de verdade: os motores, o processo e as regras.

## Instalar no Mac (uma vez)
1. Instale o **Claude Code**: siga https://docs.claude.com/claude-code (o instalador oficial) e faça login.
2. Instale o **Homebrew** (https://brew.sh) e o **Google Chrome**, se ainda não tiver.
3. No Terminal:
   ```bash
   git clone https://github.com/lucas907dcomp/kit-conteudo ~/kit-conteudo
   cd ~/kit-conteudo
   bash setup.sh
   claude
   ```
4. Dentro do Claude Code, comece por: **`/marca`** (monta as cores, fontes e o perfil da loja).

## O que pedir
| Você fala | O que acontece |
|---|---|
| `/marca` | Monta o design system da loja a partir do logo, das fotos e de 4 perguntas |
| `/encaixar` + o seu modelo + as fotos | Recria o seu modelo e coloca cada óculos nele, um PNG por produto |
| `/carrossel` + o tema | Ideia → aprovação → slides prontos + legenda |
| `/video` + a ideia | Ideia e storyboard → aprovação → vídeo animado com voz e trilha |

Para testar agora, sem nada da loja:
```bash
node .claude/skills/encaixar/encaixar.mjs modelos/exemplo/modelo.html modelos/exemplo/dados.json saida/teste
node .claude/skills/carrossel/render.mjs posts/exemplo
```

## Onde fica cada coisa
- `marca/`: cores, fontes e logo (fonte única de tudo)
- `cerebro/`: o que o Claude sabe da loja, as correções que você fez e o que já foi postado. Ele mesmo mantém.
- `modelos/`: modelos de arte · `posts/`: carrosséis · `videos/`: vídeos
- `.env`: chaves de API (ElevenLabs, para voz). Você cola a chave lá; nunca no chat.

## Custos
Carrossel e encaixe: zero. Vídeo sem voz: zero. Voz, trilha e efeitos: créditos da ElevenLabs (opcional).
