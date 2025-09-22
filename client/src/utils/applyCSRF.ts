export default function applyCSRF(pathname: string, method: string) {
    const upperMethod = method.toUpperCase();
    console.log("pathname", pathname);

    console.log(pathname, upperMethod);

    if(applyCSRFTokenOnFormRoutes(pathname, upperMethod)) 
        return true;

    if(applyCSRFTokenOnResponseRoutes(pathname, upperMethod)) 
        return true;

    if(applyCsrfOnUserRoutes(pathname)) 
        return true;

    return false;
}

function applyCSRFTokenOnFormRoutes(pathname: string, method: string) {
    const getForm = /^\/forms/;

    if(getForm.test(pathname) && method === "GET") {
        console.log("applyCSRFTokenOnFormRoutes");
        return true;
    }

    return false;
}

function applyCSRFTokenOnResponseRoutes(pathname: string, method: string) {
    const responsesList = /^\/forms\/[^/]+\/responses$/; // exact list path
    const responsesSingle = /^\/forms\/[^/]+\/responses\/[^/]+$/; // item path

    if(responsesList.test(pathname) && (method === "GET" || method === "DELETE")) {
        return true;
    }

    if(responsesSingle.test(pathname) && (method === "GET" || method === "DELETE")) {
        return true;
    }

    return false;
}

function applyCsrfOnUserRoutes(pathname: string) {
    const user = /^\/users\//;

    if(user.test(pathname)) {
        console.log("applyCsrfOnUserRoutes");
        return true;
    }

    return false;
}