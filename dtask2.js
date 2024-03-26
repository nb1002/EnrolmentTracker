/* Filename: dtask2.js
   Target html: dtask2.html
   Purpose : [distinction task]
   Author: [Nomun Buyanbat]
   Date written: [31/5/21]
   Revisions:  [ Nomun B]
*/
//global arrays
var arrEnrolments = [];
var arrCompletions = [];
//adds to output
function addToOutput(outputText) {
    document.getElementById('output').innerHTML += outputText + "</br>";
}
//reset enrolment and call populateEnrolment function
function resetEnrolments() {
    populateEnrolments();
    addToOutput('Enrolment List Filled');
}
//function to push enrolment details into array
function populateEnrolments() {
    arrEnrolments = [];
    var enrolmentDetails = [
        {id:1234567, name: "Jones, Brigit", mark: null, grade: ""},
        {id:1234566, name: "Somers, Tom ", mark: null, grade: ""},
        {id:1222445, name: "Lee, Vera", mark: null, grade: ""},
        {id:1220123, name: "Crawford, Anne", mark: null, grade: ""},
        {id:1244444, name: "Wu, Russel", mark: null, grade: ""},
        {id:1238899, name: "Shaw, Boris", mark: null, grade: ""},
        {id:1237799, name: "Wilson, Terri", mark: null, grade: ""}
    ];
    for(let i=0; i < enrolmentDetails.length; i++) {
        arrEnrolments.push(enrolmentDetails[i]);
    }
}
//function that lists enrolment records in array
function listAllRecords(array) {
    var output = "";
    for(let i =0; i<array.length; i++) {
        output += "<p>" + recordToString(array[i]) + "</p>";
    }
    addToOutput(output);
}
//display enrolment in output 
function listAllEnrols() {
    listAllRecords(arrEnrolments);
}
//display completion in output
function listAllCompletions() {
    listAllRecords(arrCompletions);
}
//formats and returns the enrolment details
function recordToString(record) {
    var recordref = "ID: " + record.id + "&nbsp;&nbsp;&nbsp;&nbsp;Name: " + record.name + "&nbsp;&nbsp;&nbsp;&nbsp; Mark: " + record.mark + "&nbsp;&nbsp;&nbsp;&nbsp;Grade: " + record.grade;
    return recordref;
}
//delete enrolment
function deleteEnrolment() {
    var idStr = document.getElementById('deleteEnrolmentInput').value;
    idStr = idStr.trim(); //trim whitespaces
    var validNum = validateNum(idStr); //validate id

    if (validNum) { //if id is valid
        var id = Number(idStr);
        var index = findRecordInArray(id, arrEnrolments); //find id in array
        if (index == -1) { //if not found
            addToOutput('Student ID does not exist');
        }
        else { //if found
            var student = arrEnrolments[index];
            arrEnrolments.splice(index, 1); //delete record
            addToOutput("Enrolment for student with ID " + student.id + " deleted");
        }
    }
    else { //if id is invalid
        addToOutput('Invalid input');
    }
}
//function to update mark
function updateMark() {
    var idStr = document.getElementById('updateMarkIdInput').value;
    var markStr = document.getElementById('updateMarkNumInput').value;
    idStr = idStr.trim();
    markStr = markStr.trim();

    var validId = validateNum(idStr);
    if (!validId) { //invalid id
        addToOutput('Invalid id');
    }

    var validMark = validateMark(markStr);
    if (!validMark) { //invalid mark
        addToOutput('Invalid mark');
    }

    if (validId && validMark) { //if id and mark is valid
        var idNum = Number(idStr);
        var markNum = Number(markStr);
        var index = findRecordInArray(idNum, arrEnrolments); //find index
        if (index != -1) { //if index is not -1
            var student = arrEnrolments[index]; //assigning var to record in array
            student.mark = markNum; //change student mark to user input
            student.grade = determineGrade(markNum); //determine grade from mark
            moveToCompletions(index); //move updated record to completions array

            addToOutput("Student with ID " + student.id + " had mark updated to " + markNum + ". Resulting grade is " + student.grade);
        }
        else { //index is -1
            addToOutput('Invalid id');
        }
    }
}
//search for id in array
function findRecordInArray(number, array) {
    var value = -1;
    var i = 0; 
    var vFound = false;
    while (i<array.length && !vFound) { //loops until id is found
        if (number == array[i].id) {
            value = i;
            vFound = true;
        }
        i++;    
    }
    return value; //return index
}
//validate id input
function validateNum(id) {
    var validNum = false;
    if (id != "" && !isNaN(id)) {
        validNum = true;
    }
    return validNum;
}
//find id from enrolment 
function findEnrolmentByID() {
    var idStr = document.getElementById('searchEnrolmentsInput').value;
    idStr = idStr.trim(); //trim whitespaces
    var vId = validateNum(idStr);
    if (vId) { //if id valid
        var idNum = Number(idStr); 
        var index = findRecordInArray(idNum, arrEnrolments); 
        if (index != -1) { 
            var student = arrEnrolments[index]; //assign variable to record in the enrolment array
            addToOutput(recordToString(student)); //output student record
        }
        else { //index is -1
            addToOutput("Student record does not exist in this list");
        }
    }
    else { //id is not valid
        addToOutput("invalid input");
    }
}
//find id from completion
function findCompletionByID() {
    var idStr = document.getElementById('searchCompletionsInput').value;
    idStr = idStr.trim();
    var vId = validateNum(idStr);
    if (vId) { //id valid
        var idNum = Number(idStr);
        var index = findRecordInArray(idNum, arrCompletions);
        if (index != -1) { //index is not -1
            var student = arrCompletions[index];
            addToOutput(recordToString(student));
        }
        else { //index is -1
            addToOutput("Student record does not exist in this list");
        }
    }
    else { //id invalid
        addToOutput("invalid input");
    }
}
//function to determine grade based on input
function determineGrade(num) {
    var grade;
    if (num < 50) { //less than 50
        grade = "Fail";
    }
    else { //50 or more
        if (num < 60) { //less than 60
            grade = "Pass";
        }
        else { //60 or more 
            if (num < 70) { //less than 70
                grade = "Credit";
            }
            else { //70 or more
                if (num < 80) { //less than 80
                    grade =  "Distinction";
                }
                else { //80 or more
                    grade = "High Distinction";
                }

            }

        }
    }
    return grade;
}
//validate mark 
function validateMark(mark) {
    var validMark = false;
    var vMark = validateNum(mark);
    if (vMark) { //if mark is valid
        var markNum = Number(mark);
        if (markNum >= 0 && markNum <= 100) { //mark is between 0-100
            validMark = true;
        }
    }
    else { //mark not valid
        validMark = false;
    }
    return validMark;
}
//move to arrCompletions if mark is higher than 50
function moveToCompletions(pos) {
    if (arrEnrolments[pos].mark >= 50) {
        arrCompletions.push(arrEnrolments[pos]); //push record into completions
        arrEnrolments.splice(pos, 1); //remove record from enrolments
    }
}
//find lowest mark in the array
function findLowestMark(array) {
    var lowest = 101; //higher than highest possible mark to allow switching to next value
    for (let i=0; i<array.length; i++) { 
        if (array[i].mark < lowest) { //if mark is lower than lowest it will become new lowest in next line
            lowest = array[i].mark; 
        }
    }
    return lowest;
}
//find highest mark
function findHighestMark(array) {
    var highest = -1; //lower than lowest possible mark to allow switching to next value
    for (let i=0; i<array.length; i++) {
        if (array[i].mark > highest) { //if mark is higher than highest it will become new highest in next line
            highest = array[i].mark;
        }
    }
    return highest;
}
//function to output completion stats
function completionStatistics() {
    var lowestMark = findLowestMark(arrCompletions);
    var highestMark = findHighestMark(arrCompletions);
    if (lowestMark == 101 || highestMark == -1) { 
        addToOutput("No completions");
    }
    else { //mark is acceptable
        addToOutput(" Total completions: " + arrCompletions.length + ". The lowest mark: " + lowestMark  + ". The highest mark: " + highestMark + ".");
    }
}

