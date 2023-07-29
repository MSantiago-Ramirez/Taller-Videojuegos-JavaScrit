const canvas = document.querySelector('#canvas');
const btnRight = document.querySelector('#right');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnDown = document.querySelector('#down');
const juego = canvas.getContext('2d');
const spanlive = document.querySelector('#live')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')

window.addEventListener('load',setCanvaSize);
window.addEventListener('resize',calaberaReposition);
window.addEventListener('resize',setCanvaSize);

function decimales(n){return Number(n.toFixed(0))}

let canvaSize;
let elementSize;
let playerPosition = {
  x:undefined,
  y:undefined,
};

let giftPlayer = {
  x: undefined,
  y: undefined,
};

let enemyBomb = [];
let level = 0;
let live = 3;
let initialTime = Date.now()
let intervalTime = setInterval(showTime,100);
// let intervalTime; 
let time;
let endTime;
let recorridoCalavera ={col:undefined,row:undefined};
let repositionCalavera ={x:undefined,y:undefined};

function setCanvaSize(){
  const fraccion = 0.8    
    if(window.innerWidth > window.innerHeight){
        canvaSize = window.innerHeight * fraccion
        canvaSize = decimales(canvaSize)
        
        canvas.setAttribute('width', (canvaSize))
        canvas.setAttribute('height', (canvaSize))
       
    }
      else{
        canvaSize = window.innerWidth * fraccion
        canvas.setAttribute('width', canvaSize)
        canvas.setAttribute('height', canvaSize)
      }

       elementSize = canvaSize/10;
       elementSize = decimales(elementSize)

      startGame();
};

function startGame() {
  juego.textAlign = 'end';
  juego.font = elementSize + 'px Verdana';
 
  showLive();
  map = maps[level];

  if(!map){return overgame()
  };
  mapRows = map.trim().split('\n');
 
  mapRowsColums =mapRows.map(fila => fila.trim().split(''))
  let emoji;
  let posX;
  let posY;
  enemyBomb =[];
  juego.clearRect(0,0,canvaSize,canvaSize);

  mapRowsColums.forEach((fila, rowI) => {
    fila.forEach((columna,colI) => {
      emoji = emojis[columna];
      posX = elementSize * (colI + 1)
      posX = decimales(posX);
      posY = elementSize * (rowI + 1)
      posY =decimales(posY);
      juego.fillText(emoji,posX,posY)

      if (columna == 'O'){
        if(!playerPosition.x && !playerPosition.y){
          playerPosition.x = posX;
          playerPosition.y = posY;
          };
      } else if( columna == 'I'){
        giftPlayer.x = posX;
        giftPlayer.y = posY;
      } else if(columna == 'X'){
        enemyBomb.push({x: posX, y:posY})
      }
      if(playerPosition.x == posX && playerPosition.y==posY){
        recorridoCalavera.col = colI; 
        recorridoCalavera.row = rowI;
        console.log(recorridoCalavera)
        };
      if(recorridoCalavera.col == colI && recorridoCalavera.row == rowI){
        repositionCalavera.x = posX
        repositionCalavera.y =posY
        console.log(repositionCalavera)
      }
       
      
        
        
    })
    });
  if(repositionCalavera.x != playerPosition.x && repositionCalavera.y != playerPosition.y){calaberaReposition();}
  console.log({playerPosition,canvaSize})
  showRecord()
  showTime();
  movePlayer();
    
};
function showLive(){
 spanlive.innerHTML =  ''
 let arrayLive =Array(live).fill(emojis['HEART'])
 arrayLive.forEach(corazon=> {spanlive.append(corazon)})
};
function showTime(){
  let timeNow = Date.now();
  time = timeNow - initialTime;
  spanTime.innerHTML = time;
  
 
};
function showRecord(){
  if(!localStorage.getItem('record')){
  spanRecord.innerHTML = 'No tienes un record definido'
 }
  else {spanRecord.innerHTML = localStorage.getItem('record');}
  
};
function winLevel(){
  let giftX= decimales(playerPosition.x) == decimales(giftPlayer.x);
  let gifty= decimales(playerPosition.y) == decimales(giftPlayer.y);
  let giftConfirm = giftX && gifty;
  
  if(giftConfirm){
    level++;
    startGame();
  }
  
};

function overgame(){ console.log('ter')
  clearInterval(intervalTime)
  endTime = time
  if(!localStorage.getItem('record')){
    localStorage.setItem('record',endTime)
  }
  if( endTime <= localStorage.getItem('record')){
    localStorage.setItem('record',endTime)
  } 
  showRecord()
};
function choqueBomb(){
  bombConfirm = enemyBomb.find(objetos=> {
    let bombX= decimales(playerPosition.x) == decimales(objetos.x);
    let bomby= decimales(playerPosition.y) == decimales(objetos.y);
    
    return bombX && bomby;
     
  })
  
  if (bombConfirm){ 
    playerPosition.x = undefined; 
    playerPosition.y = undefined;
    live--
    if(live<=0){
      level = 0;
      live = 3;
      initialTime = Date.now()
    };startGame()};
  }
function movePlayer(){
  winLevel()
  choqueBomb()
  juego.fillText(emojis['PLAYER'], decimales(playerPosition.x) , decimales(playerPosition.y));
  console.log(playerPosition)

};
  
 
 
 
//Deteccion de teclas

window.addEventListener('keydown',detectClicKeyBoard);
btnUp.addEventListener('click',moveUp);
btnRight.addEventListener('click',moveRight);
btnLeft.addEventListener('click',moveLeft);
btnDown.addEventListener('click',moveDown);

function calaberaReposition(){
  playerPosition.x = repositionCalavera.x;
  playerPosition.y = repositionCalavera.y;
  // playerPosition.x = decimales(playerPosition.x)
  // playerPosition.y = decimales(playerPosition.y)
  
  
 }
function detectClicKeyBoard(tecla){

  switch (tecla.key) {
    case 'ArrowUp':
      moveUp()
      break;
    case 'ArrowDown':
      moveDown()
      break;
    case 'ArrowRight':
      moveRight()
    break;
    case 'ArrowLeft':
      moveLeft()
    break;  
   
  }
}
function moveUp(){
  console.log({playerPosition,canvaSize})
  if (playerPosition.y  > 1.5*elementSize){ 
    playerPosition.y -= elementSize;
    playerPosition.y = decimales(playerPosition.y)
    startGame()}

}
function moveRight(){
  if (playerPosition.x <= canvaSize - elementSize)
  {playerPosition.x += elementSize;
    playerPosition.x = decimales(playerPosition.x)
  startGame()}
}
function moveLeft(){
  if (playerPosition.x >1.5* elementSize )
  {playerPosition.x -= elementSize;
    playerPosition.x = decimales(playerPosition.x)
  startGame()}
}
function moveDown(){
  
  if ( playerPosition.y <  canvaSize - 0.5*elementSize )
  {playerPosition.y += elementSize;
  playerPosition.y = decimales(playerPosition.y)
  startGame()}
}










