# Project Name

To-Do List 

## Description

Duration: 10hrs

Objective: 

To create an app where the user could input a task and keep track of which tasks have been completed and which tasks have not been completed. 

Problems encoutered:

- Decide how to manage the completion each task so the DOM and the database would be updated

    Solution: 
   
    - Created two completion status buttons that allow the user to mark the task as completed or incompleted
    - Created two put requests that take commands to the database to change/update a task completion status
    - In the client side, created an if statement within a loop that reads the completion status of each task, then creates two different paths. If status is true, it gives the task a specific style in css. If the status is false, it gives the task a different style in css
    

- How to style the app so that it would not look html standard

    Solution:

    - Looked at color pallets on the internet to understand what colors go together
    - Decided what color to give which element on the table including the colors that are included in app functionalities (ex. change of font color when a task is completed)

Next Steps: 

- Learn how to insert checkboxes that can clicked on by the user to update the complete of a task on the DOM and in the database

