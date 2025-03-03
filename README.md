# 011h Frontend Technical Test

This project is my submission for the 011h Frontend Technical Test. It implements a product filtering system based on the provided requirements, built with React, Next.js, and TypeScript.

## Project Requirements Implemented

According to the test instructions, I've implemented:

1.  A grid view of products from the provided `products.json` file.
2.  Filtering capability by multiple parameters:
    - Material.
    - Category.
    - Color.
    - Type.
3.  Sorting functionality by size (ascending and descending).
4.  End-to-end testing with Playwright.

## Technical Approach

I approached this project as if it were the foundation of a complete e-commerce application, with a focus on maintainability, scalability, and user experience.

### Framework Decision

Although the test initially provided a Create React App (CRA) boilerplate, I made the strategic decision to migrate to Next.js for several reasons:

1.  **Performance Benefits**: Next.js offers built-in performance optimizations including server-side rendering and static generation, which are critical for e-commerce applications where page load speed directly impacts conversion rates.

2.  **SEO Advantages**: The server-side rendering capabilities of Next.js provide significant SEO benefits, which would be essential for product discoverability in a real e-commerce platform.

3.  **Modern Development Experience**: Next.js offers a more modern developer experience with features like file-based routing, API routes, and built-in image optimization.

4.  **Future-Proofing**: As CRA has been officially deprecated and is no longer receiving updates, choosing Next.js ensures the codebase remains on a supported, actively maintained framework.

5.  **Scalability**: The architecture of Next.js is better suited to scaling an e-commerce application, with clear separation between client and server code, and better support for incremental adoption of new features.

This migration is an architectural decision that considers the long-term health and scalability of a project, rather than simply working within the constraints of existing boilerplate code.

### Architecture

The architecture follows a component-based approach with clear separation of concerns:

- **Data Layer**: Utilities for fetching, filtering, and sorting products
- **Component Layer**: Reusable UI components that form the building blocks of the interface
- **Page Layer**: Composition of components to create the complete product grid with filters

I've implemented the filtering system to be extensible, making it easy to add new filter types in the future as the e-commerce platform grows.

### Key Features

1.  **Multi-select Filtering**: Users can select multiple values for each filter type, providing a flexible filtering experience.
2.  **URL-based State Management**: All filter selections are synchronized with URL parameters, allowing for:
    - Shareable filtered product views.
    - Persistence of filter state during page refreshes.
3.  **Responsive Design**: The interface adapts to different screen sizes, providing an optimal experience on mobile, tablet, and desktop devices.
4.  **Component Library**: Implemented using shadcn/ui, a collection of reusable, accessible components built on Radix UI primitives that provide:
    - Consistent design language throughout the application
    - Accessibility features out of the box
    - Customizability through Tailwind CSS
    - High-quality UI elements like dropdowns, buttons, and cards that would be essential in a complete e-commerce platform
5.  **Type Safety**: Comprehensive TypeScript types ensure consistency and reduce potential bugs.

### Technologies Used

- **Next.js**: For server-side rendering and efficient client-side navigation
- **TypeScript**: For type safety and improved developer experience
- **Tailwind CSS**: For styling and responsive design
- **shadcn/ui**: For high-quality, customizable UI components built on Radix UI primitives
- **nuqs**: For URL query parameter management
- **Playwright**: For end-to-end testing

## How to Run the Project

1.  Install dependencies:

```bash
pnpm install
# or
npm install
```

2.  Start the development server:

```bash
pnpm dev
# or
npm run dev
```

3.  Open [http://localhost:3000](http://localhost:3000) in your browser.
4.  To run the end-to-end tests:

```bash
pnpm test
# or
npm run test
```

## Implementation Details

### Filtering System

The filtering system is built around the `useFilterParams` hook, which:

- Manages filter state in URL parameters
- Provides methods for applying and clearing filters
- Synchronizes the UI state with the URL

The actual filtering logic is implemented in the `filterProducts` and `sortProducts` utility functions, which are pure functions that take the current filter state and product data and return the filtered/sorted results.

In a production environment, the application would delegate filtering logic to backend API endpoints, sending the selected filter parameters as query parameters in the request rather than performing client-side data filtering.

### Product Display

Products are displayed in a responsive grid layout that adjusts the number of columns based on viewport width. Each product is represented by a card that shows:

- Product image (placeholder in this implementation).
- Product name and category.
- Size, color, and material information.
- Product badges for special features (waterproof, original, in/out of stock).

### Testing

I've implemented end-to-end tests using Playwright to verify that the filtering functionality works as expected. The tests cover:

- Filtering by single criteria.
- Filtering by multiple criteria.
- Sorting by size (ascending and descending).
- Resetting filters.
- Clearing individual filter selections.

## Future Enhancements

If continuing to develop this into a complete e-commerce platform, I would consider:

1.  **Backend Integration**: Replace the static JSON data with API endpoints for server-side filtering and pagination.
2.  **Search Functionality**: Add a text search feature to quickly find products by name or description.
3.  **Analytics**: Track user interactions with filters to improve the shopping experience.
4.  **Enhanced Mobile Experience**: Optimize the filter interface for mobile devices with a slide-out filter panel.
5.  **Component Library Expansion**: Further leverage and expand the shadcn/ui components to build additional e-commerce features like:
    - Product detail pages.
    - Shopping cart functionality.
    - Checkout flow.
    - User account management.
6.  **Theme Customization**: Utilize the theming capabilities of shadcn/ui and Tailwind to create a consistent, branded experience throughout the application.
