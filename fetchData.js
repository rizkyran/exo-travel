// FETCH DATA LANGTITUDE AND LONGTITUDE BY CITY NAME
const keyCity = "V-BB2svJ4ytDS3QeWyRHQh0uhMEnFOHl4Jz3qGBwgHg";

//let searchCity = document.getElementById('searchCity').textContent;
let city = "jakarta";

const getDataCity = () => {
  fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=${city}&apikey=${keyCity}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
    .then(function (cityRespon) {
      return cityRespon.json();
    })
    .then(function (cityInfo) {
      //console.log(data.items[0].position.lat);
      //console.log(data.items[0].position.lng);

      const latitude = String(cityInfo.items[0].position.lat);
      const longtitude = String(cityInfo.items[0].position.lng);

      document.getElementById("latitude").textContent = latitude;
      document.getElementById("longtitude").textContent = longtitude;
    })
    .catch(function (err) {
      console.log("something went wrong", err);
    });
};
getDataCity();

// FETCH DATA Tours API
const key = `5VbVSUmmfVxRiDdYJnldwaYpIhUDwnvM`;
const secret = `rOXpHRN1R8rYzJYq`;

const searchButton = document.getElementById("search-button");

const getDataTours = () => {
  fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    body:
      "grant_type=client_credentials&client_id=" +
      key +
      "&client_secret=" +
      secret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (resp) {
      // Return the response as JSON
      return resp.json();
    })
    .then(function (data) {
      // Log the API data
      //console.log(data);
      //Ambil data di element penyimpanl
      localStorage.setItem("data", JSON.stringify(data));

      const latitude = document.getElementById("latitude").textContent;
      const longtitude = document.getElementById("longtitude").textContent;
      //Fetch API Tours
      return fetch(
        `https://test.api.amadeus.com/v1/shopping/activities?latitude=${latitude}&longitude=${longtitude}&radius=20`,
        {
          headers: {
            Authorization: data.token_type + " " + data.access_token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    })
    .then(function (resp) {
      // Return the API response as JSON
      return resp.json();
    })
    .then(function (data) {
      // Log the tours & activity data
      console.log(data["data"]);
      // Ambil data dengan menggunakan data['data']
      // code here ...
      let html = "";
      data.data.forEach((item) => {
        html += `
        <div>
          <div data-id =${item.id}>
            <img src=${item.pictures} alt="tour" />
          </div>
          <div>
            <h1>${item.name}</h1>
            <a href = "#" class = "tour-button">Get Detail</a>
          </div>
        </div>
        
      `;
      });
      tourList.innerHTML = html;
    })
    .catch(function (err) {
      // Log any errors
      console.log("something went wrong", err);
    });
};
console.log(getDataTours());
searchButton.addEventListener("click", getDataTours);

const dataLocal = JSON.parse(localStorage.getItem("data"));
console.log("datalocal", dataLocal);
// get detail of the tour
const tourList = document.getElementById("paket-tour");
const getTourDetail = (e) => {
  e.preventDefault();
  console.log("coba test", e.target);
  if (e.target.classList.contains("tour-button")) {
    // console.log(tourItem);
    fetch(
      `https://test.api.amadeus.com/v1/shopping/activities/${dataLocal.id}`,
      {
        headers: {
          Authorization: dataLocal.token_type + " " + dataLocal.access_token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
};
tourList.addEventListener("click", getTourDetail);

// Create Modal
