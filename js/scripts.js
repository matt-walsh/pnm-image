"use strict";
//TESTING VARS



//PBM Object
var image;
var canvasWriter;
var canvas;
var context;

//Initialize canvas
window.onload = (function(){
    canvas = document.getElementById("image-canvas");
    if(canvas !== undefined){
        if (canvas.getContext) {
            context = canvas.getContext('2d');
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
    canvasWriter = new CanvasWriter(context,10,image.GetWidth(),image.GetHeight());
    canvasWriter.Draw(image.GetImageData());

}