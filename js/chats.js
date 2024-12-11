const list = document.getElementById("chats-list");
let usersData = [];

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    allUsers = data;
    console.log(allUsers)
    allUsers.forEach(user => {
        createListElement(user);
    });
})

const createListElement = (user) => {
    const listElement = document.createElement("div");
    listElement.classList.add("list-element");
    const elementPicture = document.createElement("div");
    elementPicture.classList.add("element-picture");
    const profilePicture = document.createElement("img");
    profilePicture.src = "icons/account-offline.svg" //user.picture
    elementPicture.appendChild(profilePicture);
    const elementName = document.createElement("div");
    elementName.classList.add("element-name");
    const link = document.createElement("a");
    link.href = "messages.html" ;
    link.addEventListener("click", ()=> {
        localStorage.setItem("selectedUser", user.name)
    })
    elementName.appendChild(link);
    const userName = document.createElement("h1");
    userName.textContent = user.name;
    link.appendChild(userName);
    const elementOptions = document.createElement("div");
    const optionsButton = document.createElement("button");
    const buttonClasses = "btn btn-link btn-sm d-flex align-items-center border"
    optionsButton.classList.add(...buttonClasses.split(' '));
    optionsButton.type = "button";
    const optionsIcon = document.createElement("img");
    optionsIcon.src = "icons/options.svg"
    optionsButton.appendChild(optionsIcon);
    elementOptions.appendChild(optionsButton);
    listElement.appendChild(elementPicture);
    listElement.appendChild(elementName);
    listElement.appendChild(elementOptions);
    list.appendChild(listElement);
}