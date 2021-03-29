// FETCH DATA LANGTITUDE AND LONGTITUDE BY CITY NAME
const keyCity = "V-BB2svJ4ytDS3QeWyRHQh0uhMEnFOHl4Jz3qGBwgHg";

var citySearch = document.getElementById("search-button");
//let city = "jakarta";

let spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 3000);
}

const getDataCity = () => {
  fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=${citySearch.value}&apikey=${keyCity}`,
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
      // console.log("latitude longtitude", { latitude, longtitude });

      document.getElementById("latitude").textContent = latitude;
      document.getElementById("longtitude").textContent = longtitude;
    })
    .catch(function (err) {
      console.log("something went wrong", err);
    });
};
//getDataCity();

// FETCH DATA Tours API
const key = `5VbVSUmmfVxRiDdYJnldwaYpIhUDwnvM`;
const secret = `rOXpHRN1R8rYzJYq`;

const getDataTour = async () => {
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
      // console.log("data", data);
      //Ambil data di element penyimpan
      const latitude = document.getElementById("latitude").textContent;
      const longtitude = document.getElementById("longtitude").textContent;
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
      // console.log("datas", data.data);
      let listContainer = document.getElementById("list-container");
      // console.log("listContainer", listContainer);

      // Show title
      let listTitle = document.getElementById("list-title");
      // console.log("listtitle", listTitle);
      let titleContainer = document.createElement("div");
      // console.log("titlecontainer", titleContainer);
      titleContainer.innerHTML = `
      <h3 id="srcResult">Destinations in <i id="cityResult"> ${citySearch.value} </i></h3>
      `;
      listTitle.appendChild(titleContainer);

      // Show all data
      data.data.forEach((el, index) => {
        let tourContainer = document.createElement("div");
        // console.log("tourContainer", tourContainer);

        tourContainer.className = "col";
        tourContainer.innerHTML = `
            <div class="card h-100 toFormButton" style="width: 20rem"
            data-bs-toggle="modal"
            data-bs-target="#destModal">
                <img src=${el.pictures} class="card-img-top" alt="picture" />
                <div class="card-body">
                <h5 id="card-title" class="card-title">${el.name}</h5>
                <p class="card-text">
                    <b>${el.price.amount}</b> ${el.price.currencyCode}
                </p>
                <hr />
                <p><i class="fas fa-star fa-lg"></i> <b>${el.rating}</b></p>
                <a
                    href="#"
                    class="btn-card toFormButton"
                    data-bs-toggle="modal"
                    data-bs-target="#destModal"
                    >Go !</a
                >
                </div>
            </div>`;
        listContainer.appendChild(tourContainer);

        let formButton = document.getElementsByClassName("toFormButton")[index];
        // console.log("formButton", formButton);
        formButton.addEventListener("click", function () {
          localStorage.setItem("tourDataName", JSON.stringify(el.name));
          localStorage.setItem(
            "tourDataDescription",
            JSON.stringify(el.shortDescription)
          );
          localStorage.setItem(
            "tourDataDescription",
            JSON.stringify(el.shortDescription)
          );
          localStorage.setItem("tourDataPicture", JSON.stringify(el.pictures));
          localStorage.setItem(
            "tourDataPrice",
            JSON.stringify(el.price.amount)
          );
          localStorage.setItem(
            "tourDataCurrency",
            JSON.stringify(el.price.currencyCode)
          );
          localStorage.setItem("tourDataRating", JSON.stringify(el.rating));
          localStorage.setItem("tourDataType", JSON.stringify(el.type));
          localStorage.setItem(
            "tourLinkBooking",
            JSON.stringify(el.bookingLink)
          );

          let detailName = JSON.parse(localStorage.getItem("tourDataName"));
          let detailDescription = JSON.parse(
            localStorage.getItem("tourDataDescription")
          );
          let detailPicture = JSON.parse(
            localStorage.getItem("tourDataPicture")
          );
          let detailPrice = JSON.parse(localStorage.getItem("tourDataPrice"));
          let detailCurrency = JSON.parse(
            localStorage.getItem("tourDataCurrency")
          );
          let detailRating = JSON.parse(localStorage.getItem("tourDataRating"));
          let detailType = JSON.parse(localStorage.getItem("tourDataType"));
          let detailBooking = JSON.parse(
            localStorage.getItem("tourLinkBooking")
          );
          // console.log("el", detailPicture);

          document.getElementById("modalTitle2").innerHTML = detailName;

          document.getElementById("tourInfo").innerHTML = detailDescription;
          document.getElementById("modalPicture").src = detailPicture;
          document.getElementById("modalPicture2").src = detailPicture;
          document.getElementById("modalPicture3").src = detailPicture;
          document.getElementById("modalPrice").innerHTML = detailPrice;
          document.getElementById("modalCurrency").innerHTML = detailCurrency;
          document.getElementById("modalRating").innerHTML = detailRating;
          // document.getElementById("modalType").innerHTML = detailType;
          document
            .getElementById("modalBooking")
            .addEventListener("click", function () {
              return window.open(detailBooking, "_blank");
            });
        });
      });
    })
    .catch(function (err) {
      // alert("Location Not Found");
      Swal.fire(
        "Location Not Found!",
        "Location unavailable or check your spelling.",
        "error"
      ).then(() => {
        location.reload();
      });
      
    });
};

const validate = () => {
  if(document.getElementById("search-button").value === "")
  {
    Swal.fire(
      "Search bar empty!",
      "Your search bar is empty.",
      "error"
    ).then(() => {
      location.reload();
    });
  }
  else
  {
    getDataCity();
    getDataTour();
    showSpinner();
  }
}

document.getElementById("search").addEventListener("click", function () {
  validate();
  document.getElementById("search").hidden = true;
});

document.getElementById("search-button").addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      validate();
      document.getElementById("search").hidden = true;
      document.getElementById("search-button").disabled = true;
    }
 });
