/**
 * Aux variables
 */
let digimon = null;
let nextStages = null;
let priorStages = null;

/**
 * Get evolutions
 * @param {*} digimonName string with digimon image
 * @param {*} level int with digimon level
 * @returns digiEvolutions obj
 */
const getDigiEvolutions = (digimonName, level) => {
    nextStages = [], priorStages = [];
    digimon = digimons.filter(digimon => digimon.img == digimonName && digimon.lv == level)[0];
    if(digimon != null) {
        for(let thisDigimon of digimons) {
            if(digimon.evolutions.includes(thisDigimon.img) && (
                thisDigimon.lv == digimon.lv + 1 ||
                thisDigimon.lv == digimon.lv ||
                // (thisDigimon.lv == 7 && digimon.lv == 3) ||
                (thisDigimon.lv >= digimon.lv && thisDigimon.stage == 9))) {
                nextStages.push(thisDigimon);
            }
            if(level > 1 && thisDigimon.evolutions.includes(digimon.img) && (
                thisDigimon.lv == level - 1 ||
                thisDigimon.lv == level ||
                // (thisDigimon.lv == 3 && digimon.lv == 7) ||
                (thisDigimon.lv <= level && digimon.stage == 9))) {
                priorStages.push(thisDigimon);
            }
        }
        return { nextStages: nextStages, priorStages: priorStages }
    }
    return [];
}

/**
 * Get authors
 * @param {*} authors array with ids
 * @returns string with authors
 */
const getAuthors = (spriteAuthors) => {
    let result = '<i class="fas fa-info-circle text-primary"></i> ' +
        `${(spriteAuthors.redesign > 0 && spriteAuthors.from > 0 ?
            spriteDescription.redesign(authors[spriteAuthors.redesign],authors[spriteAuthors.from]) :
            spriteDescription.made(authors[spriteAuthors.madeBy])) +
        (spriteAuthors.editBy > 0 ? '. '+spriteDescription.edit(authors[spriteAuthors.editBy]) : '') +
        (spriteAuthors.recolor > 0 ? '. '+spriteDescription.recolor(authors[spriteAuthors.recolor]) : '')
        }.`;
    return result.includes('undefined') ? '<i class="fas fa-exclamation-triangle text-warning"></i> Authors not found.' : result;
}

/**
 * Show element
 * @returns string with elemente id
 */
const showElement = (id) => {
    document.getElementById(id).classList.remove("d-none");
}

/**
 * Hide element
 * @returns string with elemente id
 */
const hideElement = (id) => {
    document.getElementById(id).classList.add("d-none");
}

/**
 * Get sprites without authors
 * @returns obj with sprites without authors
 */
const getSpritesWithoutAuthors = () => {
    return digimons.filter(digimon => getAuthors(digimon.authors).includes('Authors not found') );
}
