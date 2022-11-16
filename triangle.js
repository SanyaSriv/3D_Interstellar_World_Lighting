class Triangle {
  constructor() {
    this.color = [0.0, 0.0, 0.0, 1.0];
    this.position = [0.0, 0.0, 0.0];
    this.type = "triangle";
    this.size = 5.0;
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // passing the size
    gl.uniform1f(u_PointSize, size);
    // Deciding the scaling factor
    var scaling_factor = this.size / 200;
    // Drawing the traingle finally
    drawTriangles([xy[0], xy[1], xy[0] + scaling_factor, xy[1], xy[0], xy[1] + scaling_factor]);
  }
}

function drawTriangles(vertices) {
  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array (vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  // Draw
  gl.drawArrays(gl.TRIANGLES, 0, n);
  return n;
}

function drawTriangles3D(vertices) {
  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array (vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  // Draw
  gl.drawArrays(gl.TRIANGLES, 0, n);

  // gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3)
  // gl.enableVertexAttribArray(gl.COLOR_ARRAY);
  // // trying something here to improve performance
  // if (color != null) {
  //   gl.glColorPointer(3, gl.FLOAT, 0, color);
  // }

  return n;
}


var g_vertexBuffer = null;
var g_uvBuffer = null;

function initTriangle3DUV() {
  g_vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
}

function initTriangleUV() {
  uvBuffer = gl.createBuffer();
  if (!uvBuffer) {
    console.log("Failed to create the uvBuffer");
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_UV);

}

function drawTriangles3DUV(vertices, uv) {
  var n = vertices.length / 3; // The number of vertices
  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array (vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  var uvBuffer = gl.createBuffer();
  if (!uvBuffer) {
    console.log("Failed to create the uvBuffer");
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array (uv), gl.DYNAMIC_DRAW);

  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_UV);

  // Draw
  gl.drawArrays(gl.TRIANGLES, 0, n);

}

function drawTriangles3DUVNormal(vertices, uv, normals) {

  var n = vertices.length/3;

  // creating the buffer object for positions
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array (vertices), gl.DYNAMIC_DRAW);
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);


  // creating the buffer objects for UV Coordinates
  var uvBuffer = gl.createBuffer();
  if (!uvBuffer) {
    console.log("Failed to create the uvBuffer");
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array (uv), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_UV);


  // creating the buffer for storing the normal data
  var normalBuffer = gl.createBuffer();
  if (!normalBuffer) {
    console.log("Failed to create a buffer for normals");
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array (normals), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Normal);

  // // FINALLY DRAW
  gl.drawArrays(gl.TRIANGLES, 0, n);
  g_vertexBuffer = null;

}
