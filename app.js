window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/2c18bdb51f1a5f946f5a63e8a37aca02/${lat},${long}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;
                    //Set DOM Elements from the API
                    temperatureDescription.textContent = summary;
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = data.timezone;

                    //Formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Convert F to C
                        temperatureSection.addEventListener('click', () => {
                            if (temperatureSpan.textContent === "F") {
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = celsius.toFixed(1);
                            } else {
                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = temperature;
                            }
                        })
                });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "#fff"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    
});