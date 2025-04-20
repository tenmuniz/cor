import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet } from "react-helmet";
import { registerServiceWorker } from "./service-worker-registration";

// Register service worker for PWA functionality
registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <>
    <Helmet>
      <title>CorrijaMuniz - Corretor de Texto Inteligente</title>
      <meta name="description" content="CorrijaMuniz - Corretor de texto inteligente para WhatsApp usando OpenAI GPT" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
      <meta name="theme-color" content="#14b8a6" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      <link rel="shortcut icon" type="image/png" href="/logo.png" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" />
    </Helmet>
    <App />
  </>
);
