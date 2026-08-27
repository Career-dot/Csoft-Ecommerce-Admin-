var ordersState = {
    page: 1,
    pageSize: 8,
    search: "",
    status: "All"
};

document.addEventListener("DOMContentLoaded", function () {
    renderOrdersTable();
    wireOrdersEvents();
});

function getFilteredOrders() {
    var orders = getData(STORAGE_KEYS.orders);

    if (ordersState.search) {
        var term = ordersState.search.toLowerCase();
        orders = orders.filter(function (o) {
            return o.id.toLowerCase().indexOf(term) !== -1 ||
                   o.customer.toLowerCase().indexOf(term) !== -1 ||
                   o.product.toLowerCase().indexOf(term) !== -1;
        });
    }

    if (ordersState.status !== "All") {
        orders = orders.filter(function (o) { return o.status === ordersState.status; });
    }

    return orders;
}

function renderOrdersTable() {
    var tbody = document.getElementById("orders-table-body");
    if (!tbody) return;

    var all = getFilteredOrders();
    var totalPages = Math.max(1, Math.ceil(all.length / ordersState.pageSize));
    if (ordersState.page > totalPages) ordersState.page = totalPages;

    var start = (ordersState.page - 1) * ordersState.pageSize;
    var pageItems = all.slice(start, start + ordersState.pageSize);

    tbody.innerHTML = "";

    if (pageItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No orders match this filter.</td></tr>';
    }

    pageItems.forEach(function (order) {
        var row = document.createElement("tr");
        row.innerHTML =
            '<td>' + order.id + '</td>' +
            '<td>' + order.customer + '</td>' +
            '<td><div class="cell-product"><img src="' + order.image + '" alt=""><span class="cell-title">' + order.product + '</span></div></td>' +
            '<td>' + formatCurrency(order.price) + '</td>' +
            '<td><span class="status-pill badge-' + statusClass(order.status) + '"><span class="status-dot ' + statusClass(order.status) + '"></span>' + order.status + '</span></td>' +
            '<td>' + formatDate(order.date) + '</td>' +
            '<td><div class="row-actions">' +
                '<button title="View Details" onclick="viewOrder(\'' + order.id + '\')">' + rowIconView() + '</button>' +
                '<button title="Update Status" onclick="openUpdateStatus(\'' + order.id + '\')">' + rowIconEdit() + '</button>' +
            '</div></td>';
        tbody.appendChild(row);
    });

    renderOrdersPagination(totalPages, all.length);
}

function renderOrdersPagination(totalPages, total) {
    var info = document.getElementById("orders-pagination-info");
    var start = total === 0 ? 0 : (ordersState.page - 1) * ordersState.pageSize + 1;
    var end = Math.min(ordersState.page * ordersState.pageSize, total);
    info.textContent = "Showing " + start + "–" + end + " of " + total + " orders";

    var buttons = document.getElementById("orders-pagination-buttons");
    buttons.innerHTML = "";

    var prevBtn = document.createElement("button");
    prevBtn.textContent = "‹";
    prevBtn.disabled = ordersState.page === 1;
    prevBtn.addEventListener("click", function () { ordersState.page--; renderOrdersTable(); });
    buttons.appendChild(prevBtn);

    for (var i = 1; i <= totalPages; i++) {
        var btn = document.createElement("button");
        btn.textContent = i;
        if (i === ordersState.page) btn.classList.add("active");
        (function (num) { btn.addEventListener("click", function () { ordersState.page = num; renderOrdersTable(); }); })(i);
        buttons.appendChild(btn);
    }

    var nextBtn = document.createElement("button");
    nextBtn.textContent = "›";
    nextBtn.disabled = ordersState.page === totalPages;
    nextBtn.addEventListener("click", function () { ordersState.page++; renderOrdersTable(); });
    buttons.appendChild(nextBtn);
}

function wireOrdersEvents() {
    var searchInput = document.getElementById("order-search");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            ordersState.search = searchInput.value;
            ordersState.page = 1;
            renderOrdersTable();
        });
    }

    var tabs = document.querySelectorAll("#orders-status-tabs button");
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach(function (t) { t.classList.remove("active"); });
            tab.classList.add("active");
            ordersState.status = tab.getAttribute("data-status");
            ordersState.page = 1;
            renderOrdersTable();
        });
    });

    var statusForm = document.getElementById("update-status-form");
    if (statusForm) {
        statusForm.addEventListener("submit", function (e) {
            e.preventDefault();
            saveOrderStatus();
        });
    }
}

function viewOrder(id) {
    var order = getData(STORAGE_KEYS.orders).find(function (o) { return o.id === id; });
    if (!order) return;

    document.getElementById("view-order-body").innerHTML =
        '<div class="flex-center" style="margin-bottom:16px;">' +
            '<img src="' + order.image + '" alt="" style="width:80px;height:80px;border-radius:12px;object-fit:cover;">' +
        '</div>' +
        '<div class="detail-row"><span class="detail-label">Order ID</span><span class="detail-value">' + order.id + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Customer</span><span class="detail-value">' + order.customer + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Product</span><span class="detail-value">' + order.product + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Price</span><span class="detail-value">' + formatCurrency(order.price) + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">' + order.status + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Order Date</span><span class="detail-value">' + formatDate(order.date) + '</span></div>';

    document.getElementById("view-order-modal").classList.add("show");
}

function openUpdateStatus(id) {
    document.getElementById("update-order-id").value = id;
    var order = getData(STORAGE_KEYS.orders).find(function (o) { return o.id === id; });
    document.getElementById("update-status-select").value = order.status;
    document.getElementById("update-status-modal").classList.add("show");
}

function saveOrderStatus() {
    var id = document.getElementById("update-order-id").value;
    var newStatus = document.getElementById("update-status-select").value;

    var orders = getData(STORAGE_KEYS.orders);
    var order = orders.find(function (o) { return o.id === id; });
    order.status = newStatus;

    saveData(STORAGE_KEYS.orders, orders);
    closeModal("update-status-modal");
    renderOrdersTable();
    showToast("Order status updated to \"" + newStatus + "\".");
}
