import { useState, useEffect } from 'react';
import * as serviceWorker from '../registerServiceWorker';

export default function useServiceWorker() {
  const [installing, setInstalling] = useState(false);
  const [installable, setInstallable] = useState(false);

  let beforeInstallPromptEvent = null;

  useEffect(() => {
    serviceWorker.register({
      onBeforeInstallPrompt: e => {
        console.log(e.platforms);
        beforeInstallPromptEvent = e;
        setInstallable(true);
        console.log('App is ready to be installed on home screen!');
      }
    });
  }, []); //Never re-register when props change.

  const handleInstallRequest = async () => {
    if (beforeInstallPromptEvent === null) {
      console.log('App can not be installed - try again later');
      return;
    }
    setInstalling(true);
    await beforeInstallPromptEvent.prompt();
    const choiceResult = await beforeInstallPromptEvent.userChoice;
    setInstallable(false);
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    beforeInstallPromptEvent = null;
    setInstalling(false);
  };

  return { installing, installable, handleInstallRequest };
}
