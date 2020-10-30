/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const key = "23e2d7d54d8bb8cf5822b97c658b10ef";
const url = "http://api.openweathermap.org/data/2.5/weather?";

const zipCodeInput = document.getElementById("zip");
const generateBtn = document.getElementById("generate");
const userResp = document.getElementById("feelings");

const dateInput = document.getElementById("date");
const tempInput = document.getElementById("temp");
const contentInput = document.getElementById("content");

const getData = async (url, zipcode, key) => {
  try {
    const response = await fetch(
      `${url}zip=${zipcode}&appid=${key}&units="imperial"`
    );
    if (response.status === 200) {
      let parsedData = await response.json();
      return parsedData;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.log("error", err.message);
  }
};

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    //console.log(newData);
    return newData;
  } catch (err) {
    console.log(err);
  }
};

generateBtn.addEventListener("click", () => {
  getData(url, zipCodeInput.value, key)
    .then((data) => {
      const dataObj = {
        temperature: data.main.temp,
        date: newDate,
        userResponse: userResp.value,
        zipcode: zipCodeInput.value,
      };
      postData("/addweather", dataObj).then((res) => {
        // dateInput.textContent = res.date;
        // tempInput.textContent = res.temperature;
        // contentInput.textContent = res.userResponse;
        fetch("/all")
          .then((res) => res.json())
          .then((data) => {
            dateInput.textContent = data[zipCodeInput.value].date;
            tempInput.textContent = data[zipCodeInput.value].temperature;
            contentInput.textContent = data[zipCodeInput.value].userResponse;
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
