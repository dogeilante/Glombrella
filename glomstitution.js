
const { /*Proposal status: */ REJECTED, REVIEW, IN_PROGRESS, COMPLETED, /* proposal type: */ WORK_ORDER, GLOM_INFO } = require('./data/constants')

// for read/write
const fs = require('fs');

// Import existing data
const superglom = require('./data/gloms.json');
//superglom = superglom[0];
glomerates = [];

const { error, log } = require('console');
const { json } = require('stream/consumers');
users = require('./data/users.json')
proposals = require('./data/proposals.json')

// Global variables
var proposal_counter = 0;

/**================================ Program start =========================================
 *
 */
main()
function main() {
    clearProposals()

    init_rDAO("rDAO", "DiamondThumb")
    init_rDAO("EthosSphere", "That70sRobot")
    init_rDAO("ducks_inc", "degen_doge")
    // level 0
    add_user(glomerates[0], "degen_doge")
    add_user(glomerates[0], "That70sRobot")
    // level 1
    add_user(glomerates[0], "Wukong")
    add_user(glomerates[0], "ArnoudVanDerPlas")
    add_user(glomerates[0], "ElrickErikose")
    add_user(glomerates[0], "Carry2web")
    add_user(glomerates[0], "Valtran")
    add_user(glomerates[0], "NathanWells")
    add_user(glomerates[0], "Mcmarsh")
    add_user(glomerates[0], "Tangy")
    add_user(glomerates[0], "StarGeezer")
    //fs.writeFileSync('./data/test.json', JSON.stringify(glomerates[0], null, 2));
    // level 2
    add_user(glomerates[0], "ShadyAcres")
    add_user(glomerates[0], "EdoKoevoet")
    add_user(glomerates[0], "RandhirH")
    add_user(glomerates[0], "1dolinski")
    fs.writeFileSync('./data/test.json', JSON.stringify(glomerates[0], null, 2));

    add_user

    return;

    submitProposal("The ducks will rule the world", "degen_doge")
    submitProposal("starterFile - v1 approve to place on chain", submittor="DiamondThumb")
    submitProposal("let @DiamondThumb put first wave of code blocks in TheLibrary - without group vetting", "DiamondThumb")
    submitProposal("set up OpenFund for Glombrella-1 - @degen_doge set it up .. shared seed(for now). Glombrella-2 will be with LOST seed", "DiamondThumb")
    submitProposal("camelCase or snake_case for variable names", "degen_doge")
    
    submit_vote(0, "degen_doge", "yes")
    submit_vote(0, "DiamondThumb", "yes")
    submit_vote(0, "ArnoudvanderPlas", "yes")

    yield_decision(0)

    init_rDAO("Decentology", "degen_doge")
}

function printDAORecursive(root_glom) {
    for(username of root_glom.users) {
        console.log(username);
    }
    q = [root_glom]

    while(glom = q.pop()) {
        print()
    }
}
/**
 * Create rDAO
 */
function init_rDAO(title, user_addr) {
    glom = {
        title: title,
        users: [
            user_addr
        ],
        "children": [
        ]
    }
    glomerates[glomerates.length] = glom;
}
function add_glom(glom) {
    glom.children.push({
        title: "X",
        users: [],
        children: []
    })
}
/**
 * Adds user in BREADTH first order. 
 * https://www.studytonight.com/post/insertionadding-a-new-node-in-a-binary-tree-data-structure
 * @param {*} root_glom 
 * @param {*} user_addr 
 * @returns 
 */
