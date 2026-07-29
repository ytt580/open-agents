---
name: remotion-video
description: Cria vídeos profissionais usando Remotion (React). Templates para highlights, reels, TikTok, YouTube. Estilo Bero o Dev (programação cartoon 2D). 50+ transições, efeitos, animações, áudio de URL, textos cinemáticos e exportação para todas plataformas.
license: MIT
metadata:
  author: jhon
  version: 2.0
---

# Remotion Video Creator Pro

Crie vídeos profissionais com código React usando Remotion. Suporte completo a transições, efeitos, áudio e exportação multiplataforma.

---

## Quando Usar

- Criar highlights (futebol, esports, vídeos virais)
- Gerar Reels/TikTok/Shorts automaticamente
- Editar vídeos com transições profissionais
- Adicionar textos animados e legendas sincronizadas
- Compilar melhores momentos
- Criar vídeos antes/depois
- Adicionar áudio de URL ou arquivo local
- Tutoriais com gravação de tela + avatar cartoon
- Vídeos com voz clonada + memes

---

## Caminhos dos Arquivos (Importante!)

| Arquivo | Caminho |
|---------|---------|
| **Memes** | `~/.config/opencode/assets/memes/` |
| **Personagem SVG** | `~/.config/opencode/assets/personagem/` |
| **Screenshots** | `~/.config/opencode/assets/screenshots/` |
| **Áudio clonado** | `~/.config/opencode/assets/audio/` |

**Como usar:**
```tsx
// Memes
import meme1 from '~/.config/opencode/assets/memes/meme1.png';

// Personagem
import { BeroCharacter } from '~/.config/opencode/assets/personagem/BeroCharacter';

// Screenshots
import tela1 from '~/.config/opencode/assets/screenshots/tela1.png';
```

---

## Setup Rápido

```bash
# Criar novo projeto
npx create-video@latest meu-video
cd meu-video

# Instalar dependências extras
npm install @remotion/transitions @remotion/media-utils

# Baixar áudio de URL
yt-dlp -x --audio-format mp3 "URL_AQUI" -o audio.mp3

# Preview ao vivo
npx remotion studio

# Renderizar vídeo final
npx remotion render src/index.ts VideoFinal out/video.mp4
```

---

## 🎨 ESTILOS DE VÍDEO

### Estilo 1: Kinetic Typography (Texto Animado Principal)

Texto que se move como elemento central. Ideal para ads, explicações, frases virais.

```tsx
// src/KineticText.tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

type Props = { text: string; color?: string };

export const KineticText: React.FC<Props> = ({ text, color = '#fff' }) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');

  return (
    <AbsoluteFill style={{
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {words.map((word, i) => {
          const delay = i * 5;
          const opacity = interpolate(frame, [delay, delay + 10], [0, 1]);
          const y = interpolate(frame, [delay, delay + 10], [50, 0]);
          const scale = interpolate(frame, [delay, delay + 10], [0.5, 1]);
          return (
            <span key={i} style={{
              color,
              fontSize: 80,
              fontWeight: 'bold',
              opacity,
              transform: `translateY(${y}px) scale(${scale})`,
            }}>
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```

### Estilo 2: Retro/VHS

Textura de fita VHS, grain, cores quentes.

```tsx
// Efeito VHS overlay
<AbsoluteFill style={{
  background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
  mixBlendMode: 'overlay',
  opacity: 0.3,
}} />

// Scanlines
<AbsoluteFill style={{
  background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
}} />

// Grain effect
<AbsoluteFill style={{
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
  opacity: 0.2,
}} />
```

### Estilo 3: Cinematic Letterbox

Barras pretas cinematográficas + color grading.

```tsx
// Letterbox
<AbsoluteFill>
  <OffthreadVideo src="video.mp4" />
  {/* Barra superior */}
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100, background: '#000' }} />
  {/* Barra inferior */}
  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: '#000' }} />
</AbsoluteFill>

// Color grading cinematográfico
<AbsoluteFill style={{
  background: 'linear-gradient(180deg, rgba(0,10,30,0.3) 0%, transparent 50%, rgba(30,15,0,0.3) 100%)',
  mixBlendMode: 'multiply',
}} />
```

### Estilo 4: Bero o Dev (Programação Cartoon 2D - Estático)

Estilo do canal @meunomeebero - Imagens estáticas do personagem com expressões para overlay no vídeo. Sem animação, só personagens + legendas.

#### Paleta de Cores Bero

```tsx
const COLORS = {
  primary: '#3498db',      // Azul dev
  secondary: '#e74c3c',    // Vermelho destaque
  accent: '#f39c12',       // Amarelo alerta
  success: '#2ecc71',      // Verde sucesso
  skin: '#f5d6ba',         // Pele
  hair: '#2c3e50',         // Cabelo escuro
  background: '#ecf0f1',   // Fundo claro
  darkBg: '#1a1a2e',       // Fundo escuro
  text: '#2c3e50',         // Texto escuro
  white: '#ffffff',
};
```

#### Personagem Estático com 6 Expressões (SVG)

