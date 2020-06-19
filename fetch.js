const dateMessage = new Date() ;

function renderParameters() {
    document.getElementById("date-id").textContent =
        dateMessage.toDateString() + " " +
        dateMessage.getHours() +  ":" +
        dateMessage.getMinutes();
}
renderParameters();

const sentHttpFetchRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? {"Content-Type": "application/json"} : {}
    }).then(response => {
        // already return Promise
        if(response.status >= 400) { //response !ok
            // ! streamed body, not a snapshot. So use nested (inner) promise chain
            return response.json().then(errRespData => {
                const error = new Error("Something went wrong!");
                error.data = errRespData;
                throw error;
            })

        }
        return response.json(); // transforme resp: can be response.text(), any
    });
};

const getData = () => {
    sentHttpFetchRequest("GET", "https://reqres.in/api/users/2")
    .then(responseData => {
        let message = responseData.data.first_name;
        document.getElementById("location-id").textContent = message;
    });
};

// const getAsyncData =  () => {
//     return sentHttpFetchRequest("GET", "https://reqres.in/api/users/2");
// };

const setData = () => {
    sentHttpFetchRequest("POST", "https://reqres.in/api/register", {
        email: "eve.holt@reqres.in",
        password: "pistol"
    })
    .then(responseData => {
        //use data
        console.log(responseData);
    })
    .catch(err => {
        console.log(err, err.data);
    });
};

document.addEventListener("DOMContentLoaded", getData);

// document.addEventListener("DOMContentLoaded", () => {
//     getAsyncData().then(resp => {
//         document.getElementById("location-id")
//         .textContent = resp.data.last_name;
//     })
// });

document.querySelector("button").addEventListener("click", setData);
