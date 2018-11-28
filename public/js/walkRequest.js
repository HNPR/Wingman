$(document).ready(function () {
    // Initiate date/time picker
    $("#datetimePicker").calendar();
    
    // Add autocomplete for map address provided by Google Maps API
    function init() {
        const input1 = document.getElementById('startLocationTextField');
        const input2 = document.getElementById('endLocationTextField');
        var autocomplete1 = new google.maps.places.Autocomplete(input1);
        var autocomplete2 = new google.maps.places.Autocomplete(input2);
    }

    google.maps.event.addDomListener(window, 'load', init);

    // Using JS-Cookie to get the userID cookie
    const userID = Cookies.get('userID');

    $(document).on("click", ".walkSubmit", handleWalkFormSubmit);

    function handleWalkFormSubmit(event) {
        event.preventDefault();
        const startLoc = $("#startLocationTextField").val().trim();
        const endLoc = $("#endLocationTextField").val().trim();
        const startTime = $("#startTimeTextField").val().trim();
        if (!startLoc || !endLoc || !startTime) {
            // If there's an empty field, alert user to fill in all fields
            alert("Please fill out all fields!");
            return;
        } else {
            startTime =  moment(startTime, 'MMMM Do, YYYY h:mm a').format("YYYY-MM-DD HH:mm:ss");
            console.log(startLoc, endLoc, startTime);
            // postReqWalk({
            //     requesterID: userID,
            //     startLocation: startLoc,
            //     endLocation: endLoc,
            //     startTime: startTime,
            //     completed: false,
            //     volunteerID: ""
            // })
        }


    }

    // Requested Walk Data
    let reqWalkData = {

    };

    // Function to get a single user profile
    function postReqWalk(reqWalkData) {
        $.get("/api/users/" + userID, (userData) => {
            console.log(userData);
            $(".userFullName").html(userData.fullname);
            $(".userAge").html(userData.age);
            $(".userEmail").html(userData.emailAddress);
            $(".userGender").html(userData.gender);
            $(".profilePhoto img").attr("src", userData.profilePhoto);
        });
    }

});