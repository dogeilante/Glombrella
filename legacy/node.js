const fs = require('fs');
trees = [];

// level 0
init_tree("rDAO", "DiamondThumb")

// level 0
add_user(trees[0], "degen_doge")
add_user(trees[0], "That70sRobot")
// level 1
add_user(trees[0], "Wukong")
add_user(trees[0], "ArnoudVanDerPlas")
add_user(trees[0], "ElrickErikose")
add_user(trees[0], "Carry2web")
add_user(trees[0], "Valtran")
add_user(trees[0], "NathanWells")
add_user(trees[0], "Mcmarsh")
add_user(trees[0], "Tangy")
add_user(trees[0], "StarGeezer")
//fs.writeFileSync('./data/test.json', JSON.stringify(trees[0], null, 2));
// level 2
add_user(trees[0], "ShadyAcres")
add_user(trees[0], "EdoKoevoet")
add_user(trees[0], "RandhirH")
add_user(trees[0], "1dolinski")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
add_user(trees[0], "StubbornDad")
fs.writeFileSync('./data/test.json', JSON.stringify(trees[0], null, 2));


/**
 * Initialize tree
 */
function init_tree(title, user_addr) {
    node = {
        title: title,
        users: [
            user_addr
        ],
        "children": [
        ]
    }
    trees[trees.length] = node;
}
/**
 * Add node
 * @param {*} node 
 * Node to add from
 */
function add_node(node) {
    node.children.push({
        title: "X",
        users: [],
        children: []
    })
}
/**
 * Uses a recursive queue
 * https://www.studytonight.com/post/insertionadding-a-new-node-in-a-binary-tree-data-structure
 * @param {*} root_node 
 * @param {*} user_addr 
 * @returns 
 */
function add_user(root_node, user_addr) {
    queue = []
    queue.push(root_node)

    isAdded = false
    first_nonfull_node = root_node
    foundFirstChildless = false;

    while(!isAdded) {
        // BASE CASE 0: queue is empty, add and push a new node.
        if (queue.length == 0) {
            add_node(first_nonfull_node);
            queue.push(first_nonfull_node.children[first_nonfull_node.children.length-1]);
        }
        // REMOVE FIRST element of queue
        node = queue.shift()
        // BASE CASE 1: current node is not at capacity
        // SOLUTION: add user!
        if (node.users.length < 3) {
            node.users[node.users.length] = user_addr
            isAdded = true;
        // Recursive cases: push children nodes
        } else {  
            
            for (node_child of node.children) {
                queue.push(node_child)
            }
            if (node.children.length != 3 && !foundFirstChildless) {
                first_nonfull_node = node;
                foundFirstChildless = true;
            }
        } 
    }
    return 1;
}
