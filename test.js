users = require('./data/users.json')

for (const user of users) {
    console.log(user)
}

// Assuming you have an array named "choice" containing the list of choices
const choice = ["yes", "no"];

// Example tallies for each choice
const choiceTallies = {"yes": 20, "no": 30};

// Create an empty object
const choiceObject = {};

// Iterate over the choices in the array
choice.forEach(c => {
    // Add each choice as a key to the object with its corresponding tally from choiceTallies
    if (c in choiceTallies) {
        choiceObject[c] = choiceTallies[c];
    }
});

console.log(choiceObject);
