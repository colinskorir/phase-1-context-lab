// Creates a single employee record from an array of data
function createEmployeeRecord(employeeData) {
  return {
      firstName: employeeData[0],   // First element is the first name
      familyName: employeeData[1],  // Second element is the family name
      title: employeeData[2],       // Third element is the job title
      payPerHour: employeeData[3],  // Fourth element is pay rate per hour
      timeInEvents: [],             // Empty array for clock-in times
      timeOutEvents: []             // Empty array for clock-out times
  };
}

// Turns an array of arrays into an array of employee records
function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(data => createEmployeeRecord(data)); // Maps each array to a record
}

// Adds a "TimeIn" event to the current employee's record using 'this'
function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" "); // Splits "YYYY-MM-DD HHMM" into date and hour
  this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),  // Converts hour to integer (e.g., "800" to 800)
      date: date
  });
  return this;
}

// Adds a "TimeOut" event to the current employee's record using 'this'
function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" "); // Splits "YYYY-MM-DD HHMM" into date and hour
  this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10), // Converts hour to integer (e.g., "1800" to 1800)
      date: date
  });
  return this;
}

// Calculates hours worked on a specific date
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(event => event.date === date);
  const timeOut = this.timeOutEvents.find(event => event.date === date);
  if (!timeIn || !timeOut) return 0;
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculates wages earned on a specific date
function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// Provided function: Calculates total wages for all dates for this employee
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(event => event.date);
  return eligibleDates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
};

// Finds an employee by first name in an array of records
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

// Calculates total payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => total + allWagesFor.call(employee), 0);
}