import { useEffect, useState } from 'react';

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default browser automatic prompt banner
      e.preventDefault();
      // Store the event so it can be triggered later
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const triggerInstall = async () => {
    if (!deferredPrompt) return;

    // Show the native browser installation prompt dialog
    await deferredPrompt.prompt();

    // Wait for the user to accept or dismiss the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // The deferredPrompt can only be used once; clear it out
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return { isInstallable, triggerInstall };
};
