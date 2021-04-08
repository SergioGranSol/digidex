/**
 * Aux variables
 */
let digimon = null;
let nextForms = null;
let priorForms = null;

/**
 * Get evolutions
 * @param {*} digimonName string with digimon image
 * @param {*} level int with digimon level
 * @returns digiEvolutions obj
 */
const getDigiEvolutions = (digimonName, level) => {
    nextForms = [], priorForms = [];
    digimon = digimons.filter(digimon => digimon.img == digimonName && digimon.lv == level)[0];
    if(digimon != null) {
        for(let thisDigimon of digimons) {
            if(digimon.evol.includes(thisDigimon.img) && (
                thisDigimon.lv == digimon.lv + 1 ||
                thisDigimon.lv == digimon.lv ||
                (thisDigimon.lv >= digimon.lv && thisDigimon.form == 9))) {
                nextForms.push(thisDigimon);
            }
            if(level > 1 && thisDigimon.evol.includes(digimon.img) && (
                thisDigimon.lv == level - 1 ||
                thisDigimon.lv == level ||
                (thisDigimon.lv <= level && digimon.form == 9))) {
                priorForms.push(thisDigimon);
            }
        }
        return { nextForms: nextForms, priorForms: priorForms }
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
            description.redesign(authors[spriteAuthors.redesign],authors[spriteAuthors.from]) :
            description.made(authors[spriteAuthors.madeBy])) +
        (spriteAuthors.editBy > 0 ? '. '+description.edit(authors[spriteAuthors.editBy]) : '') +
        (spriteAuthors.recolor > 0 ? '. '+description.recolor(authors[spriteAuthors.recolor]) : '')
        }.`;
    return result.includes('undefined') ? '<i class="fas fa-exclamation-triangle text-warning"></i> Authors not found.' : result;
}

/**
 * Get rando DigiEgg
 * @returns string with random digiEgg
 */
const getRandomDigiEgg = () => {
    return 'digiegg_'+['black','blue','green','purple','red','yellow'][Math.floor(Math.random() * 6)];
}

// const getSpritesWithoutAuthors = () => {
//     return digimons.filter(digimon => getAuthors(digimon.authors).includes('undefined') );
// }