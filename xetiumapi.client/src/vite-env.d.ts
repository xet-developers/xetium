/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API: string
    readonly VITE_IS_DEV: Boolean
    /// any other env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
