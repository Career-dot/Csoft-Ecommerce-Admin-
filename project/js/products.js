var productsState = {
    page: 1,
    pageSize: 6,
    search: "",
    category: "All",
    status: "All",
    sortKey: "name",
    sortDir: "asc"
};

document.addEventListener("DOMContentLoaded", function () {
    // if the user arrived from the topbar search with a ?search= param
    var urlParams = new URLSearchParams(window.location.search);
    var searchParam = urlParams.get("search");
    if (searchParam) {
        productsState.search = searchParam;
        document.getElementById("product-search").value = searchParam;
    }

    fillCategoryFilter();
    renderProductsTable();
    wireProductEvents();
});

/* ---------- Fill the category <select> from real data ---------- */
function fillCategoryFilter() {
    var select = document.getElementById("category-filter");
    if (!select) return;
    var categories = getData(STORAGE_KEYS.categories);
    categories.forEach(function (cat) {
        var opt = document.createElement("option");
        opt.value = cat.name;
        opt.textContent = cat.name;
        select.appendChild(opt);
    });
}

/* ---------- Get the filtered + sorted + paginated list ---------- */
function getFilteredProducts() {
    var products = getData(STORAGE_KEYS.products);

    if (productsState.search) {
        var term = productsState.search.toLowerCase();
        products = products.filter(function (p) {
            return p.name.toLowerCase().indexOf(term) !== -1 ||
                   p.sku.toLowerCase().indexOf(term) !== -1;
        });
    }

    if (productsState.category !== "All") {
        products = products.filter(function (p) { return p.category === productsState.category; });
    }

    if (productsState.status !== "All") {
        products = products.filter(function (p) { return p.status === productsState.status; });
    }

    products.sort(function (a, b) {
        var valA = a[productsState.sortKey];
        var valB = b[productsState.sortKey];
        if (typeof valA === "string") {
            return productsState.sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return productsState.sortDir === "asc" ? valA - valB : valB - valA;
    });

    return products;
}

/* ---------- Render table + pagination ---------- */
function renderProductsTable() {
    var tbody = document.getElementById("products-table-body");
    if (!tbody) return;

    var all = getFilteredProducts();
    var totalPages = Math.max(1, Math.ceil(all.length / productsState.pageSize));
    if (productsState.page > totalPages) productsState.page = totalPages;

    var start = (productsState.page - 1) * productsState.pageSize;
    var pageItems = all.slice(start, start + productsState.pageSize);

    tbody.innerHTML = "";

    if (pageItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No products found. Try a different search or filter.</td></tr>';
    }

    pageItems.forEach(function (p) {
        var row = document.createElement("tr");
        row.innerHTML =
            '<td><div class="cell-product"><img src="' + p.image + '" alt=""><div><div class="cell-title">' + p.name + '</div><div class="cell-sub">' + p.sku + '</div></div></div></td>' +
            '<td>' + p.category + '</td>' +
            '<td>' + formatCurrency(p.price) + '</td>' +
            '<td>' + p.stock + '</td>' +
            '<td><span class="status-pill badge-' + statusClass(p.status) + '"><span class="status-dot ' + statusClass(p.status) + '"></span>' + p.status + '</span></td>' +
            '<td><div class="row-actions">' +
                '<button title="View" onclick="viewProduct(' + p.id + ')">' + rowIconView() + '</button>' +
                '<button title="Edit" onclick="openEditProduct(' + p.id + ')">' + rowIconEdit() + '</button>' +
                '<button title="Delete" class="delete-btn" onclick="deleteProduct(' + p.id + ')">' + rowIconDelete() + '</button>' +
            '</div></td>';
        tbody.appendChild(row);
    });

    renderPagination(totalPages);
}

/* ---------- Pagination controls ---------- */
function renderPagination(totalPages) {
    var wrap = document.getElementById("products-pagination");
    if (!wrap) return;

    var info = document.getElementById("pagination-info");
    var total = getFilteredProducts().length;
    var start = total === 0 ? 0 : (productsState.page - 1) * productsState.pageSize + 1;
    var end = Math.min(productsState.page * productsState.pageSize, total);
    info.textContent = "Showing " + start + "–" + end + " of " + total + " products";

    var buttons = document.getElementById("pagination-buttons");
    buttons.innerHTML = "";

    var prevBtn = document.createElement("button");
    prevBtn.textContent = "‹";
    prevBtn.disabled = productsState.page === 1;
    prevBtn.addEventListener("click", function () { changePage(productsState.page - 1); });
    buttons.appendChild(prevBtn);

    for (var i = 1; i <= totalPages; i++) {
        var btn = document.createElement("button");
        btn.textContent = i;
        if (i === productsState.page) btn.classList.add("active");
        (function (pageNum) {
            btn.addEventListener("click", function () { changePage(pageNum); });
        })(i);
        buttons.appendChild(btn);
    }

    var nextBtn = document.createElement("button");
    nextBtn.textContent = "›";
    nextBtn.disabled = productsState.page === totalPages;
    nextBtn.addEventListener("click", function () { changePage(productsState.page + 1); });
    buttons.appendChild(nextBtn);
}

function changePage(page) {
    productsState.page = page;
    renderProductsTable();
}

/* ---------- Wire search / filter / sort events ---------- */
function wireProductEvents() {
    var searchInput = document.getElementById("product-search");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            productsState.search = searchInput.value;
            productsState.page = 1;
            renderProductsTable();
        });
    }

    var categoryFilter = document.getElementById("category-filter");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", function () {
            productsState.category = categoryFilter.value;
            productsState.page = 1;
            renderProductsTable();
        });
    }

    var statusTabs = document.querySelectorAll("#status-tabs button");
    statusTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            statusTabs.forEach(function (t) { t.classList.remove("active"); });
            tab.classList.add("active");
            productsState.status = tab.getAttribute("data-status");
            productsState.page = 1;
            renderProductsTable();
        });
    });

    var sortableHeaders = document.querySelectorAll("[data-sort]");
    sortableHeaders.forEach(function (th) {
        th.addEventListener("click", function () {
            var key = th.getAttribute("data-sort");
            if (productsState.sortKey === key) {
                productsState.sortDir = productsState.sortDir === "asc" ? "desc" : "asc";
            } else {
                productsState.sortKey = key;
                productsState.sortDir = "asc";
            }
            renderProductsTable();
        });
    });

    // Edit modal form submit
    var editForm = document.getElementById("edit-product-form");
    if (editForm) {
        editForm.addEventListener("submit", function (e) {
            e.preventDefault();
            saveEditedProduct();
        });
    }
}

