import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * THEME SERVICE
 *
 * Purpose: Manages the application's theme state (light/dark mode)
 *
 * Key Concepts Demonstrated:
 * 1. **Injectable Service**: Uses @Injectable decorator to make it available for dependency injection
 * 2. **BehaviorSubject**: Holds the current theme state and emits to subscribers
 * 3. **Observable Pattern**: Allows components to subscribe to theme changes
 * 4. **Local Storage**: Persists user preference across browser sessions
 * 5. **Singleton Pattern**: One instance shared across the entire application
 */

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root' // This makes the service a singleton available application-wide
})
export class ThemeService {

  // PRIVATE PROPERTIES
  // BehaviorSubject holds the current value and emits it to new subscribers immediately
  private readonly _isDarkMode = new BehaviorSubject<boolean>(false);

  // PUBLIC OBSERVABLES
  // Components can subscribe to this to react to theme changes
  public readonly isDarkMode$: Observable<boolean> = this._isDarkMode.asObservable();

  // STORAGE KEY
  // Consistent key for localStorage to avoid typos
  private readonly THEME_STORAGE_KEY = 'app-theme';

  constructor() {
    // Initialize theme from localStorage or system preference
    this.initializeTheme();
  }

  /**
   * INITIALIZATION METHOD
   *
   * This method runs when the service is first created.
   * It checks for saved user preference or falls back to system preference.
   *
   * Learning Points:
   * - localStorage.getItem() can return null, so we handle that case
   * - window.matchMedia() checks system dark mode preference
   * - We immediately apply the theme to avoid flash of wrong theme
   */
  private initializeTheme(): void {
    // Try to get saved preference from localStorage
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme;

    let isDark = false;

    if (savedTheme) {
      // User has a saved preference, use it
      isDark = savedTheme === 'dark';
    } else {
      // No saved preference, check system preference
      // window.matchMedia() returns a MediaQueryList object
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Apply the determined theme
    this.setTheme(isDark ? 'dark' : 'light');
  }

  /**
   * GET CURRENT THEME
   *
   * Returns the current theme as a string value.
   * This is useful for components that need the current value immediately
   * without subscribing to the observable.
   */
  getCurrentTheme(): Theme {
    return this._isDarkMode.value ? 'dark' : 'light';
  }

  /**
   * CHECK IF DARK MODE IS ACTIVE
   *
   * Returns the current boolean state.
   * Convenient method for quick checks.
   */
  isDarkMode(): boolean {
    return this._isDarkMode.value;
  }

  /**
   * SET THEME METHOD
   *
   * This is the main method for changing themes.
   *
   * What it does:
   * 1. Updates the internal state (BehaviorSubject)
   * 2. Applies CSS classes to the document
   * 3. Saves preference to localStorage
   * 4. Notifies all subscribers about the change
   *
   * @param theme - The theme to apply ('light' or 'dark')
   */
  setTheme(theme: Theme): void {
    const isDark = theme === 'dark';

    // Update internal state - this will notify all subscribers
    this._isDarkMode.next(isDark);

    // Apply theme to the DOM
    this.applyThemeToDOM(theme);

    // Save preference to localStorage for next visit
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
  }

  /**
   * TOGGLE THEME METHOD
   *
   * Convenience method to switch between light and dark themes.
   * This is commonly bound to theme toggle buttons.
   *
   * Example usage in component:
   * ```typescript
   * onToggleTheme() {
   *   this.themeService.toggleTheme();
   * }
   * ```
   */
  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * APPLY THEME TO DOM
   *
   * This method actually applies the theme by manipulating CSS classes.
   *
   * How it works:
   * 1. Gets reference to document.documentElement (the <html> element)
   * 2. Removes existing theme classes
   * 3. Adds the new theme class
   *
   * This approach allows CSS to handle the actual styling:
   * ```css
   * .light-theme { --primary-color: #000; }
   * .dark-theme { --primary-color: #fff; }
   * ```
   *
   * @param theme - The theme to apply
   */
  private applyThemeToDOM(theme: Theme): void {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light-theme', 'dark-theme');

    // Add new theme class
    root.classList.add(`${theme}-theme`);

    // Optional: Set a CSS custom property for the theme
    root.style.setProperty('--current-theme', theme);
  }
}

/**
 * USAGE EXAMPLES:
 *
 * 1. In a Component (subscribing to changes):
 * ```typescript
 * export class HeaderComponent implements OnInit, OnDestroy {
 *   isDarkMode = false;
 *   private destroy$ = new Subject<void>();
 *
 *   constructor(private themeService: ThemeService) {}
 *
 *   ngOnInit() {
 *     this.themeService.isDarkMode$
 *       .pipe(takeUntil(this.destroy$))
 *       .subscribe(isDark => {
 *         this.isDarkMode = isDark;
 *       });
 *   }
 *
 *   ngOnDestroy() {
 *     this.destroy$.next();
 *     this.destroy$.complete();
 *   }
 *
 *   toggleTheme() {
 *     this.themeService.toggleTheme();
 *   }
 * }
 * ```
 *
 * 2. In a Component (using async pipe):
 * ```typescript
 * export class HeaderComponent {
 *   isDarkMode$ = this.themeService.isDarkMode$;
 *
 *   constructor(private themeService: ThemeService) {}
 *
 *   toggleTheme() {
 *     this.themeService.toggleTheme();
 *   }
 * }
 * ```
 *
 * Template with async pipe:
 * ```html
 * <button (click)="toggleTheme()">
 *   {{ (isDarkMode$ | async) ? 'Switch to Light' : 'Switch to Dark' }}
 * </button>
 * ```
 */
