let globTotalConfirmed = document.querySelector(
  ".global__grid--totalconfirmed-info"
);
let globTotalRecovered = document.querySelector(
  ".global__grid--totalrecovered-info"
);
let globTotalDeaths = document.querySelector(".global__grid--totaldeaths-info");

let indTotalConfirmed = document.querySelector(
  ".india__grid--totalconfirmed-info"
);
let indTotalRecovered = document.querySelector(
  ".india__grid--totalrecovered-info"
);
let indTotalDeaths = document.querySelector(".india__grid--totaldeaths-info");

let headerImg = document.querySelector(".header__img");
let headerPara = document.querySelector(".header__para");
let infographArr = [
  {
    src: "./assets/infographic/wash_hands_regularly.svg",
    quote: "Wash your hands regularly!",
  },
  {
    src: "./assets/infographic/use_soap_sanitizer.svg",
    quote: "Use soap and sanitizer to clean your hands!",
  },
  {
    src: "./assets/infographic/wear_masks_outside.svg",
    quote: "Always wear mask when in public place!",
  },
  {
    src: "./assets/infographic/clean_hands.svg",
    quote: "Keep your hands clean!",
  },
  {
    src: "./assets/infographic/cook_hot.svg",
    quote: "Cook and eat hot homemade food!",
  },
  {
    src: "./assets/infographic/avoid_meat.svg",
    quote: "Avoid consumption of meat products!",
  },
  {
    src: "./assets/infographic/maintain_social_distancing.svg",
    quote: "Always maintain social distancing!",
  },
  {
    src: "./assets/infographic/high_fever.svg",
    quote: "Do not ignore high fever. It might be a covid symptom!",
  },
  {
    src: "./assets/infographic/trust_your_doctor.svg",
    quote: "Trust your treating doctor and health professional!",
  },
];

let countryData = document.querySelector(".country__data");

window.addEventListener("load", (e) => {
  (() => {
    let counter = 1;
    let size = infographArr.length;
    setInterval(() => {
      if (counter <= size) {
        headerImg.src = infographArr[counter - 1].src;
        headerPara.innerHTML = infographArr[counter - 1].quote;
        counter++;
      } else {
        counter = 1;
      }
    }, 2200);
  })();

  headerImg.src = infographArr[0].src;
  headerPara.innerHTML = infographArr[0].quote;

  fetch("https://api.covid19api.com/summary")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      globTotalConfirmed.innerHTML = data.Global.TotalConfirmed;
      globTotalRecovered.innerHTML = data.Global.TotalRecovered;
      globTotalDeaths.innerHTML = data.Global.TotalDeaths;
      // indTotalConfirmed.innerHTML = data.Countries[100].TotalConfirmed;
      // indTotalRecovered.innerHTML = data.Countries[100].TotalRecovered;
      // indTotalDeaths.innerHTML = data.Countries[100].TotalDeaths;

      data.Countries.forEach((item) => {

        if(item.Country == "India" || item.Country == "india"){
          indTotalConfirmed.innerHTML = item.TotalConfirmed;
          indTotalRecovered.innerHTML = item.TotalRecovered;
          indTotalDeaths.innerHTML = item.TotalDeaths;
        }

        let div = document.createElement("div");
        div.className = "country__data--div";
        let spanCountry = document.createElement("span");
        let spanCountryText = document.createTextNode(item.Country);
        spanCountry.appendChild(spanCountryText);
        div.appendChild(spanCountry);
        let spanConfirmed = document.createElement("span");
        let spanConfirmedText = document.createTextNode(item.TotalConfirmed);
        spanConfirmed.appendChild(spanConfirmedText);
        div.appendChild(spanConfirmed);
        let spanRecovered = document.createElement("span");
        let spanRecoveredText = document.createTextNode(item.TotalRecovered);
        spanRecovered.appendChild(spanRecoveredText);
        div.appendChild(spanRecovered);
        let spanDeaths = document.createElement("span");
        let spanDeathsText = document.createTextNode(item.TotalDeaths);
        spanDeaths.appendChild(spanDeathsText);
        div.appendChild(spanDeaths);
        countryData.appendChild(div);
      });
    });
});
