# CSOFT Admin Dashboard

A complete e-commerce admin dashboard built with plain **HTML5, CSS3 (Flexbox only) and vanilla JavaScript (ES6)** — no frameworks, no build tools, no CSS libraries. All data is stored in the browser's `localStorage`, so every page works fully offline once opened.

## How to run it

No installation needed. Just open `index.html` (or `pages/dashboard.html`) in any modern browser, or serve the folder with any static server, e.g.:

```
npx serve .
```

## Folder structure

```
project/
├── index.html              → redirects to pages/dashboard.html
├── pages/                  → every screen of the app
│   ├── dashboard.html
│   ├── products.html
│   ├── add-product.html
│   ├── categories.html
│   ├── orders.html
│   ├── customers.html
│   ├── discounts.html
│   ├── inventory.html
│   ├── reports.html
│   └── settings.html
├── css/                    → one stylesheet per concern
│   ├── style.css           (variables, reset, layout, buttons)
│   ├── sidebar.css
│   ├── topbar.css
│   ├── dashboard.css
│   ├── cards.css
│   ├── tables.css
│   ├── forms.css
│   └── responsive.css
├── js/
│   ├── app.js               → localStorage data layer + seed data
│   ├── sidebar.js            → injects sidebar/topbar, handles toggles
│   ├── dashboard.js
│   ├── products.js           → also powers Add Product page
│   ├── categories.js
│   ├── orders.js
│   ├── customers.js
│   ├── discounts.js
│   ├── inventory.js
│   ├── reports.js
│   └── validation.js         → shared form validation helpers
└── assets/
    ├── images/
    ├── icons/
    └── logo/
```

## How the shared layout works

Every page has two empty containers:

```html
<aside class="sidebar" id="sidebar-mount"></aside>
<header class="topbar" id="topbar-mount"></header>
```

`sidebar.js` builds the sidebar and topbar HTML once and injects it into those containers on every page, based on two `data-*` attributes set on `<body>`:

```html
<body data-page="products" data-title="Products" data-path="pages">
```

- `data-page` tells the script which menu item to highlight as active
- `data-title` is shown in the breadcrumb ("Dashboards / Products")
- `data-path="pages"` on files inside `/pages` (omit it on the root `index.html`) so links resolve correctly either way

This avoids duplicating ~100 lines of sidebar markup in every single HTML file while still keeping everything plain HTML/CSS/JS.

## Data layer

`app.js` seeds realistic dummy data (products, categories, orders, customers, coupons, inventory) into `localStorage` the first time the app runs. After that, every CRUD action (add/edit/delete a product, update an order status, create a coupon, etc.) reads and writes directly to `localStorage`, so changes persist across page reloads and across pages.

To reset all data back to the original dummy set, clear your browser's localStorage for this site (or run `localStorage.clear()` in the console) and refresh.

## Charts

Charts use **Chart.js** (loaded from CDN) on the Dashboard (revenue bar chart, traffic sources donut) and Reports page (daily/weekly/monthly line chart).

## Connecting a real backend later

Every page's JavaScript file only talks to `getData()` / `saveData()` in `app.js`. To connect this frontend to a PHP/MySQL (or any other) backend, swap those two functions for `fetch()` calls to your API — the rest of the code (rendering, validation, events) does not need to change.
