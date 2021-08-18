/**
 * Load digimons in page's containers
 * @param {*} sources array with digimos' obj
 * @param {*} form number of digimo form
 */
const loadDigimons = (sources, form) => {
  formContainer = digimonContainers[form];
  /** If sources has digimons and container is not loaded previusly */
  if (formContainer.getAttribute("data-loaded") === 'false' && sources.length > 0 && form >= 0) {
    /** Fill choosen container */
    for (let [index, digimon] of sources.entries()) {
      if (digimon.form == form + 1){
        formContainer.innerHTML += `
          <div name="digimon-box" class="position-relative -digimon" digidex-name="${digimon.name}" digidex-attribute="${attributes[digimon.attribute].toLowerCase().replace("-","")}" onclick="showDetails(${index})">
            <i class="${!digimon.version ? 'fas fa-sun text-warning' : 'fas fa-certificate text-info'} position-absolute top-0 start-0 translate-middle -z-100"></i>
            <img class="position-absolute bottom-0 start-50 translate-middle-x" ${digimon.adjustment ? `style="margin: 0 0 -${digimon.adjustment.split(',')[0]}px ${digimon.adjustment.split(',')[1]}px"` : ''}
              src="resources/img/sprites/x${digimon.form == 1 ? '2': '1'}/${digimon.hidden ? getRandomDigiEgg() : digimon.img}.png" alt="${digimon.name}" title="${digimon.name}">
          </div>`;
      }
    }
    formContainer.setAttribute("data-loaded","true");
    /** If search is activate, filter new content */
    if (nameInput.value.trim().toLowerCase() != '' || attributeInput.value.trim().toLowerCase() != '') {
      searchDigimon();
    }
  }
}

/**
 * Find digimons using filters' values
 */
const searchDigimon = () => {
  /** Get filters' values and items */
  let name = nameInput.value.trim().toLowerCase();
  let attribute = attributeInput.value.trim().toLowerCase();
  let digimonBoxes = [...document.querySelectorAll(`[name="digimon-box"]`)];
  let nameInBox = '';
  let attributeInBox = '';
  let filterActiveName = false;
  let filterActiveAttribute = false;

  /** Activate label filters */
  nameLabel.classList.add(name != '' ? "bg-primary" : "bg-info");
  nameLabel.classList.remove(name != '' ? "bg-info" : "bg-primary");
  attributeLabel.classList.add(attribute != '' ? "bg-primary" : "bg-info");
  attributeLabel.classList.remove(attribute != '' ? "bg-info" : "bg-primary");

  /** Loop in items and find matches */
  for (let digimon of digimonBoxes) {
    nameInBox = digimon.getAttribute("digidex-name").trim().toLowerCase();
    attributeInBox = digimon.getAttribute("digidex-attribute").trim().toLowerCase();
    filterActiveName = name != '' ? nameInBox.startsWith(name) : true;
    filterActiveAttribute = attribute != '' ? attributeInBox.startsWith(attribute) : true;
    if (filterActiveName & filterActiveAttribute) {
      digimon.classList.remove("d-none");
    } else {
      digimon.classList.add("d-none");
    }
  }
}

/**
 * Show details
 * @param {*} digimonIndex number with digimon's index
 */
const showDetails = (digimonIndex) => {
  /** Get digimon data */
  let digimonDetail = digimons[digimonIndex > 0 ? digimonIndex : 0];

  /** If find digimon show details */
  if (digimonDetail != []) {
    /** Put data in elements */
    detailsName.innerHTML = `${digimonDetail.name}`;
    detailsImg.setAttribute("src", `resources/img/sprites/x5/${digimonDetail.hidden ? getRandomDigiEgg() : digimonDetail.img}.png`);
    detailsImg.setAttribute("alt", digimonDetail.name);
    detailsImg.setAttribute("title", digimonDetail.name);
    detailsItemImg.innerHTML = '';
    if (digimonDetail.digimental || digimonDetail.fusion) {
      if(digimonDetail.digimental){
        for (let item of digimonDetail.digimental.split('/')){
          detailsItemImg.innerHTML += `<div class="mt-1"><div class="position-relative -details-item-img text-center p-1">
            <img class="position-absolute top-50 start-50 translate-middle" src="resources/img/sprites/x2/${item.toLowerCase()}.png">
          </div></div>`;
        }
      }
      if(digimonDetail.fusion) {
        detailsItemImg.innerHTML += `<div class="mt-1"><div class="position-relative -details-item-img text-center p-1">
          <img class="position-absolute top-50 start-50 translate-middle" src="resources/img/sprites/x2/dna.png">
        </div></div>`;
      }
      detailsItemImg.classList.remove("d-none");
    } else detailsItemImg.classList.add("d-none");
    detailsForm.innerHTML = digimonDetail.form ? forms[digimonDetail.form] : '&nbsp;';
    detailsLevel.innerHTML = digimonDetail.lv ? digimonDetail.lv : '&nbsp;';
    detailsAttribute.innerHTML = digimonDetail.attribute ? attributesIcons[digimonDetail.attribute] + attributes[digimonDetail.attribute] : '&nbsp;';
    detailsType.innerHTML = digimonDetail.type ? digimonDetail.type : '&nbsp;';
    detailsVersion.innerHTML = !digimonDetail.version ? '<span class="fas fa-sun text-warning"></span> Official digimon' : `<span class="fas fa-certificate text-info"></span> ${digimonDetail.version}`;
    detailsAuthors.innerHTML = getAuthors(digimonDetail.authors);
  }
}
