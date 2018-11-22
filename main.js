//============  learning array methods  ============

// 1. the filter method should receive a function that 
// returns a boolean, and in return it will return an array 
// with elements that match the filter.

// 2. Note that by convention, the iteration variable is a single letter,
//  generally the first letter of the array's name

// example

let ages = [12, 41, 11, 10, 32, 27, 18, 19, 19, 14, 58, 41, 9]

let olderThan16 = ages.filter(a => a > 16)
console.log(olderThan16)

// another way :

// const isGreaterThan16 = function (age) {
//     return age > 16
// }

// let olderThan16 = ages.filter(isGreaterThan16)

// FILTER

let vegetables = [
    { name: "Eggplant", color: "purple" },
    { name: "Carrot", color: "orange" },
    { name: "Squash", color: "orange" },
    { name: "Tomatoe", color: "red" },
    { name: "Onion", color: "white" },
    { name: "Sweet Potato", color: "orange" }];

    // use filter to get an array of objects of all the orange vegetables:
let orangeVeggies = vegetables.filter(v => v.color === "orange");

for (let vegetable of orangeVeggies) {
    console.log(vegetable.name) //expect to see Carrot, Squash, and Sweet Potato
}

// forEach - does the same as Filter check above was doing 

orangeVeggies.forEach(ov => console.log(ov.name))

// Again, the forEach method takes a function,
//  and invokes the function on each item it iterates over - 
// unlike filter, this function doesn't have to return anything.

let people = [
    { salary: 1300, goodPerformance: false },
    { salary: 1500, goodPerformance: true },
    { salary: 1200, goodPerformance: true },
    { salary: 1700, goodPerformance: false },
    { salary: 1600, goodPerformance: true },
];

let increaseSalary = function (person) {
    if (person.goodPerformance) {
        person.salary += 300
    }
}
people.forEach(increaseSalary); //using the named function! doesn't have to return anything!

people.forEach(p => console.log(p.salary)) //should print 1300, 1800, 1500, 1700, 1900 (on separate lines)

// MAP //

// When we want to transform *data* we're working with into something more convenient.

let poundWeights = [142, 180, 178, 121, 132]

let kiloWeights = poundWeights.map(pw => Math.round(pw / 2.2))
console.log(kiloWeights) //prints [65, 82, 81, 55, 60]

// The map method works similar to the filter method, but instead of returning a boolean in the callback, you return any new "transformed" value. 
// It's called "map" because we're "mapping" one form of data into another.

// Spot check ==== use map to turn everything to lowercase.

let messagesFromDad = ["HI HONEY", "HOW WAS SCHOOL??", "DID YOU EAT TODAY?", "I CAN'T FIND THE REMOTE CONTROL"]
let lowerMessages = messagesFromDad.map(mfd => mfd.toLowerCase())
console.log(lowerMessages);

// Note that you can also use map to extract things from a complicated array of objects, 
// into something slimmed down, like in this case:

let users = [ {
    "name": "Leanne Graham",
    "address": {
        "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874",
        "geo": { "lat": "-37.3159", "lng": "81.1496" }
    }
},
 {
    "name": "Ervin Howell",
    "address": {
        "street": "Victor Plains", "suite": "Suite 879", "city": "Wisokyburgh", "zipcode": "90566-7771",
        "geo": { "lat": "-43.9509", "lng": "-34.4618" }
    }
} ]

// Say that instead of all that data there,
//  we only want the name and city. We could map the data differently, like so:

users.map(u => { return { name: u.name, city: u.address.city} });
// Notice that in this case we have a return inside the callback function! 
// =>  we're creating a new object, which uses { }, so we need to clearly define what the *callback function* is,
//  and what the *object we're creating* is.

// FIND //
// Often times we find ourselves looking for things in arrays. Maybe it's an array of objects, each of which has an ID,
//  and we need to find something by that ID:

