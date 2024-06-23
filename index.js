const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const articles = [];
app.get("/", (req, res) => {
  axios
    .get("https://www.theguardian.com/uk/environment")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $("a", html).each(function () {
        const text = $(this).text();
        const url = $(this).attr("href");
        articles.push({ text, url });
      });
      res.json(articles);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