```tsx
// src/BeroCharacter.tsx - SEM ANIMAÇÃO, IMAGEM ESTÁTICA

type Expression = 'happy' | 'sad' | 'surprise' | 'thinking' | 'excited' | 'neutral';

interface BeroProps {
  expression?: Expression;
  size?: number;
}

export const BeroCharacter: React.FC<BeroProps> = ({ expression = 'happy', size = 300 }) => {
  return (
    <svg width={size} height={size * 1.33} viewBox="0 0 300 400">
      {/* Sombra */}
      <ellipse cx="150" cy="385" rx="45" ry="8" fill="rgba(0,0,0,0.15)" />

      {/* Pernas (paradas) */}
      <rect x="118" y="285" width="22" height="65" rx="11" fill={COLORS.primary} />
      <rect x="160" y="285" width="22" height="65" rx="11" fill={COLORS.primary} />

      {/* Tênis */}
      <ellipse cx="129" cy="355" rx="18" ry="9" fill={COLORS.secondary} />
      <ellipse cx="171" cy="355" rx="18" ry="9" fill={COLORS.secondary} />

      {/* Corpo */}
      <ellipse cx="150" cy="225" rx="50" ry="60" fill={COLORS.primary} />

      {/* Logo na camiseta */}
      <text x="150" y="235" textAnchor="middle" fill={COLORS.white} fontSize="20" fontWeight="bold">
        {'</>'}
      </text>

      {/* Braços (parados) */}
      <ellipse cx="85" cy="215" rx="16" ry="32" fill={COLORS.primary} />
      <circle cx="80" cy="248" r="10" fill={COLORS.skin} />
      <ellipse cx="215" cy="215" rx="16" ry="32" fill={COLORS.primary} />
      <circle cx="220" cy="248" r="10" fill={COLORS.skin} />

      {/* Cabeça */}
      <circle cx="150" cy="125" r="50" fill={COLORS.skin} />

      {/* Cabelo */}
      <path d="M 105 95 Q 125 55 150 65 Q 175 55 195 95 L 195 85 Q 175 35 150 45 Q 125 35 105 85 Z" fill={COLORS.hair} />

      {/* Óculos */}
      <rect x="118" y="110" width="22" height="18" rx="4" fill="none" stroke={COLORS.hair} strokeWidth="2.5" />
      <rect x="160" y="110" width="22" height="18" rx="4" fill="none" stroke={COLORS.hair} strokeWidth="2.5" />
      <line x1="140" y1="119" x2="160" y2="119" stroke={COLORS.hair} strokeWidth="2.5" />

      {/* Olhos (sempre abertos) */}
      <circle cx="129" cy="119" r="3.5" fill={COLORS.hair} />
      <circle cx="171" cy="119" r="3.5" fill={COLORS.hair} />

      {/* === EXPRESSÕES FACIAIS === */}

      {/* HAPPY - Sorrindo */}
      {expression === 'happy' && (
        <path d="M 135 148 Q 150 162 165 148" stroke={COLORS.hair} fill="none" strokeWidth="2" />
      )}

      {/* SAD - Triste */}
      {expression === 'sad' && (
        <>
          <path d="M 135 155 Q 150 145 165 155" stroke={COLORS.hair} fill="none" strokeWidth="2" />
          {/* Lágrima */}
          <ellipse cx="125" cy="130" rx="3" ry="5" fill={COLORS.primary} opacity="0.7" />
        </>
      )}

      {/* SURPRISE - Surpreso */}
      {expression === 'surprise' && (
        <circle cx="150" cy="152" r="8" fill={COLORS.hair} />
      )}

      {/* THINKING - Pensando */}
      {expression === 'thinking' && (
        <>
          <path d="M 138 150 Q 150 148 162 150" stroke={COLORS.hair} fill="none" strokeWidth="2" />
          {/* Pontos de pensamento */}
          <circle cx="185" cy="100" r="4" fill={COLORS.hair} opacity="0.5" />
          <circle cx="195" cy="85" r="3" fill={COLORS.hair} opacity="0.3" />
          <circle cx="202" cy="72" r="2" fill={COLORS.hair} opacity="0.2" />
        </>
      )}

      {/* EXCITED - Animado/empolgado */}
      {expression === 'excited' && (
        <>
          <path d="M 130 145 Q 150 170 170 145" stroke={COLORS.hair} fill={COLORS.secondary} strokeWidth="2" />
          {/* Estrelas de empolgação */}
          <text x="85" y="80" fontSize="16" fill={COLORS.accent}>✦</text>
          <text x="200" y="75" fontSize="12" fill={COLORS.accent}>✦</text>
        </>
      )}

      {/* NEUTRO - Normal */}
      {expression === 'neutral' && (
        <line x1="140" y1="150" x2="160" y2="150" stroke={COLORS.hair} strokeWidth="2" />
      )}
    </svg>
  );
};
```

#### Legendas Estilo Bero

