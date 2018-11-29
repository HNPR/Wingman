$(document).ready(function () {
    
    var walkList = $("tbody");
    var walkContainer = $("walkContainer");
    var volunteerWalk = $("volunteerwalk")
    
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

    
    
    
      // Invoke function to get user profile data
      getUserProfile(userID);

    
   
   
   
   
   
   
      //SECTION TO SHOW REQUESTED WALKS 
    
    
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
        volunteerWalk.children(".alert").remove();
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





    
    
    
    // SECTION FOR SHOWING WALKS VOLUNTEERED FOR
    
    
    
    
    
    function renderVolWalkList(rows) {
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

    function addWalkRow(volWalksData) {
        var newTr = $("<tr>");
        newTr.data("walk", volWalksData);
        newTr.append("<td>" + volWalksData.startLocation + "</td>");
        newTr.append("<td>" + volWalksData.endLocation + "</td>");
        newTr.append("<td>" + volWalksData.startTime + "</td>");
        newTr.append("<td>" + volWalksData.completed + "</td>");
        console.log(newTr);
        return newTr; 
        
    }
    // Function to get current user's volunteered walks
    function getUserVolWalks(volID) {
        $.get("/api/walks/vol/" + volID, (volWalksData) => {
            console.log(volWalksData);
            // TODO: Add rows of data from volWalksData to profile page
            var rowsToAdd =[];
            for (var i = 0; i < volWalksData.length; i++){
                rowsToAdd.push(addWalkRow(volWalksData[i]));
            }
            renderVolWalkList(rowsToAdd);
        });
    }

    getUserVolWalks(userID);
});