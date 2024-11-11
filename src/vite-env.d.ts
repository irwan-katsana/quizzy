/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_GROQ_API_KEY: string
  readonly VITE_GROK_API_KEY: string
  readonly VITE_ADMIN_PASSWORD: string
  readonly VITE_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}