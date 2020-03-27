window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let degreeSection = document.querySelector('.temperature-degree');
    let degreeFC = document.querySelector('.degree-section span');
    let timeZone = document.querySelector('.location-timezone');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `https://api.darksky.net/forecast/2c18bdb51f1a5f946f5a63e8a37aca02/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    const {temperature, summary, icon} = data.currently;
                    //Set value for displayed information
                    temperatureDescription.textContent = summary;
                    timeZone.textContent = data.timezone;
                    degreeSection.textContent = temperature;

                    //Change F to C
                    degreeSection.addEventListener('click', () => {
                        if(degreeFC.textContent === 'F') {
                            degreeFC.textContent = 'C';
                            degreeSection.textContent = celcius.toFixed(1);
                        } else {
                            degreeFC.textContent = 'F';
                            degreeSection.textContent = temperature;
                        }
                    })

                    //Calculate C
                    let celcius = (temperature - 32) * (5/9);

                    //Print weather icon
                    setIcon(icon, document.querySelector('.icon'));
                    
                })

                function setIcon(icon, iconID) {
                    const skycons = new Skycons({"color": "#fff"});
                    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
                    skycons.play();
                    return skycons.set(iconID, Skycons[currentIcon]);
                }
        })
    }
});