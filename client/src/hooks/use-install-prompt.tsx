import { useState, useEffect } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [userInstalled, setUserInstalled] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setUserInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    
    // Handle app installed event
    window.addEventListener('appinstalled', () => {
      setUserInstalled(true);
      setInstallPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  const showInstallPrompt = async () => {
    if (!installPrompt) return;
    
    // Show the install prompt
    installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation prompt');
    } else {
      console.log('User dismissed the installation prompt');
    }
    
    // Clear the saved prompt as it can't be used again
    setInstallPrompt(null);
  };

  return {
    canInstall: !!installPrompt && !userInstalled,
    isInstalled: userInstalled,
    showInstallPrompt,
  };
}