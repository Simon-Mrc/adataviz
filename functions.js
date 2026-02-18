export async function resetClass(sectionName){
    sectionName.classList.remove("slide-in-bounce")
    sectionName.classList.remove("smoke-disappear");
    sectionName.style.display = ``;
};

export function emptySection(section){
    section.replaceChildren();
};
// async function displayDisappear(displayed){
//   stuff.resetClass(displayed);
//   disappearWithSmoke(displayed);
// }
// function displayAppear(displayed){
//   stuff.resetClass(displayed);
//   displayed.classList.add("slide-in-bounce");
// }
