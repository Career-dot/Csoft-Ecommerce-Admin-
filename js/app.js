// Keys we use inside localStorage so we don't repeat strings everywhere
const STORAGE_KEYS = {
    products: "csoft_products",
    categories: "csoft_categories",
    orders: "csoft_orders",
    customers: "csoft_customers",
    discounts: "csoft_discounts",
    inventory: "csoft_inventory",
    seeded: "csoft_seeded"
};
function seedDataIfNeeded() {
    var alreadySeeded = localStorage.getItem(STORAGE_KEYS.seeded);
    if (alreadySeeded) {
        return; // don't overwrite data the user has already edited
    }

    var categories = [
        { id: 1, name: "Smartphones", productCount: 18, status: "Active" },
        { id: 2, name: "Laptops", productCount: 12, status: "Active" },
        { id: 3, name: "Audio", productCount: 24, status: "Active" },
        { id: 4, name: "Wearables", productCount: 9, status: "Active" },
        { id: 5, name: "Accessories", productCount: 31, status: "Active" },
        { id: 6, name: "Cameras", productCount: 7, status: "Inactive" }
    ];

    var products = [
        { id: 1, name: "iPhone 15 Pro", sku: "APL-IP15P-256", category: "Smartphones", price: 999, stock: 42, status: "Active", image: "../assets/images/iphone-15-pro.jpg", description: "Flagship smartphone with A17 Pro chip and titanium frame." },
        { id: 2, name: "MacBook Air 13\"", sku: "APL-MBA13-512", category: "Laptops", price: 1099, stock: 18, status: "Active", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=60", description: "Ultra-thin laptop with M2 chip, all-day battery life." },
        { id: 3, name: "Samsung Galaxy S24", sku: "SMS-GS24-256", category: "Smartphones", price: 799, stock: 35, status: "Active", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&q=60", description: "AI powered flagship Android smartphone." },
        { id: 4, name: "Apple Watch Series 9", sku: "APL-AW9-45", category: "Wearables", price: 399, stock: 26, status: "Active", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&q=60", description: "Advanced health and fitness companion." },
        { id: 5, name: "MacBook Pro 14\"", sku: "APL-MBP14-1TB", category: "Laptops", price: 1999, stock: 9, status: "Active", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&q=60", description: "Pro-level performance with M3 Pro chip." },
        { id: 6, name: "Oppo Reno 12", sku: "OPP-RN12-128", category: "Smartphones", price: 549, stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&q=60", description: "Mid-range smartphone with fast charging." },
        { id: 7, name: "Sony WH-1000XM5", sku: "SNY-WH5-BLK", category: "Audio", price: 349, stock: 54, status: "Active", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=60", description: "Industry leading noise cancelling headphones." },
        { id: 8, name: "AirPods Pro 2", sku: "APL-APP2-WHT", category: "Audio", price: 249, stock: 61, status: "Active", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&q=60", description: "Active noise cancellation earbuds." },
        { id: 9, name: "Logitech MX Master 3S", sku: "LOG-MX3S-GRY", category: "Accessories", price: 99, stock: 4, status: "Low Stock", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&q=60", description: "Precision wireless mouse for professionals." },
        { id: 10, name: "Canon EOS R50", sku: "CAN-R50-BODY", category: "Cameras", price: 679, stock: 11, status: "Active", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=60", description: "Compact mirrorless camera for creators." },
        { id: 11, name: "iPad Air", sku: "APL-IPA-256", category: "Accessories", price: 749, stock: 22, status: "Active", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&q=60", description: "Powerful, colorful, versatile tablet." },
        { id: 12, name: "JBL Flip 6", sku: "JBL-FL6-BLU", category: "Audio", price: 129, stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&q=60", description: "Portable waterproof bluetooth speaker." }
    ];

    var customerNames = ["Ryan Bennett", "Olivia Turner", "Ethan Wright", "Sophia Lee", "Daniel Kim", "Ava Johnson", "Michael Chen", "Isabella Garcia", "Liam Walker", "Mia Robinson", "Noah Davis", "Emma Wilson"];
    var customers = customerNames.map(function (name, index) {
        return {
            id: index + 1,
            name: name,
            email: name.toLowerCase().replace(" ", ".") + "@csoft.com",
            phone: "+1 (555) 01" + (10 + index),
            orders: Math.floor(Math.random() * 20) + 1,
            totalSpent: Math.floor(Math.random() * 4000) + 200,
            joined: "2025-0" + ((index % 9) + 1) + "-14",
            status: index % 5 === 0 ? "Inactive" : "Active"
        };
    });

    var statuses = ["Completed", "Pending", "In Progress", "Cancelled"];
    var orders = [];
    for (var i = 0; i < 24; i++) {
        var product = products[i % products.length];
        var customer = customers[i % customers.length];
        orders.push({
            id: "INV-" + String(100000 + i),
            customer: customer.name,
            product: product.name,
            image: product.image,
            price: product.price,
            status: statuses[i % statuses.length],
            date: "2026-0" + ((i % 8) + 1) + "-" + (10 + (i % 18))
        });
    }

    var discounts = [
        { id: 1, code: "WELCOME10", type: "Percentage", value: 10, expiry: "2026-12-31", status: "Active" },
        { id: 2, code: "FLAT50", type: "Flat", value: 50, expiry: "2026-10-15", status: "Active" },
        { id: 3, code: "SUMMER25", type: "Percentage", value: 25, expiry: "2026-09-01", status: "Active" },
        { id: 4, code: "VIP100", type: "Flat", value: 100, expiry: "2026-06-30", status: "Expired" },
        { id: 5, code: "FLASH15", type: "Percentage", value: 15, expiry: "2027-01-20", status: "Active" }
    ];

    var inventory = products.map(function (p) {
        var level = "Available";
        if (p.stock === 0) level = "Out of Stock";
        else if (p.stock <= 5) level = "Low Stock";
        return {
            productId: p.id,
            name: p.name,
            sku: p.sku,
            image: p.image,
            stock: p.stock,
            reorderLevel: 10,
            level: level
        };
    });

    localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories));
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    localStorage.setItem(STORAGE_KEYS.customers, JSON.stringify(customers));
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    localStorage.setItem(STORAGE_KEYS.discounts, JSON.stringify(discounts));
    localStorage.setItem(STORAGE_KEYS.inventory, JSON.stringify(inventory));
    localStorage.setItem(STORAGE_KEYS.seeded, "true");
}

/* 
   GENERIC STORAGE HELPERS
*/
function getData(key) {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/* Finds the highest existing id in a list and returns the next one.
   Works for both numeric ids and "INV-000123" style string ids. */
function getNextId(list) {
    if (list.length === 0) return 1;
    var max = 0;
    list.forEach(function (item) {
        if (typeof item.id === "number" && item.id > max) max = item.id;
    });
    return max + 1;
}

/* 
   FORMAT HELPERS
 */
function formatCurrency(amount) {
    return "$" + Number(amount).toLocaleString("en-US", { minimumFractionDigits: 0 });
}

function formatDate(dateString) {
    var date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    var options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
}

/* Returns the CSS classes to use for a given status word so
   every table renders status badges consistently. */
function statusClass(status) {
    var map = {
        "Active": "success",
        "Completed": "success",
        "Available": "success",
        "Pending": "warning",
        "Low Stock": "warning",
        "In Progress": "info",
        "Inactive": "danger",
        "Cancelled": "danger",
        "Out of Stock": "danger",
        "Expired": "danger"
    };
    return map[status] || "info";
}

/* 
   TOAST NOTIFICATIONS
 */
function showToast(message, type) {
    var container = document.getElementById("toast-container");
    if (!container) return;

    var toast = document.createElement("div");
    toast.className = "toast" + (type === "error" ? " error" : "");
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(function () {
        toast.classList.add("fade-out");
        setTimeout(function () {
            toast.remove();
        }, 300);
    }, 2800);
}

/* 
   SHARED ROW-ACTION ICONS
   Small SVG icon strings reused by every table's action
   column (view / edit / delete buttons).
 */
function rowIconView() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
}
function rowIconEdit() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path></svg>';
}
function rowIconDelete() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
}

/* Generic modal close helper, shared by every page that uses
   the .modal-overlay component (products, categories, orders...) */
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("show");
}

/*
   INIT
   Seed data as soon as this script loads, on every page.
 */
seedDataIfNeeded();
