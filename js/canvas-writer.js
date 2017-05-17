class CanvasWriter{
    constructor(context, pixelFactor, width, height){
        this.context = context;
        this.width = width;
        this.height = height;
        this.pixelFactor = pixelFactor;
    }

    Draw(image){
        
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
                this.context.fillStyle = "#" + ConvertToHex(intensity, intensity, intensity);

                this.context.fillRect(row * this.pixelFactor ,col * this.pixelFactor , 
                this.pixelFactor, this.pixelFactor);
            }
        }      
    }

    WriteColorArrayToCanvas(dataArray, colorFactor){

    }

    ConvertToHex(r,g,b){
        return r.toString(16) + g.toString(16) + b.toString(16);
    }
}