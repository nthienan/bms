//TODO: Need to investigate to use webpack config instead
export const config = {
  crossOrigin: false,
  rootUrl: '/api',
  baseUrl: ''
};

export const getRootUrl = () => {
  return config.crossOrigin ? config.baseUrl + config.rootUrl : config.rootUrl;
};
