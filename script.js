/* FIND DOM ELEMENTER ------------------------------------------------------- */
  /* Find de to dato felter */
  var dateFromField = document.getElementById("date-from");
  var dateToField = document.getElementById("date-to");

  /* Find det element, som skal indeholde listen af biler */
  var carsList = document.getElementById("cars-list");
  
  /* Find den skabelon, vi skal kopiere for hver bil vi vil vise */
  var carTemplate = document.getElementById("car-template");
  
  /* Find vores "Søg"-knap */
  var searchButton = document.getElementById("search-button");


  var todaysDate = new Date().toISOString().split("T")[0];

/* Når scriptet kører sættes værdien af de to datofelter til dags dato, som er et
 * rimeligt udgangspunkt */
  dateFromField.value = todaysDate;
  dateToField.value = todaysDate;
  
  /* DEFINÉR FUNKTIONER ------------------------------------------------------- */

  /* Beregning af længden af lejeperioden ud fra de valgte datoer */
function calculatePeriodInDays() {
  
  var dateFrom = new Date(dateFromField.value);
  var dateTo = new Date(dateToField.value);

  var differenceInMilliseconds = dateTo.getTime() - dateFrom.getTime();

  var millisecondsInADay = 1000 * 60 * 60 * 24;

  var rentalPeriodInDays =
    Math.round(differenceInMilliseconds / millisecondsInADay) + 1;

  return rentalPeriodInDays;
}
/* Beregning af pris */
function calculateRentalPrice(dailySurcharge = 0, rentalPeriodInDays) {
  var baseRentalPrice = 495;
  var dailyRentalPrice = 100;
  var vatRate = 0.25;

  var resultExclVat =
    baseRentalPrice + rentalPeriodInDays * (dailyRentalPrice + dailySurcharge);
  var resultInclVat = resultExclVat * (1 + vatRate);

  return resultInclVat;
}

function formatPrice(number) {

  if (Number.isNaN(number)) {
    return "Ukendt pris";
  } else {
    return number.toLocaleString("da-DK", {
      style: "currency",
      currency: "DKK"
    });
  }
}
 
  function showCar(carObject, rentalPeriodInDays) {

    var carNode = carTemplate.content.cloneNode(true);

    var rentalPrice = calculateRentalPrice(
      carObject.dailySurcharge,
      rentalPeriodInDays
    );
  
    /* Fyld den kopierede skabelon med informationer om den bil, vi vil vise */
    carNode.querySelector("img").src = carObject.imageSrc;
    carNode.querySelector("img").alt = `Billede af ${carObject.name}`;
    carNode.querySelector("h1").innerText = carObject.name;
    carNode.querySelector(".category").innerText = carObject.category;
    carNode.querySelector(".person-count").innerText = carObject.personCount;
    carNode.querySelector(".luggage-count").innerText = carObject.luggageCount;
    carNode.querySelector(".price").innerText = formatPrice(rentalPrice);

    const url = new URL("udstyr.html", window.location.origin)
    url.searchParams.append("car", carObject.name);
    url.searchParams.append("dateFrom", dateFromField.value);
    url.searchParams.append("dateTo", dateToField.value);
    url.searchParams.append("days", rentalPeriodInDays);
    url.searchParams.append("rentalPrice", rentalPrice);



    carNode.querySelector("a").href = url.toString();
  
    
    carsList.appendChild(carNode);
  }
  
  function handleSearch(event) {

    event.preventDefault();
  
    carsList.innerHTML = "";
  
    var requiredPersonCount = document.getElementById("person-count").value;  
    var requiredLuggageCount = document.getElementById("luggage-count").value;
    var rentalPeriodInDays = calculatePeriodInDays();
  

 fetch("https://api.jsonbin.io/v3/b/616da3df4a82881d6c61f65f", {
  headers: {
    "X-Master-Key":
      "$2b$10$JyEoYBLkEFdBz1L.TLTX7OkTV9HHn1XCAQhY/cpdqycXys7gfHV3O",
    "X-Bin-Meta": false,
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (cars) {
    for (var car of cars) {
      
      if (
        car.personCount >= Number(requiredPersonCount) &&
        car.luggageCount >= Number(requiredLuggageCount)
      ) {   
        showCar(car, rentalPeriodInDays);
      }
    }
  })
  .catch(function (error) {
    /* Hvis API'et svarer med en fejl viser vi den til brugeren */
    carsList.innerHTML = `<p class="error-message">Noget gik galt: "${error.message}".</p>`;
  });
  }
  
  /* HÅNDTÉR EVENTS ----------------------------------------------------------- */
  
  searchButton.addEventListener("click", handleSearch);

