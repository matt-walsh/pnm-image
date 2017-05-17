"use strict";
const ZOOM_FACTOR = 10;

class CanvasInterface{
    
    constructor(canvas, image){
        this.canvas = undefined;
        this.context = undefined;
        this.image = undefined;

        if(canvas !== undefined){
            //initialize canvas with image width and height, modified by the ZOOM_FACTOR
            this.canvas = canvas;
            this.canvas.width = image.width * ZOOM_FACTOR;
            this.canvas.height = image.height * ZOOM_FACTOR;

            if (this.canvas.getContext) {
                this.context = canvas.getContext('2d');
            }
        }

        if(image !== undefined){
            this.image = image;
        }

        if(this.context !== undefined && this.image !== undefined){
            this.DrawImage()
        }
    }

    SetHeight(height){
        this.canvas.height = height * ZOOM_FACTOR;
    }

    SetWidth(width){
        this.canvas.width = width * ZOOM_FACTOR
    }

    DrawImage(){
        //Check for image type and draw image to canvas
        if(image.magicNumber === "P1" || image.magicNumber === "P4"){
            for(let i = 0; i < image.imageData.length; i++){
                for(let j = 0; j < image.imageData[i].length; j++){
                    
                }
            }
        }
        else if(image.magicNumber === "P2" || image.magicNumber === "P5"){

        }
        else if(image.magicNumber === "P3" || image.magicNumber === "P6"){

        }
    }
}