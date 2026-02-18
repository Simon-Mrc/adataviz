import './style.css';
import * as stuff from "../functions.js";

async function getTheApi() {
  const json = await fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/femmes-illustres-a-paris-portraits/records?limit=100`);
  const theJson = await json.json();
  return theJson;
}
const theJson = await getTheApi();
console.log(theJson.results.length);
let j = 0; // last index of displayed infos
const searchBarSection = document.querySelector("#searchBarSection");
const loadingScreen = document.querySelector("#loadingScreen");
const displaySection = document.querySelector("#displaySection");
const seeMoreSection = document.querySelector("#seeMoreSection");
const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", () =>{
  const inPut = document.querySelector("#input").value;
  launchSearch(inPut);
})
const loadMoreButton = document.getElementById("loadMore");
loadMoreButton.addEventListener("click", fiveMore);

function disappearWithSmoke(element) {
  return new Promise((resolve) => {
    element.classList.add('smoke-disappear');
    
    element.addEventListener('animationend', () => {
      element.style.display = 'none';
      resolve();
    }, { once: true });
  });
}

function fiveMore(){
  for (let i = j ; i < j+5 ; i = i + 1){
    const divBox = document.createElement(`div`);
    const photoUrl = document.createElement(`img`);
    const divBoxMini = document.createElement(`div`);
    const titre = document.createElement(`h1`);
    const description = document.createElement(`p`);
    const button = document.createElement(`button`);
    
    divBox.classList.add(`containerBox`);
    photoUrl.src = theJson.results[i].photos.url; 
    divBoxMini.classList.add(`containerBox2`);
    titre.textContent = theJson.results[i].name;
    description.textContent = theJson.results[i].desc1;
    button.addEventListener("click", () =>{
      seeMore(i);
    });
    button.textContent = "See More";

    displaySection.appendChild(divBox);
    divBox.appendChild(photoUrl);
    divBox.appendChild(divBoxMini);
    divBoxMini.appendChild(titre);
    divBoxMini.appendChild(description);
    divBoxMini.appendChild(button);
  }
j = j + 5 //used to start display at stopped state
};
fiveMore();

async function launchSearch(searchString){ // searchString probably the result of an input
  const searchArray = [];// To fill with appropriate content from json depending on search
  for (let i = 0 ; i < theJson.results.length ; i = i + 1){
    let check = 0;
    if (theJson.results[i]["name"].toLowerCase().includes(searchString.toLowerCase().trim()) == true){
      check = 1;
      searchArray.push(i);
    }
  }
  for (let i = 0 ; i < theJson.results.length ; i = i + 1){
    let h = 1;
    let check = 0;
    while(theJson.results[i][`desc${h}`] != null && theJson.results[i][`desc${h}`] != undefined){
      if (theJson.results[i][`desc${h}`].toLowerCase().includes(searchString.toLowerCase().trim()) == true){
        check = 1;
      }    
      h = h + 1;
    }
    if(check == 1){
      if(!searchArray.includes(i)){
        searchArray.push(i);

      }
    }
  }
  searchBarSection.replaceChildren();
  const namecheck = [];
  for (let i = 0 ; i < searchArray.length ; i = i + 1){
    if(!namecheck.includes(theJson.results[searchArray[i]].name)){
    
      namecheck.push(theJson.results[searchArray[i]].name);
      const divBox = document.createElement(`div`);
      const photoUrl = document.createElement(`img`);
      const divBoxMini = document.createElement(`div`);
      const titre = document.createElement(`h1`);
      const description = document.createElement(`p`);
      const button = document.createElement(`button`);
      
      divBox.classList.add(`containerBox`);
      photoUrl.src = theJson.results[searchArray[i]].photos.url; 
      divBoxMini.classList.add(`containerBox2`);
      titre.textContent = theJson.results[searchArray[i]].name;
      description.textContent = theJson.results[searchArray[i]].desc1;
      button.addEventListener("click", () =>{
        seeMore(searchArray[i]);
      });
      button.textContent = "See More";
      
      searchBarSection.appendChild(divBox);
      divBox.appendChild(photoUrl);
      divBox.appendChild(divBoxMini);
      divBoxMini.appendChild(titre);
      divBoxMini.appendChild(description);
      divBoxMini.appendChild(button);
    }
        
    }
  if (displaySection.style.display != 'none'){
    stuff.resetClass(displaySection);
    await disappearWithSmoke(displaySection);
    searchBarSection.classList.add("slide-in-bounce");
  }
  if (searchBarSection.style.display != ''){
    
  }
  if (seeMoreSection.style.display != ''){
    
  }
};

async function seeMore(index){ // value is stored in correct button already.
  stuff.emptySection(seeMoreSection);
  const divBox = document.createElement(`div`);
  const photoUrl = document.createElement(`img`);
  const divBoxMini = document.createElement(`div`);
  const titre = document.createElement(`h1`);
  const description = document.createElement(`p`);
  const button = document.createElement(`button`);
  
  divBox.classList.add(`containerBox`);
  photoUrl.src = theJson.results[index].photos.url; 
  divBoxMini.classList.add(`containerBox2`);
  titre.textContent = theJson.results[index].name;
  let j = 1;
  while(theJson.results[index][`desc${j}`] != null && theJson.results[index][`desc${j}`] != undefined){
    description.textContent = description.textContent + theJson.results[index][`desc${j}`];
    j = j + 1;
  }
  button.addEventListener("click", () =>{
    seeLess();
  });
  button.textContent = "See Less";

  seeMoreSection.appendChild(divBox);
  divBox.appendChild(photoUrl);
  divBox.appendChild(divBoxMini);
  divBoxMini.appendChild(titre);
  divBoxMini.appendChild(description);
  divBoxMini.appendChild(button);

  stuff.resetClass(displaySection);
  loadMoreButton.classList.add("hidden");
  await disappearWithSmoke(displaySection);
  stuff.resetClass(seeMoreSection);
  seeMoreSection.classList.add("slide-in-bounce");
  // displaySection.style.display = '';

};

async function seeLess(){
  // displaySection.style.display = '';
  stuff.resetClass(seeMoreSection);
  await disappearWithSmoke(seeMoreSection);
  stuff.resetClass(displaySection);
  displaySection.classList.add("slide-in-bounce");
  loadMoreButton.classList.remove("hidden");
};