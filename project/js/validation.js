// Shows/hides the small red error message under a field and
// toggles the red border on the input itself.
function setFieldError(inputEl, errorEl, message) {
    if (message) {
        inputEl.classList.add("input-error");
        errorEl.textContent = message;
        errorEl.classList.add("show");
        return false;
    }
    inputEl.classList.remove("input-error");
    errorEl.classList.remove("show");
    return true;
}

function isEmpty(value) {
    return !value || value.trim() === "";
}

function isPositiveNumber(value) {
    var n = Number(value);
    return !isNaN(n) && n >= 0;
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Reads a field + its paired error element by naming convention:
// input id "product-name" -> error id "product-name-error"
function validateRequiredField(inputId, messageIfEmpty) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(inputId + "-error");
    if (!input || !error) return true;

    if (isEmpty(input.value)) {
        return setFieldError(input, error, messageIfEmpty || "This field is required.");
    }
    return setFieldError(input, error, "");
}

function validateNumberField(inputId, messageIfInvalid) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(inputId + "-error");
    if (!input || !error) return true;

    if (isEmpty(input.value) || !isPositiveNumber(input.value)) {
        return setFieldError(input, error, messageIfInvalid || "Enter a valid number.");
    }
    return setFieldError(input, error, "");
}
