# Demo Automation Project for both API and UI

# Technical Specs
* All tests specifically written in Node.js
* Tests run in headless mode by default
* Naming convention used for API tests in this project: apiname-CRUDtype-api.spec.ts
* Naming convention used for API tests in this project: site-userstory-ui.spec.ts
* API documentation: https://petstore.swagger.io/#/ 

# How to set up the API tests:
* Import necessary modules, eg. test, expect.
* Define baseURL of the API as a constant to outside of the test modules so that each test can reference it. 

# How to set up the UI tests:
* Import necessary modules, eg. test, expect.


# How to Run Tests
* To run the API tests in the kate-demo-automation project, use this command: npx playwright test tests/kate-demo-automation/petstore-api-tests --project webkit 
* To run the UI tests in the kate-demo-automation project, use this command: npx playwright test tests/kate-demo-automation/sauce-ui-tests
* To open last HTML report run for either test folder: npx playwright show-report


# Additional Notes
 * Before this assignment I had not used Playwright before, so I had to give myself a crash course before starting this project and whilst debugging my tests.
 * I decided to use Playwright as I am determined to grow my skills in Automation and was curious about the tool; I took a risk to show off my initiative and willingness to learn.
 * I kept the test very simple to meet the timebox suggested of 'no more than 4 hours' and to literally meet the acceptance criteria described in the project brief.
 In real life, both UI and API tests would be much more comprehensive in terms of test coverage; ie. I would not hard code values like IDs, and not declare keys in teh same files as tests because this is not clean nor secure. 
 * There are TODO comments that suggest extra checks I would have added, if I had the time. The reason I did not, is because in real life, sometimes there are deadlines that require us to make choices about what can be done now vs what could wait to be completed later - I took the timeboxing of teh brief seriously. 
 * I am committed to improving my code quality now that I know the basics of using Playwright and the differences in accessing web page elements compared to Selenium.
 * Rather than seperate API tests from UI tests, I decided to use the same tool and repository, as the brief was not strict on the preference for tooliong and also I was curious to learn API automation in Playwright too. Its easier to manage and schedule running automated tests in reality when all tests can be found in the same repository. 

#  API Edge cases that I ran out of time to write tests for: 
 addNewpet & updatePet:
 * Test passing NULL into fields.
 * Test when all fields are populated with valid & invalid data (e.g., photoUrls, status).
 * Test when special characters are passed into all fields.
 * Attempt to update a pet that does not exist.

# UI scenarios I would normally add, and ran out of time for: 
* Validation on text input fields work, eg. must pass test in checkout billing details step. 
* Verify cart calculations Sum is : cost of item 1 + cost of item 2 = Cart sub total. 
* Verify after list is filtered from low to high that the cost of item 1 is actually less than the cost of item 2.
