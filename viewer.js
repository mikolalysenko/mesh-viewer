"use strict"

var createShell = require("gl-now")
var createOrbitCamera = require("game-shell-orbit-camera")
var createMesh = require("gl-simplicial-complex")
var glm = require("gl-matrix")
var mat4 = glm.mat4

function Mesh(shell, baseMesh, modelMatrix) {
  this.shell = shell
  this.mesh = baseMesh
  this.modelMatrix = modelMatrix
}

Mesh.prototype.update = function updateMesh(params) {
  var options = shell._defaultOptions
  this.mesh.update({
    cells: params.cells,
    positions: params.positions,
    vertexColors: params.vertexColors,
    cellColors: params.cellColors,
    meshColor: params.meshColor || options.meshColor,
    vertexNormals: params.vertexNormals,
    cellNormals: params.cellNormals,
    useFacetNormals: params.useFacetNormals || options.useFacetNormals,
    pointSizes: params.pointSizes,
    pointSize: params.pointSize || options.pointSize || 1.0
  })
}

Mesh.prototype.draw = function drawMesh(params) {
  params = params || {}
  var shell = this.shell
  this.mesh.draw({
    model: params.model || this.modelMatrix,
    projection: params.projection || mat4.perspective(mat4.create(),
                                            shell.fov,
                                            shell.width / shell.height,
                                            shell.zNear,
                                            shell.zFar),
    view: params.view || shell.camera.view(),
    lightPosition: params.lightPosition || shell._defaultOptions.lightPosition,
    ambient: params.ambient || shell._defaultOptions.ambient,
    diffuse: params.diffuse || shell._defaultOptions.diffuse,
    specular: params.specular || shell._defaultOptions.specular,
    specularExponent: params.specularExponent || shell._defaultOptions.specularExponent
  })
}

Mesh.prototype.dispose = function disposeMesh() {
  this.mesh.dispose()
}

function createViewer(options) {
  options = options || {}
  
  var shell = createShell(options)
  var camera = createOrbitCamera(shell)
  
  shell.camera = camera
  
  shell.fov = options.fov || Math.PI / 4
  shell.zNear = options.zNear || 0.1
  shell.zFar = options.zFar || 1000.0
  
  function createViewerMesh(params) {
    var m = createMesh(shell.gl, {
      cells: params.cells,
      positions: params.positions,
      vertexColors: params.vertexColors,
      cellColors: params.cellColors,
      meshColor: params.meshColor || options.meshColor,
      vertexNormals: params.vertexNormals,
      cellNormals: params.cellNormals,
      useCellNormals: params.useCellNormals || options.useCellNormals,
      pointSizes: params.pointSizes,
      pointSize: params.pointSize || options.pointSize || 1.0
    })
    return new Mesh(shell, m, params.model || mat4.identity(mat4.create()) )
  }
  shell.createMesh = createViewerMesh
  
  shell.on("gl-init", function initViewer() {
    var gl = shell.gl
    gl.enable(gl.DEPTH_TEST)
    shell.emit("viewer-init")
  })
  
  shell._defaultOptions = options

  return shell
}

module.exports = createViewer
