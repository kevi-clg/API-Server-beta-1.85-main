import Controller from './Controller.js';


export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);

    }

    post() {
        this.HttpContext.response.badRequest("Méthode post invalide");
    }

    put() {
        this.HttpContext.response.badRequest("Méthode put invalide");
    }

    remove() {
        this.HttpContext.response.badRequest("Méthode remove invalide");
    }


    get() {

        const params = this.HttpContext.path.params;
        let result;
        let op = params.op;
        let x = parseFloat(params.x);
        let y = parseFloat(params.y);
        let n = parseFloat(params.n);
        let xy = false;
        if (!params.op && !params.x && !params.y && !params.n) {
           
        }
        else {
            if (!params.op) {
                result = "'op' parameter is missing";

            }
            else {
                switch (params.op) {
                    case ' ':
                        xy = true;
                        if (!isNaN(x) && !isNaN(y)) {
                            result = x + y;
                        } else {
                            result = "Paramètres x ou y incorrects.";

                        }
                        break;
                    case '-':
                        xy = true;
                        if (!isNaN(x) && !isNaN(y)) {
                            result = x - y;
                        } else {
                            result = "Paramètres x ou y incorrects.";

                        }
                        break;
                    case '*':
                        xy = true;
                        if (!isNaN(x) && !isNaN(y)) {
                            result = x * y;
                        } else {
                            result = "Paramètres x ou y incorrects.";

                        }
                        break;
                    case '/':
                        xy = true;
                        if (!isNaN(x) && !isNaN(y)) {
                            if (y !== 0) {
                                result = x / y;
                            } else {
                                result = "Paramètres y doit être > que 0";

                            }
                        } else {
                            result = "Paramètres x ou y incorrects.";

                        }
                        break;
                    case '%':
                        xy = true;
                        if (!isNaN(x) && !isNaN(y)) {
                            result = x % y;
                        } else {
                            result = "Paramètres x ou y incorrects.";

                        }
                        break;
                    case '!':
                        if (!isNaN(n)) {
                            result = this.factorial(n);
                        } else {
                            result = "Paramètre n incorrect.";

                        }
                        break;
                    case 'p':
                        if (!isNaN(n)) {
                            result = this.isPrime(n);
                        } else {
                            result = "Paramètre n incorrect.";

                        }
                        break;
                    case 'np':
                        if (!isNaN(n)) {
                            result = this.findPrime(n);
                        } else {
                            result = "Paramètre n incorrect.";

                        }
                        break;
                }

            }


            if (xy) {
                this.HttpContext.response.JSON({ op: op, x: x, y: y, result: result });
            } else {
                this.HttpContext.response.JSON({ op: op, n: n, result: result });
            }

        }

    }

    factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        }
        return n * this.factorial(n - 1);
    }

    isPrime(value) {
        for (var i = 2; i < value; i++) {
            if (value % i === 0) {
                return false;
            }
        }
        return value > 1;
    }

    findPrime(n) {
        let primeNumber = 0;
        for (let i = 0; i < n; i++) {
            primeNumber++;
            while (!this.isPrime(primeNumber)) {
                primeNumber++;
            }
        }
        return primeNumber;
    }


}
