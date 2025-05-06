export default function setupCustomRoutes(router) {
  // Define your own custom routes here, just as you would in router.js but using 'router' instead of 'this'.
  // For example:
  // router.route('yourroute');
 router.route('renown-management');
 router.route('renown-management-org', { path: '/renown-management/:org' });
 router.route('renown-top');
}
