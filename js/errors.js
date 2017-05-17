class Errors{
    constructor(handlerFunction){
        this.errorList = new Array();
        this.mutationHandler = handlerFunction || function() {};
    }
    SetHandler(handlerFunction) {
        if(typeof handlerFunction === 'function'){
            this.mutationHandler = handlerFunction;
        }
       
    }

    CallHandler(){
        if(typeof this.mutationHandler === 'function') {
            this.mutationHandler();
        }
    }

    AddError(errorName, errorDetails){
        this.errorList.push({errorName: errorDetails});
        this.CallHandler();
    }

    GetErrors(){
        return this.errorList;
    }

    ClearErrors(){
        this.errorList.length = 0;
    }

    
}