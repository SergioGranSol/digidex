/**
 * Load digimons in page's containers
 * @param {*} sources array with digimos' obj
 */
const loadDigimons = (sources) => {
  /** If sources has digimons put them in containers */
  if (sources.length > 0) {
    /** Aux varialbes */
    let stage = null;
    let firstStageFound = new Array(stages.length).fill(false);

    /** Clean containers */
    for (let container of digimonContainers) {
      if (dataLoaded){
        for (let children of container.children) hideElement(children.id);
      } else {
        container.innerHTML = "";
      }
    }

    /** Fill containers an set headers */
    for (let digimon of sources) {
      stage = digimon.stage - 1;
      if (!firstStageFound[stage]) {
        if (dataLoaded){
          showElement(`stage-header-${stage+1}`);
        } else {
          digimonContainers[stage].innerHTML += `<div id="stage-header-${stage+1}"><p class="mb-0 mt-5 fw-bold -fs-x-sm">${stages[stage+1]}</p><hr class="bg-light m-0 mb-2"></div>`;
        }
        firstStageFound[stage] = true;
      }
      if (dataLoaded){
        showElement(digimon.img);
      } else {
        digimonContainers[stage].innerHTML += `<img class="-digimon-img" src="resources/img/sprites/x1/${digimon.img}.png" alt="${digimon.name}" title="${digimon.name}" id="${digimon.img}" onclick="showDetails('${digimon.img}',${digimon.lv})">`;
      }
    }
    hideElement("digimon-not-found");

    /** Set data loaded flag */
    dataLoaded = true;

    /** Else clean containers and shows "No search results were found" message */
  } else {
    if (dataLoaded){
      for (let container of digimonContainers) {
        for (let children of container.children) {
          hideElement(children.id);
        }
      }
      showElement("digimon-not-found");
      document.getElementById("digimon-not-found").innerHTML = "No search results were found.";
    } else {
      for (let container of digimonContainers) container.innerHTML = "";
    }
  }
}

/**
 * Find digimons using filters' values
 */
