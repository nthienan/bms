export const selectResourceLinks = state => state.resourceLinks;

export const selectResourceLink = (state, resourceName) => {
  if (state.resourceLinks && state.resourceLinks._links[resourceName]) {
    let template = state.resourceLinks._links[resourceName].href;
    if (template) {
      return template.replace(template.substring(template.indexOf('{')), '');
    }
  }
  return null;
};
