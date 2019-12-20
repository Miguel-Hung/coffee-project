"use strict";
let coffeeQuerySelectionEl = document.getElementById("query-roast-selection");
let coffeeListContainerEl = document.getElementById("coffee-list-container");
let coffeeSearchEl = document.getElementById("coffee-query-input");
let coffeeAddEl = document.getElementById("coffee-add-input");
let coffeeAddRoastEl = document.getElementById("add-roast-selection");
let coffeeAddBtn = document.getElementById("add-submit-btn");

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// Retrieves local storage if available
if (window.localStorage.getItem('coffeeArray') !== null) {
    coffees = JSON.parse(window.localStorage.getItem('coffeeArray'));
}

// Display initial coffee list
coffeeListContainerEl.innerHTML = displayCoffee(coffees, "all");

// If user changes the selection input, it will update the coffee list
coffeeQuerySelectionEl.addEventListener("change", function () {
    if (coffeeQuerySelectionEl.value === "light") {
        // show all light roasts
        coffeeListContainerEl.innerHTML = displayCoffee(coffees, coffeeQuerySelectionEl.value);
    } else if (coffeeQuerySelectionEl.value === "medium") {
        // show all medium roasts
        coffeeListContainerEl.innerHTML = displayCoffee(coffees, coffeeQuerySelectionEl.value);
    } else if (coffeeQuerySelectionEl.value === "dark") {
        // show all dark roasts
        coffeeListContainerEl.innerHTML = displayCoffee(coffees, coffeeQuerySelectionEl.value);
    } else {
        // default to show all coffees
        coffeeListContainerEl.innerHTML = displayCoffee(coffees, coffeeQuerySelectionEl.value);
    }
});

// If the user types in a string, it will update the coffee list
coffeeSearchEl.addEventListener("keyup", function () {
    if (coffeeSearchEl.value !== "") {
        coffeeListContainerEl.innerHTML = displayCoffeeString(coffees, coffeeSearchEl.value, coffeeQuerySelectionEl.value);
    } else {
        coffeeListContainerEl.innerHTML = displayCoffee(coffees, coffeeQuerySelectionEl.value);
    }
});

// If the user clicks submit, it will add the coffee based on the information chosen by user
coffeeAddBtn.addEventListener("click", function (e) {
    // the next id will be coffees.length+1, roast will be the value of roast selected, name will be the name inputed
    e.preventDefault();
    let coffeeAddName = coffeeAddEl.value;
    if (coffeeAddName === "") {
        alert("Please enter a coffee name.");
    } else {
        let coffee = {
            id: coffees.length + 1,
            name: coffeeAddName,
            roast: coffeeAddRoastEl.value
        };
        coffees.push(coffee);
        window.localStorage.setItem('coffeeArray', JSON.stringify(coffees));
        console.log(localStorage.getItem('coffeeArray'));
        coffeeListContainerEl.innerHTML = displayCoffee(coffees, "all");
        alert(`Coffee: ${coffee.name}, Roast: ${coffee.roast} is added!`);
    }
});

function displayCoffeeString(coffees, searchString, roast) {
    let htmlString = "";
    coffees.forEach(function (coffee) {
        if (coffee.roast === roast) {
            if (coffee.name.toLowerCase().includes(searchString.toLowerCase())) {
                htmlString += "<div class='d-flex align-items-center coffee-item my-3 mx-3'>" + "<h3 class='mx-2'>" + coffee.name + "</h3>" +
                    "<p class='my-0 mx-3'>" + coffee.roast + "</p>" + "</div>";
            }
        } else if (roast === "all") {
            if (coffee.name.toLowerCase().includes(searchString.toLowerCase())) {
                htmlString += "<div class='d-flex align-items-center coffee-item my-3 mx-3'>" + "<h3 class='mx-2'>" + coffee.name + "</h3>" +
                    "<p class='my-0 mx-3'>" + coffee.roast + "</p>" + "</div>";
            }
        }
    });
    return htmlString;
}

// display coffee in coffee-list-container based on roast
function displayCoffee(coffees, roast) {
    let htmlString = "";
    coffees.forEach(function (coffee) {
        if (coffee.roast === roast) {
            htmlString += "<div class='d-flex align-items-center coffee-item my-3 mx-3'>" + "<h3 class='mx-2'>" + coffee.name + "</h3>" +
                "<p class='my-0 mx-3'>" + coffee.roast + "</p>" + "</div>";
        } else if (roast === "all") {
            htmlString += "<div class='d-flex align-items-center coffee-item my-3 mx-3'>" + "<h3 class='mx-2'>" + coffee.name + "</h3>" +
                "<p class='my-0 mx-3'>" + coffee.roast + "</p>" + "</div>";
        }
    });
    return htmlString;

}
