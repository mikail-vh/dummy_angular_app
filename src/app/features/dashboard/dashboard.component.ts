import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * DASHBOARD COMPONENT
 *
 * Purpose: Demonstrates data visualization and analytics concepts
 *
 * Key Concepts Demonstrated:
 * 1. Data presentation in cards and charts
 * 2. Component state management
 * 3. Computed properties
 * 4. Array manipulation methods
 */

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  pageTitle = 'Analytics Dashboard';

  // Sample statistics data
  stats: StatCard[] = [
    {
      title: 'Total Users',
      value: '12,543',
      change: 12.5,
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: -3.2,
      icon: '💰',
      color: 'green'
    },
    {
      title: 'Orders',
      value: '8,901',
      change: 8.7,
      icon: '📦',
      color: 'orange'
    },
    {
      title: 'Growth Rate',
      value: '23.4%',
      change: 15.3,
      icon: '📈',
      color: 'purple'
    }
  ];

  // Sample chart data
  chartData: ChartData[] = [
    { label: 'Desktop', value: 45, color: '#3182ce' },
    { label: 'Mobile', value: 30, color: '#38a169' },
    { label: 'Tablet', value: 25, color: '#ed8936' }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('Dashboard component initialized');
  }

  /**
   * Get the CSS class for stat change indicators
   */
  getChangeClass(change: number): string {
    return change >= 0 ? 'positive' : 'negative';
  }

  /**
   * Get the arrow icon for stat changes
   */
  getChangeIcon(change: number): string {
    return change >= 0 ? '↗️' : '↘️';
  }

  /**
   * Calculate total chart value
   */
  getTotalChartValue(): number {
    return this.chartData.reduce((sum, item) => sum + item.value, 0);
  }

  /**
   * Get percentage for chart items
   */
  getPercentage(value: number): number {
    const total = this.getTotalChartValue();
    return Math.round((value / total) * 100);
  }

  /**
   * TrackBy function for performance optimization
   */
  trackByTitle(index: number, item: StatCard): string {
    return item.title;
  }
}
