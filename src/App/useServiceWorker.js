import { useState, useEffect } from 'react';
import * as serviceWorker from '../registerServiceWorker';

export default function useServiceWorker() {
  const [installing, setInstalling] = useState(false);
  const [installable, setInstallable] = useState(false);
  const [beforeInstallPromptEvent, setBeforeInstallPromptEvent] = useState(
    null
  );

  useEffect(() => {
    serviceWorker.register({
      onBeforeInstallPrompt: e => {
        console.log(e.platforms);
        setBeforeInstallPromptEvent(e);
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
    setInstallable(false);
    setInstalling(true);
    await beforeInstallPromptEvent.prompt();
    const choiceResult = await beforeInstallPromptEvent.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    setBeforeInstallPromptEvent(null);
    setInstalling(false);
  };

  return { installing, installable, handleInstallRequest };
}
