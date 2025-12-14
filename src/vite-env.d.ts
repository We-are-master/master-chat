/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_OPENAI_SYSTEM_PROMPT?: string;
  readonly VITE_OPENAI_MODEL?: string;
  readonly VITE_SETTINGS_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

