#!/usr/bin/env bash
# Instala o que o kit precisa no Mac. Pode rodar de novo sem medo: o que já existe é pulado.
set -euo pipefail
cd "$(dirname "$0")"

command -v brew >/dev/null || { echo "Falta o Homebrew. Instale em https://brew.sh e rode este script de novo."; exit 1; }
for f in node ffmpeg python pillow; do brew list "$f" >/dev/null 2>&1 || brew install "$f"; done
[ -d "/Applications/Google Chrome.app" ] || echo "AVISO: instale o Google Chrome (o vídeo usa ele para renderizar)."

npm install --silent
npx playwright install chromium

# Skill de vídeo (terceiros, Apache-2.0): baixa e copia para o projeto.
if [ ! -f .claude/skills/motionmaxxing/SKILL.md ]; then
  tmp="$(mktemp -d)"
  git clone --depth 1 https://github.com/Tejashmakwana/motionmaxxing "$tmp/mm"
  bash "$tmp/mm/install.sh" --copy --dir "$PWD/.claude/skills/motionmaxxing" || echo "AVISO: veja acima o que falta para o motionmaxxing."
  rm -rf "$tmp"
fi

[ -f .env ] || printf '# Chaves de API (nunca vai para o git)\nELEVENLABS_API_KEY=\n' > .env
echo "Pronto. Abra o Claude Code nesta pasta (claude) e peça: /marca"
