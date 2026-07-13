// =======================================
// EcoVolt Bill Page
// =======================================

// =======================================
// Load Saved Data
// =======================================

const totalUnits =
    localStorage.getItem("totalUnits") || "0";

const totalBill =
    localStorage.getItem("estimatedBill") || "0";

const state =
    localStorage.getItem("selectedState") || "-";

const connection =
    localStorage.getItem("connectionType") || "-";


// =======================================
// Fill Dashboard Cards
// =======================================

document.getElementById("totalUnits").innerHTML =
    totalUnits + " Units";

document.getElementById("totalBill").innerHTML =
    "₹ " + totalBill;


// =======================================
// Fill Summary Table
// =======================================

document.getElementById("summaryUnits").innerHTML =
    totalUnits + " Units";

document.getElementById("summaryBill").innerHTML =
    "₹ " + totalBill;

document.getElementById("summaryState").innerHTML =
    state;

document.getElementById("summaryConnection").innerHTML =
    connection.charAt(0).toUpperCase() +
    connection.slice(1);


// =======================================
// Fill Form Fields
// =======================================

const stateInput =
    document.getElementById("billState");

if (stateInput) {

    stateInput.value = state;

}

const connectionInput =
    document.getElementById("connectionType");

if (connectionInput) {

    connectionInput.value =
        connection.charAt(0).toUpperCase() +
        connection.slice(1);

}
// =======================================
// Current Date
// =======================================

const today = new Date();

const monthInput =
    document.querySelector('input[type="month"]');

if (monthInput) {

    monthInput.value =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0");

}

const dateInput =
    document.querySelector('input[type="date"]');

if (dateInput) {

    dateInput.valueAsDate = today;

}


// =======================================
// Generate Bill Number
// =======================================

let billNumber =
    localStorage.getItem("billNumber");

if (!billNumber) {

    billNumber =
        "EV-" +
        Math.floor(
            100000 + Math.random() * 900000
        );

    localStorage.setItem(
        "billNumber",
        billNumber
    );

}

const badge =
    document.querySelector(".badge.bg-success");

if (badge) {

    badge.innerHTML =
        "Bill No : " + billNumber;

}


// =======================================
// Customer Name Auto Save
// =======================================

const customerName =
    document.getElementById("customerName");

if (customerName) {

    customerName.value =
        localStorage.getItem("customerName") || "";

    customerName.addEventListener("input", function () {

        localStorage.setItem(
            "customerName",
            this.value
        );

    });

}


// =======================================
// Consumer Number Auto Save
// =======================================

const consumerNo =
    document.getElementById("consumerNumber");

if (consumerNo) {

    consumerNo.value =
        localStorage.getItem("consumerNumber") || "";

    consumerNo.addEventListener("input", function () {

        localStorage.setItem(
            "consumerNumber",
            this.value
        );

    });

}
// =======================================
// Address Auto Save
// =======================================

const address =
    document.getElementById("address");

if (address) {

    address.value =
        localStorage.getItem("address") || "";

    address.addEventListener("input", function () {

        localStorage.setItem(
            "address",
            this.value
        );

    });

}


// =======================================
// Meter Number Auto Save
// =======================================

const meterNo =
    document.getElementById("meterNumber");

if (meterNo) {

    meterNo.value =
        localStorage.getItem("meterNumber") || "";

    meterNo.addEventListener("input", function () {

        localStorage.setItem(
            "meterNumber",
            this.value
        );

    });

}


// =======================================
// Download / Print Bill
// =======================================

function downloadBill() {

    window.print();

}


// =======================================
// Print Button
// =======================================

const printBtn =
    document.getElementById("printBill");

if (printBtn) {

    printBtn.addEventListener("click", function () {

        window.print();

    });

}


// =======================================
// Clear Bill Data
// =======================================

function clearBillData() {

    if (!confirm("Are you sure you want to clear all bill data?")) {

        return;

    }

    localStorage.removeItem("customerName");
    localStorage.removeItem("consumerNumber");
    localStorage.removeItem("meterNumber");
    localStorage.removeItem("address");

    localStorage.removeItem("billNumber");

    localStorage.removeItem("totalUnits");
    localStorage.removeItem("estimatedBill");

    localStorage.removeItem("selectedState");
    localStorage.removeItem("connectionType");

    alert("Bill data cleared successfully.");

    location.reload();

}


// =======================================
// Generate New Bill Number
// =======================================

function generateNewBill() {

    const newBillNo =
        "EV-" +
        Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem(
        "billNumber",
        newBillNo
    );

    const badge =
        document.querySelector(".badge.bg-success");

    if (badge) {

        badge.innerHTML =
            "Bill No : " + newBillNo;

    }

}


// =======================================
// Page Loaded Successfully
// =======================================

console.log("EcoVolt Bill Page Loaded Successfully");