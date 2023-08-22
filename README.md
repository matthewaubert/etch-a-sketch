**ETCH-A-SKETCH**

1. Understand the Problem
  Write a program with a user interface that allows a user to color squares by hovering over them with a mouse. The interface should begin with a 16x16 grid of square divs. The interface should also include a button at the top of the screen that will send the user a popup asking for the number of squares per side for the new grid (max 100).

  Extra credit:
  • Instead of a simple color change from white to black, Each mouse hover should randomize the square's RGB value
  • Implement a progressive darkening effect in which each mouse hover adds 10% more color to the square (up to a max of 100% after ten hovers)
2. Plan
  • Does the program have a user interface? What will it look like? What functionality will the interface have?
    This program will have a user interface, starting with a grid of 16x16 white square divs, and a button at the top to enable users to change the grid size. When the user clicks the button and enters a new number (max 100), a new grid will be created and that number will be used as the number of squares in the height and width of the grid. As the user hovers over the squares in the grid, they will change from white to a color (start with black at 100%, but this will change if the extra credit is implemented).
  • What inputs will your program have? Will the user enter data or will you get input from somewhere else?
    The interface will have a button at the top that allows the user to enter a number for the new grid size (default 16x16 squares). All mouse hovers over the grid squares will be registered as input as well.
  • What's the desired output?
    The desired output is a grid of squares that changes colors as the user hovers over them.
3. Pseudocode