const url = new URL(window.location.href);

document.getElementById("rental-price").innerText=sessionStorage.getItem("rentalPrice");
document.getElementById("rental-car").innerText=sessionStorage.getItem("car");
document.getElementById("rental-from").innerText=sessionStorage.getItem("dateFrom");
document.getElementById("rental-to").innerText=sessionStorage.getItem("dateTo");
document.getElementById("rental-days").innerText=sessionStorage.getItem("days");
document.getElementById("extras-list").innerText=sessionStorage.getItem("extrasList");
document.getElementById("extras-price").innerText=sessionStorage.getItem("extrasPrice");