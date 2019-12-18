"use strict"

let queryRoastSelectionEl = document.getElementById("query-roast-selection");
let coffeeListContainerEl = document.getElementById("coffee-list-container");
let coffeeSearchEl = document.getElementById("coffee-query-input");



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

displayCoffee(coffees, "all");


console.log(queryRoastSelectionEl);
queryRoastSelectionEl.addEventListener("change", function () {

    if (queryRoastSelectionEl.value === "light") {
        // show all light roasts
        displayCoffee(coffees, queryRoastSelectionEl.value);
    } else if (queryRoastSelectionEl.value === "medium") {
        // show all medium
        displayCoffee(coffees, queryRoastSelectionEl.value);
    } else if (queryRoastSelectionEl.value === "dark") {
        // show all dark
        displayCoffee(coffees, queryRoastSelectionEl.value);
    } else {
        // default to show all coffees
        displayCoffee(coffees, queryRoastSelectionEl.value);
    }
});

coffeeSearchEl.addEventListener("keydown", function () {
    if (coffeeSearchEl.value !== ""){
        displayCoffeeString(coffees, coffeeSearchEl.value);

    }else{
        displayCoffee(coffees, "all");
    }

});



function displayCoffeeString(coffees, searchString){
    let htmlString = "";

    htmlString += "<ul>";
    coffees.forEach(function (coffee) {
        if (coffee.name.toLowerCase().includes(searchString.toLowerCase())){
            htmlString += "<li>";
            htmlString += "<div>" + coffee.name +
                        "<p>" + coffee.roast + "</p>" + "</div>";
            htmlString += "</li>";
        }

    });
    htmlString += "</ul>";
    coffeeListContainerEl.innerHTML = htmlString;
}


// display coffee in coffee-list-container based on roast
function displayCoffee(coffees, roast) {
    let htmlString = "";

    htmlString += "<ul>";
    coffees.forEach(function (coffee) {
        if (coffee.roast === roast) {
            htmlString += "<li'>";
            htmlString += "<div>" + coffee.name +
                        "<p>" + coffee.roast + "</p>" + "</div>";
            htmlString += "</li>";
        } else if (roast === "all") {
            htmlString += "<li'>";
            htmlString += "<div>" + coffee.name +
                "<p>" + coffee.roast + "</p>" + "</div>";
            htmlString += "</li>";
        }
    });
    htmlString += "</ul>";
    coffeeListContainerEl.innerHTML = htmlString;
}



function renderCoffee(coffee) {
    var html = '<tr class="coffee">';
    html += '<td>' + coffee.id + '</td>';
    html += '<td>' + coffee.name + '</td>';
    html += '<td>' + coffee.roast + '</td>';
    html += '</tr>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for (var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}


var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#query-submit-btn');
var roastSelection = document.querySelector('#roast-selection');

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
