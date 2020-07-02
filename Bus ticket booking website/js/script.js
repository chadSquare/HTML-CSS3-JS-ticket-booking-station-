// vars for input and select html elements
const departureCityInput = document.querySelector("#departure-city");
const destinationCityInput = document.querySelector("#destination-city");
const departureDateInput = document.querySelector("#departure-date");
const returnDateInput = document.querySelector("#return-date");
const passengerCountInput = document.querySelector("#passenger-count");

// var for blackout container
const blackout = document.querySelector("#blackout");

//var that records which array to loop through when calculating the price
let tripType;
// var that records the type of trip as a string
//only used for quotation
let tripTypeString;
// var that records calculted price
let tripPrice;

const oneWay = [
  { route: "DurbanCapeTown", price: 480 },
  { route: "CapeTownDurban", price: 480 },
  { route: "CapeTownJohannesburg", price: 420 },
  { route: "JohannesburgCapeTown", price: 420 },
  { route: "DurbanJohannesburg", price: 270 },
  { route: "JohannesburgDurban", price: 270 },
];

const returnPrices = [
  { route: "DurbanCapeTown", price: 480 },
  { route: "CapeTownDurban", price: 480 },
  { route: "CapeTownJohannesburg", price: 420 },
  { route: "JohannesburgCapeTown", price: 420 },
  { route: "DurbanJohannesburg", price: 270 },
  { route: "JohannesburgDurban", price: 270 },
];

// when the buger icon is clicked, show the mobile nav
// burger icon only shows in small screen sizes
const mobileNavBtn = document
  .querySelector("#burger")
  .addEventListener("click", () => {
    const mobileNav = document.querySelector(".mobile-nav");
    mobileNav.classList.toggle("openClass");
  });

// when the customer selects a return trip show all the inputs
const returnTripBtn = document.querySelector("#return-trip-btn");
returnTripBtn.addEventListener("click", (e) => {
  const optionsArea = document.querySelector(".options-area");
  const returnDate = document.querySelector("#return-date");

  // update the background color
  returnTripBtn.style.backgroundColor = "#ce4d2d";
  onewayTripBtn.style.backgroundColor = "#2daece";

  //make the tripType var the name of the object containing the prices
  tripType = returnPrices;
  // get the innerHtml for the quotation trip type
  tripTypeString = e.target.innerHTML;

  // show the fields
  optionsArea.style.animationName = "showOptions";
  optionsArea.style.display = "grid";

  // reset the return date styling
  returnDate.style.display = "block";
  returnDate.style.opacity = 1;
});

// when the customer selects a one-way trip show all the inputs except the return date input
const onewayTripBtn = document.querySelector("#oneway-trip-btn");
onewayTripBtn.addEventListener("click", (e) => {
  const optionsArea = document.querySelector(".options-area");
  const returnDate = document.querySelector("#return-date");

  // update the background color
  onewayTripBtn.style.backgroundColor = "#ce4d2d";
  returnTripBtn.style.backgroundColor = "#2daece";

  //make the tripType var the name of the object containing the prices
  tripType = oneWay;
  // get the innerHtml for the quotation trip type
  tripTypeString = e.target.innerHTML;

  // show the fields
  optionsArea.style.animationName = "showOptions";
  optionsArea.style.display = "grid";

  // hide the return date input
  returnDate.style.display = "none";
  returnDate.style.opacity = 0;
});

// func to calculate the ticket price
function calculatePrice() {
  /*remove the spaces from the city names and concat the names the match the naming of the object
      keys*/
  const tripName =
    departureCityInput.value.replace(" ", "") +
    destinationCityInput.value.replace(" ", "");

  // loop through the prices object and multply price by passenger count
  for (i = 0; i < tripType.length; i++) {
    if (tripType[i].route == tripName) {
      tripPrice = tripType[i].price * passengerCountInput.value;
    }
  }
}

