let employees = [];

function addEmployee() {
    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let salary = parseFloat(document.getElementById("salary").value);
    let department = document.getElementById("department").value;

    if (!name || !id || !salary || !department) {
        alert("Please fill all fields");
        return;
    }

    employees.push({ name, id, salary, department });

    alert("Employee Added!");
    clearFields();
}

function displayAll() {
    let output = "";
    employees.forEach(emp => {
        output += `${emp.name} | ${emp.id} | ${emp.salary} | ${emp.department}<br>`;
    });
    document.getElementById("output").innerHTML = output;
}

function salaryAbove() {
    let result = employees.filter(emp => emp.salary > 50000);

    let output = result.map(emp =>
        `${emp.name} | ${emp.salary}`
    ).join("<br>");

    document.getElementById("output").innerHTML = output || "No employees found";
}

function totalSalary() {
    let total = employees.reduce((sum, emp) => sum + emp.salary, 0);
    document.getElementById("output").innerHTML = "Total Salary: " + total;
}

function averageSalary() {
    if (employees.length === 0) return;

    let avg = employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length;
    document.getElementById("output").innerHTML = "Average Salary: " + avg.toFixed(2);
}

function countDepartment() {
    let deptCount = {};

    employees.forEach(emp => {
        deptCount[emp.department] = (deptCount[emp.department] || 0) + 1;
    });

    let output = "";
    for (let dept in deptCount) {
        output += `${dept}: ${deptCount[dept]}<br>`;
    }

    document.getElementById("output").innerHTML = output;
}

function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("department").value = "";
}