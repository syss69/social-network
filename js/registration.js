const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const repeatPassword = document.getElementById("repeat-password");
const submitButton = document.getElementById("submit-button");
const profileNameInput = document.getElementById("profilename-input");
const emailInput = document.getElementById("email-input");

const safetyIndicator = document.getElementById("safety-indicator");
const equalIndicator = document.getElementById("same-indicator");

const outputClassesDanger = "alert alert-danger";
const outputClassesSucess = "alert alert-success";

const callSystemOutput = (message, outputClasses) => {
  setTimeout(() => {
    const systemOutput = document.getElementById("system-output");
    systemOutput.classList.add(...outputClasses.split(" "));
    systemOutput.role = "alert";
    systemOutput.textContent = message;
    setTimeout(() => {
      systemOutput.innerHTML = "";
      systemOutput.classList.remove(...outputClasses.split(" "));
    }, 5000);
  });
};

const validateName = (name) => {
  const regex = /^[a-zA-Z0-9]+$/; // Regex to allow only a-z, A-Z, and 0-9
  return regex.test(name);
};

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

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const verifyUserData = (
  nickname,
  password,
  passwordRepeat,
  profileName,
  email
) => {
  if (!validateName(nickname)) {
    callSystemOutput(
      "Username is invalid! Only letters and numbers are allowed.",
      outputClassesDanger
    );
    return false;
  }
  if (password !== passwordRepeat || password.length < 8) {
    callSystemOutput(
      "Your password must have at least 8 symbols and be same for both fields",
      outputClassesDanger
    );
    return false;
  }
  if (profileName === "") {
    callSystemOutput("Profile Name can't be empty!", outputClassesDanger);
    return false;
  }
  if (!validateEmail(email)) {
    callSystemOutput("Not alowed email format!", outputClassesDanger);
    return false;
  }
  return true;
};

const containsSpecialCharacters = (str) => {
  const regex = /[!?\_]/;
  return regex.test(str);
};

passwordInput.addEventListener("input", () => {
  let password = passwordInput.value.trim();
  if (password.length >= 8) {
    if (containsSpecialCharacters(password)) {
      safetyIndicator.style =
        "border-radius: 50%; background-color: lightgreen; width: 10px; height: 10px;";
    } else {
      indicator.style =
        "border-radius: 50%; background-color: yellow; width: 10px; height: 10px;";
    }
  } else {
    indicator.style =
      "border-radius: 50%; background-color: red; width: 10px; height: 10px;";
  }
});

repeatPassword.addEventListener("input", () => {
  let password = passwordInput.value.trim();
  let passwordRepeated = repeatPassword.value.trim();
  if (passwordRepeated === password) {
    equalIndicator.style =
      "border-radius: 50%; background-color: lightgreen; width: 10px; height: 10px;";
  } else {
    equalIndicator.style =
      "border-radius: 50%; background-color: red; width: 10px; height: 10px;";
  }
});

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const nickname = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordRepeat = repeatPassword.value.trim();
  const profileName = profileNameInput.value.trim();
  const email = emailInput.value.trim();
  if (verifyUserData(nickname, password, passwordRepeat, profileName, email)) {
    let hashed = "";
    await hashPassword(password).then((hash) => {
      hashed = hash;
    });
    callSystemOutput("Your account has been created!", outputClassesSucess);
    localStorage.setItem("username", nickname);
    console.log(hashed);
    localStorage.setItem("hashedPassword", hashed);
    localStorage.setItem("yourName", profileName);
  }
  setTimeout((window.location.href = "connection-page.html"), 3000);
});

safetyIndicator.addEventListener("mouseover", () => {
  safetyIndicator.style =
    "border-radius: 15px; background-color: bisque; width: 300px; height: 30px;";
});
