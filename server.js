import { createServer } from 'http';
import HttpContext from './httpContext.js';
import * as router from './router.js';
import { handleCORSPreflight } from './cors.js';
import { handleStaticResourceRequest } from './staticResourcesServer.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
    console.log(req.method);
    let httpContext = await HttpContext.create(req, res);
    if (!handleCORSPreflight(httpContext))
        if (!handleStaticResourceRequest(httpContext))
            if (!await router.API_EndPoint(httpContext))
                httpContext.response.notFound('this end point does not exist...');

    const url = new URL(req.url, `http://${req.headers.host}`);

    // Vérifier si la requête est pour l'API /api/maths
    if (url.pathname === '/api/maths') {
        // Chemin vers le fichier HTML statique à envoyer
        const filePath = path.join(__dirname, 'wwwroot/API-Help-Pages', 'API-Help-Maths.html');

        // Lire le fichier HTML
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                // En cas d'erreur de lecture du fichier
                console.error('Erreur lors de la lecture du fichier:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erreur interne du serveur');
            } else {
                // Répondre avec le fichier HTML
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        // Répondre avec un 404 si l'URL n'est pas /api/maths
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page non trouvée');
    }
});
const PORT = process.env.PORT || 5000;


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