let posts = [
    {
        id: 0, text: "I'm not here",
        comments: [{ id: 0, text: "support that" }]
    },
    {
        id: 1, text: "Find me",
        comments: [
            { id: 0, text: "here I am" },
            { id: 1, text: "rock you like a hurricane" },
            { id: 2, text: "dum dum" }]
    },
    {
        id: 2, text: "Where's waldo anyway",
        comments: [
            { id: 0, text: "who's waldo" },
            { id: 1, text: "he's called Effi" }]
    },
    {
        id: 3, text: "Poof",
        comments: [{ id: 0, text: "like magic" }]
    }
]

// 1. then
const findById = function (id) {
    for (let post of posts) {
        if (post.id == id) {
            return post;
        }
    }
}

// 2. now- With the find method, you can bet it's much shorter:

const findById2 = id => posts.find(p => p.id === id)
console.log(findById2(1)) // prints {id: 1, text: "Find me", comments: Array(3)}

// what did we do?
// 1. Define a function called findById2 just like before
// 2. We use arrow syntax to have the function receive one parameter, id
// 3. The function returns ( => ) whatever posts.find(...) returns
// 4. The find method receives an anonymous callback
// 5. The callback iterates over every post, p, and finds the one who's ID matches the given id
// =========================================================================

// like in filter, we need to return some boolean.
// The find method will find the first item in the array that matches the filter provided,
// and return that one item.
// =========================================================================

// *Spot check*: write a findCommentByID(postID, commentID) function that finds a comment object. 
// You should use the .find - certainly do not use a for loop.

const findCommentByID = function (postID, commentID) {
    let post = findById2(postID);
    return post.comments.find(c => c.id === commentID)
}
console.log(findCommentByID(1, 0));

// SOME & EVERY //
// when we want to know whether certain things exist in an array.

//  1. You need to make sure that every person is above the age of 18
let ages1 = [31, 28, 23, 27, 25, 16, 24]
ages1.every(a => a > 18) //returns false (boolean)

// 2. Other times, it's enough to know that some of the items in an array match a certain criteria

// alidate that at least some of the food at a restaurant is vegetarian:
let menu = [
    { name: "Beef stew", vegetarian: false },
    { name: "Beef sandwhich", vegetarian: false },
    { name: "Carrot on a stick", vegetarian: true },
    { name: "Beef eggroll", vegetarian: false },
]

menu.some(m => m.vegetarian) //returns true

// These two methods, unlike the other array methods, 
// always return a boolean after checking all the items in the array!! 

// Spot check:
let movies = [
    { title: "Dareangel", studio: "Marvel", year: 2023 },
    { title: "Batterfly", studio: "Fox", year: 2021 },
    { title: "League of Ordinary People", studio: "Blizzard", year: 2025 },
    { title: "Thor: Ragnarok", studio: "Marvel", year: 2017 },
]

// "Let's go watch some movies" if at least one of the movies is by "Marvel"

if (movies.some(m => m.studio == "Marvel")) {
    console.log("Let's go watch some movies");
}
else {
    console.log("Let's stay home");
}

// "Futuristic stuff" if all the movies are from after the year 2020

if(movies.every(m => m.year > 2020)) {
    console.log("Futuristic stuff");
}
else {
    console.log("Yawn");
}

// CHAINING METHODS //
// Another nice thing about (some) array methods is that, because of their nature 
// (methods that work on arrays that return arrays), we can chain methods. That is,
//  we can first filter, then map in one go. Check this out:

let countries = [
    { name: "Greece", population: 500 },
    { name: "Namibia", population: 1200 },
    { name: "Finland", population: 100 },
    { name: "Switzerland", population: 300 },
    { name: "Peru", population: 200 }
]

let smallCountries = countries.filter(c => c.population < 500).map(c => c.name)
// Now smallCountries we will be ["Finland", "Switzerland", "Peru"] : first filtered out only the countries with a population of less than 500,
//  and then mapped those that match the filter to only have the country's names.

// Chaining methods tends to become hard to read, so we generally like to write the chains like this:
let smallCountries1 =
    countries
        .filter(c => c.population < 500)
        .map(c => c.name);

        