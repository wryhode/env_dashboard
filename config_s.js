const el_stationName = document.getElementById("stationName");
const el_wifiSta = document.getElementById("wifiSta");
const el_wifiAp = document.getElementById("wifiAp");
const el_ipAddress = document.getElementById("ipAddress");
const el_sensorInterval = document.getElementById("sensorInterval");
const el_conversionFactor = document.getElementById("conversionFactor");
const el_conversionConstant = document.getElementById("conversionConstant");

const el_clearLocalStorage = document.getElementById("clearLocalStorage");
el_clearLocalStorage.onclick = () => {
    localStorage.clear();
}

const el_title = document.getElementById("title");

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

async function getStationData() {
    const json = await getJSON("/dummyconfig.json");

    el_title.innerHTML = json["stationName"];
    document.title = json["stationName"];
    el_stationName.value = json["stationName"];

    el_sensorInterval.value = json["sensorInterval"] / 1000;
    el_conversionFactor.value = json["conversionFactor"];
    el_conversionConstant.value = json["conversionConstant"];

    el_ipAddress.value = json["ip"];
}

getStationData();