function add_user(root_glom, user_addr) {
    queue = []
    queue.push(root_glom)
    // For tracking end of loop
    isAdded = false
    // In case all nodes are at capacity, we will need to add a new glom.
    first_nonfull_glom = root_glom
    foundFirstChildless = false;
    while(!isAdded) {
        // BASE CASE 0: queue is empty, add and push a new glom.
        if (queue.length == 0) {
            add_glom(first_nonfull_glom);
            queue.push(first_nonfull_glom.children[first_nonfull_glom.children.length-1]);
        }
        // Remove FIRST element of queue
        glom = queue.shift()
        // BASE CASE 1: current glom is not at capacity
        // SOLUTION: add user!
        if (glom.users.length < 3) {
            glom.users[glom.users.length] = user_addr
            isAdded = true;
        // Recursive cases: push children gloms
        } else {  
            for (glom_child of glom.children) {
                queue.push(glom_child)
            }
            if (glom.children.length != 3 && !foundFirstChildless) {
                first_nonfull_glom = glom;
                foundFirstChildless = true;
                // continue on, to ensure existing gloms are filled before creating new glom
            }
        } 
    }
    return 1;
}

function add_user2(glom, user_addr) {
    console.log(glom.users.length);
    // BASE CASE 1: current glom is not at capacity
    // SOLUTION: add user!
    if (glom.users.length < 3) {
        glom.users[glom.users.length] = user_addr

    // BASE CASE 2: There are no children gloms
    } else if (glom.children === 0) {
        add_glom(glom, user_addr)

    // BASE CASE 3: child glom is not filled out
    // SOLUTION: add_user
    } else if (glom.children[glom.children.length-1] != 3) {
        add_user(glom.children[glom.children.length-1])

    // BASE CASE 4: must add child glom 
    } else if (glom.children.length != 3) {
        add_glom(glom, user_addr)

    // RECURSIVE CASE: Entire row is filled out
    } else {
        add_user(child_glom)
    }
    // return success! we added a user. Break out of recursion
    return 1;
}


/**============================= Test methods ========================================
 * 
 * 
*/
function testProposals() {
    // unanimous decision

    // 

}

/**==============================Core features============================
 * 
 */

/**
 * 
 * @param {} user_id 
 */
function giveBadge(username, user_addr=null, DAO_hash, badge_name, contributions) {
    // Parameter Validation: allow user to submit username or address
    if (user_addr === null) {
        user_addr = getUserId(username)
        if (user_addr === null) {
            logError("submit_vote", "Error: Submittor ID is null")
            return;
        }
    }

}

function yield_decision(proposal_id) {
    proposal_index = getProposalIndex(proposal_id)

    var vote_tallies = {};
    for (choice of proposals[proposal_index].choices) vote_tallies[choice] = 0
    // STOP THE COUNTTTTTTT!!!!!!
    for (vote of proposals[proposal_index].votes) {
        vote_tallies[vote.user_vote]++
    }
    proposals[proposal_index].status = COMPLETED;
    console.log(`The users have voted on proposal id ${proposal_index}:`);
    console.log(vote_tallies)
}

/**
 * 
 * @param {*} proposal_id 
 * @param {*} submittor 
 * @param {*} decision // dependent on choices[] array when proposal was created
 * @param {*} submittor_addr 
 * @returns 
 */
function submit_vote(proposal_id, submittor, user_choice, submittor_addr=null) {
    // Parameter Validation: allow user to submit username or address
    if (submittor_addr === null) {
        submittor_addr = getUserId(submittor)
        if (submittor_addr === null) {
            logError("submit_vote", "Error: Submittor ID is null")
            return;
        }
    }
    proposal_index = getProposalIndex(proposal_id)
    // Validation
    if (proposal_index === -1) logError("submit_vote", "ERROR: could not find proposal")
    
    // Log vote
    proposals[i].votes.push(
        {
            display_name: submittor,
            user_addr: submittor_addr,
            user_vote: user_choice
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
//=====================Proposal helpers==================
function getProposalIndex(proposal_id) {
    var proposal_index = -1;
    // Find targeted proposal
    for (i =0; i < proposals.length; i++) {
        if (proposals[i].proposal_id === proposal_id) {
            proposal_index = proposals[i].proposal_id
            break;
        } 
    }
    return proposal_index;
}
//======================= Glom stuff==================
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
//=====================User stuff==============
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