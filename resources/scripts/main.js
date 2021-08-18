/**
 * Fill digimon containers and prepare elements
 */
const readyIndex = () => {

  formsTabs = [...document.querySelectorAll(`[aria-controls|="nav"`)];
  for(const [i, formTab] of formsTabs.entries()){
    formTab.setAttribute('onclick', `loadDigimons(digimons, ${i})`);
  }

  /** Get digimon containers */
  digimonContainers = [...document.querySelectorAll(`[data-element|="digimon-container"]`)];

  // /** Get and fill filters */
  nameInput = document.getElementById("digidex-search-name");
  attributeInput = document.getElementById("digidex-search-attribute");
  nameLabel = document.getElementById("digidex-label-name");
  attributeLabel = document.getElementById("digidex-label-attribute");

  /** Get detail elements */
  detailsName = document.getElementById("details-name");
  detailsImg = document.getElementById("details-img");
  detailsItemImg = document.getElementById("details-item-img");
  detailsForm = document.getElementById("details-form");
  detailsLevel = document.getElementById("details-level");
  detailsAttribute = document.getElementById("details-attribute");
  detailsType = document.getElementById("details-type");
  detailsVersion = document.getElementById("details-version");
  detailsAuthors = document.getElementById("details-authors");

  /** Load sprites from @digimons */
  loadDigimons(digimons, 0);
}