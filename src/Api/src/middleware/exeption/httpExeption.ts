class HttpException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
// en fontion de l'exeption firebas,etc une bonne exeption

export default HttpException;