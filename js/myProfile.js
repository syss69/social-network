const myName = document.getElementById("your-name");
const myNick = document.getElementById("your-username");

if (localStorage.getItem("yourName") !== "") {
  myName.innerHTML = `<h2>${localStorage.getItem("yourName")}</h2>`;
}

if (localStorage.getItem("username") !== "") {
  myNick.innerHTML = `<h3>@${localStorage.getItem("username")}</h3>`;
}
