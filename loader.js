// Tries to store chart.js (absolutely the largest file) in localStorage to reduce loading times

async function getUrl(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
  
        return await response.text();

    } catch (error) {
        console.error(error.message);
    }
}

if (localStorage.getItem("libChart") == null) {
    console.log("Does not have Chart.js already");

    getUrl("./chart.js").then((response) => {
        let sChart = document.createElement("script");
        sChart.innerHTML = response;
        document.body.appendChild(sChart);
        
        localStorage.setItem("libChart", response);
    });
}
else {
    let sChart = document.createElement("script");
    sChart.innerHTML = localStorage.getItem("libChart");
    document.body.appendChild(sChart);
}

// Finally, add script that uses chart.js
let s = document.createElement("script");
s.src = "./script.js"
document.body.appendChild(s);