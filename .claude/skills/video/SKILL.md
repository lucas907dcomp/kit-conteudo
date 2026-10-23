---
name: video
description: Faz vídeo curto/Reels premium da loja (1080x1920, 10 a 25s) com animação em código, voz e trilha, usando a skill motionmaxxing com as regras da marca. Use quando pedirem "faz um vídeo", "Reels", "vídeo de lançamento", "vídeo da coleção".
---

# Vídeo da loja

**Motor: skill `motionmaxxing`** (instalada pelo `setup.sh` em `.claude/skills/motionmaxxing`). Siga o processo dela à risca;
esta skill só acrescenta o que aprendemos usando-a de verdade. Se ela não estiver instalada, pare e rode `bash setup.sh`.

## O que faz o vídeo ficar premium
- **A ideia vale mais que o efeito.** Um objeto da marca que atravessa o filme inteiro e muda de sentido
  (no nosso melhor vídeo foi um relógio: a hora da pergunta virou a hora da resposta). Para ótica: a armação que entra
  em foco, a lente que muda o que se vê, o reflexo na lente. Sem ideia forte, faça carrossel.
- **Mostre a ideia e o storyboard ao dono antes de produzir** (o processo da skill já pede: 3 ideias, uma escolhida,
  tabela de batidas com o que cada uma "compra").
- Cores e fontes de `marca/tokens.css`; o inventário de marca da skill pode capturar do site/Instagram da loja.
- Produto real: use as fotos dos óculos de verdade (recortadas). Não gerar óculos com IA.

## Voz, trilha e efeitos (opcional, ElevenLabs)
- Chave em `.env` como `ELEVENLABS_API_KEY` (o dono cola; nunca no chat). Sem chave, o vídeo sai sem voz: ainda funciona.
- Narração inteira **numa chamada só** (`voice.py vo`), não frase por frase: o tom fica contínuo.
  Ênfase com palavra em MAIÚSCULA. Gerar 3 tomadas e o dono escolhe ouvindo.
- O vídeo segue a voz: marque os cortes nos tempos das palavras (`.words.json`), não o contrário.
- Trilha: `voice.py music` + `music-fit --loop-bars` (sem silêncio no fim). Mix com `mix.py --duck --tp -1.8`.

## Pegadinhas do runtime (custaram horas)
- Dois `M.count` (ou dois tweens na mesma propriedade) no mesmo elemento brigam: use dois elementos e troque com `M.cut`.
- `M.words` reescreve o HTML de dentro do elemento (apaga spans filhos).
- Movimento contínuo (`M.drift`) e `M.camera` no mesmo elemento conflitam: separe em wrappers.
- Portão G3 (fecho parado demais) falha se o final ficar estático: suba o bloco final devagar em vez de só esperar.
- Os portões (`look.py`, `lint.mjs`) que falham se corrigem; não se argumenta com eles.

## Entrega
`videos/<data>-<slug>/final.mp4` + capa (`00-capa.png`, quadro do gancho) + legenda. Revisão em passos de 0,5s
(folha de contato) antes de mostrar. Dono aprova, commit, registrar em `cerebro/postados.md`.
