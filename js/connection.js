const usernameInput = document.getElementById("username_input");
const passwordInput = document.getElementById("password_input");
const loginButton = document.getElementById("login_button");

const hashed = localStorage.getItem("hashedPassword");
const nickname = localStorage.getItem("username");

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data); // hash
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
const checkPassword = (username, password) => {
  hashPassword(password).then((hash) => {
    if (hash === hashed && username == nickname) {
      window.location.href = "mainPage.html";
    } else {
      callSystemOutput();
    }
  });
};

const callSystemOutput = () => {
  const outputClasses = "alert alert-danger";
  setTimeout(() => {
    const systemOutput = document.getElementById("system-output");
    systemOutput.classList.add(...outputClasses.split(" "));
    systemOutput.role = "alert";
    systemOutput.textContent = "Your password or username is not correct!";
    setTimeout(() => {
      systemOutput.innerHTML = "";
      systemOutput.classList.remove(...outputClasses.split(" "));
    }, 5000);
  });
};

loginButton.addEventListener("click", (event) => {
  const userPass = passwordInput.value.trim();
  const userNick = usernameInput.value.trim();
  checkPassword(userNick, userPass);
  event.preventDefault();
});
