import { Canva } from "./Modules/canva.js";
document.addEventListener('DOMContentLoaded', function() {
    const matrixSizeInput = document.getElementById('matrixSize');
    const initialStateInput = document.getElementById('initialState');
    const aliveColorInputDefault= "#57C40D";
    const aliveColorInput = document.getElementById('aliveColor');
    const deadColorInput = document.getElementById('deadColor');
    const matrixTable = document.getElementById('matrix');
    const playPauseButton = document.getElementById('playPauseButton');
    const speedRange = document.getElementById('speedRange');
    const resetButton = document.getElementById('resetButton');
    const nextStepButton = document.getElementById('nextStep');
    const pattern=document.getElementById('patterns');
    let currentMatrice;
    let isPlaying = false;
    let intervalId;
    let step=false;
    let timeSpeed = 1000; 
    let iteration = 1;
    let dropMatrix=[
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ];
    let isDroping=true;
    let canvaMove=new Canva("move",3*25,3*25,25);
    canvaMove.drawMatrix(dropMatrix);

    let canva =new Canva("canvas",100*25,50*25,25);

    canva.canvas.addEventListener('click', (e)=>{
        let x=Math.floor(e.offsetX/25);
        let y=Math.floor(e.offsetY/25);
        if(isDroping){
            canva.drawMatrixOn(dropMatrix,y+1,x+1);
            for(let i=0; i<dropMatrix.length;i++){
                for(let j=0; j<dropMatrix[i].length;j++){
                    if(dropMatrix[i][j])
                        currentMatrice[i+y][x+j]=1;
                }
        }
            
        }else{
            currentMatrice[y][x]=1;
            canva.drawCell(x,y); 
        }  
    });

    canva.canvas.addEventListener('mousemove',(e)=>{
        let x=Math.floor(e.offsetX/25);
        let y=Math.floor(e.offsetY/25);
        console.log(x,y);
        canvaMove.canvas.style.left=`${x*25+25}px`;
        canvaMove.canvas.style.top=`${y*25+25}px`;
        canvaMove.canvas.style.zIndex=100;
    })

    function displayMatrixInit() {
        matrixTable.innerHTML = '';
        for (let i = 0; i < 50; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 50; j++) {
                const cell = document.createElement('td');
        
                cell.style.backgroundColor =  aliveColorInputDefault;
                cell.addEventListener('click', () => toggleCellState(i, j));
                row.appendChild(cell);
            }
            matrixTable.appendChild(row);
        }
    }
    // displayMatrixInit();

  function CreatePatternMatrix(Matrix, name) {
    const matrixTable = document.createElement('table');
    matrixTable.setAttribute('id', name);

    for (let i = 0; i < Matrix.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < Matrix.length; j++) {
            const cell = document.createElement('td');

            if (Matrix[i] && Matrix[i][j] === 1) {
                cell.style.backgroundColor = aliveColorInput.value;
            } else {
                cell.style.backgroundColor = deadColorInput.value;
            }
            row.appendChild(cell);
        }
        matrixTable.appendChild(row);
    }

    // Rendre la table "draggable"
    matrixTable.setAttribute('draggable', 'true');

    matrixTable.addEventListener('dragstart', dragStart);

    pattern.appendChild(matrixTable);
}
  

function dragStart(e) {
    
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);

}
    // matrixTable.addEventListener('dragenter', dragEnter)
    // matrixTable.addEventListener('dragover', dragOver);
    // matrixTable.addEventListener('dragleave', dragLeave);
    // matrixTable.addEventListener('drop', dropMainMatrix);


function drop(e) {
    e.target.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    e.target.appendChild(draggable);

    draggable.classList.remove('hide');
}

function dragEnter(e) {
    e.preventDefault();
   
}

