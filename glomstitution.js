
const { /*Proposal status: */ REJECTED, REVIEW, IN_PROGRESS, COMPLETED, /* proposal type: */ WORK_ORDER, GLOM_INFO } = require('./data/constants')

// for read/write
const fs = require('fs');

// Import existing data
const superglom = require('./data/gloms.json');
const { error } = require('console');
users = require('./data/users.json')
proposals = require('./data/proposals.json')

// Global variables
var proposal_counter = 0;


/**================================ Program start =========================================
 *
 */
main()
function main() {
    console.log(superglom.users[0])
    console.log(users)
    clearProposals()
    submitProposal("The ducks will rule the world", "degen_doge")
    submitProposal("starterFile - v1 approve to place on chain", submittor="DiamondThumb")
    submitProposal("let @DiamondThumb put first wave of code blocks in TheLibrary - without group vetting", "DiamondThumb")
    submitProposal("set up OpenFund for Glombrella-1 - @degen_doge set it up .. shared seed(for now). Glombrella-2 will be with LOST seed", "DiamondThumb")
    submitProposal("camelCase or snake_case for variable names", "degen_doge")
    
    submit_vote(0, "degen_doge", 1)
    submit_vote(0, "DiamondThumb", 1)
    submit_vote(0, "", 1)
}

function giveBadge(user_id,) {

}

function yield_decision() {

}

/**
 * 
 * @param {*} proposal_id 
 * @param {*} submittor 
 * @param {*} decision // dependent on choices[] array when proposal was created
 * @param {*} submittor_addr 
 * @returns 
 */
function submit_vote(proposal_id, submittor, choice, submittor_addr=null) {
        // Parameter Validation: allow user to submit username or address
    if (submittor_addr === null) {
        submittor_addr = getUserId(submittor)
        if (submittor_addr === null) {
            logError("submit_vote", "Error: Submittor ID is null")
            return;
        }
    }
    console.log(submittor_addr)
    var proposal_index = -1;
    // Find targeted proposal
    for (i =0; i < proposals.length; i++) {
        if (proposals[i].proposal_id === proposal_id) {
            proposal_index = proposals[i].proposal_id
            break;
        } 
    }
    // Validation
    if (proposal_index === -1) logError("submit_vote", "ERROR: could not find proposal")
    // Log vote

    proposals[i].votes.push(
        {
            display_name: submittor,
            user_addr: submittor_addr,
            user_vote: 1
        }
    )
    fs.writeFileSync('./data/proposals.json', JSON.stringify(proposals, null, 2));
}




/**
 * Start workflow of submission
 * @param {*} statement 
 * @param {*} submittor // username of submittor
 * @param {*} submittor_addr // id of submitor
 * @param {*} expiration_days number of days until a proposal finishes
 */
function submitProposal(statement, submittor, submittor_addr=null, expiration_days=5) {
    // Parameter Validation: allow user to submit username or address
    if (submittor_addr === null) {
        submittor_addr = getUserId(submittor)
        if (submittor_addr === null) {
            logError("submitProposal","Error: Submittor ID not found")
            return;
        }
    }
    glom_id = findGlomId(superglom, submittor_addr)
    new_proposal = {
        "proposal_id": proposal_counter,
        "assigned_glom":glom_id,
        "submittor": submittor_addr,
        "statement": statement,
        "status": REVIEW,
        "choices": ["yes", "no"],
        "votes": [],
        "decision": 0,
        "date_submitted":Date.now, 
        "expiration_date":Date.now + expiration_days // get date of REVIEW expiration
    }
    proposal_counter++;
    proposals.push(new_proposal);
    fs.writeFileSync('./data/proposals.json', JSON.stringify(proposals, null, 2));
}



/*=========Helper Methods=============

*/
/** 
 * Log an error as a comment
 * 
 * @param {*} error 
 */
function logError(method_name, error) {
    console.log("ERROR in method: " + method_name + "\n" + error )

}
/** find ID of glom
 * Recursive method to find the id of the glom a user submits
 * @param {*} glom 
 * @param {*} curr_addr
 * @returns glom_id
 */
function findGlomId(glom, curr_addr) {
    for (const user of glom.users) {
        if (curr_addr === user.user_addr) {
            return glom.glom_id
        }
    }
    // user id is not in current glom, must dig deeper
    if (glom.children !== null) {
        for (child_glom in glom.children) {
            findGlomId(child_glom, curr_addr);
        }
    } else {
        console.log("WARNING: Could not find a glom the user belongs to.")
        return 0;
    }
}

function validateUser() {

}
function getUserId(username) {
    for (user of users) {
        if (user.display_name === username) {
            return user.user_addr
        }
    }
    return null
}

function getProposal() {

}




/**=========================Methods that won't be used================
 * 
 */

function clearProposals() {
    proposals = []
    fs.writeFileSync('./data/proposals.json', JSON.stringify(proposals, null, 2));
}