import {Resources} from './constant';
import {getBaseUrl} from './config';

export const selectResourceLinks = state => state.resourceLinks;

export const selectResourceLink = (state, resourceName, methodName) => {
  if(resourceName === Resources.Authentication) {
    return getBaseUrl() + '/oauth/token';
  }
  if (state.resourceLinks && state.resourceLinks._links[resourceName]) {
    let template = state.resourceLinks._links[resourceName].href;
    if (template) {
      let result = template.replace(template.substring(template.indexOf('{')), '');
      if (methodName && methodName !== '') {
        return result + '/search/' + methodName;
      }
      return result;
    }
  }
  return null;
};

export const selectLocationBeforeAuth = state => state.auth.location;
