mesh-viewer
===========
A module that draws meshes with a simple orbit based camera.  This is useful for quickly making demos and live coding.

Example
=======

```javascript
var shell = require("mesh-viewer")()
var mesh

shell.on("viewer-init", function() {
  mesh = shell.createMesh(require("bunny"))
})

shell.on("gl-render", function() {
  mesh.draw()
})
```

Install
=======

    npm install mesh-viewer

API
===
The main viewer class is a modification of [`gl-now`](https://github.com/mikolalysenko/gl-now) and inherits all the same properties and methods as that.

```javascript
var createShell = require("mesh-viewer")
```

## Constructor

### `var shell = createShell([options])`
Creates a viewer.  In addition to accepting all the arguments as gl-now, it also takes in the following arguments:

* `fov` Default fov for camera
* `zNear` Near clip plane
* `zFar` Far clip plane
* `meshColor` Default color for meshes
* `pointSize` Default point size for meshes
* `useCellNormals` If set, use flat shading for polygons
* `ambient` Default ambient light color * intensity
* `diffuse` Default diffuse light color * intensity
* `specular` Default specular light color * intensity
* `specularExponent` Default specular exponent
* `lightPosition` Default light position

**Returns** A mesh viewer shell

## Events
In addition to the events in `gl-now` and `game-shell`, `mesh-viewer` has the following event:

### `"viewer-init"`
This event is triggered after the viewer is initialized.

## Properties

### `viewer.camera`
An instance of a [`game-shell-orbit-camera`](https://github.com/mikolalysenko/game-shell-orbit-camera) that controls the viewing direction.

### `viewer.fov`
The FOV of the camera

### `viewer.zNear`
The near z clip plane distance

### `viewer.zFar`
The far z clip plane distance

## Methods

### `var mesh = viewer.createMesh(params)`
Creates a mesh object that can be drawn.  This works the same as [`gl-simplicial-complex`](https://github.com/mikolalysenko/gl-simplicial-complex).  The `params` object accepts the following parameters:

* `cells` (Required) An indexed list of vertices, edges and/or faces.
* `positions` (Required) An array of positions for the mesh, encoded as arrays
* `vertexColors` A list of per vertex color attributes encoded as length 3 rgb arrays
* `cellColors` A list of per cell color attributes
* `meshColor` A constant color for the entire mesh
* `vertexNormals` An array of per vertex normals
* `cellNormals` An array of per cell normals
* `useFacetNormals` A flag which if set to true forces cellNormals to be computed
* `pointSizes` An array of point sizes
* `pointSize` A single point size float

**Returns** A drawable mesh object

## Mesh Object Methods

### `mesh.draw([params])`
Draws the mesh object.  Params has the same properties as in `gl-simplicial-complex`

### `mesh.update([params])`
Updates the mesh.  Same conventions as before.

### `mesh.dispose()`
Destroys mesh releasing all resources.

# Credits
(c) 2013 Mikola Lysenko. MIT License