export const getResourceLinks = state => state.resourceLinks;

export const getResourceLink = (state, resourceName) => {
  if (state.resourceLinks && state.resourceLinks._links[resourceName]) {
    let template = state.resourceLinks._links[resourceName].href;
    if (template) {
      return template.replace(template.substring(template.indexOf('{')), '');
    }
  }
  return null;
};
