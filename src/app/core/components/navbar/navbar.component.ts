import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ThemeService } from '../../services/theme.service';
import { NavigationService, NavigationItem } from '../../services/navigation.service';

/**
 * NAVBAR COMPONENT
 *
 * Purpose: Main navigation component that demonstrates key Angular concepts
 *
 * Key Concepts Demonstrated:
 * 1. **Component Lifecycle**: Implements OnInit and OnDestroy
 * 2. **Dependency Injection**: Injects services through constructor
 * 3. **Reactive Programming**: Uses Observables and manages subscriptions
 * 4. **Memory Management**: Properly unsubscribes to prevent memory leaks
 * 5. **Template Binding**: Shows different types of data binding
 * 6. **Standalone Components**: Uses imports array for dependencies
 */

@Component({
  selector: 'app-navbar',
  standalone: true, // This is a standalone component (Angular 14+ feature)
  imports: [
    CommonModule,  // Provides *ngFor, *ngIf, async pipe, etc.
    RouterModule   // Provides routerLink directive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  // COMPONENT STATE
  // These properties hold the component's state and are bound to the template
  navigationItems: NavigationItem[] = [];
  currentTheme: string = 'light';
  isNavigating = false;

  // OBSERVABLES
  // These are used with the async pipe in the template for reactive UI updates
  // Note: We'll initialize these in ngOnInit to avoid initialization order issues
  isDarkMode$!: Observable<boolean>;
  currentRoute$!: Observable<string>;
  isNavigating$!: Observable<boolean>;

  // SUBSCRIPTION MANAGEMENT
  // Subject used to signal component destruction for subscription cleanup
  private readonly destroy$ = new Subject<void>();

  /**
   * CONSTRUCTOR
   *
   * Dependency Injection happens here.
   * Angular's DI system will provide instances of the services.
   *
   * Learning Points:
   * - Services are injected as constructor parameters
   * - TypeScript's access modifiers (private, public) create properties automatically
   * - Constructor should only be used for DI, not complex initialization
   */
  constructor(
    private themeService: ThemeService,
    private navigationService: NavigationService
  ) {
    // Constructor should be kept minimal
    // Complex initialization should be done in ngOnInit
  }

  /**
   * NG ON INIT LIFECYCLE HOOK
   *
   * This method runs after Angular has initialized the component.
   * It's the perfect place for:
   * - Setting up subscriptions
   * - Fetching initial data
   * - Component initialization logic
   *
   * Learning Points:
   * - Always implement OnInit interface when using ngOnInit
   * - This runs after constructor but before the first change detection
   * - Component's template and child components are not yet initialized
   */
    ngOnInit(): void {
    // Initialize observables
    this.isDarkMode$ = this.themeService.isDarkMode$;
    this.currentRoute$ = this.navigationService.currentRoute$;
    this.isNavigating$ = this.navigationService.isNavigating$;

    // Initialize navigation items
    this.initializeNavigation();

    // Set up reactive subscriptions
    this.setupSubscriptions();

    console.log('NavbarComponent initialized');
  }

  /**
   * NG ON DESTROY LIFECYCLE HOOK
   *
   * This method runs just before Angular destroys the component.
   * It's crucial for cleanup to prevent memory leaks.
   *
   * Learning Points:
   * - Always implement OnDestroy when managing subscriptions
   * - Unsubscribe from observables to prevent memory leaks
   * - Clean up any timers, event listeners, or external resources
   */
  ngOnDestroy(): void {
    // Signal all subscriptions to complete
    this.destroy$.next();
    this.destroy$.complete();

    console.log('NavbarComponent destroyed');
  }

  /**
   * INITIALIZE NAVIGATION
   *
   * Sets up the navigation items from the navigation service.
   * This demonstrates service communication and data flow.
   */
  private initializeNavigation(): void {
    this.navigationItems = this.navigationService.getNavigationItems();
  }

  /**
   * SETUP SUBSCRIPTIONS
   *
   * Establishes reactive subscriptions with proper cleanup management.
   *
   * Learning Points:
   * - takeUntil() operator automatically unsubscribes when destroy$ emits
   * - This pattern prevents memory leaks from forgotten subscriptions
   * - We subscribe to services to react to state changes
   */
  private setupSubscriptions(): void {
    // Subscribe to theme changes
    this.themeService.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        this.currentTheme = isDark ? 'dark' : 'light';
        console.log('Theme changed to:', this.currentTheme);
      });

    // Subscribe to navigation state
    this.navigationService.isNavigating$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isNavigating => {
        this.isNavigating = isNavigating;
      });
  }

  /**
   * TOGGLE THEME METHOD
   *
   * Handles theme toggle button clicks.
   * This demonstrates event handling and service interaction.
   *
   * Learning Points:
   * - Methods can be bound to template events with (click)="method()"
   * - We delegate actual logic to services (separation of concerns)
   * - Component acts as a coordinator between template and services
   */
  onToggleTheme(): void {
    console.log('Theme toggle requested');
    this.themeService.toggleTheme();
  }

  /**
   * NAVIGATION ITEM CLICK HANDLER
   *
   * Handles clicks on navigation items.
   * This shows how to handle events with parameters.
   *
   * @param item - The navigation item that was clicked
   */
  onNavigationItemClick(item: NavigationItem): void {
    console.log('Navigation requested to:', item.path);
    // The actual navigation will be handled by routerLink in the template
    // But we could add additional logic here if needed
  }

  /**
   * IS ROUTE ACTIVE
   *
   * Determines if a route is currently active for styling purposes.
   * This demonstrates computed properties and service integration.
   *
   * @param route - The route path to check
   * @returns boolean indicating if the route is active
   */
  isRouteActive(route: string): boolean {
    return this.navigationService.isRouteActive(route);
  }

  /**
   * GET THEME ICON
   *
   * Returns appropriate icon based on current theme.
   * This demonstrates computed values in templates.
   */
  getThemeIcon(): string {
    return this.currentTheme === 'dark' ? '☀️' : '🌙';
  }

    /**
   * GET THEME LABEL
   *
   * Returns appropriate label for theme toggle button.
   */
  getThemeLabel(): string {
    return this.currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }

  /**
   * TRACK BY FUNCTION
   *
   * Improves performance of *ngFor by providing a unique identifier.
   * Angular uses this to determine which items changed, reducing DOM updates.
   *
   * @param index - The index of the item
   * @param item - The navigation item
   * @returns A unique identifier for the item
   */
  trackByPath(index: number, item: NavigationItem): string {
    return item.path;
  }
}

/**
 * TEMPLATE BINDING EXAMPLES:
 *
 * 1. Property Binding:
 * ```html
 * <div [class.active]="isRouteActive(item.path)">
 * ```
 *
 * 2. Event Binding:
 * ```html
 * <button (click)="onToggleTheme()">
 * ```
 *
 * 3. Two-way Binding (if needed):
 * ```html
 * <input [(ngModel)]="searchTerm">
 * ```
 *
 * 4. Interpolation:
 * ```html
 * <span>{{ item.label }}</span>
 * ```
 *
 * 5. Async Pipe:
 * ```html
 * <div *ngIf="isNavigating$ | async">Loading...</div>
 * ```
 */
