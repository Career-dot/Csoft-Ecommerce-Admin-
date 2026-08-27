// Small inline icon set (kept tiny + inline so no extra HTTP requests)
const ICONS = {
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>',
    product: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
    orders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>',
    customers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    discounts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>',
    inventory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8V21H3V8"></path><path d="M1 3h22v5H1z"></path><path d="M10 12h4"></path></svg>',
    reports: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-chevron"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
};

// path prefix ("" on pages inside /pages/, "pages/" on index.html)
function getPathPrefix() {
    return document.body.getAttribute("data-path") === "root" ? "pages/" : "";
}

/* 
   SIDEBAR MARKUP
 */
function buildSidebarHTML(activePage) {
    var p = getPathPrefix();

    function item(page, icon, label, href) {
        var isActive = activePage === page ? " active" : "";
        return '<a href="' + href + '" class="menu-item' + isActive + '">' +
            '<span class="menu-icon">' + icon + '</span>' +
            '<span class="menu-text">' + label + '</span></a>';
    }

    var productPages = ["products", "add-product", "categories"];
    var productSubmenuOpen = productPages.indexOf(activePage) !== -1 ? " open" : "";

    return '' +
    '<div class="sidebar-logo">' +
        '<div class="sidebar-logo-mark">CS</div>' +
        '<div class="sidebar-logo-text"><h1>CSOFT</h1><p>Commerce Made Easy</p></div>' +
    '</div>' +

    '<nav class="sidebar-menu">' +
        item("dashboard", ICONS.dashboard, "Dashboard", p + "dashboard.html") +

        '<li class="has-submenu' + productSubmenuOpen + '" id="product-submenu-toggle" style="list-style:none;">' +
            '<div class="menu-item" style="cursor:pointer;">' +
                '<span class="menu-icon">' + ICONS.product + '</span>' +
                '<span class="menu-text">Product</span>' +
                ICONS.chevron +
            '</div>' +
            '<div class="submenu">' +
                '<a href="' + p + 'products.html" class="submenu-item' + (activePage === "products" ? " active" : "") + '">All Products</a>' +
                '<a href="' + p + 'add-product.html" class="submenu-item' + (activePage === "add-product" ? " active" : "") + '">Add Product</a>' +
                '<a href="' + p + 'categories.html" class="submenu-item' + (activePage === "categories" ? " active" : "") + '">Categories</a>' +
            '</div>' +
        '</li>' +

        item("orders", ICONS.orders, "Orders", p + "orders.html") +
        item("inventory", ICONS.inventory, "Inventory", p + "inventory.html") +
        item("customers", ICONS.customers, "Customers", p + "customers.html") +
        item("discounts", ICONS.discounts, "Discounts", p + "discounts.html") +
        item("reports", ICONS.reports, "Analytics", p + "reports.html") +
    '</nav>' +

    '<div class="sidebar-footer">' +
        item("settings", ICONS.settings, "Setting", p + "settings.html") +
        '<a href="#" class="menu-item"><span class="menu-icon">' + ICONS.help + '</span><span class="menu-text">Help</span></a>' +

        '<div class="country-select">' +
            '<span class="flag">🇺🇸</span>' +
            '<span>United States</span>' +
            '<span class="text-muted" style="margin-left:auto;">USD</span>' +
        '</div>' +

        '<div class="upgrade-card">' +
            '<h4>Upgrade to Pro</h4>' +
            '<p>Get advanced analytics and unlimited products.</p>' +
            '<button id="upgrade-btn">Upgrade Now</button>' +
        '</div>' +
    '</div>';
}

/* 
   TOPBAR MARKUP
 */
