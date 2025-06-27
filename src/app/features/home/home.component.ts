import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ThemeService } from '../../core/services/theme.service';

/**
 * HOME COMPONENT
 *
 * Purpose: Landing page component that welcomes users and provides app overview
 *
 * Key Concepts Demonstrated:
 * 1. **Basic Component Structure**: Simple component with template and styles
 * 2. **Service Integration**: Uses ThemeService to display current theme
 * 3. **Component Communication**: Shows how to get data from services
 * 4. **Template Interpolation**: Displays dynamic content
 * 5. **Lifecycle Hooks**: Implements OnInit for initialization
 */

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  // COMPONENT PROPERTIES
  // These properties are used to store component state
  appTitle = 'Angular Learning Application';
  appDescription = 'A comprehensive example app to learn Angular concepts';
  currentTheme = 'light';

  // FEATURE LIST
  // Array of features to demonstrate *ngFor and data binding
  features = [
    {
      icon: '🎯',
      title: 'Clean Architecture',
      description: 'Learn proper folder structure and separation of concerns'
    },
    {
      icon: '🔧',
      title: 'Services & DI',
      description: 'Understand dependency injection and service patterns'
    },
    {
      icon: '🎨',
      title: 'Theming',
      description: 'Implement light/dark mode with CSS custom properties'
    },
    {
      icon: '🚀',
      title: 'Routing',
      description: 'Navigation between different views and components'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Mobile-first approach with modern CSS techniques'
    },
    {
      icon: '♿',
      title: 'Accessibility',
      description: 'ARIA labels, keyboard navigation, and screen reader support'
    }
  ];

  /**
   * CONSTRUCTOR
   *
   * Dependency injection of required services.
   * Keep constructor minimal - only for DI.
   */
  constructor(private themeService: ThemeService) {}

  /**
   * NG ON INIT
   *
   * Component initialization logic goes here.
   * This is where you should:
   * - Set up initial data
   * - Subscribe to services
   * - Perform any startup tasks
   */
  ngOnInit(): void {
    // Get current theme from service
    this.currentTheme = this.themeService.getCurrentTheme();

    console.log('HomeComponent initialized with theme:', this.currentTheme);
  }

  /**
   * GET WELCOME MESSAGE
   *
   * Computed property that generates a personalized welcome message.
   * This demonstrates method calls in templates.
   *
   * @returns Personalized welcome message
   */
  getWelcomeMessage(): string {
    const timeOfDay = this.getTimeOfDay();
    return `Good ${timeOfDay}! Welcome to the Angular Learning App.`;
  }

  /**
   * GET TIME OF DAY
   *
   * Utility method to determine current time of day.
   * This shows how to create reusable helper methods.
   *
   * @returns Time of day string
   */
  private getTimeOfDay(): string {
    const hour = new Date().getHours();

    if (hour < 12) {
      return 'morning';
    } else if (hour < 17) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  }

  /**
   * ON FEATURE CLICK
   *
   * Event handler for feature card clicks.
   * This demonstrates event handling with parameters.
   *
   * @param feature - The feature that was clicked
   */
  onFeatureClick(feature: any): void {
    console.log('Feature clicked:', feature.title);
    // In a real app, this might navigate to a detailed view
    // or open a modal with more information
  }

  /**
   * TOGGLE THEME
   *
   * Method to toggle between light and dark themes.
   * This demonstrates service method calls.
   */
  onToggleTheme(): void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getCurrentTheme();
  }

    /**
   * GET THEME STATUS
   *
   * Returns a formatted string about the current theme.
   * This shows string interpolation and conditional logic.
   */
  getThemeStatus(): string {
    return `Currently using ${this.currentTheme} theme`;
  }

  /**
   * TRACK BY TITLE
   *
   * TrackBy function for *ngFor to improve performance.
   * Angular uses this to identify which items have changed.
   *
   * @param index - The index of the item
   * @param feature - The feature object
   * @returns A unique identifier for the feature
   */
  trackByTitle(index: number, feature: any): string {
    return feature.title;
  }
}

/**
 * LEARNING NOTES:
 *
 * 1. **Component Lifecycle**:
 *    - constructor() - DI happens here
 *    - ngOnInit() - Component initialization
 *    - ngOnDestroy() - Cleanup (if implemented)
 *
 * 2. **Data Binding Types**:
 *    - Interpolation: {{ property }}
 *    - Property Binding: [property]="value"
 *    - Event Binding: (event)="handler()"
 *    - Two-way Binding: [(ngModel)]="property"
 *
 * 3. **Service Integration**:
 *    - Inject services in constructor
 *    - Use services in component methods
 *    - Services provide reusable functionality
 *
 * 4. **Template Communication**:
 *    - Component properties are available in template
 *    - Methods can be called from template
 *    - Event handlers receive template events
 *
 * 5. **Best Practices**:
 *    - Keep constructor minimal
 *    - Use OnInit for initialization
 *    - Separate business logic from presentation
 *    - Use TypeScript types for better development experience
 */
