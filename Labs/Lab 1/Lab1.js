// Problem 1
// Write a function called stringCompressor
// This function takes one argument which is a string
// This function should count the repeated letters (Assume they will always be in consecutive order)
// This function should create a compressed string that is the single letter followed by the count of that letter
// This function should compare the compressed string to the original string
// This function should return the shortest string and if equal return the original string
const stringCompressor = (repString) => {
  let count = 0,
    curr = null;
  let resultString = "";
  for (const ch of repString) {
    if (curr == null || ch != curr) {
      if (curr != null) resultString = resultString + curr + count;
      curr = ch;
      count = 1;
    } else {
      count++;
    }
  }
  if (curr != null) resultString = resultString + curr + count;
  resultString =
    resultString.length < repString.length ? resultString : repString;
  return resultString;
};

const strResult1 = stringCompressor("xxxyyzzz");
console.log(strResult1);

const strResult2 = stringCompressor("abc");
console.log(strResult2);

// Problem 2
// Write a function called numberPalindrome
// This function takes one argument which is a number
// This function should determine if the number is a palindrome
// A palindrome is a value that reads the same forwards and backwards
// This function should return the object with two keys.
// a key called number and the value is the original number
// a key called isPalindrome and the value is boolean
const numberPalindrome = (num) => {
  let numCopy = num;
  let revNumber = 0;
  while (numCopy > 0) {
    let rem = numCopy % 10;
    revNumber = revNumber * 10 + rem;
    numCopy = Math.floor(numCopy / 10);
  }
  return { number: num, isPalindrome: revNumber == num };
};

const numResult1 = numberPalindrome(70707);
console.log(numResult1);

const numResult2 = numberPalindrome(12345);
console.log(numResult2);

//Problem 3
// Write a function called bucketByDatatype
// This function takes one argument which is an array of mixed primitive data types
// This function bucket each element in the array by creating an object
//  with a key  that is the name of the primitive data type
// with a value is an array of the matching data types
// This function should not hard code the words: string, number, or boolean
// 'hard code' means that these words should not appear in the solution
// It should be able to dynamically determine the data type and set it as a key in the object
// This function should return the object
const bucketByDatatype = (mixedArray) => {
  const obj = {};
  mixedArray.forEach((x) => {
    const key = typeof x;
    if (obj[key] === undefined) obj[key] = [];
    obj[key].push(x);
  });
  return obj;
};

const mixedTypes = [1, "apple", true, 4, "pear", false, "strawberry", 22];

const bucketResult = bucketByDatatype(mixedTypes);
console.log(bucketResult);

// Problem 4
// Write a function called convertMarketPrices
// This function takes one argument which is an array of objects  (the array is an arbitrary length)
// This function formats the numeric price in each object to a string.
// The price key in each object should be updated to be a string that is prefixed with '$' and includes cents with exactly 2 decimal places.
// If a decimal place is missing in the original numeric price, it should be assumed as 0.
// This function should NOT use the toFixed() method
// This function should return the updated array of objects.
const convertMarketPrices = (marketplace) => {
  const updatedMarketplace = marketplace.map((place) => {
    let { price } = place;
    price = "" + price;
    price = price.split(".");
    if (price.length == 1) {
      price.push("00");
    } else if (price[1].length > 2) {
      price[1] = price[1].substring(0, 2);
    } else if (price[1].length < 2) {
      price[1] = price[1] + "0";
    }
    place.price = `$${price.join(".")}`;
    return place;
  });
  return updatedMarketplace;
};

const marketplace = [
  { brand: "Sony", type: "PS5", price: 459 },
  { name: "Microsoft", type: "Xbox Series S", price: 299.99 },
  { name: "Valve", type: "Steam Deck", price: 359.5 },
  { name: "Nintendo", type: "Switch", price: 299.0 },
];

const convertResult = convertMarketPrices(marketplace);
console.log(convertResult);

//Problem 5
// This problem consists of two parts that involve creating Promises, utilizing setTimeout within Promises, and then invoking the Promises using the async/await syntax.

// Part 1a - (15 Points)

// Write a function called openWebsite
// This function takes one argument which is an object representing information related to the website
// This function attempts to mock opening a website

// The openWebsite function makes use of Promise
// IF the responseTime in the object is null - this means the website failed to respond
// The failure case should be handled correctly and send an error message object:
// { failed: 'Failed to open website: <website_name>' }, where <website_name> is the name of the website

// IF responseTime is the object is numeric - this means the website responded successfully
// A setTimeout should be used to mock the delay in opening a website where the delay is the responseTime
// The succes case should be handled correctly and send an object containing three key/value pairs
//             - a key called name and the value is the website name
//             - a key called size and the value is the website data size
//             - a key called unit and the value is the website data unit

// Part 1b - (15 Points)

// Write a function called scrapWebsite
// This function takes one argument which is an object that is the response from openWebsite
// This function attempts to mock scraping a website for data

// The scrapWebsite function makes use of Promise
// IF the size in the object is 0 - this means the website failed to scrap any data
// The failure case should be handled correctly and send the error message object:
// { failed: 'Failed to scrap website: <website_name>' }, where <website_name> is the name of the website

// IF size is the object is larger than 0 - this means the website was scrapped for data successfully
// A setTimeout should be used to mock the delay in scrapping data from a website where the delay is the size
// The success case should be handled correctly and send the object that was passed in as the argument

// Part 2 - (10 Points)

// Write a function called runScrapApp
// This function takes one argument which is a website object (provide in the code example below)
// This function utilizes the async/await syntax to interact with the two functions provided above
// async/await should be used properly to handle asynchronous success or error responses from the two functions provided above

// First - this functions attempts to open a website by using the website object by interacting with openWebsite
// Second - this function attempts to scrap data from a website by interacting with scrapWebsite and using the response from a successful open
// IF both operations succeed then a success message should be logged to the console:
// Scrapped <size><unit> from <name>, where <size> <unit> and <name> are the values from the scrap success response
// IF an error occurs in either operation then the correct corresponding error message should be logged to the console
const openWebsite = (website) => {
  return new Promise((resolve, reject) => {
    const { name, dataSize, dataUnit, responseTime } = website;
    if (responseTime === null) {
      reject({ failed: `Failed to open website: ${name}` });
    } else if (typeof responseTime === "number") {
      setTimeout(() => {
        resolve({ name: name, size: dataSize, unit: dataUnit });
      }, responseTime);
    }
  });
};

const scrapWebsite = (website) => {
  return new Promise((resolve, reject) => {
    const { name, size } = website;
    if (size === 0) {
      reject({ failed: `Failed to scrap website: ${name}` });
    } else {
      setTimeout(() => {
        resolve(website);
      }, size);
    }
  });
};

const runScrapApp = async (website) => {
  try {
    const openWebsiteResponse = await openWebsite(website);
    const response = await scrapWebsite(openWebsiteResponse);
    const { name, size, unit } = response;
    console.log(`Scrapped ${size}${unit} from ${name}`);
  } catch (error) {
    console.log(`Failed to scrap data: ${website.name}`);
  }
};

const google = {
  name: "google.com",
  dataSize: 0,
  dataUnit: "kb",
  responseTime: 0,
};
const reddit = {
  name: "reddit.com",
  dataSize: 900,
  dataUnit: "kb",
  responseTime: null,
};
const github = {
  name: "github.com",
  dataSize: 500,
  dataUnit: "kb",
  responseTime: 200,
};

runScrapApp(google);
runScrapApp(reddit);
runScrapApp(github);
