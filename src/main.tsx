import App from '@/app/App'
import { theme } from '@/app/theme'
import { ThemeProvider } from '@emotion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { CssBaseline } from '@mui/material'
import '@fontsource/domine/700.css'
import '@fontsource/inter/400.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
)
