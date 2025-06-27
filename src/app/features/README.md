# Features Module

## Purpose
The **features directory** contains feature modules that implement specific business functionality. Each feature is self-contained and represents a major section of the application.

## What belongs here:
- **Feature modules** (home, dashboard, profile, etc.)
- **Feature-specific components** (smart/container components)
- **Feature-specific services** (data services, business logic)
- **Feature routing** (child routes for the feature)

## Key Principles:
1. **Feature Isolation**: Each feature is independent and self-contained
2. **Lazy Loading**: Features can be lazy-loaded for better performance
3. **Smart Components**: Contains business logic and state management
4. **Domain-Driven**: Organized around business capabilities

## Structure:
```
features/
├── home/
│   ├── components/     # Feature-specific components
│   ├── services/       # Feature-specific services
│   ├── home-routing.module.ts
│   └── home.module.ts
├── dashboard/
│   ├── components/
│   ├── services/
│   ├── dashboard-routing.module.ts
│   └── dashboard.module.ts
└── profile/
    ├── components/
    ├── services/
    ├── profile-routing.module.ts
    └── profile.module.ts
```

## Example Feature Module:
```typescript
// home.module.ts
@NgModule({
  declarations: [
    HomeComponent,
    HomeCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule, // Import shared components
    HomeRoutingModule
  ]
})
export class HomeModule { }
```

## Lazy Loading Example:
```typescript
// In app-routing.module.ts
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  }
];
``` 
