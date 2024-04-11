// for read/write
const fs = require('fs');

const superglom = require('./data/gloms.json')
users = require('./data/users.json')
proposals = require('./data/proposals.json')

main()
function main() {
    console.log(superglom.users[0])
    submitProposal("The ducks will rule the world", "BC1YLiWxwFDrEjccYmUPR5sizydUHdaJLCrUuYeaLZ5DHTJtpUciAJA")
    submitProposal("starterFile - v1 approve to place on chain", "BC1YLiJUUwY9Q5cbT1XCSVTp53piLWM3o1uCWvU8wAvG1wUVvNbupij")
    submitProposal("let @DiamondThumb put first wave of code blocks in TheLibrary - without group vetting", "BC1YLiJUUwY9Q5cbT1XCSVTp53piLWM3o1uCWvU8wAvG1wUVvNbupij")
    submitProposal("set up OpenFund for Glombrella-1 - @degen_doge set it up .. shared seed(for now). Glombrella-2 will be with LOST seed", "BC1YLiJUUwY9Q5cbT1XCSVTp53piLWM3o1uCWvU8wAvG1wUVvNbupij")
}




/**
 * Start workflow of submission
 * @param {*} statement 
 * @param {*} submittor_id 
 * @param {*} expiration_days number of days until a proposal finishes
 */
function submitProposal(statement, submittor_id, expiration_days=5) {
    glom_id = findGlomId(superglom, submittor_id)
    console.log(proposals);
    new_proposal = {
        "statement": statement,
        "assigned_glom":glom_id,
        "resolved": false,
        "choices": ["yes", "no"],
        "decision": 0,
        "date_submitted":Date.now, 
        "expiration_date":Date.now + expiration_days // get date of voting expiration
    }
    proposals.push(new_proposal);
    fs.writeFileSync('./data/proposals.json', JSON.stringify(proposals, null, 2));
}

function giveBadge(user_id,) {

}

/*=========Helper Methods=============

*/

/**
 * Recursive method to find the id of the glom a user submits
 * @param {*} glom 
 * @param {*} user_id 
 * @returns glom_id
 */
function findGlomId(glom, user_id) {
    console.log(glom)
    for (const user of glom.users) {
        if (user_id === user.user_id) {
            return glom.glom_id
        }
    }
    // user id is not in current glom, must dig deeper
    if (glom.children) {
        for (child_glom in glom.children) {
            findGlomId(child_glom, user_id);
        }
    } else {
        return 0;
    }
}

