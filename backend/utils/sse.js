// SERVER-SIDE-EVENTS (whenEver some data changes in mongo, it would reloadMeals in react app)
// Difference between normal-http-request and SSE is in below two lines
// Client ------HTTP------> Server
// Client <-----SSE-------- Server


// Register all the clients into this clients array, WhoEver has opened the react app has got registered into this clients array
const clients = [];

function addClient(res) {
    const client = {
        id: Date.now(),
        res,
    };

    clients.push(client);

    return client;
}

function removeClient(clientId) {
    const index = clients.findIndex(client => client.id === clientId);

    if (index !== -1) {
        clients.splice(index, 1);
    }
}

// Due to res.write called here, all the clients would trigger eventSource.onmessage and do reloadMeals
function notifyClients() {
    for (const client of clients) {
        client.res.write(
            `data: ${JSON.stringify({
                event: "mealChanged",
            })}\n\n`
        );
    }
}

export{
    addClient,
    removeClient,
    notifyClients,
}