```tsx
// src/BeroSubtitles.tsx - Legendas para o vídeo

interface SubtitleProps {
  text: string;
  position?: 'bottom' | 'top' | 'center';
  style?: 'normal' | 'highlight' | 'code';
}

export const BeroSubtitle: React.FC<SubtitleProps> = ({
  text,
  position = 'bottom',
  style = 'normal'
}) => {
  const getStyle = () => {
    switch (style) {
      case 'highlight':
        return {
          backgroundColor: COLORS.primary,
          color: COLORS.white,
          padding: '12px 30px',
          borderRadius: 8,
        };
      case 'code':
        return {
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '12px 30px',
          borderRadius: 8,
          fontFamily: 'monospace',
          border: `2px solid ${COLORS.success}`,
        };
      default:
        return {
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: COLORS.white,
          padding: '12px 30px',
          borderRadius: 8,
        };
    }
  };

  const getPosition = () => {
    switch (position) {
      case 'top':
        return { top: 80, left: '50%', transform: 'translateX(-50%)' };
      case 'center':
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      default:
        return { bottom: 100, left: '50%', transform: 'translateX(-50%)' };
    }
  };

  return (
    <div style={{
      position: 'absolute',
      ...getPosition(),
      ...getStyle(),
      fontSize: 32,
      fontWeight: 600,
      fontFamily: 'Nunito, sans-serif',
      textAlign: 'center',
      maxWidth: '80%',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    }}>
      {text}
    </div>
  );
};
```

#### Como Usar no Vídeo

```tsx
// src/VideoComBero.tsx - Exemplo de uso

import { AbsoluteFill, Sequence, Img } from 'remotion';
import { BeroCharacter } from './BeroCharacter';
import { BeroSubtitle } from './BeroSubtitle';

export const VideoComBero: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e' }}>
      {/* CENA 1: Intro - Personagem feliz */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill>
          {/* Personagem estático no canto */}
          <div style={{ position: 'absolute', left: 50, bottom: 0 }}>
            <BeroCharacter expression="happy" size={250} />
          </div>
          {/* Legenda */}
          <BeroSubtitle text="E aí dev! Hoje vamos aprender React!" />
        </AbsoluteFill>
      </Sequence>

      {/* CENA 2: Explicando - Personagem pensando */}
      <Sequence from={90} durationInFrames={120}>
        <AbsoluteFill>
          <div style={{ position: 'absolute', left: 50, bottom: 0 }}>
            <BeroCharacter expression="thinking" size={250} />
          </div>
          <BeroSubtitle text="Primeiro, vamos entender o que é..." style="highlight" />
        </AbsoluteFill>
      </Sequence>

      {/* CENA 3: Código - Personagem neutro */}
      <Sequence from={210} durationInFrames={90}>
        <AbsoluteFill>
          <div style={{ position: 'absolute', left: 50, bottom: 0 }}>
            <BeroCharacter expression="neutral" size={250} />
          </div>
          <BeroSubtitle text="const App = () => { ... }" style="code" />
        </AbsoluteFill>
      </Sequence>

      {/* CENA 4: Revelação - Personagem surpreso */}
      <Sequence from={300} durationInFrames={60}>
        <AbsoluteFill>
          <div style={{ position: 'absolute', left: 50, bottom: 0 }}>
            <BeroCharacter expression="surprise" size={250} />
          </div>
          <BeroSubtitle text="Olha só o que aconteceu!" />
        </AbsoluteFill>
      </Sequence>

      {/* CENA 5: Sucesso - Personagem animado */}
      <Sequence from={360} durationInFrames={90}>
        <AbsoluteFill>
          <div style={{ position: 'absolute', left: 50, bottom: 0 }}>
            <BeroCharacter expression="excited" size={250} />
          </div>
          <BeroSubtitle text="Funcionou! Tá funcionando!" style="highlight" />
        </AbsoluteFill>
      </Sequence>

      {/* CENA 6: Fim - Personagem feliz */}
      <Sequence from={450} durationInFrames={90}>
        <AbsoluteFill>
          <div style={{ position: 'absolute', left: 50, bottom: 0 }}>
            <BeroCharacter expression="happy" size={250} />
          </div>
          <BeroSubtitle text="Se inscreve e ativa o sininho! 🔔" />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
```

#### Guia de Expressões

| Expressão | Quando Usar | Emoji |
|-----------|-------------|-------|
| `happy` | Intro, sucesso, agradecimento | 😊 |
| `sad` | Erro, problema, decepção | 😢 |
| `surprise` | Revelação, descoberta, impacto | 😮 |
| `thinking` | Explicação, dúvida, análise | 🤔 |
| `excited` | Conquista, resultado bom, CTA | 🤩 |
| `neutral` | Neutro, código, informação | 😐 |

### Estilo 5: Gravação de Tela + Avatar + Voz Clonada + Memes

Estilo para tutoriais/code reviews com gravação de tela, personagem cartoon falando (voz clonada), legendas e memes.

#### Setup Completo

| Etapa | Ferramenta | Custo |
|-------|------------|-------|
| Gravação de tela | OBS Studio | Grátis |
| Clonagem de voz | **Voicebox** | Grátis (local) |
| Legendas automáticas | Whisper (embutido no Voicebox) | Grátis |
| Avatar cartoon | Seu SVG (pasta do projeto) | Grátis |
| Memes | Sua pasta `assets/memes/` | Grátis |
| Edição final | CapCut | Grátis |

#### Workflow Passo a Passo

```
1. OBS Studio → Gravar tela + sua voz (mic)
2. Voicebox → Clonar sua voz (3s de áudio) → Gerar narração
3. Whisper → Gerar legendas automáticas do áudio
4. Remotion → Compor: tela + avatar + legendas + memes
5. CapCut → Ajustes finais + exportar
```

#### Voicebox - Clonagem de Voz Local