/* ---------- View product modal ---------- */
function viewProduct(id) {
    var product = getData(STORAGE_KEYS.products).find(function (p) { return p.id === id; });
    if (!product) return;

    document.getElementById("view-product-body").innerHTML =
        '<div class="flex-center" style="margin-bottom:16px;">' +
            '<img src="' + product.image + '" alt="" style="width:90px;height:90px;border-radius:12px;object-fit:cover;">' +
        '</div>' +
        '<div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">' + product.name + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">SKU</span><span class="detail-value">' + product.sku + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Category</span><span class="detail-value">' + product.category + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Price</span><span class="detail-value">' + formatCurrency(product.price) + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Stock</span><span class="detail-value">' + product.stock + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">' + product.status + '</span></div>' +
        '<div class="detail-row"><span class="detail-label">Description</span><span class="detail-value">' + product.description + '</span></div>';

    document.getElementById("view-product-modal").classList.add("show");
}

/* ---------- Edit product modal ---------- */
function openEditProduct(id) {
    var product = getData(STORAGE_KEYS.products).find(function (p) { return p.id === id; });
    if (!product) return;

    document.getElementById("edit-product-id").value = product.id;
    document.getElementById("edit-product-name").value = product.name;
    document.getElementById("edit-product-price").value = product.price;
    document.getElementById("edit-product-stock").value = product.stock;
    document.getElementById("edit-product-status").value = product.status;

    document.getElementById("edit-product-modal").classList.add("show");
}

