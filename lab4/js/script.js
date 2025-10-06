getState();

let zipCode = document.querySelector("#zip");
let username = document.querySelector("#username");
let password = document.querySelector("#pass");
let state = document.querySelector("#stateSelector")
let county = document.querySelector("#countySelector");
let suggested = document.querySelector("#suggested");
let submit = document.querySelector("#signUp")
let userError = document.querySelector("#userError")
let passError = document.querySelector("#passError")
submit.addEventListener("click", () => {
    if(!(username.value.length > 3)) {
        userError.style.display = "block";
    } else {
        userError.style.display = "none";
    }

    if(password.value.length < 6) {
        passError.textContent = "Your password must be at least 6 characters.";
    } else {
        let retyped = document.querySelector("#passAgain");
    
        console.log("Retyped " + retyped.value + "Orig " + password.value)
        if(retyped.value != password.value) {
            passError.textContent = "Your passwords must match."
        } else {
            passError.textContent = "";
        }
    }
    
})
zipCode.addEventListener("input", () => { 
    setTimeout(() => { // 1 sec timeout to give time to type zipcode before grabbing location
        displayCity();
    }, 1000);
});
username.addEventListener("input", checkUsername);
password.addEventListener("focus", () => {
    suggested.style.display = "inline";
});


getPassword();

state.addEventListener("change", displayCounty);

async function getState() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();

            let select = document.querySelector("#stateSelector")
            select.innerHTML = "<option disabled selected> Select a State </option>"
            for(let state of data) {
                select.innerHTML += `<option value="${state.usps}"> ${state.state} </option>`
            }

        } catch(error) {
            console.log("Error parsing data!" + error);
        }
    } catch(error) {
        console.log("Network error!" + error);
    }
}

async function displayCounty() {
    let state = document.querySelector("#stateSelector").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            console.log(data[0]);

            let select = document.querySelector("#countySelector");
            select.innerHTML = "<option disabled selected>Select a County</option>";

            for(let county of data) {
                select.innerHTML += `<option> ${county.county} </option>`;
            }
        } catch(error) {
            console.log("Error parsing data!" + error);
        }
    } catch(error) {
        console.log("Network error!" + error);
    }
}

async function displayCity() {
    
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode.value}`;
    
    let lat = document.querySelector("#latitude");
    let long = document.querySelector("#longitude");
    let city = document.querySelector("#city")

    try {
        let response = await fetch(url);
        
        try {
            let data = await response.json();
            lat.textContent = data.latitude;
            long.textContent = data.longitude;
            city.textContent = data.city;
            state.value = data.state;
            console.log("COUNTY: "+data.county);
            await displayCounty();

            county.innerHTML = `<option value=${data.county}> ${data.county} </option>`
        } catch (error) {
            console.log("Data parsing error!" + error);
        }
    } catch (error) {
        console.log("Network error!" + error); 
    } 
}

async function checkUsername() {
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username.value}`;

    try {
        let response = await fetch(url);
        
        try {
            let data = await response.json();
            let feedback = document.querySelector("#avail");

            let avail = data.available;

            console.log(avail);

            if(avail == true && username.value) {
                feedback.textContent = "Username is available!"
                feedback.style.color = "darkgreen";
            } else if(avail == false && username.value) {
                feedback.textContent = "Username is UNAVAILABLE!"
                feedback.style.color = "darkred";
            } else {
                feedback.textContent = "";
            }
        } catch (error) {
            console.log("Data parsing error!" + error);
        }
    } catch (error) {
        console.log("Network error!" + error); 
    } 
}

async function getPassword() {
    let url = 'http://csumb.space/api/suggestedPassword.php?length=8';

    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            let sugPass = data.password;
            suggested.textContent = "Use Suggested Password: " + sugPass;
            suggested.addEventListener("click", () => {
                password.value = sugPass;
                console.log("Sug Pass clicked! " + sugPass)
            })
        } catch (error) {
            console.log("Error parsing data!" + error);
        }
    } catch (error) {
        console.log("Network Error! " + error);
    }
}