function dragOver(e) {
    e.preventDefault();

}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function dropMainMatrix(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    const targetCell = e.target;

    // Vérifier si la cellule cible est une cellule valide dans la matrice
    if (targetCell.tagName.toLowerCase() === 'td') {
        // Ajouter la classe pour indiquer le survol (à des fins de style)
        targetCell.classList.remove('drag-over');

        // Insérer le contenu du motif dans la cellule cible de la matrice principale
        targetCell.appendChild(draggable.cloneNode(true));
    }
}


    const parcours = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];
    function tour(matrice) {
        const newMatrice = matrice.map(row => [...row]);

        for (let i = 0; i < matrice.length; i++) {
            for (let j = 0; j < matrice[0].length; j++) {
                let cpt = 0;

                for (const [dl, dc] of parcours) {
                    const l = i + dl;
                    const c = j + dc;

                    if (0 <= l && l < matrice.length && 0 <= c && c < matrice[0].length) {
                        cpt += matrice[l][c];
                    }
                }

                if (matrice[i][j] === 1 && (cpt !== 2 && cpt !== 3)) {
                    newMatrice[i][j] = 0;
                }

                if (matrice[i][j] === 0 && cpt === 3) {
                    newMatrice[i][j] = 1;
                }
            }
        }

        return newMatrice;
    }

    function displayMatrix(matrice) {
        matrixTable.innerHTML = '';
        for (let i = 0; i < matrice.length; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < matrice[0].length; j++) {
                const cell = document.createElement('td');
        
                cell.style.backgroundColor = matrice[i][j] === 1 ? aliveColorInput.value : deadColorInput.value;
                cell.addEventListener('click', () => toggleCellState(i, j));
                row.appendChild(cell);
            }
            matrixTable.appendChild(row);
        }
    }

   
    function initializeRandomMatrix() {
        const randomMatrix = [];

        for (let i = 0; i < 100; i++) {
            const row = [];
            for (let j = 0; j < 100; j++) {
            
                row.push(Math.round(Math.random()));
            }
            randomMatrix.push(row);
        }

        return randomMatrix;
    }
    function initializeEmptyMatrix(size) {
        const emptyMatrix = [];

        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(0);
            }
            emptyMatrix.push(row);
        }

        return emptyMatrix;
    }
 
 
    matrixSizeInput.addEventListener('change', () => {
        updateMatrix();
    });
    nextStepButton.addEventListener('click', () => {
        step=true;
        updateAndDisplayMatrix();
    });


    initialStateInput.addEventListener('change', () => {
        updateMatrix();
    });

    aliveColorInput.addEventListener('change', () => {
        updateMatrix();
    });

    deadColorInput.addEventListener('change', () => {
        updateMatrix();
    });
    playPauseButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseButton.textContent = isPlaying ? 'Pause' : 'Play';
       
    });

    function updateMatrix() {
        currentMatrice = (initialStateInput.value === 'random') ? initializeRandomMatrix() : initializeEmptyMatrix(matrixSizeInput.value);
        iteration = 1;
        isPlaying = false;

       
        updateAndDisplayMatrix();

        
        intervalId = setInterval(updateAndDisplayMatrix, timeSpeed);
    }

    function updateAndDisplayMatrix() {
        if (!isPlaying & !step) {
            console.log("dsqd")
            return;
        }

        const newMatrice = tour(currentMatrice);
        canva.redraw(newMatrice);
        // displayMatrix(newMatrice);

        
        currentMatrice = newMatrice;

        
        console.log('Iteration:', iteration);

        iteration++;
        if(step)
            step=false;

    }

   
  

    speedRange.addEventListener('input', () => {
        e
        timeSpeed = 1000 / speedRange.value;
        clearInterval(intervalId);
        intervalId = setInterval(updateAndDisplayMatrix, timeSpeed);
    });

    resetButton.addEventListener('click', () => {
        currentMatrice = initializeEmptyMatrix(matrixSizeInput.value);
        console.log("sdfjksdkjfsd")
        displayMatrix(currentMatrice);
    });

    function toggleCellState(row, col) {
        currentMatrice[row][col] = currentMatrice[row][col] === 1 ? 0 : 1;
        redraw(currentMatrice);
    }

    const sidebarBtn = document.querySelector(".toggle-btn");
    sidebarBtn.addEventListener("click", () => {
        document.body.classList.toggle("active");
    });

    currentMatrice = (initialStateInput.value === 'random') ? initializeRandomMatrix() : initializeEmptyMatrix(matrixSizeInput.value);
    iteration = 1;
    isPlaying = false;
    
    updateAndDisplayMatrix();

    
    intervalId = setInterval(updateAndDisplayMatrix, timeSpeed);
});
/*mes modals*/
const openBtn = document.querySelector("[data-open]");
const closeBtn = document.querySelector("[data-close]");
const modal = document.querySelector("#modal");

openBtn.addEventListener("click", () => {
  modal.style.display = 'block';
});


closeBtn.addEventListener("click", () => {
  modal.style.display = 'none';
});

const navBar = document.querySelector(".navbar");
let prevScrollPos = window.scrollY;

window.addEventListener("scroll", function () {
  let currScrollPos = window.scrollY;

  if (currScrollPos > prevScrollPos) {
    navBar.style.transform = `translateY(-105%)`;
  } else {
    navBar.style.transform = `translateY(0%)`;
  }

  prevScrollPos = currScrollPos;
});
