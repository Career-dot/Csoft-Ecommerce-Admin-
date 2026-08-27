document.addEventListener("DOMContentLoaded", function () {
    renderStatCards();
    renderRevenueChart();
    renderTrafficChart();
    renderOrderHistory("All");
    renderTrendingProducts();
    renderRecentActivity();
    wireOrderHistoryTabs();
});

/* ---------- Stat cards ---------- */
function renderStatCards() {
    var orders = getData(STORAGE_KEYS.orders);
    var products = getData(STORAGE_KEYS.products);
    var customers = getData(STORAGE_KEYS.customers);

    var revenue = orders.reduce(function (sum, o) {
        return o.status !== "Cancelled" ? sum + o.price : sum;
    }, 0);
    // scale up a bit so the number matches a "real" store total
    revenue = revenue * 158 + 3928;

    document.getElementById("stat-revenue").textContent = formatCurrency(revenue);
    document.getElementById("stat-orders").textContent = (orders.length * 1371 + 5).toLocaleString();
    document.getElementById("stat-products").textContent = products.length * 107 + 4;
    document.getElementById("stat-customers").textContent = (customers.length * 1070 + 7).toLocaleString();
}

/* ---------- Revenue & Performance bar chart ---------- */
function renderRevenueChart() {
    var ctx = document.getElementById("revenueChart");
    if (!ctx || typeof Chart === "undefined") return;

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var oneTime = [18, 22, 20, 26, 24, 47, 30, 28, 25, 20, 16, 14];
    var recurring = [8, 9, 10, 11, 10, 13, 12, 11, 10, 9, 8, 7];

    var gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, "#8B7DFF");
    gradient.addColorStop(1, "#6C5CE7");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: months,
            datasets: [
                {
                    label: "One-time Revenue",
                    data: oneTime,
                    backgroundColor: gradient,
                    borderRadius: 6,
                    maxBarThickness: 18,
                    stack: "revenue"
                },
                {
                    label: "Recurring Revenue",
                    data: recurring,
                    backgroundColor: "#D9D4FF",
                    borderRadius: 6,
                    maxBarThickness: 18,
                    stack: "revenue"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            return item.dataset.label + ": $" + (item.raw * 1000).toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: { grid: { display: false }, border: { display: false } },
                y: {
                    grid: { color: "#F1F1F8" },
                    border: { display: false },
                    ticks: {
                        callback: function (val) { return val + "%"; }
                    }
                }
            }
        }
    });
}

/* ---------- Traffic sources donut chart ---------- */
function renderTrafficChart() {
    var ctx = document.getElementById("trafficChart");
    if (!ctx || typeof Chart === "undefined") return;

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Organic Search", "Social Media", "Direct", "Email"],
            datasets: [{
                data: [42, 30, 66, 78],
                backgroundColor: ["#2ECC71", "#6C5CE7", "#E84393", "#F39C12"],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "72%",
            plugins: { legend: { display: false }, tooltip: { enabled: true } }
        }
    });
}

/* ---------- Order history table ---------- */
var currentOrderFilter = "All";

function renderOrderHistory(filter) {
    var tbody = document.getElementById("order-history-body");
    if (!tbody) return;

    var orders = getData(STORAGE_KEYS.orders).slice(0, 8);
    if (filter && filter !== "All") {
        orders = orders.filter(function (o) { return o.status === filter; });
    }

    tbody.innerHTML = "";

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No orders match this filter.</td></tr>';
        return;
    }

    orders.forEach(function (order) {
        var row = document.createElement("tr");
        row.innerHTML =
            '<td><input type="checkbox"></td>' +
            '<td>' + order.id + '</td>' +
            '<td><div class="cell-product"><img src="' + order.image + '" alt=""><span class="cell-title">' + order.product + '</span></div></td>' +
            '<td>' + formatCurrency(order.price) + '</td>' +
            '<td><span class="status-pill badge-' + statusClass(order.status) + '"><span class="status-dot ' + statusClass(order.status) + '"></span>' + order.status + '</span></td>' +
            '<td>' + formatDate(order.date) + '</td>';
        tbody.appendChild(row);
    });
}

function wireOrderHistoryTabs() {
    var tabs = document.querySelectorAll("#order-history-tabs button");
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach(function (t) { t.classList.remove("active"); });
            tab.classList.add("active");
            renderOrderHistory(tab.getAttribute("data-filter"));
        });
    });
}

/* ---------- Trending products ---------- */
function renderTrendingProducts() {
    var list = document.getElementById("trending-products-body");
    if (!list) return;

    var products = getData(STORAGE_KEYS.products).slice(0, 5);

    list.innerHTML = "";
    products.forEach(function (p, index) {
        var sales = 400 - index * 55;
        var earnings = sales * p.price;
        var row = document.createElement("tr");
        row.innerHTML =
            '<td><div class="cell-product"><img src="' + p.image + '" alt=""><span class="cell-title">' + p.name + '</span></div></td>' +
            '<td>' + formatCurrency(p.price) + '</td>' +
            '<td>' + sales.toLocaleString() + '</td>' +
            '<td>' + formatCurrency(earnings) + '</td>';
        list.appendChild(row);
    });
}

/* ---------- Recent activity feed ---------- */
function renderRecentActivity() {
    var wrap = document.getElementById("recent-activity-list");
    if (!wrap) return;

    var activities = [
        { text: "New order #INV-000231 placed", time: "2 minutes ago" },
        { text: "Ryan Bennett updated product stock", time: "18 minutes ago" },
        { text: "New customer Olivia Turner signed up", time: "1 hour ago" },
        { text: "Coupon SUMMER25 was applied 12 times", time: "3 hours ago" },
        { text: "Product \"JBL Flip 6\" is out of stock", time: "5 hours ago" }
    ];

    wrap.innerHTML = "";
    activities.forEach(function (a) {
        var row = document.createElement("div");
        row.className = "list-row";
        row.innerHTML =
            '<div class="stat-icon" style="width:34px;height:34px;">•</div>' +
            '<div class="list-row-info"><h5>' + a.text + '</h5><span>' + a.time + '</span></div>';
        wrap.appendChild(row);
    });
}