const searchDigimon = () => {
  /** Get filters' values and shows inputs as active */
  let name = nameInput.value;
  if (name != "" && name != "*") {
    nameInput.previousElementSibling.classList.add("bg-info");
  } else nameInput.previousElementSibling.classList.remove("bg-info");

  let stage = stageInput.value;
  if (stage != "") {
    stageInput.previousElementSibling.classList.add("bg-info");
  } else stageInput.previousElementSibling.classList.remove("bg-info");

  let attribute = attributeInput.value;
  if (attribute != "") {
    attributeInput.previousElementSibling.classList.add("bg-info");
  } else attributeInput.previousElementSibling.classList.remove("bg-info");

  let type = typeInput.value;
  if (type != "") {
    typeInput.previousElementSibling.classList.add("bg-info");
  } else typeInput.previousElementSibling.classList.remove("bg-info");

  let evolutionRequirement = evolutionRequirementInput.value;
  if (evolutionRequirement != "") {
    evolutionRequirementInput.previousElementSibling.classList.add("bg-info");
  } else evolutionRequirementInput.previousElementSibling.classList.remove("bg-info");

  let version = versionInput.value;
  if (version != "") {
    versionInput.previousElementSibling.classList.add("bg-info");
    if (version == 2) versionFromInput.disabled = false;
    else {
      versionFromInput.disabled = true;
      versionFromInput.value = "";
      versionFromInput.previousElementSibling.classList.remove("bg-info");
    }
  } else {
    versionInput.previousElementSibling.classList.remove("bg-info");
    versionFromInput.disabled = true;
    versionFromInput.value = "";
    versionFromInput.previousElementSibling.classList.remove("bg-info");
  }

  let versionFrom = versionFromInput.value;
  if (versionFrom != "") {
    versionFromInput.previousElementSibling.classList.add("bg-info");
  } else versionFromInput.previousElementSibling.classList.remove("bg-info");

  let author = authorInput.value;
  if (author != "") {
    authorInput.previousElementSibling.classList.add("bg-info");
  } else authorInput.previousElementSibling.classList.remove("bg-info");

  buttonFilter.classList.remove("d-none");

  /** Find digimons if filters aren't empty */
  if ((name != "" && name != "*") || stage != "" || attribute != "" || type != "" || evolutionRequirement != "" || version != "" || versionFrom != "" || author != "") {
    let digimonsFound = digimons.filter(digimon =>
      (name != "" ? (name.charAt(0) == '*' && name.length > 1 ? digimon.name.toLowerCase().includes(name.slice(1).toLowerCase()) : digimon.name.toLowerCase().startsWith(name.toLowerCase())) : true) &&
      (stage != "" ? digimon.stage == stage : true) &&
      (attribute != "" ? digimon.attribute == attribute : true) &&
      (type != "" ? (digimon.type.includes('/') ? digimon.type.split('/').includes(type) : digimon.type == type) : true) &&
      (evolutionRequirement != "" ? digimon.evolutionRequirement.includes(evolutionRequirement) : true) &&
      (version != "" ? (version == 1 ? digimon.version == "" : version == 2 ? digimon.version != "" : false ) : true) &&
      (versionFrom != "" ? digimon.version == versionFrom : true) &&
      (author != "" ? (author == digimon.authors.madeBy || author == digimon.authors.editBy || author == digimon.authors.redesign) : true))
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
   /** Get filters' values */
  let name = nameInput.value;
  let stage = stageInput.value;
  let attribute = attributeInput.value;
  let type = typeInput.value;
  let evolutionRequirement = evolutionRequirementInput.value;
  let version = versionInput.value;
  let author = authorInput.value;
  if (name != "" || stage != "" || attribute != "" || type != "" || evolutionRequirement != "" || version != "" || author != "") {
    nameInput.value = "";
    stageInput.value = "";
    attributeInput.value = "";
    typeInput.value = "";
    evolutionRequirementInput.value = "";
    versionInput.value = "";
    versionFromInput.value = "";
    authorInput.value = "";
    nameInput.previousElementSibling.classList.remove("bg-info");
    stageInput.previousElementSibling.classList.remove("bg-info");
    attributeInput.previousElementSibling.classList.remove("bg-info");
    typeInput.previousElementSibling.classList.remove("bg-info");
    evolutionRequirementInput.previousElementSibling.classList.remove("bg-info");
    versionInput.previousElementSibling.classList.remove("bg-info");
    versionFromInput.previousElementSibling.classList.remove("bg-info");
    versionFromInput.disabled = true;
    authorInput.previousElementSibling.classList.remove("bg-info");
    buttonFilter.classList.add("d-none");
    loadDigimons(digimons);
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
    /** Aux variables */
    let evolutionRequirementElements = "";
    let preEvolutionsElements = "";
    let digiEvolutionsElements = "";

    /** Get evolutions */
    let digiEvolutions = getDigiEvolutions(digimonId, level);
    for (let digimon of digiEvolutions.priorStages) preEvolutionsElements += `<img class="-digimon-evolutions-img" src="resources/img/sprites/x2/${digimon.img}.png" alt="${digimon.img}" onclick="showDetails('${digimon.img}',${digimon.lv});"></img>`;
    for (let digimon of digiEvolutions.nextStages) digiEvolutionsElements += `<img class="-digimon-evolutions-img" src="resources/img/sprites/x2/${digimon.img}.png" alt="${digimon.img}" onclick="showDetails('${digimon.img}',${digimon.lv});"></img>`;
    if (digimonDetail.evolutionRequirement) {
      for (let [i, requirement] of digimonDetail.evolutionRequirement.split('/'). entries()){
        evolutionRequirementElements += (i != 0 ? (requirement.includes('miracles') || requirement.includes('fate') ? 'or' : '&') : '') + `<span class="badge -border-radius text-light bg-info bg-gradient m-1">${requirement}</span>`;
      }
    }

    /** Put data in elements */
    detailsName.innerHTML = `${digimonDetail.name} <span class="badge rounded-pill text-light bg-primary bg-gradient">Lv.${digimonDetail.lv}</span>`;
    detailsImg.setAttribute("src", `resources/img/sprites/x5/${digimonDetail.img}.png`);
    detailsImg.setAttribute("alt", digimonDetail.name);
    detailsStage.innerHTML = stages[digimonDetail.stage];
    detailsAttribute.innerHTML = attributesIcons[digimonDetail.attribute] + attributes[digimonDetail.attribute];
    detailsType.innerHTML = digimonDetail.type;
    detailsEvolutionRequirement.innerHTML = digimonDetail.evolutionRequirement ?
      `<span class="badge -border-radius text-light bg-primary bg-gradient">Digievolution requirement</span> :
      ${evolutionRequirementElements} <hr class="m-2">` : '';
    detailsPreevolutions.innerHTML = preEvolutionsElements.length > 0 ?
      `<span class="badge -border-radius text-light bg-info bg-gradient -evolution-header">Prior stages</span>
      <div class="alert alert-info text-center p-1 mb-2 -evolutions-container">${preEvolutionsElements}</div>` : '';
    detailsEvolutions.innerHTML = digiEvolutionsElements.length > 0 ?
      `<span class="badge -border-radius text-light bg-info bg-gradient -evolution-header">Next stages</span>
      <div class="alert alert-info text-center p-1 mb-2 -evolutions-container">${digiEvolutionsElements}</div>` : '';
    detailsVersion.innerHTML = '<span class="fas fa-info-circle text-info"></span> Version: ' + (!digimonDetail.version ? 'Official digimon' : `${digimonDetail.version}`);
    detailsAuthors.innerHTML = getAuthors(digimonDetail.authors);

    /** Change modal size */
    if(digimonDetail.stage < 3) {
      detailsModalElement.firstElementChild.classList.remove('modal-lg');
      detailsModalElement.firstElementChild.classList.add('modal-md');
    } else {
      detailsModalElement.firstElementChild.classList.add('modal-lg');
      detailsModalElement.firstElementChild.classList.remove('modal-md');
    }

    /** Show modal */
    detailsModal.show();
  }
}

/**
 * Show go to top button
 */
const scrollFunction = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

/**
 * Scroll to the top of the document
 */
const goToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/**
 * Fill digimon containers, prepare filters and details' modal
 */
let dataLoaded = false;
window.onscroll = () => scrollFunction();
const readyIndex = () => {
  /** Get digimon containers */
  digimonContainers = document.getElementsByName("digimon-container");

  /** Get and fill filters */
  nameInput = document.getElementById("name");
  stageInput = document.getElementById("stage");
  for (let stage in stages) stageInput.innerHTML += `<option value="${stage}">${stages[stage]}</option>`
  attributeInput = document.getElementById("attribute");
  for (let attribute in attributes) attributeInput.innerHTML += `<option value="${attribute}">${attributes[attribute]}</option>`
  typeInput = document.getElementById("type");
  for (let type in types) typeInput.innerHTML += `<option value="${types[type]}">${types[type]}</option>`
  evolutionRequirementInput = document.getElementById("evolutionRequirement");
  for (let evolutionRequirement in evolutionRequirements) evolutionRequirementInput.innerHTML += `<option value="${evolutionRequirements[evolutionRequirement]}">${evolutionRequirements[evolutionRequirement]}</option>`
  versionInput = document.getElementById("version");
  versionInput.innerHTML += `<option value="1">Official</option>`
  versionInput.innerHTML += `<option value="2">Alternative</option>`
  versionFromInput = document.getElementById("from");
  for (let version in versions) versionFromInput.innerHTML += `<option value="${versions[version]}">${versions[version]}</option>`
  authorInput = document.getElementById("author");
  for (let author in authors) authorInput.innerHTML += `<option value="${author}">${authors[author]}</option>`
  buttonFilter = document.getElementById("filter-button");

  /** Get details' modal */
  detailsModalElement = document.getElementById('details-modal');
  detailsModal = new bootstrap.Modal(detailsModalElement);
  detailsContainer = document.getElementById("details-container");
  detailsName = document.getElementById("details-name");
  detailsImg = document.getElementById("details-img");
  detailsEvolutionRequirement = document.getElementById("details-evolution-requirement");
  detailsStage = document.getElementById("details-stage");
  detailsAttribute = document.getElementById("details-attribute");
  detailsType = document.getElementById("details-type");
  detailsVersion = document.getElementById("details-version");
  detailsAuthors = document.getElementById("details-authors");
  detailsPreevolutions = document.getElementById("details-preevolutions");
  detailsEvolutions = document.getElementById("details-evolutions");
  backToTopButton = document.getElementById("backToTop-button");

  /** Load digimons from @digimons */
  loadDigimons(digimons);
}