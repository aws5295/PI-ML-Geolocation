/* Suppress jshint errors */
/*global google*/
/*global $*/
/*global OverlappingMarkerSpiderfier*/
var app = {
    defaultZoom: 16,
    initialLocation: {
        lat: 39.9526,
        lng: -75.165222 
    },
    oms: undefined,
    bounds: undefined,
    map : undefined,
    markers: [],
    viewUrl: 'http://localhost:3000/'
};

function drawMap() {

    app.map = new google.maps.Map(document.getElementById('map-area'), {
        zoom: app.defaultZoom,
        center: app.initialLocation
    });

    app.oms = new OverlappingMarkerSpiderfier(app.map, {
        markersWontMove: true,
        markersWontHide: true,
        keepSpiderfied: true,
        basicFormatEvents: true
    });

    app.bounds = new google.maps.LatLngBounds();
}

function resetMap() {
    app.oms.removeAllMarkers();
    app.bounds = new google.maps.LatLngBounds();
    app.markers = [];
}

function addMarker(markerInfo) {
    var description = 'Tag: ' + markerInfo.tag + 
                      '\nValue: ' + markerInfo.value + 
                      '\nTimestamp: ' + markerInfo.timestamp + 
                      '\nComment: ' + markerInfo.comment;

    var location = {
        lat: parseFloat(markerInfo.lat),
        lng: parseFloat(markerInfo.lng)
    };

    var marker = new google.maps.Marker({
        position: location,
        title: description,
        label: markerInfo.pinNumber
    });

    app.oms.addMarker(marker);
    app.bounds.extend(location);
}

function scaleMap() {
    app.map.fitBounds(app.bounds);

    var listener = google.maps.event.addListener(app.map, 'idle', function() {
        app.map.setZoom(app.defaultZoom);
        google.maps.event.removeListener(listener);
    });
}

function expandMarkers() {
    // open all markers
    var markers = app.oms.markersNearAnyOtherMarker();
    
        $.each(markers, function(i, marker) {
            google.maps.event.trigger(markers[i], 'click');
        });
}

var coords = function(str) {
    if (!str) 
    {
        return ['', ''];
    }

    return str.substring(str.indexOf('Geolocation') + 'Geolocation'.length + 2).split(',');
};

function isNumber(n) {
    return !isNaN(parseFloat(n));
}

$(document).ready(function() {
    // Load the map
    drawMap();

    // Load the Tour List
    $.get(app.viewUrl + 'tours', function(data) {
        $('#tour-menu').html(data);
    });

    // Load the Tour Run List
    $('#tour-menu').on('change', '#tour-select', function() {
        $('#tour-run-select').remove();
        
        if ($(this).val() !== 'default') {
            $.get(app.viewUrl + 'tours/' + $(this).val(), function(data) {
                $('#tour-menu').append(data);
            });
        }
    });

    // Update map when Tour run is selected
    $('#tour-menu').on('change', '#tour-run-select', function() {
        var tourRunId = $(this).val();
        $('#tour-tag-count').empty();
        $('#tour-duration').empty();

        if (tourRunId !== 'default') {

            resetMap();
            $.get(app.viewUrl + 'api/tourRuns/' + tourRunId, function(data) {
                
                var pinCode = 'A'.charCodeAt(0);
                // Add markers to Map
                for (var i=0; i<data.length; i++) {
                    var pts = coords(data[i].CommentEnvStamp);
    
                    if (isNumber(pts[0] && pts[1])) {
                        var myMarker = {
                            lat: pts[0],
                            lng: pts[1], 
                            tag: data[i].TagName,
                            value: data[i].Value,
                            comment: data[i].Comment,
                            timestamp: data[i].TimeStamp,
                            pinNumber: String.fromCharCode(pinCode + i)
                        };
    
                        app.markers.push(myMarker);
                    }
                }
    
                if (app.markers.length === 0) {
                    var errHtml = '<h2 class="text-error">No Geolocation data available for this tour run!</h2>';
                    $('#tour-tag-count').html(errHtml);
                } else {
                    $.get(app.viewUrl + 'api/tourRuns/' + tourRunId + '/duration', function(dur) {
    
                        var durHtml = '<h3><u>Tour Run Duration:</u></h3>' +
                                      '<h3>' + dur + '</h3>';
    
                        var tagHtml = '<h3><u>Geolocation Data available for:</u></h3>' +
                                        '<h3>' + app.markers.length + ' of ' + 
                                        data.length + ' tags</h3>';
    
                        $('#tour-duration').html(durHtml);
                        $('#tour-tag-count').html(tagHtml);
    
                        app.markers.map(addMarker);
                        scaleMap();
                        setTimeout(expandMarkers, 800);
                    });
                }
            });
        }
    });
});