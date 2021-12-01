const link = require("linkinator")

export default async function complex() {
  // create a new `LinkChecker` that we'll use to run the scan.
  const checker = new link.LinkChecker()

  // Respond to the beginning of a new page being scanned
  checker.on("pagestart", (url) => {
    console.log(`Scanning ${url}`)
  })

  // After a page is scanned, check out the results!
  checker.on("link", (result) => {
    // check the specific url that was scanned
    console.log(`URL: ${result.url}`)

    // How did the scan go?  Potential states are `BROKEN`, `OK`, and `SKIPPED`
    console.log(`State: ${result.state}`)

    // What was the status code of the response?
    console.log(`Status: ${result.status}`)

    // What page linked here?
    console.log(`Parent: ${result.parent}`)

    console.log("\n")
  })

  // Go ahead and start the scan! As events occur, we will see them above.
  const result = await checker.check({
    path: "http://localhost:3000",
    recurse: true,
    directoryListing: true,
    linksToSkip: [
      "https://github.com/cypress-io/cypress-realworld-testing",
      "_next",
    ],
  })

  // Check to see if the scan passed!
  console.log(result.passed ? "PASSED :D" : "FAILED :(")

  // How many links did we scan?
  console.log(`Scanned total of ${result.links.length} links!`)

  // The final result will contain the list of checked links, and the pass/fail
  const brokeLinksCount = result.links.filter((x) => x.state === "BROKEN")
  console.log(`Detected ${brokeLinksCount.length} broken links.`)
}

complex()
