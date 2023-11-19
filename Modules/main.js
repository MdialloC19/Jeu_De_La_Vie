import { Canva } from "./canva.js";

export class Main{

    constructor (){
        this.canvas=new Canva (300,300,25);
        this.matrix=[
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ];
        // this.canvas.drawMatrix(this.matrix);
        this.canvas.drawMatrixOn(this.matrix,5,7);

        console.log("test");

    }
}