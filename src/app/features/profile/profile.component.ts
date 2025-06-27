import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <header class="profile-header">
        <h1 class="page-title">User Profile</h1>
        <p class="page-subtitle">Manage your account settings and preferences</p>
      </header>

      <div class="profile-content">
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              <span class="avatar-icon">👤</span>
            </div>
          </div>

          <div class="profile-info">
            <h2 class="profile-name">{{ user.name }}</h2>
            <p class="profile-email">{{ user.email }}</p>
            <p class="profile-role">{{ user.role }}</p>
          </div>

          <div class="profile-stats">
            <div class="stat-item">
              <div class="stat-value">{{ user.projectsCompleted }}</div>
              <div class="stat-label">Projects</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ user.tasksCompleted }}</div>
              <div class="stat-label">Tasks</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ user.experiencePoints }}</div>
              <div class="stat-label">XP</div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3 class="section-title">Settings</h3>
          <div class="settings-grid">
            <div class="setting-item">
              <span class="setting-label">Notifications</span>
              <span class="setting-value">{{ user.notifications ? 'Enabled' : 'Disabled' }}</span>
            </div>
            <div class="setting-item">
              <span class="setting-label">Language</span>
              <span class="setting-value">{{ user.language }}</span>
            </div>
            <div class="setting-item">
              <span class="setting-label">Timezone</span>
              <span class="setting-value">{{ user.timezone }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .page-title {
      font-size: 2.5rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .page-subtitle {
      color: #718096;
      font-size: 1.1rem;
    }

    .profile-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      text-align: center;
      margin-bottom: 2rem;
    }

    .profile-avatar {
      margin-bottom: 1.5rem;
    }

    .avatar-placeholder {
      width: 120px;
      height: 120px;
      background: #f7fafc;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      border: 3px solid #e2e8f0;
    }

    .avatar-icon {
      font-size: 3rem;
      color: #718096;
    }

    .profile-name {
      font-size: 1.75rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .profile-email {
      color: #718096;
      margin-bottom: 0.25rem;
    }

    .profile-role {
      color: #3182ce;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }

    .profile-stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .settings-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    .settings-grid {
      display: grid;
      gap: 1rem;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #f7fafc;
      border-radius: 8px;
    }

    .setting-label {
      font-weight: 500;
      color: #4a5568;
    }

    .setting-value {
      color: #718096;
    }

    @media (max-width: 768px) {
      .profile-container {
        padding: 1rem;
      }

      .profile-stats {
        gap: 1rem;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {

  user = {
    name: 'John Developer',
    email: 'john@example.com',
    role: 'Frontend Developer',
    projectsCompleted: 42,
    tasksCompleted: 156,
    experiencePoints: 2340,
    notifications: true,
    language: 'English',
    timezone: 'UTC-5'
  };

  constructor() {}

  ngOnInit(): void {
    console.log('Profile component initialized');
  }
}
