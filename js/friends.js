const list = document.getElementById("friends-list");
const buttonAlphabet = document.getElementById("sort-alphabet");
const buttonPopularity = document.getElementById("sort-default");

let friends = [];

const loadByDefault = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      friends = data;
      list.innerHTML = "";
      friends.forEach((user) => {
        createListElement(user);
      });
    });
};

const sortByAlphabet = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      friends = data;
      friends.sort((a, b) => a.name.localeCompare(b.name));
      list.innerHTML = "";
      friends.forEach((user) => {
        createListElement(user);
      });
    });
};

const createListElement = (user) => {
  const listElement = document.createElement("div");
  listElement.classList.add("list-element");
  const elementPicture = document.createElement("div");
  elementPicture.classList.add("element-picture");
  const profilePicture = document.createElement("img");
  profilePicture.src = "icons/account-offline.svg"; //user.picture
  elementPicture.appendChild(profilePicture);
  const elementName = document.createElement("div");
  elementName.classList.add("element-name");
  const link = document.createElement("a");
  link.href = "messages.html";
  link.addEventListener("click", () => {
    localStorage.setItem("selectedUser", user.name);
  });
  elementName.appendChild(link);
  const userName = document.createElement("h1");
  userName.textContent = user.name;
  link.appendChild(userName);
  const elementOptions = document.createElement("div");
  const optionsButton = document.createElement("button");
  const buttonClasses = "btn btn-link btn-sm d-flex align-items-center border";
  optionsButton.classList.add(...buttonClasses.split(" "));
  optionsButton.type = "button";
  const optionsIcon = document.createElement("img");
  optionsIcon.src = "icons/options.svg";
  optionsButton.appendChild(optionsIcon);
  optionsButton.addEventListener("click", () => {});
  elementOptions.appendChild(optionsButton);
  listElement.appendChild(elementPicture);
  listElement.appendChild(elementName);
  listElement.appendChild(elementOptions);
  list.appendChild(listElement);
};

buttonAlphabet.addEventListener("click", () => {
  sortByAlphabet();
});

buttonPopularity.addEventListener("click", () => {
  loadByDefault();
});

loadByDefault();
