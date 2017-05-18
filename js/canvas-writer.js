class CanvasWriter{
    constructor(context, pixelFactor, width, height){
        this.context = context;
        this.width = width;
        this.height = height;
        this.pixelFactor = pixelFactor;
    }

    Draw(image){
        let magicNumber = image.GetMagicNumber();      
        if(magicNumber === "P1" || magicNumber === "P4"){
            this.WriteMonochromeArrayToCanvas(image.GetImageData());        
        }
        else if(magicNumber === "P2" || magicNumber === "P5"){
            this.WriteGreyscaleArrayToCanvas(image.GetImageData(), image.GetMaxGreyValue());
        }
        else if(magicNumber === "P3" || magicNumber === "P6"){
            this.WriteColorArrayToCanvas(image.GetImageData(), image.GetMaxColorValue());
        }
    }

    WriteMonochromeArrayToCanvas(dataArray){
        for(let row = 0; row < this.height; row++){
            for(let col = 0; col < this.width; col++){
                if(dataArray[row][col] === 0){
                    this.context.fillStyle = "#000000";
                }
                else{
                    this.context.fillStyle = "#FFFFFF";
                }

                this.context.fillRect(row * this.pixelFactor ,col * this.pixelFactor , 
                    this.pixelFactor, this.pixelFactor);
            }
        }
    }

    WriteGreyscaleArrayToCanvas(dataArray, maxValue){
        for(let row = 0; row < this.height; row++){
            for(let col = 0; col < this.width; col++){
                let intensity = Math.round((dataArray[row][col] / maxValue) * 255);
                this.context.fillStyle = "#" + this.ConvertToHex(intensity, intensity, intensity);

                this.context.fillRect(col * this.pixelFactor ,row * this.pixelFactor , 
                this.pixelFactor, this.pixelFactor);
            }
        }      
    }

    WriteColorArrayToCanvas(dataArray, maxValue){

    }

    ConvertToHex(r,g,b){
        return r.toString(16) + g.toString(16) + b.toString(16);
    }
}