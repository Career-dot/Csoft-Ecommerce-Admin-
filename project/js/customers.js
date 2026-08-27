var customerSearchTerm = "";

document.addEventListener("DOMContentLoaded", function () {
    renderCustomersTable();
    wireCustomerEvents();
});

function getFilteredCustomers() {
    var customers = getData(STORAGE_KEYS.customers);
    if (!customerSearchTerm) return customers;
    var term = customerSearchTerm.toLowerCase();
    return customers.filter(function (c) {
        return c.name.toLowerCase().indexOf(term) !== -1 || c.email.toLowerCase().indexOf(term) !== -1;
    });
}

function renderCustomersTable() {
    var tbody = document.getElementById("customers-table-body");
    if (!tbody) return;

    var customers = getFilteredCustomers();
    tbody.innerHTML = "";

    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No customers found.</td></tr>';
        return;
    }

    customers.forEach(function (c) {
        var initials = c.name.split(" ").map(function (n) { return n[0]; }).join("").slice(0, 2);
        var row = document.createElement("tr");
        row.innerHTML =
            '<td><div class="cell-product"><div class="profile-avatar" style="width:34px;height:34px;font-size:12px;">' + initials + '</div><div><div class="cell-title">' + c.name + '</div><div class="cell-sub">' + c.email + '</div></div></div></td>' +
            '<td>' + c.orders + '</td>' +
            '<td>' + formatCurrency(c.totalSpent) + '</td>' +
            '<td>' + formatDate(c.joined) + '</td>' +
            '<td><span class="status-pill badge-' + statusClass(c.status) + '"><span class="status-dot ' + statusClass(c.status) + '"></span>' + c.status + '</span></td>' +
            '<td><div class="row-actions">' +
                '<button title="View" onclick="viewCustomer(' + c.id + ')">' + rowIconView() + '</button>' +
                '<button title="Delete" class="delete-btn" onclick="deleteCustomer(' + c.id + ')">' + rowIconDelete() + '</button>' +
            '</div></td>';
        tbody.appendChild(row);
    });
}

function wireCustomerEvents() {
    var searchInput = document.getElementById("customer-search");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            customerSearchTerm = searchInput.value;
            renderCustomersTable();
        });
    }
}

function viewCustomer(id) {
    var customer = getData(STORAGE_KEYS.customers).find(function (c) { return c.id === id; });
    if (!customer) return;

    document.getElementById("view-customer-body").innerHTML =
        '<div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">' + customer.name + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">' + customer.email + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">' + customer.phone + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Total Orders</span><span class="detail-value">' + customer.orders + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Total Spent</span><span class="detail-value">' + formatCurrency(customer.totalSpent) + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Joined</span><span class="detail-value">' + formatDate(customer.joined) + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">' + customer.status + '</span></div>';

    document.getElementById("view-customer-modal").classList.add("show");
}

function deleteCustomer(id) {
    var confirmed = window.confirm("Delete this customer? This cannot be undone.");
    if (!confirmed) return;

    var customers = getData(STORAGE_KEYS.customers).filter(function (c) { return c.id !== id; });
    saveData(STORAGE_KEYS.customers, customers);
    renderCustomersTable();
    showToast("Customer deleted.");
}