```bash
# Download: https://voicebox.sh/download/windows
# Instalar o .msi

# 1. Gravar 3-10 segundos da sua voz
# 2. Carregar no Voicebox como "Voice Reference"
# 3. Digitar o texto → Gerar áudio com sua voz clonada
# 4. Exportar .wav
```

**Configurações Voicebox:**
- Engine: Qwen3-TTS ou Chatterbox
- GPU: CUDA (se tiver NVIDIA) ou CPU
- Qualidade: Alta
- Idioma: Português

#### Composição no Remotion (Tela + Avatar + Legendas)

```tsx
// src/TutorialVideo.tsx
import { AbsoluteFill, Sequence, Img, Audio } from 'remotion';
import { BeroCharacter } from './BeroCharacter';
import { BeroSubtitle } from './BeroSubtitle';

export const TutorialVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* CAPA 1: Tela de código */}
      <Sequence from={0} durationInFrames={300}>
        <AbsoluteFill>
          {/* Gravação de tela (fundo) */}
          <Img
            src="http://localhost:3000/screenshots/tela1.png"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Avatar no canto inferior esquerdo */}
          <div style={{
            position: 'absolute',
            left: 30,
            bottom: 100,
            width: 180,
            height: 240,
          }}>
            <BeroCharacter expression="happy" size={180} />
          </div>

          {/* Legenda */}
          <BeroSubtitle text="Hoje vamos criar um componente React" />

          {/* Meme aparece no meio */}
          <Sequence from={60} durationInFrames={90}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
              <Img
                src="http://localhost:3000/memes/meme1.png"
                style={{ maxWidth: 400, borderRadius: 12 }}
              />
            </div>
          </Sequence>
        </AbsoluteFill>
      </Sequence>

      {/* CAPA 2: Código aparecendo */}
      <Sequence from={300} durationInFrames={300}>
        <AbsoluteFill>
          <Img
            src="http://localhost:3000/screenshots/tela2.png"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Avatar mudou pra thinking */}
          <div style={{
            position: 'absolute',
            left: 30,
            bottom: 100,
            width: 180,
          }}>
            <BeroCharacter expression="thinking" size={180} />
          </div>

          <BeroSubtitle text="Aqui a gente importa o useState" style="highlight" />
        </AbsoluteFill>
      </Sequence>

      {/* CAPA 3: Sucesso */}
      <Sequence from={600} durationInFrames={150}>
        <AbsoluteFill>
          <Img
            src="http://localhost:3000/screenshots/tela3.png"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <div style={{
            position: 'absolute',
            left: 30,
            bottom: 100,
          }}>
            <BeroCharacter expression="excited" size={180} />
          </div>

          <BeroSubtitle text="Funcionou! Tá rodando!" style="highlight" />

          {/* Meme de sucesso */}
          <Sequence from={30} durationInFrames={60}>
            <div style={{
              position: 'absolute',
              top: '50%',
              right: 100,
              transform: 'translateY(-50%)',
            }}>
              <Img
                src="http://localhost:3000/memes/sucesso.png"
                style={{ maxWidth: 300, borderRadius: 12 }}
              />
            </div>
          </Sequence>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
```

#### Estrutura de Pastas do Projeto

```
meu-projeto-video/
├── src/
│   ├── TutorialVideo.tsx
│   ├── BeroCharacter.tsx
│   └── BeroSubtitle.tsx
├── assets/
│   ├── memes/
│   │   ├── meme1.png
│   │   ├── meme2.png
│   │   ├── sucesso.png
│   │   └── erro.png
│   ├── screenshots/
│   │   ├── tela1.png
│   │   ├── tela2.png
│   │   └── tela3.png
│   ├── audio/
│   │   ├── narração1.wav    ( Voicebox)
│   │   └── narração2.wav
│   └── personagem/
│       └── bero.svg         (seu SVG)
├── public/
│   └── memes/               (servidos no localhost)
└── package.json
```

#### Servir Memes Localmente

```tsx
// No Remotion, para usar memes de uma pasta local:
// 1. Coloque os memes em public/memes/
// 2. Acesse via http://localhost:3000/memes/nome.png

// Ou copie para src/assets/ e importe:
import memeImg from './assets/memes/meme1.png';
```

#### Script de Automação (OBS + Voicebox)

```bash
# 1. Abrir OBS → Configurar cena com tela + mic
# 2. Gravar vídeo (F5 ou Start Recording)
# 3. Abrir Voicebox → Carregar referência de voz (3s)
# 4. Digitar texto → Gerar narração → Exportar .wav
# 5. Whisper gera .srt automaticamente
# 6. Remotion compõe tudo → npm start
```

#### Configuração OBS para Gravação

| Configuração | Valor |
|-------------|-------|
| Resolução | 1920x1080 |
| FPS | 30 |
| Formato | MKV (ou MP4) |
| Encoder | NVENC (se NVIDIA) |
| Áudio | Mic + Desktop Audio |
| Bitrate | 6000 Kbps |

#### Comandos Úteis

```bash
# Remotion - Iniciar preview
npx remotion studio

# Remotion - Renderizar vídeo
npx remotion render TutorialVideo out/video.mp4

# OBS - Iniciar gravação via CLI (Windows)
& "C:\Program Files\obs-studio\bin\64bit\obs64.exe" --startrecording

# Voicebox - Converter .mp3 → .wav (para Whisper)
ffmpeg -i input.mp3 -ar 16000 -ac 1 output.wav

# Whisper - Gerar legendas .srt
whisper output.wav --language pt --output_format srt
```

