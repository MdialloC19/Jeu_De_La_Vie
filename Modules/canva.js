export class Canva{

    constructor(id,width,height,cell){
        this.canvas=document.getElementById(id);
        this.context=this.canvas.getContext("2d");
        this.aliveColorInput = document.getElementById('aliveColor');
        this.deadColorInput = document.getElementById('deadColor');
        this.width=width;
        this.height=height;
        this.cell=cell;
        this.aliveColorInput.addEventListener('change', () => {
            this.aliveColor=this.aliveColorInput.value;
        });
        
        this.deadColorInput.addEventListener('change', () => {
            this.deadColor=this.deadColorInput.value;
        });
        this.aliveColor="red";
        this.deadColor="#00ce79";
        this.init();
    }
    init(){
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        this.context.fillStyle=this.deadColor;
        this.context.fillRect(0,0,this.width,this.height);
        this.drawMatrixEmpty();
    }

    drawMatrixEmpty(){
        this.context.strokeStyle="#c4c4c4";
        this.context.lineWidth=2;

        for(let i=0; i<=this.width;i+=this.cell){
            this.context.moveTo(i,0);
            this.context.lineTo(i,this.height);
        }

        for(let j=0; j<=this.width;j+=this.cell){
            this.context.moveTo(0,j);
            this.context.lineTo(this.width,j);
        }
        this.context.stroke();
    }
    drawCell(x,y){
        this.context.fillStyle=this.aliveColor;
        this.context.fillRect(x*this.cell,y*this.cell,this.cell,this.cell);
      

    }
    drawMatrix(matrix){
        for(let i=0; i<matrix.length;i++){
            for(let j=0; j<matrix[i].length;j++){
                if(matrix[i][j])
                    this.drawCell(j,i);
            }
        }
    }
    drawMatrixOn(matrix,x,y){
        for(let i=0; i<matrix.length;i++){
            for(let j=0; j<matrix[i].length;j++){
                if(matrix[i][j])
                    this.drawCell(j+y,x+i);
            }
        }
    }
    redraw(matrix){
        this.init();
        this.drawMatrix(matrix);
    }
}