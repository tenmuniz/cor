// Define o nome do cache e os arquivos para armazenar em cache
const CACHE_NAME = 'corrijamuniz-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/logo-icon.png'
];

// Instala o service worker e pré-carrega recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Falha ao abrir cache:', error);
      })
  );
});

// Intercepta requisições e responde com recursos em cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o recurso em cache, se disponível
        if (response) {
          return response;
        }
        
        // Caso contrário, busca o recurso da rede
        return fetch(event.request)
          .then((response) => {
            // Verifica se obtivemos uma resposta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone a resposta, pois o corpo só pode ser consumido uma vez
            const responseToCache = response.clone();
            
            // Armazena a resposta em cache para uso futuro
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Se a busca falhar (ex: offline), tenta retornar a página offline
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            // Para outras solicitações, apenas retorna o erro
            return new Response('Sem conexão com a internet');
          });
      })
  );
});

// Limpa caches antigos quando um novo service worker é ativado
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Remove qualquer cache que não esteja na lista de permissões
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});