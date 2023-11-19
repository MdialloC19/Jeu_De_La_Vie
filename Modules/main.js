import { Canva } from "./canva.js";
import { SidebarModalManager } from "./sidebar.js";
import { Hamburger } from "./hamburger.js";

export class Main{

    constructor (){
        this.speed=25;
        this.isPlaying=false;
        this.isDroping=false;
        this.isClear=false;
        this.canva =new Canva("canvas",100*25,50*25,25);
        this.dropMatrix;
        this.rows=100;
        this.cols=50;
        this.isDroping=false;
        this.currentMatrice=new Array(this.rows);
        for (let i = 0; i < this.rows; i++)
           this.currentMatrice[i] = new Array(this.cols);

        this.initMatrix(false);
        this.canva.drawMatrix(this.currentMatrice);
        this.playPauseButton=document.getElementById('playPauseButton');
        playPauseButton.addEventListener('click', () => {
                this.play();
        });
        this.nextStepButton = document.getElementById('nextStep');
        this.nextStepButton.addEventListener('click', () => {
            this.nextStep();
        });
        this.resetButton = document.getElementById('resetButton');
        this.resetButton.addEventListener('click', () => {
            this.clear();
        });
        this.canva.canvas.addEventListener('click', (e)=>{
                this.draw(e);
        });

        this.speedRange=document.getElementById("speedRange");

        this.speedRange.addEventListener('input', () => {
            this.speed= this.speedRange.value;
            clearInterval(this.intervalPlay);
            this.intervalPlay = setInterval(()=>{
                this.nextStep();
            }, 2500/this.speed);
        });

        new Hamburger();
        new SidebarModalManager(
        "[data-open]",
        "[data-close]",
        "#modal",
        "#modal1",
        ".navbar"
        );
        
    }

    play(){
        this.togglePlay(!this.isPlaying);
        if(this.isClear){
            this.initMatrix(false);
        }
        if(this.isPlaying){
            this.intervalPlay=setInterval(()=>{
                this.nextStep();
            }, 2500/this.speed);
        }else{
            this.stop();
        }
    }
    nextStep(){
        const newMatrice = this.tour(this.currentMatrice);
        this.canva.redraw(newMatrice);
        this.currentMatrice = newMatrice;
        this.iteration++;

    }
    
    stop(){
        this.togglePlay(false);
        clearInterval(this.intervalPlay);
    }
    
    togglePlay(value){
        this.isPlaying = value;
        this.playPauseButton.textContent = this.isPlaying ? 'Pause' : 'Play';
    }

    tour(matrice){
        const parcours = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];
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
    initMatrix(empty){
        for(let row=0; row<this.rows;row++ ){
            for(let col=0; col<this.cols;col++ ){
                if(!empty)
                    this.currentMatrice[row][col]=Math.random()>=0.8?1:0;
                else
                    this.currentMatrice[row][col]=0;

            }
        }
    }
    clear(){
        this.initMatrix(true);
        this.canva.init();
        this.isClear=true;
        this.stop();

    }
    // for drag and drop
    draw(e){
        let x=Math.floor(e.offsetX/25);
        let y=Math.floor(e.offsetY/25);
        if(this.Droping){
            this.canva.drawMatrixOn(this.dropMatrix,y+1,x+1);
            for(let i=0; i<this.dropMatrix.length;i++){
                for(let j=0; j<this.dropMatrix[i].length;j++){
                    if(this.dropMatrix[i][j])
                    this.currentMatrice[i+y][x+j]=1;
                }
            }
            this.isDroping=false;
        }else{
            this.currentMatrice[y][x]=1;
            this.canva.drawCell(x,y); 
            
        }
    }
}