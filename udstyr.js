const url = new URL(window.location.href);

function addVat(price = 0) {
    return price * 1.25;
}

function formatPrice(price = 0) {
    return price.toLocaleString("da-DK", {
        style: "currency",
        currency: "DKK",
    });
}

const basePrice = Number(url.searchParams.get("rentalPrice"));
const formattedBasePrice = formatPrice(basePrice);

// Set values from URL parameters
document.getElementById("rental-car").innerText = url.searchParams.get("car");
document.getElementById("rental-from").innerText = url.searchParams.get("dateFrom");
document.getElementById("rental-to").innerText = url.searchParams.get("dateTo");
document.getElementById("rental-days").innerText = url.searchParams.get("days");
document.getElementById("rental-price").innerText = formattedBasePrice;
const priceOutput = document.getElementById("price-incl-extras");
priceOutput.innerText = formattedBasePrice;

// Update price when checkboxes are selected

const form = document.querySelector("form");

form.addEventListener("change", function (event) {
  let extrasPrice = 0;
  for (const item of this.elements.extra) {
    if (item.checked === true) {
        const numericValue = Number(item.value);
        extrasPrice += addVat(numericValue);
    }
  }

  priceOutput.innerText = formatPrice(basePrice + extrasPrice);
});

//TO DO: Save form when data is submitted

form.addEventListener("submit", function(event) {
    // Beregn pris for det valgte ekstraudstyr
    let extrasPrice = 0;
    let extrasList = [];
    for (const item of this.elements.extra) {
        if (item.checked === true) {
            const numericValue = Number(item.value);
            extrasPrice += addVat(numericValue);
            extrasList.push(item.parentNode.innerText);
        }
    }
    sessionStorage.setItem("extrasPrice", extrasPrice);
    sessionStorage.setItem("extrasList", extrasList.join(", "));
    // Gem også de øvrige oplysninger overført via URL parametre
    sessionStorage.setItem("car", url.searchParams.get("car"));
    sessionStorage.setItem("dateFrom", url.searchParams.get("dateFrom"));
    sessionStorage.setItem("dateTo", url.searchParams.get("dateTo"));
    sessionStorage.setItem("days", url.searchParams.get("days"));
    sessionStorage.setItem("rentalPrice", url.searchParams.get("rentalPrice"));
});

