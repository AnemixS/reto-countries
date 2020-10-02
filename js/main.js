const getCountries = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("GET", "https://restcountries.eu/rest/v2/all", true);
  xhttp.send();
};

const getCountriesAll = () => {
  $.ajax({
    method: "GET",
    url: "https://restcountries.eu/rest/v2/all",
    success: (response) => {
      $("#list-countries").empty();
      for (const key in response) {
        $("#list-countries").append(`<div class="col-md-3 col-12 mb-5">
        <div class="card" data-country="${response[key].alpha3Code}" onclick="details(event)" data-toggle="modal" data-target="#detailsModal">
          <div class="flag"><img src="${response[key].flag}" class="card-img-top" alt="Ilustración del Pais"></div>
          <div class="card-body">
            <h5 class="card-title">${response[key].name}</h5>
            <p class="card-text mb-0"><span>Population: </span><span>${response[key].population}</span></p>
            <p class="card-text mb-0"><span>Region: </span><span>${response[key].region}</span></p>
            <p class="card-text mb-0"><span>Capital: </span><span>${response[key].capital}</span></p>
          </div>
        </div>
      </div>`);
      }
    },
  });
};

getCountriesAll();

const filterRegion = (region) => {
  region = $("#selectRegion").val();
  if (region != "all") {
    let urlRegion = "https://restcountries.eu/rest/v2/region/";
    urlRegion = urlRegion.concat(region);
    $.ajax({
      method: "GET",
      url: urlRegion,
      success: (response) => {
        $("#list-countries").empty();
        for (const key in response) {
          $("#list-countries").append(`<div class="col-md-3 col-12 mb-5">
          <div class="card" onclick="details(event)" data-country="${response[key].alpha3Code}" data-toggle="modal" data-target="#detailsModal">
            <div class="flag"><img src="${response[key].flag}" class="card-img-top" alt="Ilustración del Pais"></div>
            <div class="card-body">
              <h5 class="card-title">${response[key].name}</h5>
              <p class="card-text mb-0"><span>Population: </span><span>${response[key].population}</span></p>
              <p class="card-text mb-0"><span>Region: </span><span>${response[key].region}</span></p>
              <p class="card-text mb-0"><span>Capital: </span><span>${response[key].capital}</span></p>
            </div>
          </div>
        </div>`);
        }
      },
    });
  } else {
    getCountriesAll();
  }
};

const filterName = () => {
  let nameCountry = $("#search").val();
  let urlName = "https://restcountries.eu/rest/v2/name/";
  urlName = urlName.concat(nameCountry);
  $.ajax({
    method: "GET",
    url: urlName,
    success: (response) => {
      $("#list-countries").empty();
      for (const key in response) {
        $("#list-countries").append(`<div class="col-md-3 col-12 mb-5">
          <div class="card" onclick="details(event)" data-country="${response[key].alpha3Code}" data-toggle="modal" data-target="#detailsModal">
            <div class="flag"><img src="${response[key].flag}" class="card-img-top" alt="Ilustración del Pais"></div>
            <div class="card-body">
              <h5 class="card-title">${response[key].name}</h5>
              <p class="card-text mb-0"><span>Population: </span><span>${response[key].population}</span></p>
              <p class="card-text mb-0"><span>Region: </span><span>${response[key].region}</span></p>
              <p class="card-text mb-0"><span>Capital: </span><span>${response[key].capital}</span></p>
            </div>
          </div>
        </div>`);
      }
    },
  });
};

const details = (event) => {
  let dataCountry = $(event.currentTarget).data("country");
  let urlCountry = "https://restcountries.eu/rest/v2/alpha/";
  urlCountry = urlCountry.concat(dataCountry);
  $.ajax({
    method: "GET",
    url: urlCountry,
    success: (response) => {
      let currencies = response.currencies
      let listCurrencies = currencies.map((type) => type.name);
      let stringCurrencies = listCurrencies.join(", ");

      let languages = response.languages
      let listlanguages = languages.map((name) => name.name);
      let stringLanguages = listlanguages.join(", ");

      $(".modal-body").empty();
      $(".modal-body").append(`<div class="row">
      <div class="col-md-6 col-12">
        <div class="flag"><img src="${response.flag}" class="card-img-top" alt="Ilustración del Pais"></div>
      </div>
      <div class="col-md-6 col-12">
        <div class="row">
          <div class="col-md-6 col-12">
            <h5 class="title"></h5>
            <p class="mb-0"><span>Native Name: </span><span>${response.nativeName}</span></p>
            <p class="mb-0"><span>Population: </span><span>${response.population}</span></p>
            <p class="mb-0"><span>Region: </span><span>${response.region}</span></p>
            <p class="mb-0"><span>Sub Region: </span><span>${response.subregion}</span></p>
            <p class="mb-0"><span>Capital: </span><span>${response.capital}</span></p>
          </div>
          <div class="col-md-6 col-12">
            <p class="mb-0"><span>Top Level Domian: </span><span>${response.topLevelDomain}</span></p>
            <p class="mb-0"><span>Currencies: </span><span>${stringCurrencies}</span></p>
            <p class="mb-0"><span>Languages: </span><span>${stringLanguages}</span></p>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12">
            <div id="buttonsBorders" class="d-flex align-items-center">
              <span>Border Countries:</span>
            </div>
          </div>
        </div>
      </div>
    </div>`)
    let borders = response.borders
      borders.forEach((border) => {
        console.log(border)
        buttons = $("#buttonsBorders").append(`<button type="button" class="btn btn-secondary ml-2" data-country="${border}" onclick="details(event)">${border}</button>`)
      });
    }
  });
};