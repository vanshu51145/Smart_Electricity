
// ==========================================
// EcoVolt - Calculator JS (Part 1)
// ==========================================

// Store Appliances
let appliances = [];

// Approximate domestic demo rates (₹/unit)
const electricityRates = {
    "Andhra Pradesh": 7.10,
    "Arunachal Pradesh": 5.20,
    "Assam": 6.70,
    "Bihar": 7.40,
    "Chhattisgarh": 6.50,
    "Goa": 5.80,
    "Gujarat": 6.60,
    "Haryana": 6.75,
    "Himachal Pradesh": 5.90,
    "Jharkhand": 6.80,
    "Karnataka": 7.20,
    "Kerala": 6.90,
    "Madhya Pradesh": 7.00,
    "Maharashtra": 8.20,
    "Manipur": 5.60,
    "Meghalaya": 6.10,
    "Mizoram": 5.50,
    "Nagaland": 5.40,
    "Odisha": 6.30,
    "Punjab": 7.10,
    "Rajasthan": 7.50,
    "Sikkim": 5.30,
    "Tamil Nadu": 6.80,
    "Telangana": 7.00,
    "Tripura": 6.20,
    "Uttar Pradesh": 7.30,
    "Uttarakhand": 6.40,
    "West Bengal": 7.10,
    "Delhi": 8.00,
    "Jammu and Kashmir": 6.00,
    "Ladakh": 5.80,
    "Chandigarh": 6.90,
    "Dadra and Nagar Haveli and Daman and Diu": 6.50,
    "Lakshadweep": 6.20,
    "Puducherry": 6.70,
    "Andaman and Nicobar Islands": 6.00
};

// ==========================================
// Slab-wise Bill Calculation
// ==========================================

function calculateAmount(units) {

    let amount = 0;

    if (units <= 100) {

        amount = units * 3;

    } else if (units <= 200) {

        amount = (100 * 3) + ((units - 100) * 5);

    } else if (units <= 300) {

        amount = (100 * 3) +
                 (100 * 5) +
                 ((units - 200) * 7);

    } else if (units <= 500) {

        amount = (100 * 3) +
                 (100 * 5) +
                 (100 * 7) +
                 ((units - 300) * 8.5);

    } else {

        amount = (100 * 3) +
                 (100 * 5) +
                 (100 * 7) +
                 (200 * 8.5) +
                 ((units - 500) * 10);

    }

    return amount;

}

// ==========================================
// Add Appliance
// ==========================================

function addAppliance() {

    const appliance = document.getElementById("appliance");
    const quantity = document.getElementById("quantity");
    const hours = document.getElementById("hours");

    if (
        appliance.value === "" ||
        quantity.value === "" ||
        hours.value === ""
    ) {

        alert("Please fill all fields.");
        return;

    }

    const qty = Number(quantity.value);
    const hrs = Number(hours.value);

    if (qty <= 0) {

        alert("Quantity should be greater than 0.");
        return;

    }

    if (hrs <= 0 || hrs > 24) {

        alert("Hours must be between 1 and 24.");
        return;

    }

    const applianceName =
        appliance.options[appliance.selectedIndex].text;

    const power = Number(appliance.value);

    const dailyUnits =
        (power * qty * hrs) / 1000;

    const monthlyUnits =
        dailyUnits * 30;

    appliances.push({

        name: applianceName,

        power: power,

        quantity: qty,

        hours: hrs,

        units: monthlyUnits

    });

    displayTable();

    appliance.selectedIndex = 0;
    quantity.value = "";
    hours.value = "";

}
// ==========================================
// Display Appliance Table
// ==========================================

function displayTable() {

    const tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    let totalUnits = 0;
    let totalAppliances = 0;

    appliances.forEach(function (item, index) {

        totalUnits += item.units;
        totalAppliances += item.quantity;

        tableBody.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${item.name}</td>

<td>${item.power} W</td>

<td>${item.quantity}</td>

<td>${item.hours}</td>

<td>${item.units.toFixed(2)}</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="deleteRow(${index})">

<i class="bi bi-trash-fill"></i>

</button>

</td>

</tr>

`;

    });

    // Dashboard Update

    document.getElementById("totalAppliances").innerHTML =
        totalAppliances;

    document.getElementById("totalUnits").innerHTML =
        totalUnits.toFixed(2);

    document.getElementById("estimatedBill").innerHTML =
        "₹ " + calculateAmount(totalUnits).toFixed(2);

    // Highest Consumption Appliance

    document.getElementById("highestAppliance").innerHTML =
        getHighestConsumption();

}



// ==========================================
// Delete Appliance
// ==========================================

function deleteRow(index) {

    appliances.splice(index, 1);

    displayTable();

}



// ==========================================
// Highest Consumption
// ==========================================

function getHighestConsumption() {

    if (appliances.length === 0) {

        return "-";

    }

    let highest = appliances[0];

    appliances.forEach(function(item){

        if(item.units > highest.units){

            highest = item;

        }

    });

    return highest.name;

}



// ==========================================
// Clear Table
// ==========================================

function clearTable() {

    if(appliances.length===0){

        alert("No appliance available.");

        return;

    }

    if(confirm("Clear all appliances?")){

        appliances=[];

        displayTable();

    }

}



// ==========================================
// Reset Dashboard
// ==========================================

function resetDashboard(){

    document.getElementById("tableBody").innerHTML="";

    document.getElementById("totalAppliances").innerHTML="0";

    document.getElementById("totalUnits").innerHTML="0";

    document.getElementById("estimatedBill").innerHTML="₹0";

    document.getElementById("highestAppliance").innerHTML="-";

}
// ==========================================
// Calculate Bill
// ==========================================

function calculateBill() {

    if (appliances.length === 0) {

        alert("Please add at least one appliance.");

        return;

    }

    const state = document.getElementById("state").value;

    const connectionType =
        document.getElementById("connectionType").value;

    if (state === "") {

        alert("Please select a state.");

        return;

    }

    if (connectionType === "") {

        alert("Please select connection type.");

        return;

    }

    let totalUnits = 0;

    appliances.forEach(function(item){

        totalUnits += item.units;

    });

    let totalBill = calculateAmount(totalUnits);

    // Commercial Example (20% Extra)

    if(connectionType === "commercial"){

        totalBill = totalBill * 1.20;

    }

    // Redirect to Bill Page

    window.location.href =

    "bill.html?" +

    "units=" + totalUnits.toFixed(2) +

    "&bill=" + totalBill.toFixed(2) +

    "&state=" + encodeURIComponent(state) +

    "&connection=" + connectionType;

}



// ==========================================
// Export Report
// ==========================================

function exportReport(){

    window.print();

}



// ==========================================
// Reset Form
// ==========================================

function resetForm(){

    document.getElementById("appliance").selectedIndex = 0;

    document.getElementById("quantity").value = "";

    document.getElementById("hours").value = "";

}



// ==========================================
// Window Load
// ==========================================

window.onload = function(){

    displayTable();

};