function saveEditedProduct() {
    var id = Number(document.getElementById("edit-product-id").value);
    var products = getData(STORAGE_KEYS.products);
    var product = products.find(function (p) { return p.id === id; });
    if (!product) return;

    product.name = document.getElementById("edit-product-name").value.trim();
    product.price = Number(document.getElementById("edit-product-price").value);
    product.stock = Number(document.getElementById("edit-product-stock").value);
    product.status = document.getElementById("edit-product-status").value;

    saveData(STORAGE_KEYS.products, products);
    closeModal("edit-product-modal");
    renderProductsTable();
    showToast("Product updated successfully.");
}

/* ---------- Delete product ---------- */
function deleteProduct(id) {
    var confirmed = window.confirm("Are you sure you want to delete this product? This cannot be undone.");
    if (!confirmed) return;

    var products = getData(STORAGE_KEYS.products).filter(function (p) { return p.id !== id; });
    saveData(STORAGE_KEYS.products, products);
    renderProductsTable();
    showToast("Product deleted.");
}

/* =======================================================
   ADD PRODUCT PAGE
   The functions below only run on add-product.html (they
   simply do nothing if the form isn't found on the page).
   ======================================================= */

document.addEventListener("DOMContentLoaded", function () {
    var addForm = document.getElementById("add-product-form");
    if (!addForm) return; // not on the add product page, skip

    fillAddProductCategories();
    wireImageUpload();

    addForm.addEventListener("submit", function (e) {
        e.preventDefault();
        handleAddProductSubmit();
    });

    addForm.addEventListener("reset", function () {
        setTimeout(function () {
            document.getElementById("add-image-preview").classList.remove("show");
            document.getElementById("add-form-success").classList.remove("show");
            clearAddProductErrors();
        }, 0);
    });
});

function fillAddProductCategories() {
    var select = document.getElementById("add-product-category");
    if (!select) return;
    var categories = getData(STORAGE_KEYS.categories);
    categories.forEach(function (cat) {
        var opt = document.createElement("option");
        opt.value = cat.name;
        opt.textContent = cat.name;
        select.appendChild(opt);
    });
}

// Shows a live preview of the uploaded image using FileReader
function wireImageUpload() {
    var input = document.getElementById("add-product-image");
    var box = document.getElementById("image-upload-box");
    var preview = document.getElementById("add-image-preview");
    if (!input) return;

    box.addEventListener("click", function () { input.click(); });

    input.addEventListener("change", function () {
        var file = input.files[0];
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.classList.add("show");
        };
        reader.readAsDataURL(file);
    });
}

function clearAddProductErrors() {
    ["add-product-name", "add-product-category", "add-product-price", "add-product-stock", "add-product-sku"].forEach(function (id) {
        var input = document.getElementById(id);
        var error = document.getElementById(id + "-error");
        if (input && error) setFieldError(input, error, "");
    });
}

function validateAddProductForm() {
    var validName = validateRequiredField("add-product-name", "Product name is required.");
    var validCategory = validateRequiredField("add-product-category", "Please choose a category.");
    var validPrice = validateNumberField("add-product-price", "Enter a valid price.");
    var validStock = validateNumberField("add-product-stock", "Enter a valid stock amount.");
    var validSku = validateRequiredField("add-product-sku", "SKU is required.");
    return validName && validCategory && validPrice && validStock && validSku;
}

function handleAddProductSubmit() {
    if (!validateAddProductForm()) {
        showToast("Please fix the highlighted fields.", "error");
        return;
    }

    var products = getData(STORAGE_KEYS.products);
    var preview = document.getElementById("add-image-preview");

    var newProduct = {
        id: getNextId(products),
        name: document.getElementById("add-product-name").value.trim(),
        category: document.getElementById("add-product-category").value,
        price: Number(document.getElementById("add-product-price").value),
        stock: Number(document.getElementById("add-product-stock").value),
        sku: document.getElementById("add-product-sku").value.trim(),
        description: document.getElementById("add-product-description").value.trim(),
        status: document.getElementById("add-product-status").value,
        image: preview.classList.contains("show") ? preview.src : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=60"
    };

    products.push(newProduct);
    saveData(STORAGE_KEYS.products, products);

    document.getElementById("add-form-success").classList.add("show");
    showToast("Product added successfully!");
    document.getElementById("add-product-form").reset();
    preview.classList.remove("show");
}
