$(document).ready(function() {
// Getting references 
// to the walker name input
let walkerName = $(".requesterName");
// the walk start location
let startLocation = $(".startLocation");
// the walk end location
let endLocation = $(".endLocation");
// the walk start time
let startTime = $(".startTime");

// Adding event listener to the form to volunteer for a walk
$(document).on("click", ".volunteer-button", handleVolunteer);

// Get initial list of requested walks from database
getRequestedWalks();

// Function for retrieving requested walks and getting them ready to render to the page
function getRequestedWalks() {
    $.get("/api/walks", function(data) {
        let rowsToAdd = [];
        for (let i=0; i<data.length; i++) {
            rowsToAdd.push(createRequestRow(data[i]));
        }
        renderRequestList(rowsToAdd);
    })
}

// Function for creating a new row for a request
function createRequestRow(requestData) {
    let newRow = $("<tr>");
    newRow.data("walk", requestData);
    newRow.append("<td>" + requestData.fullname + "</td>");
    newRow.append("<td>" + requestData.startLocation + "</td>");
    newRow.append("<td>" + requestData.endLocation + "</td>");
    newRow.append("<td>" + requestData.startTime + "</td>");
    newRow.append("<td><button class='ui button volunteer-button'>Volunteer</button></td>");
    return newRow;
}

// A function to handle what happens when the volunteer button is selected
function handleVolunteer(event) {
    event.preventDefault();


}

});