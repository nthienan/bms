export const getResourceLink = (resourceName, root) => {
  let template = root._links[resourceName].href;
  if (template) {
    return template.replace(template.substring(template.indexOf('{')), '');
  }
  return null;
};
