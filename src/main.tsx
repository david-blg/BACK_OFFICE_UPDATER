import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ThemeProvider } from "./theme/theme-provider";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "./components/ui/toaster";


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    <Toaster />
  </QueryClientProvider>
);
