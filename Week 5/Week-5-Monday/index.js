const axios = require("axios");

const restRequest = async (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

restRequest("norway");
