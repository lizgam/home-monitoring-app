//IIFI
(function (global){ 
    const ajaxUtils = {}; //setup namespace

    function getRequestObject(){
        return (new XMLHttpRequest());
    }


    ajaxUtils.sendHttpAjaxRequest = (method, url, data) => {
        const promise = new Promise((resolve, reject) => {
            let xhr = getRequestObject();
            xhr.open(method, url);

            if(data) { // for post request EXTRA HEADERS:
                xhr.setRequestHeader("Content-Type", "application/json");
            }

            xhr.onload = () => {
                if(xhr.status >= 400) { // for unsuccesfull response, but still response
                    reject(xhr.response);
                } else {
                    resolve(JSON.parse(xhr.response));
                }
            };

            // if the request technically fails
            xhr.onerror = () => {
                reject("Something went wrong!");
            };

            xhr.send(JSON.stringify(data)); //for POST req -> put atribute
        });
        return promise;
    }

    global.$ajaxUtils = ajaxUtils; //expose utility to the global obj

})(window);
