// import './style.css'

import {readFileSync, existsSync} from "fs";
import {join} from "path";
import {homedir} from "os";
import fs from 'fs';
// import { createElement } from 'react';


async function getTheApi() {
  const json = await fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/femmes-illustres-a-paris-portraits/records?limit=20`);
  const theJson = await json.json();
  return theJson;
}
const theJson = await getTheApi();
try { fs.writeFileSync("theJson.json" ,JSON.stringify(theJson, null, 2));
}catch{
  console.log(`Something went wrong`);
};

// for (let i = 0 ; i<30 ; i = i + 1){
//   let a = document.createElement(`pre`);
//   a.textContent = JSON.stringify(theJson.results[i], null, 3);
//   console.log(a);
//   const targetDiv = document.getElementById("displaySection");
//   targetDiv.appendChild(a);
// }
// // Create a new paragraph element
// const paragraph = document.createElement('p');

// // Set the text content (optional)
// paragraph.textContent = 'This is a paragraph';

// // Get the target div
// const targetDiv = document.getElementById('test');

// // Append the paragraph to the div
// targetDiv.appendChild(paragraph);

// function launchSearch(searchString){ // searchString probably the result of an input

// };
// function seeMore(index){ // index probably an identifier for the object from json

// }