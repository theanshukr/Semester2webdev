function calculateResult() {
    let n = parseInt(document.getElementById("subject").value);

    if (isNaN(n) || n <= 0) {
        document.getElementById("result").innerHTML = "Enter valid number of subjects";
        return;
    }

    let total = 0;

    for (let i = 1; i <= n; i++) {
        let marks = parseFloat(prompt("Enter marks for Subject " + i));

        if (isNaN(marks)) {
            alert("Invalid input");
            return;
        }

        total += marks;
    }

    let average = total / n;

    let grade;
    if (average >= 90) grade = "A+";
    else if (average >= 80) grade = "A";
    else if (average >= 70) grade = "B";
    else if (average >= 60) grade = "C";
    else if (average >= 50) grade = "D";
    else if (average >= 40) grade = "E";
    else grade = "F";

    let result = average >= 40 ? "Pass" : "Fail";

    document.getElementById("result").innerHTML =
        "Total Marks: " + total + "<br>" +
        "Average Marks: " + average.toFixed(2) + "<br>" +
        "Grade: " + grade + "<br>" +
        "Result: " + result;
}