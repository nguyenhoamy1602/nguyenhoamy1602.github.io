/*------------------------------------------
 Contact form
 ------------------------------------------*/
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
function initMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Matt Allen', -37.832951, 145.056138],
        ['John Charls', -37.829720, 145.052891],
        ['Paul bev', -37.827150, 145.121403],
        ['Alicia Nguyen', -37.830917, 145.115756],

    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
            '<h3>London Eye</h3>' +
            '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' + '</div>'],
        ['<div class="info_content">' +
            '<h3>Palace of Westminster</h3>' +
            '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
            '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map  
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window    
        /*google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));*/

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });

}
$(document).ready(function () {
    var googleLoaded = false;
    $('.sr-button').click(function () {
        $("#hidden").show(1000);
    });
    $("#signup").click(function (e) {
        $("#signup").button('loading');
        setTimeout(function () {
            window.location.href = "uprofile.html";
        }, 1000)

    })
    $("#search").click(function (e) {
        var typeList = [".Assessor", ".Employer", ".Employee"];
        var type = "." + $('#sel1').find(":selected").text();
        $("#search-result").show();
        $(typeList.toString()).show();
        if (type != ".All") {
            typeList = typeList.remove(type);
            $(typeList.toString()).hide();
        }
        if (!googleLoaded) {
            // Asynchronously Load the map API 
            var script = document.createElement('script');
            script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyDoe-KLzdgOl0CT2w24lXDR6y_BnzgzbJQ&callback=initMap";
            document.body.appendChild(script);
            googleLoaded = true;
        }


        $('html, body').stop().animate({
            scrollTop: ($("#search-result").offset().top)
        }, 1250, 'easeInOutExpo');
        e.preventDefault();

    })

    $(".send-message").click(
        function (e) {
            $(".badge").show();
        })



});


