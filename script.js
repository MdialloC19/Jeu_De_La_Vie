document.addEventListener('DOMContentLoaded', function() {
    const matrixSizeInput = document.getElementById('matrixSize');
    const initialStateInput = document.getElementById('initialState');
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
    matrixTable.addEventListener('dragenter', dragEnter)
    matrixTable.addEventListener('dragover', dragOver);
    matrixTable.addEventListener('dragleave', dragLeave);
    matrixTable.addEventListener('drop', dropMainMatrix);


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

        for (let i = 0; i < matrixSizeInput.value; i++) {
            const row = [];
            for (let j = 0; j < matrixSizeInput.value; j++) {
            
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
        displayMatrix(newMatrice);

        
        currentMatrice = newMatrice;

        
        console.log('Iteration:', iteration);

        iteration++;
        if(step)
            step=false;

    }

   
    playPauseButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseButton.textContent = isPlaying ? 'Pause' : 'Play';
        CreatePatternMatrix([
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ], "blinder");
    });

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
        displayMatrix(currentMatrice);
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