function resetCompletions() {
    arrCompletions = [];
    addToOutput("Completions list is cleared");
}

function countHDs() {
    var count = 0;
    for (let i =0; i<arrCompletions.length; i++) {
        if (arrCompletions[i].grade == "High Distinction") {
            count += 1;
        }
    }
    addToOutput("Number of students with HDs: " + count);
}
//sort array by name asc
function sortByName(array) { 
    var count, temp;
    do {
        count = 0;
        for (let i=0; i<array.length-1; i++) {
            if (array[i].name > array[i+1].name) {
                temp = array[i];
                array[i] = array[i+1];
                array[i+1] = temp;
                count++;
            }
        }
    } while (count>0);   
    addToOutput("Student records sorted into Name ascending sequence");
}
//sort enrolment by name
function sortEnrolmentsByName() {
    sortByName(arrEnrolments);
}
//sort completion by name
function sortCompletionsByName() { 
    sortByName(arrCompletions);
}
//sort arrcompletions by marks ascending
function sortByMarkLow() { 
    var count, temp;
    do {
        count = 0;
        for (let i=0; i<arrCompletions.length-1; i++) {
            if (arrCompletions[i].mark > arrCompletions[i+1].mark) {
                temp = arrCompletions[i];
                arrCompletions[i] = arrCompletions[i+1];
                arrCompletions[i+1] = temp;
                count++;
            }
        }
    } while (count>0);
    addToOutput("Completions list sorted into Marks ascending sequence");
}
//sort arrcompletions by marks descending
function sortByMarkHigh() {
    var count, temp;
    do {
        count = 0;
        for (let i=0; i<arrCompletions.length-1; i++) {
            if (arrCompletions[i].mark < arrCompletions[i+1].mark) {
                temp = arrCompletions[i];
                arrCompletions[i] = arrCompletions[i+1];
                arrCompletions[i+1] = temp;
                count++;
            }
        }
    } while (count>0);
    addToOutput("Completions list sorted into Marks descending sequence");   
}

function init() {
    document.getElementById('resetEnrolmentsButton').onclick = resetEnrolments;
    document.getElementById('listEnrolmentsButton').onclick = listAllEnrols;
    document.getElementById('deleteEnrolmentButton').onclick = deleteEnrolment;
    document.getElementById('updateMarkButton').onclick = updateMark;
    document.getElementById('listCompletionsButton').onclick = listAllCompletions;
    document.getElementById('searchEnrolmentsButton').onclick = findEnrolmentByID;
    document.getElementById('searchCompletionsButton').onclick = findCompletionByID;
    document.getElementById('completionStatisticsButton').onclick = completionStatistics;
    document.getElementById('removeCompletionsButton').onclick = resetCompletions;
    document.getElementById('countHDsButton').onclick = countHDs;
    document.getElementById('sortCompletionsByNameButton').onclick = sortCompletionsByName;
    document.getElementById('sortEnrolmentsByNameButton').onclick = sortEnrolmentsByName;
    document.getElementById('sortCompletionsByMarksAscButton').onclick = sortByMarkLow;
    document.getElementById('sortCompletionsByMarksDescButton').onclick = sortByMarkHigh;
}
window.onload = init;