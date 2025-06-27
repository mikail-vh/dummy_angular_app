# Core Module

## Purpose
The **core module** contains singleton services, single-use components, and other features that are used application-wide but should only be loaded once.

## What belongs here:
- **Singleton services** (authentication, logging, global error handling)
- **Single-use components** (navbar, footer, main layout)
- **Guards** (route guards for authentication, role-based access)
- **Interceptors** (HTTP interceptors for authentication, error handling)
- **Models/Interfaces** used across the application

## Key Principles:
1. **Single Responsibility**: Each service/component has one clear purpose
2. **Singleton Pattern**: Services here are provided at the root level
3. **Import Once**: This module should only be imported in the AppModule
4. **Shared Logic**: Contains logic that multiple feature modules need

## Structure:
```
core/
├── components/     # Single-use components (navbar, footer)
├── services/       # Singleton services
├── guards/         # Route guards
├── interceptors/   # HTTP interceptors
├── models/         # Shared interfaces/types
└── core.module.ts  # Module definition
```

## Example Usage:
```typescript
// In app.module.ts
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    CoreModule // Import only once
  ]
})
export class AppModule { }
``` 