### Estilo 6: Glitch/Y2K

Distorsão digital, cores RGB separadas.

```tsx
// Glitch effect
const GlitchText = ({ text }) => {
  const frame = useCurrentFrame();
  const glitchActive = Math.sin(frame * 0.5) > 0.8;

  return (
    <div style={{ position: 'relative' }}>
      {glitchActive && (
        <>
          <span style={{
            position: 'absolute', left: -3, top: 0,
            color: '#ff0000', opacity: 0.7,
          }}>{text}</span>
          <span style={{
            position: 'absolute', left: 3, top: 0,
            color: '#0000ff', opacity: 0.7,
          }}>{text}</span>
        </>
      )}
      <span style={{ color: '#fff' }}>{text}</span>
    </div>
  );
};
```

### Estilo 7: Liquid Glass (Apple Style)

Transparência, refração, profundidade fluida.

```tsx
<AbsoluteFill style={{
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  justifyContent: 'center',
  alignItems: 'center',
}}>
  <div style={{
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  }} />
</AbsoluteFill>
```

### Estilo 8: Cutout Craft (Papel Cortado)

Texturas manuais, colagem, elementos desenhados.

```tsx
<AbsoluteFill style={{
  backgroundColor: '#f4e4bc',
  justifyContent: 'center',
  alignItems: 'center',
}}>
  {/* Formas de papel cortado */}
  <div style={{
    width: 300,
    height: 300,
    background: '#e74c3c',
    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
  }} />
</AbsoluteFill>
```

---

## 🔄 30+ TRANSIÇÕES

### Importação de Transições

```tsx
import { TransitionSeries } from '@remotion/transitions';
import { dissolve, slide, wipe, fade, spin } from '@remotion/transitions/presets';
```

### Lista de Transições

| Transição | Código | Efeito |
|-----------|--------|--------|
| **Dissolve** | `dissolve` | Dissolução suave entre clips |
| **Slide Left** | `slide({ direction: 'from-left' })` | Deslizar da esquerda |
| **Slide Right** | `slide({ direction: 'from-right' })` | Deslizar da direita |
| **Slide Up** | `slide({ direction: 'from-top' })` | Deslizar de cima |
| **Slide Down** | `slide({ direction: 'from-bottom' })` | Deslizar de baixo |
| **Wipe Left** | `wipe({ direction: 'from-left' })` | Limpar da esquerda |
| **Wipe Right** | `wipe({ direction: 'from-right' })` | Limpar da direita |
| **Fade** | `fade` | Escurecer e aparecer |
| **Spin** | `spin` | Girar 360° |
| **Zoom In** | Customizado | Zoom para dentro |
| **Zoom Out** | Customizado | Zoom para fora |
| **Whip Pan** | Customizado | Pan rápido lateral |
| **Glitch** | Customizado | Distorsão digital |
| **Flash** | Customizado | Flash branco (2 frames) |
| **Blur** | Customizado | Desfocar e focar |
| **Pixelate** | Customizado | Pixelizar |
| **Liquid** | Customizado | Transição líquida |
| **Fire** | Customizado | Efeito de fogo |
| **Page Turn** | Customizado | Virar página |

### Uso das Transições

```tsx
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={90}>
    <Clip1 />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={dissolve()}
    timing={linearTiming({ durationInFrames: 15 })}
  />
  <TransitionSeries.Sequence durationInFrames={90}>
    <Clip2 />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

### Flash Transition (2 Frames - Mais Usado em Virais)

```tsx
const FlashTransition = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 2, 4], [0, 1, 0]);
  return (
    <AbsoluteFill style={{
      backgroundColor: '#fff',
      opacity,
    }} />
  );
};
```

### Glitch Transition

```tsx
const GlitchTransition = () => {
  const frame = useCurrentFrame();
  const intensity = Math.sin(frame * 2) * 10;

  return (
    <AbsoluteFill style={{
      transform: `translateX(${intensity}px)`,
      filter: `hue-rotate(${frame * 10}deg)`,
    }}>
      <AbsoluteFill style={{
        background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
        mixBlendMode: 'screen',
        opacity: 0.5,
      }} />
    </AbsoluteFill>
  );
};
```

---

## ✨ 20+ EFEITOS

### Speed Ramp (Velocity)

```tsx
// Lento → Rápido (mais usado em virais)
const SpeedRamp = ({ children }) => {
  const frame = useCurrentFrame();
  const speed = interpolate(frame, [0, 30, 60], [0.5, 2, 1]);
  return <div style={{ transform: `scale(${speed})` }}>{children}</div>;
};
```

### Camera Shake

```tsx
const CameraShake = ({ children, intensity = 5 }) => {
  const frame = useCurrentFrame();
  const x = Math.sin(frame * 0.5) * intensity;
  const y = Math.cos(frame * 0.7) * intensity;

  return (
    <div style={{ transform: `translate(${x}px, ${y}px)` }}>
      {children}
    </div>
  );
};
```

### Zoom Suave (Ken Burns)

```tsx
const ZoomIn = ({ children, startScale = 1, endScale = 1.2 }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 90], [startScale, endScale]);

  return (
    <div style={{ transform: `scale(${scale})`, width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};
```

### Chromatic Aberration

```tsx
const ChromaticAberration = ({ children, intensity = 3 }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: -intensity, opacity: 0.5, filter: 'hue-rotate(-60deg)' }}>
        {children}
      </div>
      <div style={{ position: 'absolute', left: intensity, opacity: 0.5, filter: 'hue-rotate(60deg)' }}>
        {children}
      </div>
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
};
```

### Light Leak

```tsx
<AbsoluteFill style={{
  background: 'radial-gradient(ellipse at 80% 20%, rgba(255,200,100,0.4) 0%, transparent 60%)',
  mixBlendMode: 'screen',
}} />
```

### Blur In/Out

```tsx
const BlurTransition = ({ children }) => {
  const frame = useCurrentFrame();
  const blur = interpolate(frame, [0, 15, 75, 90], [10, 0, 0, 10]);

  return (
    <div style={{ filter: `blur(${blur}px)` }}>
      {children}
    </div>
  );
};
```

### Vignette

```tsx
<AbsoluteFill style={{
  background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
}} />
```

### Film Grain

```tsx
<AbsoluteFill style={{
  opacity: 0.15,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
}} />
```

### Split Screen

```tsx
<AbsoluteFill style={{ display: 'flex' }}>
  <div style={{ flex: 1, overflow: 'hidden' }}>
    <OffthreadVideo src="video1.mp4" style={{ width: '200%', height: '100%' }} />
  </div>
  <div style={{ flex: 1, overflow: 'hidden' }}>
    <OffthreadVideo src="video2.mp4" style={{ width: '200%', height: '100%', marginLeft: '-100%' }} />
  </div>
