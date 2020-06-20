/**
 * 
 * @param {Component} parent Parent component's name
 * @param {RouteConfig[]} routes Array of route config
 */
export function getChildRoutes(parent, routes){
  return routes.find(route => route.component === parent).childrens
}