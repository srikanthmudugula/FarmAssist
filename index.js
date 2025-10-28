let totalHours = 0;
let totalMinutes = 0;

function calculateTime() {
    let startHourStr = document.getElementById("s_hour").value;
    let startMinuteStr = document.getElementById("s_minutes").value;
    let startPeriod = document.getElementById("s_am_pm").value;
    let endHourStr = document.getElementById("e_hour").value;
    let endMinuteStr = document.getElementById("e_minutes").value;
    let endPeriod = document.getElementById("e_am_pm").value;

    let startHour = parseInt(startHourStr);
    let startMinute = parseInt(startMinuteStr);
    let endHour = parseInt(endHourStr);
    let endMinute = parseInt(endMinuteStr);

    if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
        alert("Please enter valid time values.");
        return;
    }

    if (startHour <= 12 && endHour <= 12) {
        if (startPeriod === "PM" && startHour !== 12) {
            startHour += 12;
        } else if (startPeriod === "AM" && startHour === 12) {
            startHour = 0;
        }

        if (endPeriod === "PM" && endHour !== 12) {
            endHour += 12;
        } else if (endPeriod === "AM" && endHour === 12) {
            endHour = 0;
        }

        let startTimeInMinutes = startHour * 60 + startMinute;
        let endTimeInMinutes = endHour * 60 + endMinute;

        if (endTimeInMinutes < startTimeInMinutes) {
            alert("End time cannot be earlier than start time.");
            return;
        }

        let differenceInMinutes = endTimeInMinutes - startTimeInMinutes;
        totalHours = Math.floor(differenceInMinutes / 60);
        totalMinutes = differenceInMinutes % 60;

        document.getElementById("h_text").innerHTML = "Time difference in hours: " + totalHours;
        document.getElementById("m_text").innerHTML = "Time difference in minutes: " + totalMinutes;
    } else {
        alert("Invalid time format.");
    }
}

function clearTime() {
    document.getElementById("s_hour").value = "";
    document.getElementById("s_minutes").value = "";
    document.getElementById("e_hour").value = "";
    document.getElementById("e_minutes").value = "";
    document.getElementById("h_text").innerHTML = "Time difference in hours:";
    document.getElementById("m_text").innerHTML = "Time difference in minutes:";
    totalHours = 0;
    totalMinutes = 0;
}

function calculateBill() {
    let hourlyRate = parseFloat(document.getElementById("b_hour").value);
    let discount = parseFloat(document.getElementById("b_dis").value);
    let discountType = document.getElementById("disOpt").value;

    if (isNaN(hourlyRate) || hourlyRate < 0) {
        alert("Please enter a valid hourly rate.");
        return;
    }

    if (isNaN(discount) || discount < 0) {
        alert("Please enter a valid discount.");
        return;
    }

    let totalCost = totalHours * hourlyRate;

    if (discountType === "rupees") {
        totalCost -= discount;
    } else if (discountType === "%") {
        totalCost -= (totalCost * (discount / 100));
    }

    if (totalCost < 0) totalCost = 0;
    document.getElementById("tableHours").value = totalHours + " hrs " + totalMinutes + " mins";
    document.getElementById("amount").value = "₹" + totalCost.toFixed(2);
}

function afterPrint() {
    let enterpriseName = document.getElementById("enterprise").value;
    let farmerName = document.getElementById("farmer").value;
    let timeWorked = document.getElementById("tableHours").value;
    let amount = document.getElementById("amount").value;
    let currentDate = new Date().toLocaleDateString();
    let serialNumber = Math.floor(Math.random() * 1000000);

    document.getElementById("company_name_final").innerHTML = enterpriseName;
    document.getElementById("serialNO_final").innerHTML = "Serial No: " + serialNumber;
    document.getElementById("date_final").innerHTML = "Date: " + currentDate;
    document.getElementById("f_name").innerHTML = farmerName;
    document.getElementById("f_time").innerHTML = timeWorked;
    document.getElementById("f_amt").innerHTML = amount;

    document.getElementById("printContainer").classList.remove("hidden");
}

function downloadPDF() {
    const printContainer = document.getElementById('printContainer');

    const options = {
        margin: 1,
        filename: 'bill.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(printContainer).set(options).save();
}
