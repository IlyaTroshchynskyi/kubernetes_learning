import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  let serverSettings = {}
  if (env.VITE_ENV !== 'local') {
    serverSettings = {
      host: true,
      origin: env.VITE_SERVER_ORIGIN,
    }
  }

  return {
    define: {
      'process.env.VITE_ENV': JSON.stringify(env.VITE_ENV),
      'process.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL),
       'process.env.VITE_DESCRIPTION': JSON.stringify(env.VITE_DESCRIPTION),
    },
    plugins: [react()],
    server: serverSettings,
    // important for ngnix js files
    base: "/"
  }
})
