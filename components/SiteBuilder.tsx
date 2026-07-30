'use client';

import { useState, useCallback } from 'react';
import { FolderCog, Zap, Loader2, CheckCircle, AlertCircle, Download, Eye, Code } from 'lucide-react';
import { modelRouter, type RouteDecision } from '@/lib/model-router';

interface ScrapedData {
  url: string;
  title: string;
  description: string;
  colors: string[];
  fonts: string[];
  sections: string[];
  images: string[];
  content: Record<string, unknown>;
}

interface SiteBuilderProps {
  scrapedData?: ScrapedData;
  objective: string;
  preferences?: Record<string, unknown>;
  sections?: string[];
  onSiteGenerated?: (project: NextJSProject) => void;
  onProposalReady?: (project: NextJSProject) => void;
}

interface NextJSProject {
  files: Record<string, string>;
  instructions: string;
  deployNotes: string;
}

interface GenerationState {
  status: 'idle' | 'analyzing' | 'generating' | 'streaming' | 'complete' | 'error';
  progress: number;
  currentStep: string;
  project?: NextJSProject;
  error?: string;
  decision?: RouteDecision;
}

export function SiteBuilder({
  scrapedData,
  objective,
  preferences = {},
  sections = [],
  onSiteGenerated,
  onProposalReady,
}: SiteBuilderProps) {
  const [state, setState] = useState<GenerationState>({
    status: 'idle',
    progress: 0,
    currentStep: '',
  });

  const [showCode, setShowCode] = useState<string>('app/page.tsx');

  const handleGenerate = useCallback(async () => {
    const router = modelRouter;
    
    if (scrapedData) {
      router.setScrapedData(scrapedData as unknown as Record<string, unknown>);
    }

    const decision = router.route('criar site', {
      objective,
      preferences,
      sections,
      isNewSite: true,
      scrapedData,
    });

    setState(prev => ({ 
      ...prev, 
      status: 'analyzing', 
      progress: 10, 
      currentStep: 'Analisando objetivo e dados de scraping...',
      decision,
    }));

    try {
      setState(prev => ({ 
        ...prev, 
        status: 'generating', 
        progress: 30, 
        currentStep: 'Enviando prompt único para Fable 5...' 
      }));

      let fullResponse = '';
      
      const result = await router.executeWithModel(
        decision,
        'Gerar site Next.js completo',
        (chunk) => {
          fullResponse += chunk;
          setState(prev => ({ 
            ...prev, 
            status: 'streaming', 
            progress: Math.min(30 + (fullResponse.length / 100), 90),
            currentStep: 'Recebendo projeto Next.js...' 
          }));
        }
      );

      setState(prev => ({ ...prev, progress: 95, currentStep: 'Processando resposta...' }));

      let project: NextJSProject;
      try {
        const parsed = JSON.parse(result);
        project = {
          files: parsed.files || {},
          instructions: parsed.instructions || 'npm install && npm run dev',
          deployNotes: parsed.deployNotes || 'Deploy na Vercel/Netlify',
        };
      } catch {
        throw new Error('Resposta do Fable 5 não é JSON válido');
      }

      if (Object.keys(project.files).length === 0) {
        throw new Error('Projeto vazio recebido do Fable 5');
      }

      setState(prev => ({ 
        ...prev, 
        status: 'complete', 
        progress: 100, 
        currentStep: 'Site gerado com sucesso!',
        project,
      }));

      onSiteGenerated?.(project);
      
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        status: 'error', 
        progress: 0, 
        currentStep: 'Erro na geração',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }));
    }
  }, [objective, preferences, sections, scrapedData, onSiteGenerated]);

  const handleRegenerate = useCallback(() => {
    setState({ status: 'idle', progress: 0, currentStep: '' });
    handleGenerate();
  }, [handleGenerate]);

  const handleSendProposal = useCallback(() => {
    if (state.project) {
      onProposalReady?.(state.project);
    }
  }, [state.project, onProposalReady]);

  const handleDownload = useCallback(() => {
    if (!state.project) return;
    
    const zipContent = JSON.stringify(state.project.files, null, 2);
    const blob = new Blob([zipContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nextjs-project.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [state.project]);

  const renderStatusIcon = () => {
    switch (state.status) {
      case 'analyzing':
      case 'generating':
      case 'streaming':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Zap className="w-5 h-5 text-gray-400" />;
    }
  };

  const fileTree = state.project 
    ? Object.keys(state.project.files).sort()
    : [];

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <FolderCog className="w-6 h-6 text-gray-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Construtor de Site Next.js (Fable 5)</h3>
            <p className="text-sm text-gray-500">Geração única via prompt completo • R$ 49/site</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {renderStatusIcon()}
          <span className="text-sm font-medium text-gray-700 capitalize">{state.status}</span>
        </div>
      </div>

      {/* Progress */}
      {(state.status !== 'idle' && state.status !== 'complete' && state.status !== 'error') && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">{state.currentStep}</span>
            <span className="font-medium text-gray-900">{state.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out" 
              style={{ width: `${state.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error State */}
      {state.status === 'error' && (
        <div className="p-4 border-b border-gray-200 bg-red-50 text-red-700">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">Erro na geração</span>
          </div>
          <p className="text-sm mb-3">{state.error}</p>
          <button 
            onClick={handleRegenerate}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Complete State - Project View */}
      {state.status === 'complete' && state.project && (
        <div className="flex-1 flex overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-72 border-r border-gray-200 bg-gray-50 overflow-y-auto p-3">
            <h4 className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Arquivos do Projeto ({fileTree.length})
            </h4>
            <div className="space-y-1">
              {fileTree.map((file) => (
                <button
                  key={file}
                  onClick={() => setShowCode(file)}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs font-mono truncate transition ${
                    showCode === file 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {file}
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 overflow-auto p-4 bg-gray-950">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs text-gray-400 font-mono">{showCode}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Baixar
                </button>
              </div>
            </div>
            <pre className="text-xs text-gray-300 font-mono leading-relaxed max-h-[500px] overflow-auto">
              {state.project.files[showCode] || '// Arquivo vazio'}
            </pre>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          {state.status === 'idle' && (
            <button 
              onClick={handleGenerate}
              disabled={!objective.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-4 h-4" />
              Gerar Site Next.js (Fable 5)
            </button>
          )}

          {state.status === 'complete' && (
            <>
              <button 
                onClick={handleRegenerate}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <Loader2 className="w-4 h-4" />
                Regenerar
              </button>
              <button 
                onClick={handleSendProposal}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                <Eye className="w-4 h-4" />
                Enviar Proposta
              </button>
            </>
          )}
        </div>

        {state.decision && (
          <div className="text-xs text-gray-500 font-mono px-3 py-1.5 bg-gray-50 rounded">
            Modelo: {state.decision.model} • {state.decision.reason}
          </div>
        )}
      </div>
    </div>
  );
}