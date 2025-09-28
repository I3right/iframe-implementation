import { apps, PC_IFRAME_ID, PIS_IFRAME_ID } from "../utils/constant";

export function usePlatform(initialAppName: apps = apps.PIS) {
  const getAppName = (): apps => {
    const urlParams = new URLSearchParams(window.location.search);
    const appName = urlParams.get("app");

    // validate app name is valid (PIS | PC only)
    if (
      appName &&
      Object.values(apps)
        .map((v) => v.toLowerCase())
        .includes(appName.toLowerCase())
    ) {
      const matchedApp = Object.values(apps).find(
        (v) => v.toLowerCase() === appName.toLowerCase()
      );
      return matchedApp as apps;
    }
    return initialAppName;
  };

  const isIframe = (app: apps): boolean => {
    const appName = getAppName();
    return appName.toLowerCase() === app.toLowerCase();
  };

  const isPISIframe = (): boolean => isIframe(apps.PIS);
  const isPCIframe = (): boolean => isIframe(apps.PC);
  const getIframeId = (): string =>
    isIframe(apps.PIS) ? PIS_IFRAME_ID : PC_IFRAME_ID;

  const getIframeElement = (): HTMLIFrameElement | null => {
    const iframeId = getIframeId();
    return document.getElementById(iframeId) as HTMLIFrameElement | null;
  };

  return {
    isPISIframe,
    isPCIframe,
    getIframeId,
    getIframeElement,
  };
}
