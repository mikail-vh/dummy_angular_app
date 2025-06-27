# Shared Module

## Purpose
The **shared module** contains reusable components, directives, and pipes that can be used across multiple feature modules.

## What belongs here:
- **Reusable components** (buttons, cards, modals, form controls)
- **Custom directives** (highlight, tooltip, etc.)
- **Custom pipes** (date formatting, text transformation)
- **Common utilities** (helper functions, constants)

## Key Principles:
1. **Reusability**: Everything here should be reusable across features
2. **Stateless**: Components should be presentation-only (dumb components)
3. **Import/Export**: Can be imported by multiple feature modules
4. **No Business Logic**: Focused on UI and presentation

## Structure:
```
shared/
├── components/     # Reusable UI components
├── directives/     # Custom directives
├── pipes/          # Custom pipes
├── constants/      # Application constants
├── utils/          # Helper functions
└── shared.module.ts # Module definition
```

## Example Usage:
```typescript
// In feature.module.ts
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule // Can be imported by multiple modules
  ]
})
export class FeatureModule { }
```

## Component Examples:
- Button component with different variants
- Card component for displaying content
- Loading spinner
- Confirmation dialog
- Form input components 
