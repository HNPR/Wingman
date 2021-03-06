$(document).ready(function () {
    // Targeted elements on HTML
    var walkContainer = $(".walkContainer");
    var walkList = $("#reqWalksTable");
    var volunteerWalk = $(".volunteerWalk");
    var volList = $("#reqVolunteerTable");

    // Using JS-Cookie to get the userID cookie
    const userID = Cookies.get('userID');

    // Click handlers for buttons
    $(document).on("click", ".markComplete-button", handleMarkComplete);
    $(document).on("click", ".deleteRequest-button", handleDeleteRequest);
    $(document).on("click", ".unvolunteer-button", handleUnvolunteer);

    // Invoke function to get user profile data
    getUserProfile(userID);

    // Function to get a single user profile
    function getUserProfile(userID) {
        $.get("/api/users/" + userID, (userData) => {
            $(".userFullName").html(userData.fullname);
            $(".userAge").html(userData.age);
            $(".userEmail").html(userData.emailAddress);
            $(".userGender").html(userData.gender);
            $(".profilePhoto img").attr("src", userData.profilePhoto + "0");
        });
    }

    // SECTION TO SHOW REQUESTED WALKS 

    getUserReqWalks(userID);

    // Function to get current user's requested walks
    function getUserReqWalks(reqID) {
        $.get("/api/walks/" + reqID, (reqWalksData) => {
            // Add rows of data from reqWalksData to profile page
            var rowsToAdd = [];
            for (var i = 0; i < reqWalksData.length; i++) {
                rowsToAdd.push(addWalkRow(reqWalksData[i]));
            }
            renderWalkList(rowsToAdd);
        });
    }

    function addWalkRow(reqWalksData) {
        // Setting up data to populate a row into requested walks table
        const formattedTime = moment(
            reqWalksData.startTime,
            "YYYY-MM-DD HH:mm:ss"
        ).format("MM-DD-YYYY [at] h:mm a");
        let volunteerName = "N/A";
        let emailMailto = "N/A";
        // If a volunteer exists for this requested walk, then include the volunteer name and a Mailto link
        if (reqWalksData.volunteer) {
            emailMailto = `<a href="mailto:${reqWalksData.volunteer.emailAddress}?Subject=Thanks for being a Wingman&Body=Thanks for being a Wingman for my walk on ${formattedTime} at ${reqWalksData.startLocation}!" target="_top">Say Hi!</a>`;
            volunteerName = reqWalksData.volunteer.fullname;
        }
        const walkCompleted = reqWalksData.completed ? "Completed" : "<button class='ui button markComplete-button'><i class='check icon'></i></button>";
        const walkClass = reqWalksData.completed ? "walkComplete" : "walkIncomplete";

        var newTr = $("<tr>");
        newTr.data("walk", reqWalksData);
        newTr.append("<td>" + volunteerName + "</td>");
        newTr.append("<td>" + emailMailto + "</td>");
        newTr.append("<td>" + reqWalksData.startLocation + "</td>");
        newTr.append("<td>" + reqWalksData.endLocation + "</td>");
        newTr.append("<td>" + formattedTime + "</td>");
        newTr.append("<td>" + walkCompleted + "</td>");
        newTr.append(`<td><button class='ui button deleteRequest-button'>X</button></td>`);
        newTr.attr("class", walkClass);
        return newTr;
    }

    // Function that renders walks to table on profile
    function renderWalkList(rows) {
        walkList.children().not(":last").remove();
        walkContainer.children(".alert").remove();
        if (rows.length) {
            walkList.prepend(rows);
        } else {
            renderEmpty(walkContainer, "have been requested");
        }
    }

    // Function for rendering empty rows
    function renderEmpty(container, insertText) {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text(
            `There are currently no walks that ${insertText}.`
        );
        container.append(alertDiv);
    }

    // Handling the Mark Complete button
    function handleMarkComplete(event) {
        event.preventDefault();
        let requestItemData = $(this).parent("td").parent("tr").data("walk");
        let walkID = requestItemData.id;
        $.ajax({
            method: "PUT",
            url: "/api/walks/" + walkID,
            data: {
                completed: true
            }
        }).then(() => {
            // Change from Mark Complete button to Completed
            $(this).parent("td").html("Completed");
        });
    }

    // Handling the Delete Request button
    function handleDeleteRequest(event) {
        event.preventDefault();
        let requestItemData = $(this).parent("td").parent("tr").data("walk");
        let rowData = $(this).parent("td").parent("tr");
        let walkID = requestItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/walks/" + walkID
            // data: {
            //     completed: true
            // }
        }).then(() => {
            // Delete row
            rowData.remove();
        });
    }

    // SECTION FOR SHOWING WALKS VOLUNTEERED FOR

    getUserVolWalks(userID);

    // Function to get current user's volunteered walks
    function getUserVolWalks(volID) {
        $.get("/api/walks/vol/" + volID, (volWalksData) => {
            // Add rows of data from volWalksData to profile page
            var rowsToAdd = [];
            for (var i = 0; i < volWalksData.length; i++) {
                rowsToAdd.push(addVolWalkRow(volWalksData[i]));
            }
            renderVolWalkList(rowsToAdd);
        });
    }

    function renderVolWalkList(rows) {
        volList.children().not(":last").remove();
        volunteerWalk.children(".alert").remove();
        if (rows.length) {
            volList.prepend(rows);
        } else {
            renderEmpty(volunteerWalk, "you have volunteered for");
        }
    }

    function addVolWalkRow(volWalksData) {
        // Setting up data to populate a row into volunteered-for walks table
        const formattedTime = moment(
            volWalksData.startTime,
            "YYYY-MM-DD HH:mm:ss"
        ).format("MM-DD-YYYY [at] h:mm a");
        const requesterName = volWalksData.requester.fullname;
        const emailMailto = `<a href="mailto:${volWalksData.requester.emailAddress}?Subject=You've got a Wingman&Body=You've got a Wingman for your walk on ${formattedTime} at ${volWalksData.startLocation}!" target="_top">Say Hi!</a>`;
        const walkCompleted = volWalksData.completed ? "Yes" : "No";
        const walkClass = volWalksData.completed ? "walkComplete" : "walkIncomplete";

        var newTr = $("<tr>");
        newTr.data("walk", volWalksData);
        newTr.append("<td>" + requesterName + "</td>");
        newTr.append("<td>" + emailMailto + "</td>");
        newTr.append("<td>" + volWalksData.startLocation + "</td>");
        newTr.append("<td>" + volWalksData.endLocation + "</td>");
        newTr.append("<td>" + formattedTime + "</td>");
        newTr.append("<td>" + walkCompleted + "</td>");
        newTr.append(
            "<td><button class='ui button unvolunteer-button'>X</button></td>"
        );
        newTr.attr("class", walkClass);
        return newTr;
    }



  // Nav dropdown toggle
  $('.ui.dropdown')
  .dropdown();
    // Handling the Unvolunteer button
    function handleUnvolunteer(event) {
        event.preventDefault();
        let requestItemData = $(this).parent("td").parent("tr").data("walk");
        let rowData = $(this).parent("td").parent("tr");
        let walkID = requestItemData.id;
        $.ajax({
            method: "PUT",
            url: "/api/walks/" + walkID,
            data: {
                volunteerID: null
            }
        }).then(() => {
            rowData.remove();
        });
    }

});
