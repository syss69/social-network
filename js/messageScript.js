const messageInput = document.getElementById("input-message");
const sendMessageButton = document.getElementById("button-send-message");
const messagesInChat = document.getElementById("messages-chat");
const pageHeader = document.getElementById("chat-name");
const inputFile = document.getElementById("file-input");
const buttonUploadFile = document.getElementById("button-upload-file");

const chargeChatName = () => {
  const chatName = localStorage.getItem("selectedUser");
  const name = document.createElement("h2");
  pageHeader.appendChild(name);
  if (chatName) {
    name.textContent = chatName;
  } else {
    name.textContent = "Chat/User Name";
  }
};

chargeChatName();

const sendMessage = (inputMessage, selectedFile) => {
  const newMessage = document.createElement("div");
  newMessage.classList.add("message");
  const messageInfo = document.createElement("div");
  messageInfo.classList.add("message-info");
  newMessage.appendChild(messageInfo);
  const senderInfo = document.createElement("div");
  senderInfo.classList.add("message-sender");
  messageInfo.appendChild(senderInfo);
  const messageImage = document.createElement("div");
  messageImage.classList.add("message-image");
  messageImage.id = "message-image";
  senderInfo.appendChild(messageImage);
  const image = document.createElement("img");
  image.src = "icons/account-online.svg";
  messageImage.appendChild(image);
  const messageContent = document.createElement("div");
  messageContent.classList.add("message-content");
  newMessage.appendChild(messageContent);
  const messageName = document.createElement("div");
  messageName.classList.add("message-name");
  senderInfo.appendChild(messageName);
  const name = document.createElement("h3");
  name.textContent = "You";
  messageName.appendChild(name);
  const messageText = document.createElement("div");
  messageText.classList.add("message-text");
  messageText.textContent = inputMessage;
  messageContent.appendChild(messageText);
  if (selectedFile) {
    const messageMedia = document.createElement("div");
    messageMedia.classList.add("message-media");
    messageContent.appendChild(messageMedia);
    const photo = document.createElement("img");
    photo.src = selectedFile;
    messageMedia.appendChild(photo);
    photo.style = "max-width: 300px; max-height: 100%";
  }
  const messageAge = document.createElement("div");
  messageAge.classList.add("message-age");
  messageAge.textContent = "Now";
  messageInfo.appendChild(messageAge);
  messageInput.value = "";
  messagesInChat.appendChild(newMessage);
  localStorage.setItem("storedImage", "");
};

sendMessageButton.addEventListener("click", () => {
  const inputMessage = messageInput.value.trim();
  const selectedFile = localStorage.getItem("storedImage");
  if (inputMessage !== "" || selectedFile !== "") {
    sendMessage(inputMessage, selectedFile);
  }
});

const callSystemOutput = () => {
  const mediaSource = localStorage.getItem("storedImage");
  const outputClasses = "alert alert-success";
  setTimeout(() => {
    if (mediaSource) {
      const systemOutput = document.getElementById("system-output");
      systemOutput.classList.add(...outputClasses.split(" "));
      systemOutput.role = "alert";
      systemOutput.textContent = "Image Loaded";
      setTimeout(() => {
        systemOutput.innerHTML = "";
        systemOutput.classList.remove(...outputClasses.split(" "));
      }, 1500);
    }
  });
};

buttonUploadFile.addEventListener("click", () => {
  inputFile.click();
});

inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64String = e.target.result;
    localStorage.setItem("storedImage", base64String);
  };
  reader.readAsDataURL(file);
  setTimeout(() => {
    callSystemOutput();
  }, 10);
});

localStorage.setItem("storedImage", "");
