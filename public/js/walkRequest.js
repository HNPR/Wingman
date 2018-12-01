$(document).ready(function () {

    // Initiate date/time picker
    var today = new Date();
    $("#datetimePicker").calendar({
        minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    });

    // Initialize modal
    $('.ui.modal').modal({
        onApprove: () => {
            window.location.href = "/profile";
        },
        onHide: () => {
            window.location.href = "/profile";
        }
    });

    // Add autocomplete for map address provided by Google Maps API
    function initMap() {
        const input1 = document.getElementById('startLocationTextField');
        const input2 = document.getElementById('endLocationTextField');
        var autocomplete1 = new google.maps.places.Autocomplete(input1);
        var autocomplete2 = new google.maps.places.Autocomplete(input2);

        let map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 30.2859667,
                lng: -97.73606
            },
            zoom: 14,
            disableDefaultUI: true
        });

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);

        var onChangeHandler = function () {
            var place1 = autocomplete1.getPlace() || false;
            var place2 = autocomplete2.getPlace() || false;

            if (place1.geometry && place2.geometry) {
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            } else if (place1.geometry) {
                map.setCenter(place1.geometry.location);
                map.setZoom(17);
            } else if (place2.geometry) {
                map.setCenter(place2.geometry.location);
                map.setZoom(17);
            }
        };
        autocomplete1.addListener('place_changed', onChangeHandler);
        autocomplete2.addListener('place_changed', onChangeHandler);        

    }

    google.maps.event.addDomListener(window, 'load', initMap);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: document.getElementById('startLocationTextField').value,
            destination: document.getElementById('endLocationTextField').value,
            travelMode: 'WALKING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }

    // Using JS-Cookie to get the userID cookie
    const userID = Cookies.get('userID');

    $(document).on("click", ".walkSubmit", handleWalkFormSubmit);

    function handleWalkFormSubmit(event) {
        event.preventDefault();
        let startLoc = $("#startLocationTextField").val().trim();
        let endLoc = $("#endLocationTextField").val().trim();
        let startTime = $("#startTimeTextField").val().trim();
        if (!startLoc || !endLoc || !startTime) {
            // If there's an empty field, alert user to fill in all fields
            alert("Please fill out all fields!");
            return;
        } else {
            startTime = moment(startTime, "MMMM Do, YYYY h:mm a").format("YYYY-MM-DD HH:mm:ss");
            console.log(startLoc, endLoc, startTime);
            postReqWalk({
                requesterID: userID,
                startLocation: startLoc,
                endLocation: endLoc,
                startTime: startTime,
                completed: false
                // volunteerID: ""
            });
        }
    }

    // Function to get a single user profile
    function postReqWalk(reqWalkData) {
        $.post("/api/walks", reqWalkData, (postedWalk) => {
            let formattedTime = moment(postedWalk.startTime, "YYYY-MM-DD HH:mm:ss").format("MMMM Do, YYYY [at] h:mm a");
            $('.modalDescription').html(`Requested a walk from ${postedWalk.startLocation} to ${postedWalk.endLocation} on ${formattedTime}.`);
            $('.ui.modal').modal('show');
        });
    }

});

// Nav dropdown toggle
$('.ui.dropdown')
    .dropdown();