export type ModelType = 'github' | 'fable5' | 'puter-free' | 'puter-premium';

export interface ModelConfig {
  type: ModelType;
  name: string;
  cost: 'free' | 'premium';
  maxTokens: number;
  capabilities: string[];
}

export const MODEL_CONFIGS: Record<ModelType, ModelConfig> = {
  github: {
    type: 'github',
    name: 'GitHub AI (GPT-4o)',
    cost: 'free',
    maxTokens: 128000,
    capabilities: ['chat', 'code', 'analysis', 'modifications', 'scraping', 'email', 'planning'],
  },
  fable5: {
    type: 'fable5',
    name: 'Fable 5 (Premium Site Generator)',
    cost: 'premium',
    maxTokens: 200000,
    capabilities: ['nextjs-site-generation', 'complete-project-generation'],
  },
  'puter-free': {
    type: 'puter-free',
    name: 'Puter Free (GPT-4o Mini, Claude Sonnet, Gemini Flash)',
    cost: 'free',
    maxTokens: 128000,
    capabilities: ['chat', 'code', 'analysis'],
  },
  'puter-premium': {
    type: 'puter-premium',
    name: 'Puter Premium (GPT-5 Nano, Claude Opus, Grok 3, DeepSeek R1, Mistral Large)',
    cost: 'premium',
    maxTokens: 200000,
    capabilities: ['chat', 'code', 'analysis', 'reasoning'],
  },
};

export interface RouteDecision {
  model: ModelType;
  reason: string;
  prompt?: string;
  context?: Record<string, unknown>;
}

export class ModelRouter {
  private static instance: ModelRouter;
  private scrapedSiteData: Record<string, unknown> | null = null;

  static getInstance(): ModelRouter {
    if (!ModelRouter.instance) {
      ModelRouter.instance = new ModelRouter();
    }
    return ModelRouter.instance;
  }

  setScrapedData(data: Record<string, unknown>): void {
    this.scrapedSiteData = data;
  }

  getScrapedData(): Record<string, unknown> | null {
    return this.scrapedSiteData;
  }

  clearScrapedData(): void {
    this.scrapedSiteData = null;
  }

  route(action: string, context: Record<string, unknown> = {}): RouteDecision {
    const lowerAction = action.toLowerCase();

    if (lowerAction.includes('criar site') || 
        lowerAction.includes('gerar site') || 
        lowerAction.includes('build site') ||
        (lowerAction.includes('site') && context.isNewSite === true)) {
      return {
        model: 'fable5',
        reason: 'Geração de site completo Next.js requer Fable 5 (premium)',
        prompt: this.buildFable5Prompt(context),
        context: { ...context, requiresFable5: true },
      };
    }

    if (lowerAction.includes('modificar site') || 
        lowerAction.includes('alterar site') ||
        lowerAction.includes('ajustar site')) {
      return {
        model: 'github',
        reason: 'Modificações em site existente usam GitHub AI (gratuito)',
        context: { ...context, isModification: true },
      };
    }

    if (lowerAction.includes('scraping') || 
        lowerAction.includes('extrair') ||
        lowerAction.includes('coletar')) {
      return {
        model: 'github',
        reason: 'Scraping e extração de dados usam GitHub AI (gratuito)',
      };
    }

    if (lowerAction.includes('email') || 
        lowerAction.includes('proposta') ||
        lowerAction.includes('enviar')) {
      return {
        model: 'github',
        reason: 'Envio de emails/propostas via BrowserClaw usa GitHub AI (gratuito)',
      };
    }

    if (context.isPremiumUser && MODEL_CONFIGS['puter-premium'].capabilities.some(c => 
      lowerAction.includes(c.replace('-', ' ')))) {
      return {
        model: 'puter-premium',
        reason: 'Usuário premium - usando modelo avançado Puter',
      };
    }

    return {
      model: 'github',
      reason: 'Padrão: GitHub AI (GPT-4o) gratuito para tarefas gerais',
    };
  }

