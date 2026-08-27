var inventoryFilter = "All";

document.addEventListener("DOMContentLoaded", function () {
    renderInventorySummary();
    renderInventoryTable();
    wireInventoryEvents();
});

function renderInventorySummary() {
    var inventory = getData(STORAGE_KEYS.inventory);
    var available = inventory.filter(function (i) { return i.level === "Available"; }).length;
    var low = inventory.filter(function (i) { return i.level === "Low Stock"; }).length;
    var out = inventory.filter(function (i) { return i.level === "Out of Stock"; }).length;

    document.getElementById("summary-available").textContent = available;
    document.getElementById("summary-low").textContent = low;
    document.getElementById("summary-out").textContent = out;
}

function renderInventoryTable() {
    var tbody = document.getElementById("inventory-table-body");
    if (!tbody) return;

    var inventory = getData(STORAGE_KEYS.inventory);
    if (inventoryFilter !== "All") {
        inventory = inventory.filter(function (i) { return i.level === inventoryFilter; });
    }

    tbody.innerHTML = "";

    if (inventory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No items match this filter.</td></tr>';
        return;
    }

    inventory.forEach(function (item) {
        var row = document.createElement("tr");
        row.innerHTML =
            '<td><div class="cell-product"><img src="' + item.image + '" alt="" onerror="this.onerror=null; this.src=\'../assets/images/placeholder.jpg\';"><div><div class="cell-title">' + item.name + '</div><div class="cell-sub">' + item.sku + '</div></div></div></td>' +
            '<td>' + item.stock + ' units</td>' +
            '<td>' + item.reorderLevel + ' units</td>' +
            '<td><span class="status-pill badge-' + statusClass(item.level) + '"><span class="status-dot ' + statusClass(item.level) + '"></span>' + item.level + '</span></td>' +
            '<td><div class="row-actions">' +
                '<button title="Update Stock" onclick="openUpdateStock(' + item.productId + ')">' + rowIconEdit() + '</button>' +
            '</div></td>';
        tbody.appendChild(row);
    });
}

function wireInventoryEvents() {
    var tabs = document.querySelectorAll("#inventory-tabs button");
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach(function (t) { t.classList.remove("active"); });
            tab.classList.add("active");
            inventoryFilter = tab.getAttribute("data-level");
            renderInventoryTable();
        });
    });

    var form = document.getElementById("update-stock-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            saveStockUpdate();
        });
    }
}

function openUpdateStock(productId) {
    var inventory = getData(STORAGE_KEYS.inventory);
    var item = inventory.find(function (i) { return i.productId === productId; });
    if (!item) return;

    document.getElementById("update-stock-product-id").value = productId;
    document.getElementById("update-stock-name").textContent = item.name;
    document.getElementById("update-stock-amount").value = item.stock;
    document.getElementById("update-stock-modal").classList.add("show");
}

function saveStockUpdate() {
    var productId = Number(document.getElementById("update-stock-product-id").value);
    var newStock = Number(document.getElementById("update-stock-amount").value);

    var inventory = getData(STORAGE_KEYS.inventory);
    var item = inventory.find(function (i) { return i.productId === productId; });
    item.stock = newStock;
    item.level = newStock === 0 ? "Out of Stock" : (newStock <= item.reorderLevel ? "Low Stock" : "Available");
    saveData(STORAGE_KEYS.inventory, inventory);

    // keep the products table in sync with the new stock number
    var products = getData(STORAGE_KEYS.products);
    var product = products.find(function (p) { return p.id === productId; });
    if (product) {
        product.stock = newStock;
        product.status = newStock === 0 ? "Out of Stock" : (newStock <= item.reorderLevel ? "Low Stock" : "Active");
        saveData(STORAGE_KEYS.products, products);
    }

    closeModal("update-stock-modal");
    renderInventorySummary();
    renderInventoryTable();
    showToast("Stock updated.");
}
