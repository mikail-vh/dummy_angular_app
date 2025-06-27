import { Routes } from '@angular/router';

/**
 * APPLICATION ROUTES
 *
 * This file defines the main routing configuration for the application.
 *
 * Key Concepts Demonstrated:
 * 1. **Route Configuration**: Mapping URL paths to components
 * 2. **Lazy Loading**: Using dynamic imports for better performance
 * 3. **Default Routes**: Redirecting empty path to a default route
 * 4. **Wildcard Routes**: Handling 404 cases
 * 5. **Route Guards**: Can be added for authentication/authorization
 */

export const routes: Routes = [
  // DEFAULT ROUTE
  // When user visits the root URL (/), redirect to /home
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  // HOME ROUTE
  // Direct component loading (not lazy loaded since it's likely to be visited immediately)
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home - Learning App' // Sets the browser tab title
  },

  // DASHBOARD ROUTE
  // Lazy loaded component for better initial bundle size
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard - Learning App'
  },

  // PROFILE ROUTE
  // Another lazy loaded component
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    title: 'Profile - Learning App'
  },

  // WILDCARD ROUTE (404 - Page Not Found)
  // This should always be the last route
  // In a real app, you'd have a dedicated 404 component
  {
    path: '**',
    redirectTo: '/home'
  }
];

/**
 * ROUTING CONCEPTS EXPLAINED:
 *
 * 1. **Route Order Matters**: Routes are matched from top to bottom
 * 2. **pathMatch: 'full'**: Ensures exact path matching for redirects
 * 3. **loadComponent**: Lazy loads components on demand
 * 4. **title**: Sets the browser tab title (Angular 14+ feature)
 *
 * ADVANCED ROUTING FEATURES (not used here but good to know):
 *
 * 1. **Route Parameters**:
 *    { path: 'user/:id', component: UserComponent }
 *
 * 2. **Query Parameters**:
 *    Available in components via ActivatedRoute
 *
 * 3. **Route Guards**:
 *    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
 *
 * 4. **Child Routes**:
 *    {
 *      path: 'products',
 *      component: ProductsComponent,
 *      children: [
 *        { path: 'list', component: ProductListComponent },
 *        { path: 'detail/:id', component: ProductDetailComponent }
 *      ]
 *    }
 *
 * 5. **Route Resolvers**:
 *    Pre-fetch data before component loads
 *
 * 6. **Route Data**:
 *    { path: 'about', component: AboutComponent, data: { title: 'About Us' } }
 */
