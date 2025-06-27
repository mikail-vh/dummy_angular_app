import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * NAVIGATION SERVICE
 *
 * Purpose: Manages navigation state and provides utilities for routing
 *
 * Key Concepts Demonstrated:
 * 1. **Router Integration**: Works with Angular Router to track navigation
 * 2. **Observable Streams**: Provides reactive navigation state
 * 3. **RxJS Operators**: Uses filter() and map() to transform router events
 * 4. **Navigation Utilities**: Helper methods for common navigation tasks
 * 5. **Active Route Tracking**: Tracks current route for UI highlights
 */

export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  // NAVIGATION ITEMS
  // Define the main navigation structure
  // In a real app, this might come from an API or configuration
  private readonly navigationItems: NavigationItem[] = [
    {
      path: '/home',
      label: 'Home',
      icon: '🏠',
      description: 'Welcome page with app overview'
    },
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: '📊',
      description: 'Data visualization and analytics'
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: '👤',
      description: 'User profile and settings'
    }
  ];

  // CURRENT ROUTE TRACKING
  private readonly _currentRoute = new BehaviorSubject<string>('/');
  public readonly currentRoute$: Observable<string> = this._currentRoute.asObservable();

  // NAVIGATION STATE
  private readonly _isNavigating = new BehaviorSubject<boolean>(false);
  public readonly isNavigating$: Observable<boolean> = this._isNavigating.asObservable();

  constructor(private router: Router) {
    this.initializeRouterTracking();
  }

  /**
   * INITIALIZE ROUTER TRACKING
   *
   * Sets up subscription to router events to track navigation changes.
   *
   * Learning Points:
   * - router.events is an Observable that emits various router events
   * - filter() operator only lets through NavigationEnd events
   * - map() operator transforms the event to just the URL string
   * - We subscribe to update our internal state
   */
  private initializeRouterTracking(): void {
    // Listen to router events and track successful navigation
    this.router.events
      .pipe(
        // Only care about NavigationEnd events (successful navigation)
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        // Extract just the URL from the event
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe((url: string) => {
        // Update current route state
        this._currentRoute.next(url);
        // Reset navigation loading state
        this._isNavigating.next(false);
      });
  }

  /**
   * GET NAVIGATION ITEMS
   *
   * Returns the array of navigation items.
   * This is used by navigation components to render menu items.
   *
   * @returns Array of navigation items
   */
  getNavigationItems(): NavigationItem[] {
    return [...this.navigationItems]; // Return a copy to prevent external modification
  }

  /**
   * GET CURRENT ROUTE
   *
   * Returns the current route path synchronously.
   * Useful when you need the current value immediately.
   */
  getCurrentRoute(): string {
    return this._currentRoute.value;
  }

  /**
   * IS ROUTE ACTIVE
   *
   * Checks if a given route is currently active.
   * Used for highlighting active navigation items.
   *
   * @param route - The route path to check
   * @returns boolean indicating if the route is active
   */
  isRouteActive(route: string): boolean {
    return this.getCurrentRoute() === route;
  }

  /**
   * NAVIGATE TO ROUTE
   *
   * Programmatically navigate to a route with loading state management.
   *
   * @param route - The route path to navigate to
   * @param extras - Optional router navigation extras
   */
  async navigateTo(route: string, extras?: any): Promise<boolean> {
    // Set loading state
    this._isNavigating.next(true);

    try {
      // Perform navigation
      const result = await this.router.navigate([route], extras);

      // If navigation failed, reset loading state
      if (!result) {
        this._isNavigating.next(false);
      }

      return result;
    } catch (error) {
      // Handle navigation error
      console.error('Navigation error:', error);
      this._isNavigating.next(false);
      return false;
    }
  }

  /**
   * GO BACK
   *
   * Navigate back in browser history.
   * Uses the Location service under the hood.
   */
  goBack(): void {
    window.history.back();
  }

  /**
   * GET ROUTE LABEL
   *
   * Gets the display label for a route path.
   * Useful for breadcrumbs or page titles.
   *
   * @param route - The route path
   * @returns The display label or the route itself if not found
   */
  getRouteLabel(route: string): string {
    const navItem = this.navigationItems.find(item => item.path === route);
    return navItem ? navItem.label : route;
  }

  /**
   * GET ROUTE ICON
   *
   * Gets the icon for a route path.
   *
   * @param route - The route path
   * @returns The icon string or empty string if not found
   */
  getRouteIcon(route: string): string {
    const navItem = this.navigationItems.find(item => item.path === route);
    return navItem?.icon || '';
  }

  /**
   * IS NAVIGATION LOADING
   *
   * Returns current navigation loading state synchronously.
   */
  isNavigationLoading(): boolean {
    return this._isNavigating.value;
  }
}

/**
 * USAGE EXAMPLES:
 *
 * 1. In a Navigation Component:
 * ```typescript
 * export class NavbarComponent implements OnInit {
 *   navigationItems: NavigationItem[] = [];
 *   currentRoute$ = this.navigationService.currentRoute$;
 *   isNavigating$ = this.navigationService.isNavigating$;
 *
 *   constructor(private navigationService: NavigationService) {}
 *
 *   ngOnInit() {
 *     this.navigationItems = this.navigationService.getNavigationItems();
 *   }
 *
 *   isActive(route: string): boolean {
 *     return this.navigationService.isRouteActive(route);
 *   }
 *
 *   async navigateTo(route: string) {
 *     await this.navigationService.navigateTo(route);
 *   }
 * }
 * ```
 *
 * 2. In a Template:
 * ```html
 * <nav class="navbar">
 *   <div class="nav-items">
 *     <a
 *       *ngFor="let item of navigationItems"
 *       [routerLink]="item.path"
 *       [class.active]="isActive(item.path)"
 *       class="nav-link"
 *     >
 *       <span class="nav-icon">{{ item.icon }}</span>
 *       <span class="nav-label">{{ item.label }}</span>
 *     </a>
 *   </div>
 *
 *   <div *ngIf="isNavigating$ | async" class="loading-indicator">
 *     Loading...
 *   </div>
 * </nav>
 * ```
 */
