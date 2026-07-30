/* eslint-disable @typescript-eslint/no-explicit-any */

interface PuterAI {
  chat(prompt: string, options?: { model?: string; stream?: boolean; max_tokens?: number; temperature?: number; tools?: any[] }): Promise<PuterChatResponse>
  chat(messages: Array<{ role: string; content: string }>, options?: { model?: string; stream?: boolean; max_tokens?: number; temperature?: number; tools?: any[] }): Promise<PuterChatResponse>
  txt2img(prompt: string, options?: any): Promise<HTMLImageElement>
  txt2img(prompt: string, testMode?: boolean): Promise<HTMLImageElement>
  img2txt(image: string | File): Promise<string>
  txt2speech(text: string, options?: { provider?: string; voice?: string; engine?: string; language?: string; model?: string }): Promise<HTMLAudioElement>
  listModels(): Promise<any>
  listModelProviders(): Promise<any>
}

interface PuterChatResponse {
  message?: {
    role: string
    content: string
    tool_calls?: any[]
    images?: any[]
  }
  [key: string]: any
}

interface PuterAuth {
  signIn(): Promise<void>
  signOut(): Promise<void>
  isSignedIn(): Promise<boolean>
  getUser(): Promise<PuterUser | null>
  getMonthlyUsage(): Promise<any>
}

interface PuterUser {
  uuid: string
  username: string
  name: string
  [key: string]: any
}

interface PuterFS {
  write(path: string, data: string | Blob | ArrayBuffer): Promise<any>
  read(path: string): Promise<any>
  mkdir(path: string): Promise<any>
  readdir(path: string): Promise<any[]>
  delete(path: string): Promise<any>
  stat(path: string): Promise<any>
}

interface PuterKV {
  set(key: string, value: any): Promise<void>
  get(key: string): Promise<any>
  del(key: string): Promise<void>
  list(): Promise<any>
}

interface PuterUI {
  alert(message: string): void
  notify(message: string): void
  createWindow(options: any): any
}

interface Puter {
  ai: PuterAI
  auth: PuterAuth
  fs: PuterFS
  kv: PuterKV
  ui: PuterUI
  appID: string
  env: string
  print(text: string): void
}

declare const puter: Puter
declare global {
  interface Window {
    puter?: Puter
  }
}
