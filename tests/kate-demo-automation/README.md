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
To run all tests in the kate-demo-automation project, use this command: npx playwright test
To run all tests and watch UI in action, use this command: npx playwright test --ui
To open last HTML report run: npx playwright show-report
