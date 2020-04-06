import axios from "axios";
import jsdom from "jsdom";

import libraryService from "../lib/library/library_service.mjs";

async function run() {
  
  // make request for latest best sellers
  // https://www.nytimes.com/books/best-sellers/
  const bestSellersResponse = await axios.get("https://www.nytimes.com/books/best-sellers/");
  
  // parse html using jsdom into a list of books w/ author details
  const dom = new jsdom.JSDOM(bestSellersResponse.data);
  const doc = dom.window.document;
  const bookElements = Array.from(doc.querySelectorAll(`[itemtype="https://schema.org/Book"]`));  
  
  // iterate over list of books
  for (let bookElement of bookElements) {
    const author = bookElement.querySelector(`[itemprop="author"]`).textContent.replace("by", "").trim();
    const title = bookElement.querySelector(`[itemprop="name"]`).textContent;
    const description = bookElement.querySelector(`[itemprop="description"]`).textContent;

    // insert into database
    await libraryService.addBook({author, title, description});
  }
}

function onJobSuccess() {
  console.log("loader executed successfully!");
}
function onJobFailed(error) {
  console.log("error running loader", error);
}

run().then(onJobSuccess, onJobFailed);