</AbsoluteFill>
```

### Mirror Flip

```tsx
const MirrorFlip = ({ children, horizontal = true }) => (
  <div style={{
    transform: horizontal ? 'scaleX(-1)' : 'scaleY(-1)',
  }}>
    {children}
  </div>
);
```

### Body Tracking Text

```tsx
// Texto que segue movimento (simplificado)
const TrackingText = ({ text, x, y }) => (
  <div style={{
    position: 'absolute',
    left: x,
    top: y,
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
    background: 'rgba(0,0,0,0.5)',
    padding: '5px 15px',
    borderRadius: 5,
  }}>
    {text}
  </div>
);
```

---

## 🎵 ÁUDIO

### Adicionar Áudio de Arquivo Local

```tsx
import { Audio } from 'remotion';

// Música de fundo
<Audio src="musica.mp3" volume={0.5} />

// Com fade in
<Audio src="musica.mp3" volume={0.5} fadeIn={30} />

// Com fade out
<Audio src="musica.mp3" volume={0.5} fadeOut={30} />
```

### Baixar Áudio de URL

```bash
# YouTube
yt-dlp -x --audio-format mp3 "URL_YOUTUBE" -o audio.mp3

# Qualquer URL direta
curl -L -o audio.mp3 "URL_AUDIO"

# SoundCloud
yt-dlp -x --audio-format mp3 "URL_SOUNDCLOUD" -o audio.mp3
```

### Sincronizar Áudio com Batida

```tsx
// Detectar batidas (simplificado)
const BEATS_PER_MINUTE = 120;
const FRAMES_PER_BEAT = (60 / BEATS_PER_MINUTE) * 30; // 30fps

// Sincronizar transição com beat
const beatFrame = Math.floor(frame / FRAMES_PER_BEAT) * FRAMES_PER_BEAT;
const isOnBeat = frame === beatFrame;

// Efeito no beat
const beatScale = isOnBeat ? 1.1 : 1;
```

### Efeitos de Áudio com FFmpeg

```bash
# Fade in 3 segundos
ffmpeg -i audio.mp3 -af "afade=t=in:st=0:d=3" audio_fadein.mp3

# Fade out 3 segundos
ffmpeg -i audio.mp3 -af "afade=t=out:st=27:d=3" audio_fadeout.mp3

# Mudar velocidade (2x)
ffmpeg -i audio.mp3 -filter:a "atempo=2.0" audio_2x.mp3

# Slow motion (0.5x)
ffmpeg -i audio.mp3 -filter:a "atempo=0.5" audio_slow.mp3

# Juntar áudio com vídeo
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -shortest output.mp4
```

---

## 📝 TEXTO ANIMADO

### Typewriter (Digitação)

```tsx
const Typewriter = ({ text, speed = 2 }) => {
  const frame = useCurrentFrame();
  const chars = Math.floor(frame / speed);
  const displayText = text.slice(0, chars);

  return (
    <div style={{ fontSize: 48, color: '#fff', fontFamily: 'monospace' }}>
      {displayText}
      {chars < text.length && <span style={{ opacity: frame % 10 < 5 ? 1 : 0 }}>|</span>}
    </div>
  );
};
```

### Texto com Sombra Dinâmica

```tsx
const DynamicShadow = ({ text }) => {
  const frame = useCurrentFrame();
  const shadowX = Math.sin(frame * 0.1) * 10;
  const shadowY = Math.cos(frame * 0.1) * 10;

  return (
    <div style={{
      fontSize: 72,
      fontWeight: 'bold',
      color: '#fff',
      textShadow: `${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.5)`,
    }}>
      {text}
    </div>
  );
};
```

### Texto Neon

```tsx
< div style={{
  fontSize: 80,
  fontWeight: 'bold',
  color: '#fff',
  textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00',
}}>
  NEON
