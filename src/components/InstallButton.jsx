import React from 'react';
import { usePWAInstall } from '../utils/usePWAInstall';

const InstallButton = () => {
  const { isInstallable, triggerInstall } = usePWAInstall();

  // Do not render anything if the app isn't ready to be installed
  if (!isInstallable) return null;

  return (
    <button 
      onClick={triggerInstall}
      className="pwa-install-btn"
      style={{ padding: '10px 20px', cursor: 'pointer', color: "white", fontSize: "5rem" }}
    >
      Install App
    </button>
  );
};

export default InstallButton;
