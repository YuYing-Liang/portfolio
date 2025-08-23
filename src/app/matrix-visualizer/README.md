## Coordinate Frame Visualizer
Web app that allows you to visualize coordinate frames with euler angles and homogenous matrices and get their pose with resepect to one another.
You can add, update and delete a coordinate frame as well as triad naming, copy, paste, revert and grouping.

### Future Features
- copy pose in triad info panel
- paste pose in triad info panel (edit only)
- change color of triad elements
- tree view to visualize grouping
- bounding box to visualize groups (show how which triads have the parent triad)
- degree and radians selection (settings toolbar)
- unit selection (settings toolbar)
- limit triad nesting to 5 levels
- focus on triad on creation
- add animation to camera movements
- translate triad in individual x, y and z directions
- rotate triad in individual rx, ry and rz directions
- proper selection management (click triad -> click out deselects, double click etc.)
- possibly combining the info panel and tree view

### Known Bugs
- entering an empty value on the pose input fields saves the pose and causes the matrix view to be corrupted
- revert and paste pose is not updating in matrix view
- clicking on a triad (info panel appears) then clicking on another triad causes the info panel to display incorrect information

