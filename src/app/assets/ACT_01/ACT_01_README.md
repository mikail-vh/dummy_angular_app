# Activity 1: Create User Profile Cards

## 🎯 Goal
Create a user profile card component and display the user list in the dashboard.

## 📋 What You'll Build
Simple user cards showing name, position, email, and phone number (see the example image).

## 🛠️ Step 1: Create the Component

Generate a new component in the shared folder:

```bash
ng g c shared/components/user-profile-card --standalone
```

## 📝 Step 2: Component Setup

In `user-profile-card.component.ts`:
- Import the `User` interface from the assets folder
- Add an `@Input()` property to receive user data

## 🎨 Step 3: Component Template

Create a card that displays:
- User's full name (firstName + lastName)
- Position
- Email
- Phone

**Hint**: Look at the example image for layout ideas

## 💅 Step 4: Component Styles

Style your card using existing CSS variables:
- `var(--card-bg)`
- `var(--text-primary)`
- `var(--text-secondary)`

**Hint**: Check `dashboard.component.scss` for inspiration

## 🔗 Step 5: Update Dashboard

### In `dashboard.component.ts`:
- Import the users array and User interface
- Import your UserProfileCardComponent
- Add users property to component class

### In `dashboard.component.html`:
Find the empty user section and add:
```html
<div class="users-grid">
  <!-- Use @for to loop through users and display cards -->
</div>
```

### In `dashboard.component.scss`:
```scss
.users-grid {
  display: flex;
  //investigate flex wrap
  gap: 1.5rem;
}
```

## 🧪 Step 6: Test Your Work

```bash
npm run start
```

## ✅ Success Criteria
- [ ] User cards display all user information
- [ ] Cards are responsive
- [ ] No console errors
- [ ] Matches existing dashboard style

## 💡 Key Concepts
- `@Input()` decorators
- `*ngFor` directive
- Component imports
- CSS Grid layouts
