# Findly — E-Commerce Product Search & Recommendation Frontend

A polished, Apple-inspired (not a copy) e-commerce frontend designed to be connected to a backend search and recommendation engine.

## Run it

No Node.js is required for this version.

1. Open `index.html` directly in a browser, or use VS Code + Live Server.
2. The product data currently lives in `script.js`.
3. Product images use Unsplash URLs, so an internet connection is needed for those images.

## Backend-ready architecture

The current UI has clear places to replace mock data with API calls:

- `searchProducts(query)` → connect to `GET /api/products/search?q=...`
- `renderProducts(products)` → render the API response
- Recommendation preference buttons → connect to `POST /api/recommendations`
- Product cards → connect add-to-cart / product-detail endpoints
- `products` array → replace with database/API response

Example future endpoints:

GET  /api/products/search?q=laptop&category=laptop
GET  /api/products/:id
GET  /api/recommendations?userId=123
POST /api/recommendations/preferences
POST /api/cart/items

## Design choices

- Minimal white/gray Apple-like visual language
- Large editorial typography
- Rounded product cards
- Sticky translucent navigation
- Subtle hover, reveal and floating animations
- Search overlay
- Category filtering
- Mock recommendation preference flow
- Responsive layout for desktop/tablet/mobile

Do not use Apple's branding, copyrighted product copy, or proprietary assets in a real project. This frontend uses the same general design principles rather than cloning Apple's site.
