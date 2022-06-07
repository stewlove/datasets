/*
 * Stewart Lovell
 * 3/8/2022
 * Parsing through our json file to display covid information and statistics
 */

//update the dataset info paragraph with the amount of elements
document.getElementById("dataset-info").textContent += ` There are ${covid.length} elements in the dataset.`;

//display facts in the fact section of the page
document.getElementById("fact-one").textContent = `There have been ${avgDeaths(covid)} deaths in the United States every day due to COVID-19 on average.`;
document.getElementById("fact-two").textContent = `${deadliestDay(covid)}`;
document.getElementById("fact-three").textContent = `Between the end of 2019 and the end of 2020, there were ${totalCases(covid)} total cases of COVID-19 reported.`

//get access to our buttons
let previous = document.getElementById("previous");
let next = document.getElementById("next");

//the index of the current object shown on the webpage
let index = 0;

//responds to clicks of the "previous" button
previous.onclick = function(event)
{
    //decrement index to see the previous value in the array
    index--;

    //make sure that index is never less than zero...
    if(index < 0)
    {
        index = covid.length - 1;
    }

    //display information based on the current index
    display(index);
}

//responds to clicks of the "next" button
next.onclick = function(event)
{
    //increment index to see the next value in the array
    index++;

    //make sure that index is never greater than array.length - 1
    if(index > covid.length - 1)
    {
        index = 0;
    }

    //display information based on the current index
    display(index);
}

//Function displays the covid data for the object at the specified index
function display(num)
{
    let currentObject = covid[num];
    document.getElementById("location-info").textContent = `${currentObject.Location.Country}, Country in ${currentObject.Location.Continent}`;
    document.getElementById("day").textContent = `Day: ${currentObject.Date.Day}`;
    document.getElementById("month").textContent = `Month: ${currentObject.Date.Month}`;
    document.getElementById("year").textContent = `Year: ${currentObject.Date.Year}`;
    document.getElementById("cases").textContent = `Cases: ${currentObject.Data.Cases}`;
    document.getElementById("deaths").textContent = `Deaths: ${currentObject.Data.Deaths}`;
    document.getElementById("population").textContent = `Population: ${currentObject.Data.Population}`;
    document.getElementById("rate").textContent = `Rate: ${currentObject.Data.Rate}`;
}

//Function that calculates the average deaths per day in the United States (rounded to the nearest int)
function avgDeaths(array)
{
    //create a variable to track the total deaths in america
    let americaDeaths = 0;
    //create a variable to track the number of days with covid data in america
    let americaDays = 0;

    //loop through the array
    for(let i = 0; i < array.length; i++)
    {
        //if the current object data is for the united states
        if(array[i].Location.Country === "United_States_of_America")
        {
            //add the deaths on that day to the total deaths in america
            americaDeaths += array[i].Data.Deaths;
            //increment the number of days
            americaDays++;
        }
    }
    //divide the total deaths by the number of days to calculate the average deaths per day
    return Math.round(americaDeaths / americaDays);
}

//Function that finds the deadliest day and returns information about that day
function deadliestDay(array)
{
    //create a variable to track the highest number of deaths
    let highestDeaths = 0;
    //create an empty string that will be used to display information later
    let locationInfo = "";

    //loop through the array
    for(let i = 0; i < array.length; i++)
    {
        //if highestDeaths is lower than the current index's deaths...
        if(highestDeaths < array[i].Data.Deaths)
        {
            //set highestDeaths equal to deaths at current index
            highestDeaths = array[i].Data.Deaths;
            //take the information about the country, date, and deaths and assign it to our string variable
            locationInfo = `The most COVID-19 deaths in a single day in the world happened on
            ${array[i].Date.Month}/${array[i].Date.Day}/${array[i].Date.Year}
            in ${array[i].Location.Country}, ${highestDeaths} people died.`
        }
    }
    //return the string variable
    return locationInfo;
}

//Function that returns the total cases of covid contracted
function totalCases(array)
{
    //create a variable to track total cases
    let totalCases = 0;

    //loop through the array
    for(let i = 0; i < array.length; i++)
    {
        //at each index, add the cases to totalCases
        totalCases += array[i].Data.Cases;
    }
    //return totalDeaths
    return totalCases;
}