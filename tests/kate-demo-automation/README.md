# Demo Automation Project for both API and UI

# Technical Specs
* All tests specifically written in Node.js
* Tests run in headless mode by default

# How to set up the API tests:
* Import necessary modules, eg. test, expect.
* Define baseURL of the API as a constant to outside of the test modules so that each test can reference it. 

# How to set up the UI tests:
* Import necessary modules, eg. test, expect.


# How to Run Tests
* To access the tests in this Repo, navigate to main > playwright-research/tests/kate-demo-automation
* The UI and API tests are in thier own folders for neatness sake, however can be run at same time using the generic run commands for playwright
* To run all tests in the kate-demo-automation project, use this command: npx playwright test
* To run all tests and watch UI in action, use this command: npx playwright test --ui
* To open last HTML report run: npx playwright show-report
