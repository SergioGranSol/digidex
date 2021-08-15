const digimons = (() => {
  let db = [];
  for (let i = 0; i < MINI_DB.length; i++) {
    let digimonDetails = MINI_DB[i].split("|");
    db.push({
      name: digimonDetails[0],
      img: digimonDetails[1],
      lv: parseInt(digimonDetails[2]),
      type: digimonDetails[3],
      form: parseInt(digimonDetails[4]),
      digimental: digimonDetails[5],
      fusion: digimonDetails[6] === 'true',
      attribute: parseInt(digimonDetails[7]),
      evol: digimonDetails[8].split(","),
      authors: {
        madeBy: parseInt(digimonDetails[9]),
        editBy: parseInt(digimonDetails[10]),
        recolor: parseInt(digimonDetails[11]),
        redesign: parseInt(digimonDetails[12]),
        from: parseInt(digimonDetails[13])
      },
      hidden: digimonDetails[14] === 'true'
    });
  }
  return db.sort((previous, index) => (previous.img > index.img) ? 1 : -1);
})();

const attributes = {
  1: "Vaccine",
  2: "Virus",
  3: "Data",
  4: "Free",
  5: "Unknown",
  6: "Variable"
}

const forms = {
  1: "Fresh",
  2: "In-Training",
  3: "Rookie",
  4: "Champion",
  5: "Ultimate",
  6: "Mega",
  7: "Ultra",
  8: "Hybrid",
  9: "Armor"
}

const types = (() => {
  let db = [];
  for (let i = 0; i < MINI_DB_TYPES.length; i++) {
    let subOptions = MINI_DB_TYPES[i].split('/');
    if (subOptions.length == 1) {
      db.push(subOptions[0])
    } else {
      for (let subOp of subOptions) {
        if (!db.includes(subOp)) db.push(subOp);
      }
    }
  }
  return db.sort((previous, index) => (previous > index) ? 1 : -1);
})();

const authors = {
  1: 'Zebub',
  2: 'Dragonrod342',
  3: 'SergioGranSol',
  4: 'Lucho9',
  5: 'Opdisk',
  6: 'CadejoWhite',
  7: 'Topaz66',
  8: 'Arcanin1412',
  9: 'Neroesaurus',
  10: 'Demo9ic',
  11: 'BowchersDrawners',
  12: 'Matykiller',
  13: 'Sharkmon',
  14: 'WolfryHedgies',
  15: 'Maxtyrannus',
  16: 'Digimon games',
  17: 'Detcher',
  18: 'ScorchedDragonStudio',
  19: 'Pepino978',
  20: 'VictoryD',
  21: 'Extyrannomon'
}

const description = {
  redesign: (name, name2) =>
    `Sprite ${name == authors[16] ? 'from' : 'made by'} <span class="fst-italic">${name}</span> based on <span class="fst-italic">${name2}</span>${name2.charAt(name2.length-1) == 's' ? '\'' : '\'s'} art`,
  made: name => `Sprite ${name == authors[16] ? 'from' : 'made by'} <span class="fst-italic">${name}</span>`,
  edit: name => `Edit by <span class="fst-italic">${name}</span>`,
  recolor: name => `This sprite is recolored`
}