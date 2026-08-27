var categorySearchTerm = "";

document.addEventListener("DOMContentLoaded", function () {
    renderCategoriesTable();
    wireCategoryEvents();
});

function getFilteredCategories() {
    var categories = getData(STORAGE_KEYS.categories);
    if (!categorySearchTerm) return categories;
    var term = categorySearchTerm.toLowerCase();
    return categories.filter(function (c) { return c.name.toLowerCase().indexOf(term) !== -1; });
}

function renderCategoriesTable() {
    var tbody = document.getElementById("categories-table-body");
    if (!tbody) return;

    var categories = getFilteredCategories();
    tbody.innerHTML = "";

    if (categories.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No categories found.</td></tr>';
        return;
    }

    categories.forEach(function (cat) {
        var row = document.createElement("tr");
        row.innerHTML =
            '<td><strong>' + cat.name + '</strong></td>' +
            '<td>' + cat.productCount + ' products</td>' +
            '<td><span class="status-pill badge-' + statusClass(cat.status) + '"><span class="status-dot ' + statusClass(cat.status) + '"></span>' + cat.status + '</span></td>' +
            '<td><div class="row-actions">' +
                '<button title="Edit" onclick="openEditCategory(' + cat.id + ')">' + rowIconEdit() + '</button>' +
                '<button title="Delete" class="delete-btn" onclick="deleteCategory(' + cat.id + ')">' + rowIconDelete() + '</button>' +
            '</div></td>';
        tbody.appendChild(row);
    });
}

function wireCategoryEvents() {
    var searchInput = document.getElementById("category-search");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            categorySearchTerm = searchInput.value;
            renderCategoriesTable();
        });
    }

    var addBtn = document.getElementById("add-category-btn");
    if (addBtn) {
        addBtn.addEventListener("click", function () { openCategoryModal(null); });
    }

    var categoryForm = document.getElementById("category-form");
    if (categoryForm) {
        categoryForm.addEventListener("submit", function (e) {
            e.preventDefault();
            saveCategory();
        });
    }
}

/* ---------- Add / Edit modal (shared form) ---------- */
function openCategoryModal(id) {
    document.getElementById("category-form").reset();
    clearCategoryErrors();

    if (id) {
        var categories = getData(STORAGE_KEYS.categories);
        var cat = categories.find(function (c) { return c.id === id; });
        document.getElementById("category-modal-title").textContent = "Edit Category";
        document.getElementById("category-id").value = cat.id;
        document.getElementById("category-name").value = cat.name;
        document.getElementById("category-status").value = cat.status;
    } else {
        document.getElementById("category-modal-title").textContent = "Add Category";
        document.getElementById("category-id").value = "";
    }

    document.getElementById("category-modal").classList.add("show");
}

function openEditCategory(id) {
    openCategoryModal(id);
}

function clearCategoryErrors() {
    setFieldError(document.getElementById("category-name"), document.getElementById("category-name-error"), "");
}

function saveCategory() {
    var valid = validateRequiredField("category-name", "Category name is required.");
    if (!valid) return;

    var categories = getData(STORAGE_KEYS.categories);
    var id = document.getElementById("category-id").value;
    var name = document.getElementById("category-name").value.trim();
    var status = document.getElementById("category-status").value;

    if (id) {
        var cat = categories.find(function (c) { return c.id === Number(id); });
        cat.name = name;
        cat.status = status;
        showToast("Category updated.");
    } else {
        categories.push({ id: getNextId(categories), name: name, productCount: 0, status: status });
        showToast("Category added.");
    }

    saveData(STORAGE_KEYS.categories, categories);
    closeModal("category-modal");
    renderCategoriesTable();
}

function deleteCategory(id) {
    var confirmed = window.confirm("Delete this category? Products inside it will not be deleted.");
    if (!confirmed) return;

    var categories = getData(STORAGE_KEYS.categories).filter(function (c) { return c.id !== id; });
    saveData(STORAGE_KEYS.categories, categories);
    renderCategoriesTable();
    showToast("Category deleted.");
}
