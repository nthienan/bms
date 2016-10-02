//TODO: Need to investigate to use webpack config instead
export const config = {
  crossOrigin: true,
  rootUrl: '/api',
  baseUrl: 'http://localhost:9009'
};

export const getRootUrl = () => {
  return config.crossOrigin ? config.baseUrl + config.rootUrl : config.rootUrl;
};
