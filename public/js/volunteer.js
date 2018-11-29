$(document).ready(function() {
  // Using JS-Cookie to get the userID cookie
  const userID = Cookies.get("userID");

  // Function for retrieving requested walks and getting them ready to render to the page
  function getRequestedWalks(userID) {
    $.get("/api/walks/incomp/" + userID, walkData => {
      console.log(walkData);
      let rowsToAdd = [];
      for (let i = 0; i < walkData.length; i++) {
        rowsToAdd.push(createRequestRow(walkData[i]));
      }
      renderRequestList(rowsToAdd);
    });
  }

  // Getting references
  let requestList = $("tbody");
  let requestContainer = $(".ui.container.grid");

  // Adding event listener to the form to volunteer for a walk
  $(document).on("click", ".volunteer-button", handleVolunteer);

  // Get initial list of requested walks from database
  getRequestedWalks(userID);

  // Function for creating a new row for a request
  function createRequestRow(requestData) {
    // console.log(requestData);
    let formattedTime = moment(
      requestData.startTime,
      "YYYY-MM-DD HH:mm:ss"
    ).format("MM-DD-YYYY [at] h:mm a");
    let newRow = $("<tr>");
    newRow.data("walk", requestData);
    newRow.append("<td>" + requestData.User.fullname + "</td>");
    newRow.append("<td>" + requestData.startLocation + "</td>");
    newRow.append("<td>" + requestData.endLocation + "</td>");
    newRow.append("<td>" + formattedTime + "</td>");
    newRow.append(
      "<td><button class='ui button volunteer-button'>Volunteer</button></td>"
    );
    return newRow;
  }

  // A function to handle what happens when the volunteer button is selected
  function handleVolunteer(event) {
    event.preventDefault();
    let requestItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("walk");
    let rowData = $(this)
      .parent("td")
      .parent("tr");
    let walkID = requestItemData.id;
    $.ajax({
      method: "PUT",
      url: "/api/walks/" + walkID,
      data: { volunteerID: userID }
    }).then(() => {
      $(".ui.modal").modal("show");
    });
  }

  // Function for rendering list of requested walks to the page
  function renderRequestList(rows) {
    requestList
      .children()
      .not(":last")
      .remove();
    requestContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      requestList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no requested walks
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text(
      "There are currently no walks needing volunteers. Please check again later."
    );
    $(".sorryNoWalks").append(alertDiv);
  }

  // Initialize modal
  $(".ui.modal").modal({
    onHide: () => {
      window.location.href = "/profile";
    }
  });
});
