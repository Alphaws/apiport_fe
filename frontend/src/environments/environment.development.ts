export const environment = {
  isProduction: false,
  getApiUrl: () => {
    if (typeof window !== 'undefined') {
      const globalConfig = (window as { __APP_CONFIG__?: { apiBaseUrl?: string } })?.__APP_CONFIG__;
      if (globalConfig?.apiBaseUrl) {
        return globalConfig.apiBaseUrl;
      }

      const meta = typeof document !== 'undefined'
        ? document.querySelector<HTMLMetaElement>('meta[name="api-base-url"]')
        : null;
      if (meta?.content) {
        return meta.content;
      }
      console.log('host:', window.location.host);

      return `${window.location.protocol}//${window.location.host}/api`;
    }

    if (typeof process !== 'undefined' && process.env?.['API_BASE_URL']) {
      console.debug('deb:', process);
      return process.env['API_BASE_URL'] as string;
    }

    return 'http://backend:8000/api';
  }
};
