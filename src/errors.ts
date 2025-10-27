export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NetworkError";
    }
}

export class DataError extends Error {
    constructor(message = "Data Error") {
        super(message);
        this.name = "DataError";
    }   
}
   
