var searchedPositions = [{ formatted: '', lat: 1, lng: 1 }];
export const LOC_API_KEY = 'AIzaSyCdP6PdiSpHc1Ld8fuwHLzvk2-kLSx6hWc';

export default {
    getUserPosition,
    getAddressPosition, 
    getFormattedAddress
}


// TODO: try making this file async await
// post todo conclusion: https://github.com/googleapis/google-api-nodejs-client/issues/523 No support for it
function getUserPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getFormattedAddress(lat, lng) {
    // need to import google. somehow
    return;
    // This is making the Geocode request
    return new Promise((resolve) => {
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status !== google.maps.GeocoderStatus.OK) {
                alert(status);
            }
            // This is checking to see if the Geoeode Status is OK before proceeding
            if (status === google.maps.GeocoderStatus.OK) {
                var address = (results[0].formatted_address);
            }
            resolve({ lat, lng, address })
        })
    })
}

function getAddressPosition(address) {
    return new Promise((resolve, reject) => {
        new google.maps.Geocoder().geocode({ 'address': address }, (results, status) => {
            if (status == 'OK') {
                const res = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                    formatted: results[0].formatted_address
                };
                resolve(res);
            } else {
                reject('Geocode was not successful for the following reason: ' + status);
            }
        })
    });
}