function buildTopbarHTML(pageTitle) {
    return '' +
    '<div class="topbar-left">' +
        '<button class="sidebar-toggle-btn" id="mobile-toggle-btn">' + ICONS.menu + '</button>' +
        '<div class="breadcrumb">Dashboards / <strong>' + pageTitle + '</strong></div>' +
    '</div>' +

    '<div class="topbar-search">' +
        ICONS.search +
        '<input type="text" id="global-search" placeholder="Search products, orders...">' +
        '<span class="kbd-hint">&#8984; + Space</span>' +
    '</div>' +

    '<div class="topbar-right">' +
        '<button class="notif-btn" id="notif-btn">' + ICONS.bell + '<span class="notif-dot"></span></button>' +
        '<div class="profile-menu" id="profile-menu">' +
            '<button class="profile-trigger" id="profile-trigger">' +
                '<div class="profile-avatar">RB</div>' +
                '<div class="profile-info">' +
                    '<span class="profile-name">Ryan Bennett</span>' +
                    '<span class="profile-email">ryan@csoft.com</span>' +
                '</div>' +
                '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
            '</button>' +
            '<div class="profile-dropdown">' +
                '<a href="' + (getPathPrefix()) + 'settings.html">' + ICONS.user + ' My Profile</a>' +
                '<a href="' + (getPathPrefix()) + 'settings.html">' + ICONS.settings + ' Settings</a>' +
                '<hr>' +
                '<a href="#" class="danger" id="logout-link">' + ICONS.logout + ' Logout</a>' +
            '</div>' +
        '</div>' +
    '</div>';
}

/* 
   INJECT + WIRE EVENTS
 */
function initLayout() {
    var activePage = document.body.getAttribute("data-page") || "dashboard";
    var pageTitle = document.body.getAttribute("data-title") || "Overview";

    var sidebarMount = document.getElementById("sidebar-mount");
    var topbarMount = document.getElementById("topbar-mount");

    if (sidebarMount) sidebarMount.innerHTML = buildSidebarHTML(activePage);
    if (topbarMount) topbarMount.innerHTML = buildTopbarHTML(pageTitle);

    wireSidebarEvents();
    wireTopbarEvents();
}

function wireSidebarEvents() {
    // Expand / collapse the "Product" submenu
    var submenuToggle = document.getElementById("product-submenu-toggle");
    if (submenuToggle) {
        var trigger = submenuToggle.querySelector(".menu-item");
        trigger.addEventListener("click", function () {
            submenuToggle.classList.toggle("open");
        });
    }

    // Desktop sidebar collapse (icon-only mode)
    var upgradeBtn = document.getElementById("upgrade-btn");
    if (upgradeBtn) {
        upgradeBtn.addEventListener("click", function () {
            showToast("Redirecting to Pro plans...");
        });
    }

    // Mobile hamburger toggle
    var mobileToggle = document.getElementById("mobile-toggle-btn");
    if (mobileToggle) {
        mobileToggle.addEventListener("click", function () {
            document.body.classList.toggle("sidebar-open");
        });
    }
}

function wireTopbarEvents() {
    // Profile dropdown open/close
    var profileMenu = document.getElementById("profile-menu");
    var profileTrigger = document.getElementById("profile-trigger");
    if (profileTrigger) {
        profileTrigger.addEventListener("click", function (e) {
            e.stopPropagation();
            profileMenu.classList.toggle("open");
        });
    }

    document.addEventListener("click", function (e) {
        if (profileMenu && !profileMenu.contains(e.target)) {
            profileMenu.classList.remove("open");
        }
    });

    var logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", function (e) {
            e.preventDefault();
            showToast("You have been logged out.");
        });
    }

    var notifBtn = document.getElementById("notif-btn");
    if (notifBtn) {
        notifBtn.addEventListener("click", function () {
            showToast("You have 3 new notifications.");
        });
    }

    // Global search in topbar: jumps to the products page with the query
    var globalSearch = document.getElementById("global-search");
    if (globalSearch) {
        globalSearch.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && globalSearch.value.trim() !== "") {
                var prefix = getPathPrefix();
                window.location.href = prefix + "products.html?search=" + encodeURIComponent(globalSearch.value.trim());
            }
        });
    }
}

// Build the layout as soon as the DOM is ready
document.addEventListener("DOMContentLoaded", initLayout);
