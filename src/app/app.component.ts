import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ThemeService } from './core/services/theme.service';

/**
 * APP COMPONENT
 *
 * Purpose: Root component that bootstraps the entire application
 *
 * Key Concepts Demonstrated:
 * 1. **Root Component**: Entry point for the Angular application
 * 2. **Component Composition**: Including child components (navbar)
 * 3. **Routing**: Using router-outlet for navigation
 * 4. **Service Integration**: Initializing theme service
 * 5. **Standalone Components**: Modern Angular architecture
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,      // Enables routing in the app
    NavbarComponent    // Our custom navigation component
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  // APPLICATION PROPERTIES
  title = 'Angular Learning Application';
  version = '1.0.0';

  /**
   * CONSTRUCTOR
   *
   * Dependency injection happens here.
   * We inject the ThemeService to ensure it's initialized when the app starts.
   *
   * Note: Even though we don't use themeService directly in this component,
   * injecting it here ensures it's created early and can initialize the theme
   * from localStorage or system preferences.
   */
  constructor(private themeService: ThemeService) {
    console.log('🚀 Angular Learning App starting...');
  }

  /**
   * NG ON INIT
   *
   * Component initialization logic.
   * This runs after the component is constructed and its inputs are set.
   */
  ngOnInit(): void {
    console.log('✅ App component initialized');
    console.log('📱 Current theme:', this.themeService.getCurrentTheme());

    // Log app information for debugging
    this.logAppInfo();
  }

  /**
   * LOG APP INFO
   *
   * Utility method to log application information.
   * This demonstrates private helper methods in components.
   */
  private logAppInfo(): void {
    console.log('📋 App Info:', {
      title: this.title,
      version: this.version,
      angular: '19.x',
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * COMPONENT ARCHITECTURE NOTES:
 *
 * 1. **Standalone Components** (Angular 14+):
 *    - No need for NgModule declarations
 *    - Self-contained with their own imports
 *    - Easier to understand and maintain
 *
 * 2. **Service Injection**:
 *    - Services are injected in the constructor
 *    - Injecting a service ensures it's instantiated
 *    - Services are singletons by default
 *
 * 3. **Component Lifecycle**:
 *    - constructor() - Dependency injection
 *    - ngOnInit() - Component initialization
 *    - ngOnDestroy() - Cleanup (if needed)
 *
 * 4. **Template Communication**:
 *    - Properties are accessible in templates
 *    - Methods can be called from templates
 *    - Events can be handled with (event)="method()"
 *
 * 5. **Child Components**:
 *    - Include child components in imports array
 *    - Use their selectors in the template
 *    - Pass data via @Input() properties
 *    - Listen to events via @Output() properties
 *
 * BEST PRACTICES:
 *
 * 1. Keep components focused on presentation
 * 2. Delegate business logic to services
 * 3. Use OnPush change detection when possible
 * 4. Implement OnDestroy for cleanup
 * 5. Use TypeScript interfaces for type safety
 * 6. Follow Angular style guide conventions
 */
