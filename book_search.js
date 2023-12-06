/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */

function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and
     * return the appropriate object here. */

    // Initialize an empty array to store the results
    const results = [];

    // Iterate through each book in the input
    for (const book of scannedTextObj) {
        // Iterate through each piece of scanned text in the book
        for (const scannedText of book.Content) {
            // Check if the search term is present in the text (case-sensitive)
            if (scannedText.Text.includes(searchTerm)) {
                // If found, add the result to the array
                results.push({
                    ISBN: book.ISBN,
                    Page: scannedText.Page,
                    Line: scannedText.Line,
                });
            }
        }
    }

    // Create and return the final result object
    const resultObj = {
        SearchTerm: searchTerm, 
        Results: results,
    };

    return resultObj;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


/** Positive test where the search term "profound" is expected to be found. */
const positiveTest = findSearchTermInBooks("profound", twentyLeaguesIn);
if (JSON.stringify(positiveTest) === JSON.stringify({
    SearchTerm: "profound",
    Results: [{ ISBN: "9780000528531", Page: 31, Line: 9 }],
})) {
    console.log("Positive Test: Passed");
} else {
    console.log("Positive Test: Failed");
}

/** Negative test where the search term "nonexistent" is not expected to be found. */
const negativeTest = findSearchTermInBooks("nonexistent", twentyLeaguesIn);
if (JSON.stringify(negativeTest) === JSON.stringify({ SearchTerm: "nonexistent", Results: [] })) {
    console.log("Negative Test: Passed");
} else {
    console.log("Negative Test: Failed");
}

/** Case-sensitive test where the search term "The" is expected to be found, but not "the". */
const caseSensitiveTest = findSearchTermInBooks("The", twentyLeaguesIn);
if (
    JSON.stringify(caseSensitiveTest) === JSON.stringify({
    SearchTerm: "The",
    Results: [{ ISBN: "9780000528531", Page: 31, Line: 8 }],
    })) {
    console.log("Case-Sensitive Test: Passed");
} else {
    console.log("Case-Sensitive Test: Failed");
}

/** Test with an empty input array. */
const emptyInputTest = findSearchTermInBooks("search", []);
if (JSON.stringify(emptyInputTest) === JSON.stringify({ SearchTerm: "search", Results: [] })) {
    console.log("Empty Input Test: Passed");
} else {
    console.log("Empty Input Test: Failed");
}


/** Test with a special character search term. */
const specialCharactersTest = findSearchTermInBooks("!", twentyLeaguesIn);
if (JSON.stringify(specialCharactersTest) === JSON.stringify({ SearchTerm: "!", Results: [] })) {
    console.log("Special Characters Test: Passed");
} else {
    console.log("Special Characters Test: Failed");
}

/** Test with a single character search term. */
const singleCharTest = findSearchTermInBooks("a", twentyLeaguesIn);
if (JSON.stringify(singleCharTest) === JSON.stringify({
    SearchTerm: "a",
    Results: [
        { ISBN: "9780000528531", Page: 31, Line: 8 },
        { ISBN: "9780000528531", Page: 31, Line: 9 },
        { ISBN: "9780000528531", Page: 31, Line: 10 }
    ]
})) {
    console.log("Single Character Test: Passed");
} else {
    console.log("Single Character Test: Failed");
}

/** Test with search term at the beginning of text. */
const beginningTest = findSearchTermInBooks("now", twentyLeaguesIn);
if (JSON.stringify(beginningTest) === JSON.stringify({
    SearchTerm: "now",
    Results: [
        { ISBN: "9780000528531", Page: 31, Line: 8 }
    ]
})) {
    console.log("Beginning Test: Passed");
} else {
    console.log("Beginning Test: Failed");
}

