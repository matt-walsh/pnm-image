"use strict";
class ImageMapFactory{
    constructor(){ }

    CreateImageMapFromFile(imageFileString){
         //Remove comments and create array from the image string
        let splitFileString = this.RemoveComments(imageFileString.split("\n"));
        
        //Capture image format data
        let magicNumber = splitFileString[0];
        
        //Capture resolution
        let resolutionArray = splitFileString[1].split(" ");
        let width = parseInt(resolutionArray[0]);
        let height = parseInt(resolutionArray[1]);

        //Handle format specific data
        let extraData = 0;
        let startingIndex = 3;

        if(magicNumber == "P1"){
            //monochrome pixel data starts at index 2
            startingIndex = 2;
        }
        else{
            //Greyscale and Color images require an extra piece of data
            extraData = splitFileString[2];
        }

        //Extract image data, depending on image format
        let imageData = new Array();

        //Monochrome
        if(magicNumber === "P1" || magicNumber === "P4"){
            for(let i = startingIndex; i < splitFileString.length; i++){
                let rowArray = new Array()
                for(let j = 0; j < splitFileString[i].length; j++){
                    if(splitFileString[i][j] !== " " || ""){
                        rowArray.push(splitFileString[i][j]);
                    }
                }
                imageData.push(rowArray);
            }

            return new PortableBitMap(magicNumber, width, height, imageData);
        }
        //Greyscale
        else if(magicNumber === "P2" || magicNumber === "P5"){
            let numberBuilder = "";
            for(let i = startingIndex; i < splitFileString.length; i++){
                let rowArray = new Array();
                for(let j = 0; j < splitFileString[i].length; j++){
                    if(splitFileString[i][j] !== " " || splitFileString[i][j] !== ""){
                        if(parseInt(splitFileString[i][j]) < extraData){
                            numberBuilder += splitFileString[i][j];
                            if(!parseInt(splitFileString[i][j+1])){
                                rowArray.push(parseInt(numberBuilder))
                                numberBuilder = "";
                            }
                        }
                    }
                }
                imageData.push(rowArray);
            }

            return new PortableGreyMap(magicNumber, width, height, extraData, imageData);
        }
        //Color
        else if(magicNumber === "P3" || magicNumber === "P6"){
            for(let i = startingIndex; i < splitFileString.length; i++){
                
                //Holds the final, formatted row to add to imageData
                let rowArray = new Array();
                //holds the RGB channels while they are being extracted
                let colorArray = new Array();
                //Counts how many channels have been captured
                let channelCount = 0;

                for(let j = 0; j < splitFileString[i].length; j++){
                    if(splitFileString[i][j] !== " "){
                        channelCount++;
                        colorArray.push(splitFileString[i][j]);
                        if(channelCount >= 3){
                            //create object to hold pixel color values and add to row array
                            let pixelData = {
                                'r': colorArray[0],
                                'g': colorArray[1],
                                'b': colorArray[2]
                            };
                            rowArray.push(pixelData);

                            //reset counter and color array
                            channelCount = 0;
                            colorArray.length = 0;

                        }
                    }
                }

                imageData.push(rowArray);
            }

            return new PortablePixelMap(magicNumber, width, height, extraData, imageData);
        }
        else{
            //ERROR
        }
    }

    RemoveComments(originalList){
        let newList = new Array();
        for(let line of originalList){
            if(line[0] !== "#"){
                //sanitize the input string
                newList.push(this.RemoveExtraCharacters(line));
            }
        }
        return newList;
    }

    RemoveExtraCharacters(originalString){
        let newString = new Array();
        for(let i = 0; i < originalString.length; i++){
            //uppercase
            if(originalString.charCodeAt(i) >= 65 && originalString.charCodeAt(i) <= 90){
                newString += originalString.charAt(i);                
            }
            //lowercase
            else if(originalString.charCodeAt(i) >= 97 && originalString.charCodeAt(i) <= 122){
                newString += originalString.charAt(i); 
            }
            //numbers
            else if(originalString.charCodeAt(i) >= 48 && originalString.charCodeAt(i) <= 57){
                newString += originalString.charAt(i); 
            }
            //space
            else if(originalString.charCodeAt(i) === 32){
                newString += originalString.charAt(i);                
            }
        }
        return newString;
        
    }
}

class PortableImageMap{
    constructor(magicNumber, width, height, imageData){
        //Basic member variables that all image formats share
        this.magicNumber = magicNumber;
        this.width = width;
        this.height = height;
        this.imageData = imageData;
    }

    GetImageData(){
        return this.imageData;
    }

    GetMagicNumber(){
        return this.magicNumber;
    }

    GetWidth(){
        return this.width;
    }

    GetHeight(){
        return this.height;
    }
}

class PortableBitMap extends PortableImageMap{
    constructor(magicNumber,width,height,imageData){
        super(magicNumber,width,height,imageData);
    }
}

class PortableGreyMap extends PortableImageMap{
    constructor(magicNumber, width, height, maxGreyValue, imageData){
        super(magicNumber, width, height, imageData);
        this.maxGreyValue = maxGreyValue;
    }

    GetMaxGreyValue(){
        return this.maxGreyValue;
    }
}

class PortablePixelMap extends PortableImageMap{
    constructor(magicNumber, width, height, maxColorValue, imageData){

        this.maxColorValue = maxColorValue;
        super(magicNumber, width, height, imageData);
    }

    GetMaxColorValue(){
        return this.maxColorValue;
    }
}