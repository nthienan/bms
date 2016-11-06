//TODO: Need to investigate to use webpack config instead
export const config = {
  crossOrigin: false,
  rootUrl: '/api',
  authUrl: '/oauth/token',
  baseUrl: 'http://localhost:9009'
};

export const getRootUrl = () => {
  return config.crossOrigin ? config.baseUrl + config.rootUrl : config.rootUrl;
};

export function getBaseUrl() {
  return config.crossOrigin ? config.baseUrl : '';
}

export function getAuthenticationUrl() {
  return config.crossOrigin ? config.baseUrl + config.authUrl : config.authUrl;
}

export const appAuthentication = {
  id: 'bms', secret: '33jJcZ4Fz3jC5Sv!E4q6JDs'
};