</div>
```

### Legendas Sincronizadas

```tsx
const Subtitles = ({ segments }) => {
  const frame = useCurrentFrame();
  const currentSegment = segments.find(s => frame >= s.start && frame <= s.end);

  if (!currentSegment) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: 100,
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: '#fff',
      padding: '10px 30px',
      borderRadius: 10,
      fontSize: 36,
    }}>
      {currentSegment.text}
    </div>
  );
};

// Uso:
<Subtitles segments={[
  { start: 0, end: 60, text: 'Primeira frase' },
  { start: 60, end: 120, text: 'Segunda frase' },
]} />
```

---

## 🎬 TEMPLATES PRONTOS

### Template 1: Highlights (Futebol/Esports)

```tsx
import { Composition } from 'remotion';
import { HighlightsVideo } from './HighlightsVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Highlights"
      component={HighlightsVideo}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        clips: [
          { start: 120, end: 150, label: 'Gol 1' },
          { start: 420, end: 440, label: 'Gol 2' },
          { start: 540, end: 555, label: 'Gol 3' },
        ],
        music: 'music.mp3',
        title: 'Melhores Momentos - Real Madrid',
      }}
    />
  );
};
```

### Template 2: TikTok/Reels (9:16)

```tsx
<Composition
  id="TikTok"
  component={TikTokVideo}
  durationInFrames={450}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{
    clips: [
      { start: 0, end: 5, text: 'Momento Épico!' },
      { start: 5, end: 10, text: 'Olha isso!' },
      { start: 10, end: 15, text: 'Incrível!' },
    ],
    music: 'trend.mp3',
  }}
