import { Router } from 'express';

interface Controller {
    path: string;
    router: Router;
    // constructor() {
    //     this.initialiseRoutes();
    // }
    
    // initialiseRoutes(): void ;

}
// il y a un truc inject 

export default Controller;