# Reusable Components Guide

This project now includes reusable header and footer components that can be used across multiple pages.

## File Structure

```
├── components/
│   ├── header.html          # Navigation header component
│   └── footer.html          # Footer component
├── js/
│   └── components.js        # Component loader script
├── index.html               # Main page (updated to use components)
├── template.html            # Template for new pages
└── README-components.md     # This guide
```

## How to Use Components

### 1. For New Pages

1. Copy the `template.html` file and rename it to your new page
2. Add your page-specific content between the header and footer
3. Include the component loader script: `<script src="js/components.js"></script>`
4. The components will automatically load when the page loads

### 2. Component Structure

Each page should have this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your head content -->
</head>
<body>
    <!-- Header Component -->
    <div id="header-component"></div>

    <!-- Your Page Content -->
    <main>
        <!-- Your content here -->
    </main>

    <!-- Footer Component -->
    <div id="footer-component"></div>

    <!-- Component Loader -->
    <script src="js/components.js"></script>
</body>
</html>
```

### 3. Updating Components

- To update the header: Edit `components/header.html`
- To update the footer: Edit `components/footer.html`
- Changes will automatically apply to all pages using the components

### 4. Adding New Components

To add a new reusable component:

1. Create a new HTML file in the `components/` directory
2. Add a new method to the `ComponentLoader` class in `js/components.js`
3. Call the new method in the `loadAllComponents()` function
4. Add a placeholder div with the appropriate ID in your HTML

Example:
```javascript
static async loadNewComponent() {
    await this.loadComponent('components/new-component.html', 'new-component');
}
```

## Benefits

- **Consistency**: All pages will have the same header and footer
- **Maintainability**: Update once, apply everywhere
- **Efficiency**: No need to copy/paste code between pages
- **Scalability**: Easy to add new components as your site grows

## Notes

- Components are loaded asynchronously when the page loads
- Make sure all pages include the same CSS styles for consistent appearance
- The component loader uses modern JavaScript (ES6+), so ensure browser compatibility
