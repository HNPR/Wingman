$(document).ready(function () {
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

    // Function to get current user's requested walks
    function getUserReqWalks(reqID) {
        $.get("/api/walks/" + reqID, (reqWalksData) => {
            console.log(reqWalksData);
            // TODO: Add rows of data from reqWalksData to profile page
            
        });
    }

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