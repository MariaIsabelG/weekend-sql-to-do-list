# Project Name

To-Do List 

## Description

Duration: 8hrs

Objective: 

To create a calculator that receives an input, sends the input to the server, calculates on the server side, and returns the calculation result and the calculator's history to the DOM.

Problems encoutered:

- Decide how to organize the inputs once they get to the server

    Solution: created a new object on the server side with all the information that needs to be sent to the client.

- Find out how to calculate the inputs on the server side

    Solution: created a switch statements that get the operator string as a key and runs specific calculations based on the operator string received.

- Appending the history to the DOM without duplication

    Solution: emptied the history selector before running a for loop.

Next Steps: 

- Style the calculator to be more user friendly
