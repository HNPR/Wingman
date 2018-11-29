$(document).ready(function () {
    
    var walkList = $("tbody");
    var walkContainer = $("walkContainer");
    
    // Using JS-Cookie to get the userID cookie
    const userID = Cookies.get('userID');

    // Function to get a single user profile
    function getUserProfile(userID) {
        $.get("/api/users/" + userID, (userData) => {
            console.log(userData);
            $(".userFullName").html(userData.fullname);
            $(".userAge").html(userData.age);
            $(".userEmail").html(userData.emailAddress);
            $(".userGender").html(userData.gender);
            $(".profilePhoto img").attr("src", userData.profilePhoto);
        });
    }

    function addWalkRow(reqWalksData) {
        var newTr = $("<tr>");
        newTr.data("walk", reqWalksData);
        newTr.append("<td>" + reqWalksData.startLocation + "</td>");
        newTr.append("<td>" + reqWalksData.endLocation + "</td>");
        newTr.append("<td>" + reqWalksData.startTime + "</td>");
        newTr.append("<td>" + reqWalksData.completed + "</td>");
        console.log(newTr);
        return newTr; 
        
    }
    
    
    
    // Invoke function to get user profile data
    getUserProfile(userID);

    // Function to get current user's requested walks
    function getUserReqWalks(reqID) {
        $.get("/api/walks/" + reqID, (reqWalksData) => {
            console.log(reqWalksData);
            // TODO: Add rows of data from reqWalksData to profile page
            var rowsToAdd =[];
            for (var i = 0; i < reqWalksData.length; i++){
                rowsToAdd.push(addWalkRow(reqWalksData[i]));
            }
            renderWalkList(rowsToAdd);

        });
    }
    // Function that renders walks to table on profile
    function renderWalkList(rows) {
        walkList.children().not(":last").remove();
        walkContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            walkList.prepend(rows);
        }
        else{
            renderEmpty();
        }


    }

    // Inserting function here to populate a volunteer table

    getUserReqWalks(userID);

    // Function to get current user's volunteered walks
    function getUserVolWalks(volID) {
        $.get("/api/walks/vol/" + volID, (volWalksData) => {
            console.log(volWalksData);
            // TODO: Add rows of data from volWalksData to profile page
        });
    }

    getUserVolWalks(userID);
});