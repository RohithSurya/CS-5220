const express = require("express");
app = express();
const recipies = require("./recipes.json");

app.get("/recipies", (req, res) => {
  const { url, headers, method } = req;
  console.log(url, headers, method);
  res.json(recipies);
});

app.get("/recipies/:id", (req, res) => {
  const { params } = req;
  const { id } = params;
  const recipe = recipies.find((item) => {
    // console.log(item);
    return item.id === parseInt(id);
  });

  res.json(recipe);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
