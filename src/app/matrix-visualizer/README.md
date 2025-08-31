## Coordinate Frame Visualizer
Web app that allows you to visualize coordinate frames with euler angles and homogenous matrices and get their pose with resepect to one another.
You can add, update and delete a coordinate frame as well as triad naming, copy, paste, revert and grouping.

### Future Features
- bounding box to visualize groups (show how which triads have the parent triad)
- limit triad nesting to 5 levels
- focus on triad on creation
- add animation to camera movements
- translate triad in individual x, y and z directions
- rotate triad in individual rx, ry and rz directions
- proper selection management (click triad -> click out deselects, double click etc.)
- duplicate triad

### Known Bugs
- entering an empty value on the pose input fields saves the pose and causes the matrix view to be corrupted
- revert and paste pose is not updating in matrix view
