/**
 * Load digimons in page's containers
 * @param {*} sources array with digimos' obj
 */
const loadDigimons = (sources, form) => {
  formContainer = digimonContainers[form];
  /** If sources has digimons put them in containers */
  if (formContainer.getAttribute("data-loaded") === 'false' && sources.length > 0 && form >= 0) {
    /** Fill containers an set headers */
    for (let digimon of sources) {
      if (digimon.form == form + 1){
        formContainer.innerHTML += `
        <div class="position-relative -digimon -box-${forms[form+1].toLowerCase().replace("-","")}" onclick="showDetails('${digimon.img}',${digimon.lv})">
          <img class="position-absolute bottom-0 start-50 translate-middle-x" src="resources/img/sprites/x1/${digimon.hidden ? getRandomDigiEgg() : digimon.img}.png" alt="${digimon.name}" title="${digimon.name}">
        </div>`;
      }
    }
    formContainer.setAttribute("data-loaded","true")
  }
}

/**
 * Show details' modal
 * @param {*} digimonId string with digimon's image
 * @param {*} level int with digimon's level
 */
const showDetails = (digimonId, level) => {
  /** Get digimon data */
  let digimonDetail = digimons.filter(eachDigimon => eachDigimon.img == digimonId && eachDigimon.lv == level)[0];

  /** If find digimon show modal */
  if (digimonDetail != []) {
    /** Put data in elements */
    detailsName.innerHTML = `${digimonDetail.name}`;
    detailsImg.setAttribute("src", `resources/img/sprites/x2/${digimonDetail.hidden ? getRandomDigiEgg() : digimonDetail.img}.png`);
    detailsItemImg.innerHTML = '';
    if (digimonDetail.digimental) {
      for (let item of digimonDetail.digimental.split('/')){
        detailsItemImg.innerHTML += `<div class="mt-1"><div class="position-relative -details-item-img text-center p-1">
          <img class="position-absolute top-50 start-50 translate-middle" src="resources/img/sprites/x2/${item}.png">
        </div></div>`;
      }
      detailsItemImg.classList.remove("d-none");
    } else detailsItemImg.classList.add("d-none");
    detailsForm.innerHTML = forms[digimonDetail.form];
    detailsLevel.innerHTML = digimonDetail.lv;
    detailsAttribute.innerHTML = attributes[digimonDetail.attribute];
    detailsType.innerHTML = digimonDetail.type;
    detailsAuthors.innerHTML = getAuthors(digimonDetail.authors);
  }
}

/**
 * Fill digimon containers, prepare filters and details' modal
 */
const readyIndex = () => {

  formsTabs = [...document.querySelectorAll(`[aria-controls|="nav"`)];
  for(const [i, formTab] of formsTabs.entries()){
    formTab.setAttribute('onclick', `loadDigimons(digimons, ${i})`);
  }

  /** Get digimon containers */
  digimonContainers = [...document.querySelectorAll(`[data-element|="digimon-container"]`)];

  // /** Get and fill filters */
  // nameInput = document.getElementById("name");
  // formInput = document.getElementById("form");
  // for (let form in forms) formInput.innerHTML += `<option value="${form}">${forms[form]}</option>`
  // attributeInput = document.getElementById("attribute");
  // for (let attribute in attributes) attributeInput.innerHTML += `<option value="${attribute}">${attributes[attribute]}</option>`
  // typeInput = document.getElementById("type");
  // for (let type in types) typeInput.innerHTML += `<option value="${types[type]}">${types[type]}</option>`
  // buttonFilter = document.getElementById("button-filter");

  /** Get details' modal */
  // detailsModal = new bootstrap.Modal(document.getElementById('details-modal'));
  // detailsContainer = document.getElementById("details-container");
  detailsName = document.getElementById("details-name");
  detailsImg = document.getElementById("details-img");
  detailsItemImg = document.getElementById("details-item-img");
  detailsForm = document.getElementById("details-form");
  detailsLevel = document.getElementById("details-level");
  detailsAttribute = document.getElementById("details-attribute");
  detailsType = document.getElementById("details-type");
  detailsAuthors = document.getElementById("details-authors");
  // detailsPreevolutions = document.getElementById("details-preevolutions");
  // detailsEvolutions = document.getElementById("details-evolutions");

  // /** Get toast */
  // bioToast = new bootstrap.Toast(document.getElementById("bioToast"));

  /** Load sprites from @digimons */
  loadDigimons(digimons, 0);
}