### INSTALLATIONS
Pre-requisites:
- [Node latest version](https://nodejs.org/en/download) should be installed

#### Steps taken to create this framework
1. instantiates a Node project
   ```bash
   npm init -y
   ```
   
3.   Install Playwright with test runner and creates structure(pipelines,config and example tests)
   ```bash
   npm init -D @playwright/test
   ```
5.  Installs the browsers
   ```bash
    npm install playwright
   ```

### INSTALL DEPENDENCIES
1. Installs all dependencies
   ```bash
   npm install
   ```
3. Installs browser binaries
   ```bash
   npx playwright install
   ```

### EXECUTION
1. Run following command to execute tests on chrome browser locally
   ```bash
   npm run test-chromium
   ```