// func to update innerHTML's in the quotation modal
function updateQuotation() {
  // grab the id's for the <td></td> elements
  const quotationTripTypeText = document.querySelector("#quoted-trip-type");
  const quotationDepartureCityText = document.querySelector(
    "#quoted-depart-city"
  );
  const quotationDestinationCityText = document.querySelector(
    "#quoted-destination-city"
  );
  const quotationPassengerCountText = document.querySelector(
    "#quoted-passenger-count"
  );
  const quotationPriceText = document.querySelector("#quoted-price");

  // add all the necessary data for the quotation(receipt)
  quotationTripTypeText.innerHTML = tripTypeString;
  quotationDepartureCityText.innerHTML =
    departureCityInput.value + " - " + departureDateInput.value;
  if (tripTypeString == "RETURN") {
    quotationDestinationCityText.innerHTML =
      destinationCityInput.value + " - " + returnDateInput.value;
  } else if (tripTypeString == "ONE-WAY") {
    quotationDestinationCityText.innerHTML = "-";
  }
  quotationPassengerCountText.innerHTML = passengerCountInput.value;
  quotationPriceText.innerHTML = `R ${tripPrice}.00`;
}

//func to show the quoatation modal
function showQuotation() {
  const quotationModal = document.querySelector("#quotation");
  quotationModal.style.display = "block";
  blackout.style.display = "block";
}

//func to hide the quoatation modal
function hideQuotation() {
  const quotationModal = document.querySelector("#quotation");
  quotationModal.style.display = "none";
}

//func to show alerts
//takes a parameter so the innerHTML can be updated when called
function showAlert(alertText, color) {
  // var for the alert modal
  const alertModal = document.querySelector("#alerts");
  const alertTextArea = document.querySelector("#alert-text");

  //update text, change the background colour and show the modal
  alertTextArea.innerHTML = alertText;
  alertModal.style.display = "flex";
  alertModal.style.backgroundColor = color;

  // show the blackout screen
  blackout.style.display = "block";

  // remove the alert modal after 5 seconds and remove the blackout screen
  setTimeout(() => {
    alertModal.style.display = "none";
    blackout.style.display = "none";
  }, 5000);
}

// const alertCloseBtn = document
//   .querySelector("#alert-close-btn")
blackout.addEventListener("click", () => {
  // remove the blackout screen
  blackout.style.display = "none";

  // remove the alert modal
  const alertModal = document.querySelector("#alerts");
  alertModal.style.display = "none";
});

//listen for a submit on the form element
// when the user clicks Book Now
const forms = document.querySelector(".options-area");
forms.addEventListener("submit", (e) => {
  e.preventDefault();
  // check if any fields are empty
  if (tripType == returnPrices) {
    if (
      departureCityInput.value == "Select a Departure City" ||
      departureCityInput.value == "" ||
      destinationCityInput.value == "Select an Arrival City" ||
      destinationCityInput.value == "" ||
      departureDateInput.value == "" ||
      returnDateInput.value == "" ||
      passengerCountInput.value == ""
    ) {
      showAlert("Please enter all the required fields", "#f7b32d");
      //   if the same cities are selected for departure and destination
    } else if (departureCityInput.value == destinationCityInput.value) {
      showAlert(
        "You can't have the same departure and destination city.",
        "#f7b32d"
      );
    } else {
      calculatePrice();
      updateQuotation();
      showQuotation();
    }
  } else if (tripType == oneWay) {
    if (
      /* if one-way was selected then the return date does not need to be validated, thats why
          there are two form validations*/
      departureCityInput.value == "Select a Departure City" ||
      departureCityInput.value == "" ||
      destinationCityInput.value == "Select an Arrival City" ||
      destinationCityInput.value == "" ||
      departureDateInput.value == "" ||
      passengerCountInput.value == ""
    ) {
      showAlert("Please enter all the required fields", "#f7b32d");
    } else if (departureCityInput.value == destinationCityInput.value) {
      //   if the same cities are selected for departure and destination
      showAlert(
        "You can't have the same departure and destination city.",
        "#f7b32d"
      );
    } else {
      calculatePrice();
      updateQuotation();
      showQuotation();
    }
  }
});

const inputs = document.querySelectorAll(".inputs");
//clear all inputs
// loop through all fields with the inputs class and clear set the value to an empty string
function clearFields() {
  inputs.forEach((input) => {
    input.value = "";
  });
}

// when the confirm button is clicked do the following
const confirmBtn = document
  .querySelector("#confirm")
  .addEventListener("click", () => {
    //   hide quiatation modal and clear the inputs and selects
    hideQuotation();
    clearFields();
    blackout.style.display = "none";
    // update the background color
    returnTripBtn.style.backgroundColor = "#2daece";
    onewayTripBtn.style.backgroundColor = "#2daece";
  });