/>
```

### Template 3: Antes/Depois

```tsx
const BeforeAfter = ({ beforeVideo, afterVideo, beatFrame = 45 }) => {
  const frame = useCurrentFrame();
  const isAfter = frame >= beatFrame;

  return (
    <AbsoluteFill>
      {isAfter ? (
        <OffthreadVideo src={afterVideo} />
      ) : (
        <OffthreadVideo src={beforeVideo} />
      )}

      {/* Flash no momento da troca */}
      {frame >= beatFrame && frame <= beatFrame + 3 && (
        <AbsoluteFill style={{ backgroundColor: '#fff', opacity: 1 - (frame - beatFrame) / 3 }} />
      )}

      {/* Texto */}
      <div style={{
        position: 'absolute',
        top: 50,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 48,
        color: '#fff',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
      }}>
        {isAfter ? 'DEPOIS' : 'ANTES'}
      </div>
    </AbsoluteFill>
  );
};
```

### Template 4: Velocity Edit (Speed Ramp)

```tsx
const VelocityEdit = ({ clips }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {clips.map((clip, i) => {
        const clipDuration = (clip.end - clip.start) * 30;
        const clipFrame = frame - i * clipDuration;

        if (clipFrame < 0 || clipFrame >= clipDuration) return null;

        // Speed ramp: lento → rápido → lento
        const progress = clipFrame / clipDuration;
        const speed = Math.sin(progress * Math.PI) * 2 + 0.5;

        return (
          <Sequence key={i} from={0} durationInFrames={clipDuration}>
            <AbsoluteFill style={{ transform: `scale(${1 + progress * 0.1})` }}>
              <OffthreadVideo
                src={clip.video}
                startFrom={clip.start}
                endAt={clip.end}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
```

---

## 📱 EXPORTAÇÃO POR PLATAFORMA

| Plataforma | Resolução | FPS | Máx Duração | Aspecto |
|------------|-----------|-----|-------------|---------|
| **YouTube** | 1920x1080 | 30/60 | Ilimitado | 16:9 |
| **TikTok** | 1080x1920 | 30 | 10 min | 9:16 |
| **Instagram Reels** | 1080x1920 | 30 | 90s | 9:16 |
| **Instagram Stories** | 1080x1920 | 30 | 15s | 9:16 |
| **Twitter/X** | 1280x720 | 30 | 2:20 | 16:9 |
| **WhatsApp** | 1280x720 | 30 | 16s | 16:9 |
| **YouTube Shorts** | 1080x1920 | 30 | 60s | 9:16 |

---

## 🛠️ COMANDOS ÚTEIS

```bash
# Preview ao vivo
npx remotion studio

# Renderizar vídeo completo
npx remotion render src/index.ts VideoFinal out/video.mp4

# Renderizar qualidade baixa (teste rápido)
npx remotion render src/index.ts VideoFinal out/video.mp4 --quality 50

# Renderizar segmento específico
npx remotion render src/index.ts VideoFinal out/video.mp4 --frames=0-150

# Renderizar GIF
npx remotion render src/index.ts VideoFinal out/video.gif --image-format=png

# Renderizar só áudio
ffmpeg -i out/video.mp4 -vn -acodec libmp3lame out/audio.mp3

# Cortar vídeo com FFmpeg
ffmpeg -i video.mp4 -ss 00:02:00 -to 00:02:30 -c copy cortado.mp4

# Juntar vídeos
ffmpeg -f concat -safe 0 -i lista.txt -c copy juntado.mp4

# Adicionar áudio ao vídeo
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -shortest final.mp4

# Mudar velocidade (2x)
ffmpeg -i video.mp4 -filter:v "setpts=0.5*PTS" -filter:a "atempo=2.0" rapido.mp4

# Slow motion (0.5x)
ffmpeg -i video.mp4 -filter:v "setpts=2.0*PTS" -filter:a "atempo=0.5" lento.mp4
```

---

## 📋 CHECKLIST DE PRODUÇÃO

1. ✅ Criar projeto Remotion
2. ✅ Escolher estilo (Kinetic, Retro, Cinematic, etc)
3. ✅ Preparar clips (cortar com FFmpeg se necessário)
4. ✅ Baixar áudio (yt-dlp ou URL direta)
5. ✅ Escolher transições (dissolve, glitch, flash, etc)
6. ✅ Adicionar textos animados
7. ✅ Aplicar efeitos (speed ramp, shake, chromatic, etc)
8. ✅ Sincronizar áudio com batida
9. ✅ Preview com `npx remotion studio`
10. ✅ Renderizar com `npx remotion render`
11. ✅ Exportar no formato correto para a plataforma
12. ✅ Publicar!

---

## 💡 DICAS IMPORTANTES

- **Velocidade do beat**: Sincronize transições com a batida da música
- **Menos é mais**: 2-3 efeitos bem feitos > 15 efeitos bagunçados
- **Hook nos primeiros 3 segundos**: Comece com algo impactante
- **Texto grande**: Em mobile, texto pequeno não lê
- **Consistência**: Use o mesmo estilo em todo o vídeo
- **Teste sempre**: Preview antes de renderizar
- **Formato correto**: 9:16 para mobile, 16:9 para desktop

---

## 🛠️ FERRAMENTAS PARA ESTILO BERO

### Para criar o personagem:

| Ferramenta | Uso | Preço |
|------------|-----|-------|
| **Figma** | Desenhar SVG do personagem | Grátis |
| **Adobe Illustrator** | Vetorizar personagem | $22/mês |
| **Inkscape** | Criar SVGs | Grátis |
| **Blender Grease Pencil** | Animação 2D | Grátis |

### Para gerar expressões com IA:

| Ferramenta | Créditos Grátis | Expressões |
|------------|-----------------|------------|
| **GenToon** | 150 créditos | ✅ Múltiplas |
| **Neolemon** | 20 créditos | ✅ Múltiplas |
| **Picsart** | Teste grátis | ✅ 48 estilos |
| **Adobe Firefly** | Créditos grátis | ✅ Múltiplas |

### Para gravar tela:

| Gravador | Seguro | Destaques |
|----------|--------|-----------|
| **OBS Studio** | ✅ Open Source | Profissional |
| **ShareX** | ✅ Open Source | Leve |
| **Cap** | ✅ Open Source | Simples |

### Para clonar voz:

| Ferramenta | Custo | Destaques |
|------------|-------|-----------|
| **Voicebox** | ✅ Grátis (local) | 7 TTS engines, 3s para clonar |
| **OmniVoice Studio** | ✅ Grátis (local) | 646 idiomas, video dubbing |
| **Speech Studio** | ✅ Grátis (local) | Emotion markers, desktop app |

**Voicebox** (recomendado): https://voicebox.sh/download/windows

### Paleta de Cores Bero:

```tsx
const COLORS = {
  primary: '#3498db',      // Azul dev
  secondary: '#e74c3c',    // Vermelho destaque
  accent: '#f39c12',       // Amarelo alerta
  success: '#2ecc71',      // Verde sucesso
  skin: '#f5d6ba',         // Pele
  hair: '#2c3e50',         // Cabelo escuro
  background: '#ecf0f1',   // Fundo claro
  darkBg: '#1a1a2e',       // Fundo escuro
  text: '#2c3e50',         // Texto escuro
};
```

### Workflow Bero Completo:

1. **Criar personagem** → Figma/Inkscape (SVG)
2. **Gerar expressões** → GenToon/Neolemon (IA)
3. **Gravar tela** → OBS (se precisar de gameplay/código)
4. **Baixar áudio** → yt-dlp (música de fundo)
5. **Criar projeto** → Remotion com template Bero
6. **Animar** → SVG animado ou Lottie
7. **Renderizar** → `npx remotion render`
8. **Publicar** → YouTube Shorts, TikTok, Reels

---

## 📐 FORMATOS VIRAIS 16:9

### Para YouTube (16:9):

| Formato | Resolução | FPS | Duração Ideal |
|---------|-----------|-----|---------------|
| YouTube Long | 1920x1080 | 30/60 | 8-15 min |
| YouTube Shorts | 1080x1920 | 30 | 30-60s |
| Twitch Clip | 1920x1080 | 30 | 15-60s |

### Estilos Virais 16:9:

| Estilo | Descrição | Hook |
|--------|-----------|------|
| **Listicle** | Lista rápida | "5 apps que ninguém conhece" |
| **Tutorial** | Como fazer | "Aprenda em 2 minutos" |
| **Comparação** | A vs B | "Testei 2 ferramentas" |
| **Storytelling** | Mini história | "O dia que eu comecei" |
| **Reveal** | Resultado surpreente | "Olha o que aconteceu" |
| **Reação** | Reagir a algo | "Isso é real?!" |
| **Behind Scenes** | Bastidores | "Como eu crio meus vídeos" |
| **Desafio** | Challenge | "Consegui em 24h" |
