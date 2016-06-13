var Area = function(width, height) {
  var that = this;
  const canvas = document.createElement("canvas");
  canvas.setAttribute('id', 'canvas');
  const cellSize = 32;
  this.playerPosition = {};
  canvas.width = MAP1.width*cellSize;
  canvas.height = MAP1.height*cellSize;
  this.context = canvas.getContext("2d");
  this.context.sRect = function(x,y,w,h) {
    x=parseInt(x)+0.50;
    y=parseInt(y)+0.50;
    this.strokeRect(x,y,w,h);
  }
  this.context.fRect=function(x,y,w,h){
    x=parseInt(x);
    y=parseInt(y);
    this.fillRect(x,y,w,h);
  }
  this.context.dRect=function(x,y,w,h){
    x=parseInt(x)+0.50;
    y=parseInt(y)+0.50;
    this.rect(x,y,w,h);
  }
  document.body.insertBefore(canvas, document.body.childNodes[0]);

  this.start = function() {
    this.interval = setInterval(updateGameArea, 20);
  };
  this.clear = function() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  };

  //check navigation
  this.canMove = function(x, y, w, h, d) {
    if(y < 0) return false;
    else if(x + w > canvas.width) return false;
    else if(y + h > canvas.height) return false;
    else if(x < 0) return false;
    else if(intersectsWithObject(x, y, w, h)) return false;
    return true;
  }

  function intersectsWithObject(x, y, w, h, d) {
    var result = false;
    for(var n in objects) {
      var o = objects[n];
      if (x <= (o.x + cellSize - 1) && 
          (x + w) >=  o.x + 1  && 
          y <= (o.y + cellSize - 1) &&
          (y + h) >=  o.y + 1)
        return true;
    }
    return false;
  }

  function loadMap(data) {
    var objects = [];
    for(var i in data) {
      for(var j in data[i]) {
        if(data[i][j] === 'p') {
          that.playerPosition = {x: j*cellSize, y: i*cellSize};
        }else if(data[i][j] !== '0')
          objects.push({x: j*cellSize, y: i*cellSize, type: Number(data[i][j])-1+''});
        
      }
    }
    return objects;
  }

  //objects on the map
  var names = ['strawberry', 'wall1'];
  var images = {};
  for(var n in names) {
    images[n] = new Image();
    images[n].src = 'images/' + names[n] + '.png';
  }

  var objects = loadMap(MAP1.data);
  this.drawObjects = function() {
    for(var n in objects) {
      var o = objects[n];
      this.context.drawImage(images[o.type], o.x, o.y);
    }
  }
}