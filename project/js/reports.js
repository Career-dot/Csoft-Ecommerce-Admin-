document.addEventListener("DOMContentLoaded", function () {
    renderReportSummary();
    renderSalesChart("monthly");
    wireReportEvents();
});

function renderReportSummary() {
    var orders = getData(STORAGE_KEYS.orders);
    var completed = orders.filter(function (o) { return o.status === "Completed"; });

    var totalRevenue = completed.reduce(function (sum, o) { return sum + o.price; }, 0) * 42;
    var avgOrderValue = completed.length ? Math.round(totalRevenue / completed.length) : 0;

    document.getElementById("report-total-revenue").textContent = formatCurrency(totalRevenue);
    document.getElementById("report-total-orders").textContent = orders.length * 87;
    document.getElementById("report-avg-order").textContent = formatCurrency(avgOrderValue);
    document.getElementById("report-completed-rate").textContent =
        orders.length ? Math.round((completed.length / orders.length) * 100) + "%" : "0%";
}

var salesChartInstance = null;

function renderSalesChart(range) {
    var ctx = document.getElementById("salesChart");
    if (!ctx || typeof Chart === "undefined") return;

    var labels, data;
    if (range === "daily") {
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        data = [1200, 1900, 1700, 2100, 2600, 3400, 2800];
    } else if (range === "weekly") {
        labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
        data = [12500, 15800, 14200, 18900];
    } else {
        labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        data = [42000, 39000, 47000, 51000, 49500, 58000, 53000, 56000, 61000, 59500, 64000, 71000];
    }

    if (salesChartInstance) {
        salesChartInstance.destroy();
    }

    var gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, "rgba(108, 92, 231, .35)");
    gradient.addColorStop(1, "rgba(108, 92, 231, 0)");

    salesChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Revenue",
                data: data,
                borderColor: "#6C5CE7",
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: "#6C5CE7"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (item) { return "Revenue: " + formatCurrency(item.raw); }
                    }
                }
            },
            scales: {
                x: { grid: { display: false }, border: { display: false } },
                y: { grid: { color: "#F1F1F8" }, border: { display: false } }
            }
        }
    });
}

function wireReportEvents() {
    var tabs = document.querySelectorAll("#report-range-tabs button");
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach(function (t) { t.classList.remove("active"); });
            tab.classList.add("active");
            renderSalesChart(tab.getAttribute("data-range"));
        });
    });

    var exportBtn = document.getElementById("export-report-btn");
    if (exportBtn) {
        exportBtn.addEventListener("click", exportReportCSV);
    }
}

// Builds a simple CSV file from the orders data and triggers a download.
// No external library needed - just plain JS + a Blob.
function exportReportCSV() {
    var orders = getData(STORAGE_KEYS.orders);
    var rows = [["Order ID", "Customer", "Product", "Price", "Status", "Date"]];

    orders.forEach(function (o) {
        rows.push([o.id, o.customer, o.product, o.price, o.status, o.date]);
    });

    var csvContent = rows.map(function (row) { return row.join(","); }).join("\n");
    var blob = new Blob([csvContent], { type: "text/csv" });
    var url = URL.createObjectURL(blob);

    var link = document.createElement("a");
    link.href = url;
    link.download = "sales-report.csv";
    link.click();

    URL.revokeObjectURL(url);
    showToast("Report exported as CSV.");
}
