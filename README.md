# Team Name: Yorm

This project will closely follow the design and implementation of the game nerdle (https://nerdlegame.com). The player will attempt to guess an equation that is 8 symbols/numbers long. The possible operations that can be preformed in this equation are multiplication, division, addition, and subtraction. The player has a total of 6 guesses to figure out the predetermined equation. Each element of the equation will be highlighted in colors corresponding to the 'correctness' of the guess. For example, green could mean you have the correct position for the element, while yellow means the element is in the equation but not at that position, and grey could mean that element is not in the equation. These colors will change based on the theme played in, but the basic formatting will remain the same for all variations of the game being played. 

## Team Information

Project name: Nerdle  
Team Name: YORM   
Members (4):  
- Dalton Muck (email: tm033520@ohio.edu, gh: https://github.com/Dalton-Muck)
- Jade O'Shaughnessy (email: js973521@ohio.edu, gh: https://github.com/joshaughnessy22)
- Cooper Young (email: cy103421@ohio.edu, gh: https://github.com/CooperTYoung)
- Maya Roediger (email: mr030021@ohio.edu  , gh: https://github.com/Maya-Roediger)
  
## About this project


### Platform

- Angular
    - A platform used for building web applications with structured components and TypeScript support.
- Typescript
    - A programming language that enhances JavaScript by adding static typing. This was used for game functions and visuals. 
- C++
    - Used for creating a .txt file containing over 5,000 equations for the game.


### Frameworks & Tools


- Angular CLI
    - A command-line interface for Angular that assists in automating tasks such as project setup, code generation, testing, and deployment for single-page applications like the nerdle game.

- Github Pages
    - A platform for hosting websites, providing free and accessible hosting for users to interact with the site.

- Figma
    - A design tool used to create and showcase the user interface of the project, aiding in visualizing the final product and setting up frontend components effectively.

## Build & Comnpiling Instructions

There is a github_page for this repo but it does not reflect real time changes
To see real time changes to code you will have too
Use the following steps to build and run the web-app locally:

1. Navigate to the "s24-wordle-fibble-6" directory

2.  Change current node version to 18
    - ** npm install 18 **
    - The response message should appear as: 
        - **"Now using node v18.19.0 (npm v10.2.3)"**
    - Additionally, a **node_modules** folder should now be installed in the **nerdle** directory

3. Build & Compiling
    - ** npm run build **
    - ** npm run start **
    - Node 18 allows for bundling of building and compiling, using this command. A response message should appear: 
        - **"Application bundle generation complete..."**
        
4. On your preferred web browser, navigate to 
    - **http://localhost:4200/**
    - {4200} is the default port number this may vary depending on how many ports are currently being used

# Known Bugs

Logic
- none known at this time
UI
- after changing to light mode, the dark/light mode will alternate on enter. 
    ie. the light mode button is busted

# Future Plans

- How to play tab
- Different sized equations to guess
- hard mode (once you get a green/yellow you must continue to use green/yellow. If green it must be in same spot if yellow it must be used somehwere in equation)


