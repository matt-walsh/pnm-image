"use strict";
//TESTING VARS
var CANVAS_HEIGHT = 800;
var CANVAS_WIDTH = 800;


//PBM Object
var image;
var canvas;
//Initialize canvas
window.onload = (function(){
    canvas = document.getElementById("image-canvas");
    if(canvas !== undefined){
        //@ts-ignore
        canvas.height = CANVAS_HEIGHT;
        //@ts-ignore
        canvas.width = CANVAS_WIDTH;
        //@ts-ignore
        if (canvas.getContext) {
            //@ts-ignore
            var context = canvas.getContext('2d');

            context.fillStyle = '#369';
            context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        }
    }
})

function HandleFile(file){
    let fileReader = new FileReader();
    fileReader.readAsText(file[0]);
    fileReader.onload = function(event){
        let imageFactory = new ImageMapFactory();
        let image = imageFactory.CreateImageMapFromFile(fileReader.result);
        //Change file name
        //Change image type
        //Draw image
        DrawImage(image);
    }

}

function DrawImage(image){
    console.log(image);
    canvas.width = image.GetWidth();
    canvas.height = image.GetHeight();
    canvas.getContext('2d').fillRect(0,0,canvas.width, canvas.height)
}