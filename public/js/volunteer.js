$(document).ready(function() {
// Getting references 
let requestList = $("tbody");
let requestContainer = $(".ui.container.grid");

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

// Function for rendering list of requested walks to the page
function renderRequestList(rows) {
    requestList.children().not(":last").remove();
    requestContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      requestList.prepend(rows);
    }
    else {
      renderEmpty();
    }
}

 // Function for handling what to render when there are no requested walks
 function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("There are currently no walks needing volunteers. Please check again later.");
    sorryNoWalks.append(alertDiv);
  }

});