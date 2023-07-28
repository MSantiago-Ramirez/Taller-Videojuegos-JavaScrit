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
window.addEventListener('resize',cero);
window.addEventListener('resize',setCanvaSize);

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
let record = Infinity;

let endTime;


function setCanvaSize(){
  const fraccion = 0.8    
    if(window.innerWidth > window.innerHeight){
        canvaSize = window.innerHeight * fraccion
        
        canvas.setAttribute('width', (canvaSize))
        canvas.setAttribute('height', (canvaSize))
       
    }
      else{
        canvaSize = window.innerWidth * fraccion
        canvas.setAttribute('width', canvaSize)
        canvas.setAttribute('height', canvaSize)
      }

       elementSize = canvaSize/10;

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
      posY = elementSize * (rowI + 1)
      juego.fillText(emoji,posX,posY)

      if (columna == 'O'){
        if(!playerPosition.x && !playerPosition.y){
          playerPosition.x = posX;
          playerPosition.y = posY
          };
      } else if( columna == 'I'){
        giftPlayer.x = posX;
        giftPlayer.y = posY
      } else if(columna == 'X'){
        enemyBomb.push({x: posX, y:posY})
      }
    })
    });
  if (showRecord()) spanRecord.innerHTML = localStorage.getItem('record'); 
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
  localStorage.setItem('record',record)
  if( endTime < localStorage.getItem('record')){
    record = endTime
    localStorage.setItem('record',record)
  }
  
 console.log(record)
  if(localStorage.getItem('record')==Infinity){spanRecord.innerHTML='+'}
  else{spanRecord.innerHTML = localStorage.getItem('record'); }
  
  
};
function winLevel(){
  let giftX= playerPosition.x.toFixed(2) == giftPlayer.x.toFixed(2);
  let gifty= playerPosition.y.toFixed(2) == giftPlayer.y.toFixed(2);
  let giftConfirm = giftX && gifty;
  console.log({playerPosition})
  if(giftConfirm){
    level++;
    startGame();
  }
  
};

function overgame(){ console.log('ter')
  clearInterval(intervalTime)
  endTime = time
  showRecord()
};
function choqueBomb(){
  bombConfirm = enemyBomb.find(objetos=> {
    let bombX= playerPosition.x.toFixed(1) == objetos.x.toFixed(1);
    let bomby= playerPosition.y.toFixed(1) == objetos.y.toFixed(1);
    return bombX && bomby;
     
  })
  
  if (bombConfirm){ 
    playerPosition.x = undefined; 
    playerPosition.y = undefined;
    live--
    if(live<=0){
      level = 0;
      live = 3;
      intervalTime = Date.now()
    };startGame()};
  }
function movePlayer(){
  winLevel()
  choqueBomb()
  juego.fillText(emojis['PLAYER'], playerPosition.x , playerPosition.y);

};
  
 
 
 
//Deteccion de teclas

window.addEventListener('keydown',detectClicKeyBoard);
btnUp.addEventListener('click',moveUp);
btnRight.addEventListener('click',moveRight);
btnLeft.addEventListener('click',moveLeft);
btnDown.addEventListener('click',moveDown);

function cero(){
  playerPosition.x = undefined;
  playerPosition.y = undefined;
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
  if (playerPosition.y  > 1.5*elementSize){  playerPosition.y -= elementSize;
  
    startGame()}

}
function moveRight(){
  if (playerPosition.x <= canvaSize - elementSize)
  {playerPosition.x += elementSize;
  startGame()}
}
function moveLeft(){
  if (playerPosition.x >1.5* elementSize )
  {playerPosition.x -= elementSize;
  startGame()}
}
function moveDown(){
  if ( playerPosition.y < canvaSize )
  {playerPosition.y += elementSize;
  startGame()}
}