  private buildFable5Prompt(context: Record<string, unknown>): string {
    const scrapedData = this.scrapedSiteData || {};
    const objective = context.objective || '';
    const preferences = context.preferences || {};
    const sections = (context.sections as string[]) || [];

    return `GERE UM PROJETO NEXT.JS COMPLETO E PRONTO PARA DEPLOY

=== OBJETIVO DO CLIENTE ===
${objective}

=== DADOS DO SITE ORIGINAL (SCRAPING) ===
${JSON.stringify(scrapedData, null, 2)}

=== PREFERÊNCIAS ===
${JSON.stringify(preferences, null, 2)}

=== SEÇÕES OBRIGATÓRIAS ===
${sections.join('\n')}

=== REQUISITOS TÉCNICOS OBRIGATÓRIOS ===
1. ESTRUTURA NEXT.JS 14+ (App Router)
   - app/layout.tsx, app/page.tsx, app/globals.css
   - components/ organizados por funcionalidade
   - lib/ para utilitários
   - public/ para assets estáticos

2. STYLING
   - Tailwind CSS configurado
   - Design system consistente (cores, tipografia, spacing)
   - Responsivo: mobile-first, breakpoints sm/md/lg/xl
   - Dark mode support (next-themes ou CSS variables)

3. PERFORMANCE
   - next/image para todas as imagens
   - Font optimization (next/font)
   - Static generation onde possível
   - Bundle analyzer ready

4. SEO & ACESSIBILIDADE
   - Metadata completa (title, description, OG tags)
   - JSON-LD structured data
   - Semantic HTML, ARIA labels
   - Focus management, keyboard navigation

5. COMPONENTES REUTILIZÁVEIS
   - Button, Card, Container, Section, Grid, Flex
   - Form components com validação (react-hook-form + zod)
   - Modal, Toast, Dropdown, Tooltip

6. CONFIGURAÇÕES
   - package.json com scripts: dev, build, start, lint
   - tailwind.config.ts com design tokens
   - tsconfig.json strict mode
   - .eslintrc.json, .prettierrc
   - .gitignore, README.md

7. DEPLOY READY
   - Vercel/Netlify config
   - Environment variables template (.env.example)
   - Build sem erros TypeScript/ESLint

=== SAÍDA ESPERADA ===
Retorne APENAS um objeto JSON com a estrutura completa do projeto:

{
  "files": {
    "package.json": "...",
    "tsconfig.json": "...",
    "tailwind.config.ts": "...",
    "next.config.js": "...",
    "app/layout.tsx": "...",
    "app/page.tsx": "...",
    "app/globals.css": "...",
    "components/ui/Button.tsx": "...",
    "components/ui/Card.tsx": "...",
    "components/sections/Hero.tsx": "...",
    "components/sections/Features.tsx": "...",
    "lib/utils.ts": "...",
    "public/...": "...",
    ".env.example": "...",
    "README.md": "..."
  },
  "instructions": "Como rodar: npm install && npm run dev",
  "deployNotes": "Configurações para Vercel/Netlify"
}

IMPORTANTE: Código production-ready, sem placeholders, sem TODO, sem comentários desnecessários.`;
  }

  async executeWithModel(
    decision: RouteDecision,
    message: string,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const { model, prompt, context = {} } = decision;

    if (model === 'fable5' && prompt) {
      return this.callFable5(prompt, onStream);
    }

    if (model === 'github') {
      return this.callGitHubAI(message, context, onStream);
    }

    if (model === 'puter-free' || model === 'puter-premium') {
      return this.callPuterAI(model, message, onStream);
    }

    throw new Error(`Modelo não suportado: ${model}`);
  }

  private async callFable5(prompt: string, onStream?: (chunk: string) => void): Promise<string> {
    const response = await fetch('/api/fable5/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, stream: !!onStream }),
    });

    if (!response.ok) {
      throw new Error(`Fable 5 error: ${response.statusText}`);
    }

    if (onStream && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        fullResponse += chunk;
        onStream(chunk);
      }
      return fullResponse;
    }

    const data = await response.json();
    return data.result || JSON.stringify(data);
  }

  private async callGitHubAI(message: string, context: Record<string, unknown>, onStream?: (chunk: string) => void): Promise<string> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context, stream: !!onStream }),
    });

    if (!response.ok) throw new Error(`GitHub AI error: ${response.statusText}`);

    if (onStream && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        fullResponse += chunk;
        onStream(chunk);
      }
      return fullResponse;
    }

    const data = await response.json();
    return data.response || '';
  }

  private async callPuterAI(model: ModelType, message: string, onStream?: (chunk: string) => void): Promise<string> {
    const { chatAIStream } = await import('./puter-ai');
    const messages = [{ role: 'user' as const, content: message }];
    let fullResponse = '';

    await chatAIStream(
      messages,
      { model: model === 'puter-premium' ? 'gpt-5-nano' : 'gpt-4o-mini' },
      (chunk: string) => {
        fullResponse += chunk;
        onStream?.(chunk);
      }
    );

    return fullResponse;
  }

  isPremiumAction(action: string): boolean {
    const decision = this.route(action);
    return MODEL_CONFIGS[decision.model].cost === 'premium';
  }

  getModelInfo(model: ModelType): ModelConfig {
    return MODEL_CONFIGS[model];
  }
}

export const modelRouter = ModelRouter.getInstance();