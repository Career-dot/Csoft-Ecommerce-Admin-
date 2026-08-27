document.addEventListener("DOMContentLoaded", function () {
    renderDiscountsTable();
    wireDiscountEvents();
});

function renderDiscountsTable() {
    var tbody = document.getElementById("discounts-table-body");
    if (!tbody) return;

    var discounts = getData(STORAGE_KEYS.discounts);
    tbody.innerHTML = "";

    if (discounts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No coupons yet. Create your first one!</td></tr>';
        return;
    }

    discounts.forEach(function (d) {
        var valueLabel = d.type === "Percentage" ? d.value + "%" : formatCurrency(d.value);
        var row = document.createElement("tr");
        row.innerHTML =
            '<td><strong>' + d.code + '</strong></td>' +
            '<td>' + d.type + '</td>' +
            '<td>' + valueLabel + '</td>' +
            '<td>' + formatDate(d.expiry) + '</td>' +
            '<td><span class="status-pill badge-' + statusClass(d.status) + '"><span class="status-dot ' + statusClass(d.status) + '"></span>' + d.status + '</span></td>' +
            '<td><div class="row-actions">' +
                '<button title="Delete" class="delete-btn" onclick="deleteDiscount(' + d.id + ')">' + rowIconDelete() + '</button>' +
            '</div></td>';
        tbody.appendChild(row);
    });
}

function wireDiscountEvents() {
    var addBtn = document.getElementById("add-discount-btn");
    if (addBtn) {
        addBtn.addEventListener("click", function () {
            document.getElementById("discount-form").reset();
            clearDiscountErrors();
            document.getElementById("discount-modal").classList.add("show");
        });
    }

    var form = document.getElementById("discount-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            saveDiscount();
        });
    }
}

function clearDiscountErrors() {
    ["discount-code", "discount-value", "discount-expiry"].forEach(function (id) {
        var input = document.getElementById(id);
        var error = document.getElementById(id + "-error");
        if (input && error) setFieldError(input, error, "");
    });
}

function saveDiscount() {
    var validCode = validateRequiredField("discount-code", "Coupon code is required.");
    var validValue = validateNumberField("discount-value", "Enter a valid amount.");
    var validExpiry = validateRequiredField("discount-expiry", "Pick an expiry date.");
    if (!validCode || !validValue || !validExpiry) return;

    var discounts = getData(STORAGE_KEYS.discounts);

    var newDiscount = {
        id: getNextId(discounts),
        code: document.getElementById("discount-code").value.trim().toUpperCase(),
        type: document.getElementById("discount-type").value,
        value: Number(document.getElementById("discount-value").value),
        expiry: document.getElementById("discount-expiry").value,
        status: "Active"
    };

    discounts.push(newDiscount);
    saveData(STORAGE_KEYS.discounts, discounts);
    closeModal("discount-modal");
    renderDiscountsTable();
    showToast("Coupon \"" + newDiscount.code + "\" created.");
}

function deleteDiscount(id) {
    var confirmed = window.confirm("Delete this coupon?");
    if (!confirmed) return;

    var discounts = getData(STORAGE_KEYS.discounts).filter(function (d) { return d.id !== id; });
    saveData(STORAGE_KEYS.discounts, discounts);
    renderDiscountsTable();
    showToast("Coupon deleted.");
}
