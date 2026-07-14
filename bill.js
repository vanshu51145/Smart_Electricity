// =======================================
// EcoVolt Bill Page
// Part 1
// =======================================

// Current Bill Data (Calculator se aayega)

let totalUnits =
localStorage.getItem("totalUnits") || "0";

let totalBill =
localStorage.getItem("estimatedBill") || "0";

let state =
localStorage.getItem("selectedState") || "-";

let connection =
localStorage.getItem("connectionType") || "-";


// =======================================
// Generate Bill Number
// =======================================

function generateBillNumber(){

    return "EV-" +
    Math.floor(100000 + Math.random() * 900000);

}

let billNumber = generateBillNumber();


// =======================================
// Badge
// =======================================

document.querySelector(".badge.bg-success").innerHTML =
"Bill No : " + billNumber;


// =======================================
// Dashboard Blank
// =======================================

document.getElementById("totalUnits").innerHTML =
"--";

document.getElementById("totalBill").innerHTML =
"₹ --";


// =======================================
// Summary Blank
// =======================================

document.getElementById("summaryBillNo").innerHTML =
"--";

document.getElementById("summaryCustomer").innerHTML =
"--";

document.getElementById("summaryState").innerHTML =
"--";

document.getElementById("summaryConnection").innerHTML =
"--";

document.getElementById("summaryUnits").innerHTML =
"--";

document.getElementById("summaryBill").innerHTML =
"₹ --";


// =======================================
// Form
// =======================================

const customer =
document.getElementById("customerName");

const monthInput =
document.getElementById("billingMonth");

const dateInput =
document.getElementById("billingDate");

const stateInput =
document.getElementById("billState");

const connectionInput =
document.getElementById("connectionType");


// Blank Customer

customer.value = "";


// Current Month

const today = new Date();

monthInput.value =
today.getFullYear() +
"-" +
String(today.getMonth()+1).padStart(2,"0");


// Current Date

dateInput.value =
today.toISOString().split("T")[0];


// State & Connection

stateInput.value = state;

connectionInput.value =
connection.charAt(0).toUpperCase() +
connection.slice(1);


// =======================================
// History Array
// =======================================

let history =
JSON.parse(
localStorage.getItem("billHistory")
) || [];
// =======================================
// Save Bill History
// =======================================

function saveHistory(){

    history.push({

        billNo: billNumber,

        customer: customer.value,

        state: state,

        connection: connection,

        units: totalUnits,

        bill: totalBill,

        month: monthInput.value,

        date: dateInput.value

    });

    localStorage.setItem(

        "billHistory",

        JSON.stringify(history)

    );

}


// =======================================
// Display History Table
// =======================================

function displayHistory(){

    const table =
    document.getElementById("historyTable");

    table.innerHTML = "";

    history.forEach(function(item,index){

        table.innerHTML += `

<tr>

<td>${item.billNo}</td>

<td>${item.customer}</td>

<td>${item.state}</td>

<td>${item.connection}</td>

<td>${item.units} Units</td>

<td>₹ ${item.bill}</td>

<td>${item.date}</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="deleteBill(${index})">

<i class="bi bi-trash-fill"></i>

</button>

</td>

</tr>

`;

    });

}


// =======================================
// Delete Bill
// =======================================

function deleteBill(index){

    if(confirm("Delete this bill?")){

        history.splice(index,1);

        localStorage.setItem(

            "billHistory",

            JSON.stringify(history)

        );

        displayHistory();

    }

}


// =======================================
// Save Bill
// =======================================

function saveBill(){

    if(customer.value.trim()===""){

        alert("Please enter Consumer Name.");

        return;

    }

    // Dashboard Update

    document.getElementById("totalUnits").innerHTML =
    totalUnits + " Units";

    document.getElementById("totalBill").innerHTML =
    "₹ " + totalBill;


    // Summary Update

    document.getElementById("summaryBillNo").innerHTML =
    billNumber;

    document.getElementById("summaryCustomer").innerHTML =
    customer.value;

    document.getElementById("summaryState").innerHTML =
    state;

    document.getElementById("summaryConnection").innerHTML =
    connection.charAt(0).toUpperCase() +
    connection.slice(1);

    document.getElementById("summaryUnits").innerHTML =
    totalUnits + " Units";

    document.getElementById("summaryBill").innerHTML =
    "₹ " + totalBill;


    // Save History

    saveHistory();

    displayHistory();


    alert("Bill Saved Successfully.");


    // Generate Next Bill Number

    billNumber = generateBillNumber();

    document.querySelector(".badge.bg-success").innerHTML =
    "Bill No : " + billNumber;

}
// =======================================
// Print Bill
// =======================================

function downloadBill(){

    window.print();

}


// =======================================
// Reset Form (Optional)
// =======================================

function resetBillForm(){

    customer.value = "";

    monthInput.value =
    today.getFullYear() +
    "-" +
    String(today.getMonth()+1).padStart(2,"0");

    dateInput.value =
    today.toISOString().split("T")[0];

}


// =======================================
// Window Load
// =======================================

window.onload = function(){

    // Dashboard Blank

    document.getElementById("totalUnits").innerHTML =
    "--";

    document.getElementById("totalBill").innerHTML =
    "₹ --";


    // Summary Blank

    document.getElementById("summaryBillNo").innerHTML =
    "--";

    document.getElementById("summaryCustomer").innerHTML =
    "--";

    document.getElementById("summaryState").innerHTML =
    "--";

    document.getElementById("summaryConnection").innerHTML =
    "--";

    document.getElementById("summaryUnits").innerHTML =
    "--";

    document.getElementById("summaryBill").innerHTML =
    "₹ --";


    // New Bill Number

    billNumber = generateBillNumber();

    document.querySelector(".badge.bg-success").innerHTML =
    "Bill No : " + billNumber;


    // Form Reset

    customer.value = "";

    monthInput.value =
    today.getFullYear() +
    "-" +
    String(today.getMonth()+1).padStart(2,"0");

    dateInput.value =
    today.toISOString().split("T")[0];

    stateInput.value = state;

    connectionInput.value =
    connection.charAt(0).toUpperCase() +
    connection.slice(1);


    // Show History Table

    displayHistory();

};


// =======================================
// Console
// =======================================

console.log("EcoVolt Bill Page Loaded Successfully");