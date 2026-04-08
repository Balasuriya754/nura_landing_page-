/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECAPTCHA_V3_KEY: string
  readonly VITE_RECAPTCHA_V2_KEY: string
  readonly VITE_FORM_ID: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
