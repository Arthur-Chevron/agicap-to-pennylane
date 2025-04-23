// errorHandler.js
module.exports = (error, request, response, next) => {
    if (error) {
        // Générer un numéro de ticket aléatoire pour simplifier le débogage
        const ticket_number = (Math.floor(Math.random() * 1000000) + 1).toString();

        // Log l'erreur
        console.log("\x1b[31m", "---------------------------------------------------------------------------------------------");
        console.log("#                                  Ticket number :", "\x1b[0m", ticket_number, "\x1b[31m", "                                 #");
        console.log("----------------------------------------------------------------------------------------------", "\x1b[0m");
        console.log(ticket_number, "· [", error?.custom_origin || "???", "] -", error?.custom_message || "Erreur inconnue", ":\n", error);
        console.log("----------------------------------------------------------------------------------------------");

        // Vérifie si 'response' est défini
        response.header("Content-Type", 'application/json');

        const status = error.status || 400;
        return response.status(status).send({
            error_message: (error.custom_message || "Une erreur interne au serveur s'est produite. Si l'erreur persiste, contactez l'administrateur.") + " · Ticket number : " + ticket_number
        })
    }
}
