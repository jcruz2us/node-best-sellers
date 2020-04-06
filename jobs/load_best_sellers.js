import axios from "axios";
import jsdom from "jsdom";

async function run() {
  
  // make request for latest best sellers
  // https://www.nytimes.com/books/best-sellers/
  const bestSellersResponse = await axios.get("https://www.nytimes.com/books/best-sellers/");
  
}

function onJobSuccess() {
  console.log("loader executed successfully!");
}
function onJobFailed(error) {
  console.log("error running loader", error);
}

run().then(onJobSuccess, onJobFailed);
