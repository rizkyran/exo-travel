// FETCH DATA LANGTITUDE AND LONGTITUDE BY CITY NAME
const keyCity = 'V-BB2svJ4ytDS3QeWyRHQh0uhMEnFOHl4Jz3qGBwgHg';

//let searchCity = document.getElementById('searchCity').textContent;
let city = 'Bali Indonesia';

const getDataCity = () =>{
    fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${city}&apikey=${keyCity}`, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    })
    .then(function (cityRespon){
        return cityRespon.json();
    })
    .then(function(cityInfo){
        //console.log(data.items[0].position.lat);
        //console.log(data.items[0].position.lng);
        
        const latitude = String(cityInfo.items[0].position.lat);
        const longtitude = String(cityInfo.items[0].position.lng);
        
        document.getElementById('latitude').textContent = latitude;
        document.getElementById('longtitude').textContent = longtitude;

    })
    .catch(function(err){
        console.log('something went wrong',err);
    })
};
getDataCity();

// FETCH DATA Tours API 
const key = `O50vAqEGxXdd2r0xqzATPdF2mcTQZMEE`;
const secret = `pEr3mCeqrm9cQR8S`;

const getDataTours = () => {
fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
method: 'POST',
body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(function (resp) {

    // Return the response as JSON
    return resp.json();

}).then(function (data) {

    // Log the API data
    //console.log(data);
    //Ambil data di element penyimpan
    const latitude = document.getElementById('latitude').textContent;
    const longtitude = document.getElementById('longtitude').textContent;
    //Fetch API Tours
    return fetch(`https://test.api.amadeus.com/v1/shopping/activities?latitude=${latitude}&longitude=${longtitude}&radius=20`, {
    headers: {
        'Authorization': data.token_type + ' ' + data.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    });
})
.then(function (resp) {

// Return the API response as JSON
return resp.json();

}).then(function (data) {

// Log the tours & activity data
console.log(data['data']);

// Ambil data dengan menggunakan data['data']
// code here ...

}).catch(function (err) {

    // Log any errors
    console.log('something went wrong', err);

});
}; 



console.log(getDataTours())