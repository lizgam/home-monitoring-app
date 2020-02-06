const dateMessage = new Date() ;

function renderParameters() {
    document.getElementById("date-id").textContent =
        dateMessage.toDateString() + " " +
        dateMessage.getHours() +  ":" +
        dateMessage.getMinutes();
}
renderParameters();

document.addEventListener("DOMContentLoaded", () => {
    $ajaxUtils.sendGetRequest("GET", "https://reqres.in/api/users/2")
    .then(resp => {
        let message = resp.data.first_name;
        document.getElementById("location-id").textContent = message;
    });
});

document.querySelector("button").addEventListener("click", () => {
    $ajaxUtils.sendGetRequest("POST", "https://reqres.in/api/register", {
        email: "eve.holt@reqres.in",
        password: "pistol"
    })
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => { // catch error if it was REJECTED
        console.log(err);
    })
});
