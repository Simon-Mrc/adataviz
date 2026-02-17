/* import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'*/

import {readFileSync, existsSync} from "fs";
import {join} from "path";
import {homedir} from "os";
import fs from 'fs';


async function getTheApi() {
  const json = await fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/plaques_commemoratives/records?limit=20`);
  const theJson = await json.json();
  return theJson;
}
const theJson = await getTheApi();
try { fs.writeFileSync("theJson.json" ,JSON.stringify(theJson, null, 2));
}catch{
  console.log(`Something went wrong`);
};
