export async function resetClass(sectionName){
    sectionName.classList.remove("slide-in-bounce")
    sectionName.classList.remove("smoke-disappear");
    sectionName.style.display = ``;
};

export function emptySection(section){
    section.replaceChildren();
};