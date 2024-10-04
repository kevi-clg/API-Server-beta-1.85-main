import Controller from './Controller';

export default class MathsController extends Controller {
    get() {
        const params = this.HttpContext.path.params;

        
        if (!params.op) {
            this.HttpContext.response.badRequest("Opération manquante.");
            return;
        }

        let x;
        let y;
        let n;
        let result;

        // Calculs en fonction du code d'opération
        switch (params.op) {
            case ' ':
                 x = parseFloat(params.x);
                 y = parseFloat(params.y);
                if (!isNaN(x) && !isNaN(y)) {
                    result = x + y;
                } else {
                    result = "Paramètres x ou y incorrects.";
                    return;
                }
                break;
            case '-':
                 x = parseFloat(params.x);
                 y = parseFloat(params.y);
                if (!isNaN(x) && !isNaN(y)) {
                    result = x - y;
                } else {
                    result = "Paramètres x ou y incorrects.";
                    return;
                }
                break;
            case '*':
                if (!isNaN(x) && !isNaN(y)) {
                    result = x * y;
                } else {
                    this.HttpContext.response.badRequest("Paramètres x ou y incorrects.");
                    return;
                }
                break;
            case '/':
                if (!isNaN(x) && !isNaN(y)) {
                    if (y !== 0) {
                        result = x / y;
                    } else {
                        this.HttpContext.response.badRequest("Division par zéro.");
                        return;
                    }
                } else {
                    this.HttpContext.response.badRequest("Paramètres x ou y incorrects.");
                    return;
                }
                break;
            case '%':
                if (!isNaN(x) && !isNaN(y)) {
                    result = x % y;
                } else {
                    this.HttpContext.response.badRequest("Paramètres x ou y incorrects.");
                    return;
                }
                break;
            case '!':
                if (!isNaN(n)) {
                    result = this.factorial(n);
                } else {
                    this.HttpContext.response.badRequest("Paramètre n incorrect.");
                    return;
                }
                break;
            case 'p':
                if (!isNaN(n)) {
                    result = this.isPrime(n);
                } else {
                    this.HttpContext.response.badRequest("Paramètre n incorrect.");
                    return;
                }
                break;
            case 'np':
                if (!isNaN(n)) {
                    result = this.nthPrime(n);
                } else {
                    this.HttpContext.response.badRequest("Paramètre n incorrect.");
                    return;
                }
                break;
            default:
                this.HttpContext.response.badRequest("Opération inconnue.");
                return;
        }

        // Retour du résultat
        this.HttpContext.response.JSON({ result });
    }

    // Méthode pour calculer la factorielle d'un nombre
    factorial(n) {
        if (n < 0) return -1; // Factorielle non définie pour n < 0
        if (n === 0) return 1;
        return n * this.factorial(n - 1);
    }

    // Méthode pour vérifier si un nombre est premier
    isPrime(n) {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    }

    // Méthode pour obtenir le n-ième nombre premier
    nthPrime(n) {
        let count = 0;
        let num = 1;
        while (count < n) {
            num++;
            if (this.isPrime(num)) {
                count++;
            }
        }
        return num;
    }
}