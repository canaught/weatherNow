//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/LOCATION?unitGroup=metric&key=YOUR_API_KEY&contentType=json
//my apikey = MV8BWB4YDNYQMXZUS26YTZKXV


// fetches the data and if any error, then throws warning
async function fetchWeather(location, token) {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${token}&contentType=json`;

    try {
        const rawResponse = await fetch(url);
        const data = await rawResponse.json();
        console.log(data);
        console.log(data.resolvedAddress);
        //  document.getElementById("location").innerText = data.resolvedAddress;
        return data;
    } catch (error) {
        document.getElementById('warning').innerHTML = `<div class="alert alert-danger" role="alert">
        Please Enter valid Location / token
      </div>`
    }

}
// fetchWeather("Amalner", "MV8BWB4YDNYQMXZUS26YTZKXV")


//fetchig input from the input form
function fetchInput() {
    let location = document.getElementById("input-location").value;
    let token = document.getElementById("input-token").value;
    console.log(location, token);
    return [location, token];
}


//updates the detauils and calls change_bg
async function updateDetails(location, token) {
    let location1 = location;
    let token1 = token
    const data = await fetchWeather(location1, token1);

    document.getElementById("location").innerText = data.resolvedAddress;
    document.getElementById("feels-like").innerText = `${data.currentConditions.feelslike} degree celsius`;
    document.getElementById("conditions").innerText = `Current Conditions : ${data.currentConditions.conditions}`;
    document.getElementById("temperature").innerText = `${data.currentConditions.temp} degree celsius`;
    document.getElementById("lat").innerText = data.latitude;
    document.getElementById("long").innerText = data.longitude;
    document.getElementById("TimeZone").innerText = data.timezone;
    document.getElementById("windspeed").innerText = `${data.currentConditions.windspeed} m/s`;
    document.getElementById("pressure").innerText = `${data.currentConditions.pressure} kPa`;
    document.getElementById("Humidity").innerText = `${data.currentConditions.humidity} %`;
    document.getElementById("wind-direction").innerText = `${data.currentConditions.winddir} degrees`;
    document.getElementById("UV").innerText = data.currentConditions.uvindex;

    change_bg(data);

}


//entry point of code to initiate the fetch
async function intiateFetch() {
    let inputDataArray = fetchInput();
    let location = inputDataArray[0];
    let token = inputDataArray[1];
    console.log(inputDataArray);
    let warning = "This field is required";
    if (location == "" || token == "") {
        document.getElementById('warning').innerHTML = `<div class="alert alert-danger" role="alert">
        Please Enter valid Location / token
      </div>`
    }
    else {
        document.getElementById('warning').innerHTML = ""
        await updateDetails(location, token);
    }

   

   

}

// this function changes the background image according to the weather conditons
function change_bg(data) {
    if(data.currentConditions.conditions.includes("cloud")){
        console.log("its cloudy");
        document.getElementById("body").style.backgroundImage = 'url(./clouds.webp)';
    }else if(data.currentConditions.conditions.includes("sun") || data.currentConditions.conditions.includes("Clear")){
        console.log("its suny day");
        document.getElementById("body").style.backgroundImage = 'url(./sunny.jpg)';
    }
    else if(data.currentConditions.conditions.includes("rain")){
        console.log("its rainy day");
        document.getElementById("body").style.backgroundImage = 'url(./rainy.jpg)';
    }  
}




