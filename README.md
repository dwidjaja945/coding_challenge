## Cylance Coding Challenge
### Recreate GitHub UI

#### Directions to Run App
##### Method 1
1. Load files for the project
2. Run `npm install` in the terminal for this project
3. Run `npm start` in the terminal
4. Open `http://localhost:3000` in the browser of your choice

##### Method 2
Alternatively, you can go to this CodeSandbox link where the code and the project itself can be viewed simultaneously:
- Code and App: `https://codesandbox.io/s/misty-browser-hwsi4`
- App: `https://hwsi4.csb.app/`


#### Libraries
- `@material-ui/core`
    - Component library for consistent styling for buttons, inputs, etc.
- `@material-ui/icons`
    - Component library for Material Icons
- `@material-ui/lab`
    - Component library that are not included in the core library
        - such as `Skeleton`
- `@material-ui/styles`
    - This is not currently used in this project, but in the future if requirements change to include custom colors or a particular style guide that does not match Material's default, we could use this to set those styles across all Material components
- `node-sass`
    - Dependency to allow us to use `SASS` pre-compiler
- `react-router-dom`
    - Need this library to allow routing for the application