/**
 * Load digimons in page's containers
 * @param {*} sources array with digimos' obj
 */
const loadDigimons = (sources) => {
  /** If sources has digimons put them in containers */
  if (sources.length > 0) {
    /** Aux varialbes */
    let level = null;
    let firstLevelFound = [true, true, true, true, true, true, true];

    /** Clean containers */
    for (let container of digimonContainers) container.innerHTML = "";

    /** Fill containers an set headers */
    for (let digimon of sources) {
      level = digimon.lv - 1;
      if (firstLevelFound[level]) {
        digimonContainers[level].innerHTML += `<p class="mb-0 mt-5 fw-bold -fs-x-sm">Level ${level+1}</p><hr class="bg-light m-0 mb-2"></hr>`;
        firstLevelFound[level] = false;
      }
      digimonContainers[level].innerHTML += `<img class="-digimon-img" src="resources/img/sprites/x1/${digimon.hidden ? getRandomDigiEgg() : digimon.img}.png" alt="${digimon.name}" title="${digimon.name}" onclick="showDetails('${digimon.img}',${digimon.lv})">`;
    }

    /** Set margin top to first visible container */
    for (let container of digimonContainers) {
      if (container.innerHTML != "") {
        container.firstChild.classList.remove("mt-5");
        break;
      }
    }

    /** Else clean containers and shows "No search results were found" message */
  } else {
    for (let container of digimonContainers) container.innerHTML = "";
    digimonContainers[0].innerHTML += `<div class="text-light fw-bolder" role="alert">No search results were found.</div>`
  }
}

/**
 * Find digimons using filters' values
 */
const searchDigimon = () => {
  /** Get filters' values */
  let name = nameInput.value;
  let form = formInput.value;
  let attribute = attributeInput.value;
  let type = typeInput.value;

  /** Find digimons if filters aren't empty */
  if ((name != "" && name != "*") || form != "" || attribute != "" || type != "") {
    let digimonsFound = digimons.filter(digimon =>
      (name != "" ? (name.charAt(0) == '*' && name.length > 1 ? digimon.name.toLowerCase().includes(name.slice(1).toLowerCase()) : digimon.name.toLowerCase().startsWith(name.toLowerCase())) : true) &&
      (form != "" ? digimon.form == form : true) &&
      (attribute != "" ? digimon.attribute == attribute : true) &&
      (type != "" ? (digimon.type.includes('/') ? digimon.type.split('/').includes(type) : digimon.type == type) : true))
    loadDigimons(digimonsFound);

    /** Else load all digimons */
  } else {
    loadDigimons(digimons);
  }
}

/**
 * Clean filters
 */
const clearFilterDigimon = () => {
  nameInput.value = "";
  formInput.value = "";
  attributeInput.value = "";
  typeInput.value = "";
  loadDigimons(digimons);
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
    /** Aux variables */
    let preEvolutionsElements = "";
    let digiEvolutionsElements = "";

    /** Get evolutions */
    let digiEvolutions = getDigiEvolutions(digimonId, level);
    for (let digimon of digiEvolutions.priorForms) preEvolutionsElements += `<img class="-digimon-evolutions-img" src="resources/img/sprites/x2/${digimon.hidden ? getRandomDigiEgg() : digimon.img}.png" alt="${digimon.img}" onclick="showDetails('${digimon.img}',${digimon.lv});"></img>`;
    for (let digimon of digiEvolutions.nextForms) digiEvolutionsElements += `<img class="-digimon-evolutions-img" src="resources/img/sprites/x2/${digimon.hidden ? getRandomDigiEgg() : digimon.img}.png" alt="${digimon.img}" onclick="showDetails('${digimon.img}',${digimon.lv});"></img>`;

    /** Put data in elements */
    detailsName.innerHTML = `${digimonDetail.name} <span class="badge rounded-pill text-light bg-primary bg-gradient">Lv.${digimonDetail.lv}</span>`;
    detailsImg.setAttribute("src", `resources/img/sprites/x5/${digimonDetail.hidden ? getRandomDigiEgg() : digimonDetail.img}.png`);
    detailsItemImg.innerHTML = '';
    if (digimonDetail.img in digimental) {
      for (let item of digimental[digimonDetail.img].split('|')){
        detailsItemImg.innerHTML += `<div class="alert alert-info text-center p-1 -evolutions-container">
          <img class="d-block m-auto" src="resources/img/sprites/x2/${item}.png">
          <span class="badge -border-radius text-light bg-info bg-gradient" style="margin-bottom: -15px;">${item.charAt(0).toUpperCase() + item.slice(1)}</span>
        </div>`;
      }
      detailsItemImg.classList.remove("d-none");
    } else detailsItemImg.classList.add("d-none");
    detailsForm.innerHTML = forms[digimonDetail.form];
    detailsAttribute.innerHTML = attributes[digimonDetail.attribute];
    detailsType.innerHTML = digimonDetail.type;
    detailsAuthors.innerHTML = getAuthors(digimonDetail.authors);
    detailsPreevolutions.innerHTML = preEvolutionsElements.length > 0 ?
      `<span class="badge -border-radius text-light bg-info bg-gradient -evolution-header">Prior forms</span>
        <div class="alert alert-info text-center p-1 mb-2 -evolutions-container">${preEvolutionsElements}</div>` : '';
    detailsEvolutions.innerHTML = digiEvolutionsElements.length > 0 ?
      `<span class="badge -border-radius text-light bg-info bg-gradient -evolution-header">Next forms</span>
      <div class="alert alert-info text-center p-1 mb-2 -evolutions-container">${digiEvolutionsElements}</div>` : '';

    /** Show modal */
    detailsModal.show();
  }
}

/**
 * Shows toast with details' image
 */
const getBio = () => {
  html2canvas(document.querySelector("#details-container"), {
    backgroundColor: '#ffffff00'
  }).then(canvas => {
    document.getElementById("canvasBio").innerHTML = '';
    document.getElementById("canvasBio").appendChild(canvas);
    bioToast.show();
  });
}

/**
 * Fill digimon containers, prepare filters and details' modal
 */
const readyIndex = () => {
  /** Get digimon containers */
  digimonContainers = document.getElementsByName("digimon-container");

  /** Get and fill filters */
  nameInput = document.getElementById("name");
  formInput = document.getElementById("form");
  for (let form in forms) formInput.innerHTML += `<option value="${form}">${forms[form]}</option>`
  attributeInput = document.getElementById("attribute");
  for (let attribute in attributes) attributeInput.innerHTML += `<option value="${attribute}">${attributes[attribute]}</option>`
  typeInput = document.getElementById("type");
  for (let type in types) typeInput.innerHTML += `<option value="${types[type]}">${types[type]}</option>`
  buttonFilter = document.getElementById("button-filter");

  /** Get details' modal */
  detailsModal = new bootstrap.Modal(document.getElementById('details-modal'));
  detailsContainer = document.getElementById("details-container");
  detailsName = document.getElementById("details-name");
  detailsImg = document.getElementById("details-img");
  detailsItemImg = document.getElementById("details-item-img");
  detailsForm = document.getElementById("details-form");
  detailsAttribute = document.getElementById("details-attribute");
  detailsType = document.getElementById("details-type");
  detailsAuthors = document.getElementById("details-authors");
  detailsPreevolutions = document.getElementById("details-preevolutions");
  detailsEvolutions = document.getElementById("details-evolutions");

  /** Get toast */
  bioToast = new bootstrap.Toast(document.getElementById("bioToast"));

  /** Load digimons from @digimons */
  loadDigimons(digimons);
}