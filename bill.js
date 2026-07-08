
// =======================================
// EcoVolt Bill Page
// =======================================

// Read URL Parameters
const params = new URLSearchParams(window.location.search);

// Get Data
const totalUnits = params.get("units");
const totalBill = params.get("bill");
const state = params.get("state");
const connection = params.get("connection");

// Fill Summary Cards

document.getElementById("totalUnits").innerHTML =
    totalUnits ? totalUnits + " Units" : "0 Units";

document.getElementById("totalBill").innerHTML =
    totalBill ? "₹ " + totalBill : "₹ 0";

// Fill Summary Table

document.getElementById("summaryUnits").innerHTML =
    totalUnits ? totalUnits + " Units" : "0 Units";

document.getElementById("summaryBill").innerHTML =
    totalBill ? "₹ " + totalBill : "₹ 0";

// Fill State

document.getElementById("billState").value =
    state ? decodeURIComponent(state) : "-";

document.getElementById("summaryState").innerHTML =
    state ? decodeURIComponent(state) : "-";

// Fill Connection Type

document.getElementById("connectionType").value =
    connection
        ? connection.charAt(0).toUpperCase() + connection.slice(1)
        : "-";

document.getElementById("summaryConnection").innerHTML =
    connection
        ? connection.charAt(0).toUpperCase() + connection.slice(1)
        : "-";

// Current Date

const today = new Date();

const month = today.toLocaleString("default", {
    month: "long"
});

const year = today.getFullYear();

const billMonthInput = document.querySelector(
    'input[type="month"]'
);

if (billMonthInput) {

    billMonthInput.value =
        year + "-" + String(today.getMonth() + 1).padStart(2, "0");

}

const dateInput = document.querySelector(
    'input[type="date"]'
);

if (dateInput) {

    dateInput.valueAsDate = today;

}

// Random Bill Number

const billNo = "EV-" + Math.floor(100000 + Math.random() * 900000);

const badge = document.querySelector(".badge.bg-success");

if (badge) {

    badge.innerHTML = "Bill No : " + billNo;

}
