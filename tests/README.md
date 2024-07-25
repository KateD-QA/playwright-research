# Demo Automation Project for both API and UI

# Technical Specs
* All tests specifically written in Java
* Tests run in headless mode by default
* Naming convention used for API & UI tests in the test project: site-userstory-ui.spec.ts
* Currnetly, the tests are configured to run only on Chromium for the sake of a quick demo. In a real life scenario, they should be run in cross-browser test mode. 


# How to Run Tests
* To access the tests in this Repo, navigate to main > playwright-research/tests/kate-demo-automation
* To run the UI tests for the Banking App Project, use this command: npx playwright test tests/banking-app-ui-tests 

* To run the API tests in the kate-demo-automation project, use this command: npx playwright test tests/kate-demo-automation/petstore-api-tests --project webkit 
* To run all tests and watch UI in action, use this command: npx playwright test --ui
* To open last HTML report run and view test case results: npx playwright show-report

# Additonal Information about UI tests
* The reason for not checking the Account detials for every customer listed in the Customer login drop down is because in reality, the same API calls would be used regardless of the customer Ids passed in, so for resource and efficiency sake, we can just check the fucntionality using one test customer account. 
* 
* By default, when changes to playwright tests are commited to the CICD pipeline / repository, they are run automatically and test case results are produced. 
* In a professional environment, I would schedule them to run with staging releases for regression testing prior to any production release. 