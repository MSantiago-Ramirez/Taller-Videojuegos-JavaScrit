const canvas = document.querySelector('#canvas');
const juego = canvas.getContext('2d');

window.addEventListener('load',setCanvaSize)
window.addEventListener('resize',setCanvaSize)
// window.addEventListener('resize',startGame)
// function startGame(){
//     const fraccion = 0.7
  
//     let canvaSize;
    
//     if(window.innerWidth > window.innerHeight){
//         canvaSize = window.innerHeight * fraccion
        
//         canvas.setAttribute('width', (canvaSize))
//         canvas.setAttribute('height', (canvaSize))
       
//     }
//       else{
//         canvaSize = window.innerWidth * fraccion
//         canvas.setAttribute('width', canvaSize)
//         canvas.setAttribute('height', canvaSize)
//       }
    
//     const elementSize = canvaSize/10;
//     console.log(elementSize)
//     juego.textAlign = 'end'
//     juego.font = elementSize + 'px Verdana'
//     for(let i= 1 ; i <= 10; i++){
//     juego.fillText(emojis['X'],elementSize*i,elementSize)
//     }
// }

let canvaSize;
let elementSize;

function setCanvaSize(){
  const fraccion = 0.7    
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
}
function startGame(){

  
  // console.log(elementSize)
  juego.textAlign = 'end'
  juego.font = elementSize + 'px Verdana'
  // for(let i= 1 ; i <= 10; i++){
  // juego.fillText(emojis['X'],elementSize*i,elementSize)
  // }

  
  map = maps[2]
  mapRows = map.trim().split('\n');
  console.log(mapRows)
  mapRowsColums =mapRows.map(fila => fila.trim().split(''))
  let emoji;

  for (let fila = 1 ; fila <= 10; fila++){
    for (let  columna = 1 ; columna <= 10; columna++){

      emoji = mapRowsColums[fila - 1][columna - 1]
      
      juego.fillText(emojis[emoji],elementSize*columna, elementSize*fila)
    }
  }

}
