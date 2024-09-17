// Loading element
const el_loading = document.getElementById("loading");

async function getJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
  
        return await response.json();

    } catch (error) {
        console.error(error.message);
    }
}

const el_title = document.getElementById("title");

// Get sensor data from device
async function getSensor() {
    el_loading.innerHTML = "Kunne ikke hente data";

    const json = await getJSON("/dummyresponse.json");
    
    el_loading.remove();

    updateJustNow(json["current"]["temperature"], json["current"]["humidity"])

    drawChart(canvas_temperature, json["history"]["temperature"], "Temperatur", "#5ff420", json["interval"]);
    drawChart(canvas_humidity, json["history"]["humidity"], "Fuktighet", "#3bb4f4", json["interval"]);
}

var sensorInterval = 1000;

async function getStationData() {
    const json = await getJSON("/dummyconfig.json");

    el_title.innerHTML = json["stationName"];
    document.title = json["stationName"];
}

// Get canvas related elements
const el_temp_history = document.getElementById("tempHistoryDiv");
const el_humi_history = document.getElementById("humHistoryDiv");

const canvas_temperature = document.getElementById("tempCanvas");
const canvas_humidity = document.getElementById("humCanvas");

// Drawing contexts
const tempctx = canvas_temperature.getContext("2d");
const humctx = canvas_humidity.getContext("2d");

// Sets canvas sizes
function setCanvasSize() {
    canvas_temperature.height = window.innerHeight / 3;
    canvas_temperature.width = el_temp_history.clientWidth;
    
    canvas_humidity.height = window.innerHeight / 3;
    canvas_humidity.width = el_humi_history.clientWidth;
}

window.addEventListener("resize", setCanvasSize);

// Draws a specialized chart with 
function drawChart(context, history, name, color, dataInterval = 1000) {

    let now = Date.now();
    const labels = [];
    for (let i = 0; i < history.length; ++i) {
        labels.push(new Date(now - (history.length - i) * dataInterval).toString().slice(16, 24));
    }

    // Configuration of the line chart
    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: name,
                data: history,
                borderColor: color,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tid'
                    }
                },
                y: {
                    beginAtZero: false,  // Ensure Y axis starts at 0
                    title: {
                        display: true,
                        text: name
                    }
                }
            }
        }
    };

    new Chart(context, config);
}

const el_temperature_now = document.getElementById("tempNow");
const el_humidity_now = document.getElementById("humNow");

function updateJustNow(temperature, humidity) {
    el_temperature_now.innerHTML = temperature.toFixed(1);
    el_humidity_now.innerHTML = humidity.toFixed(1);
}

setCanvasSize();
getStationData();
getSensor();