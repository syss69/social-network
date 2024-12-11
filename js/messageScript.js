const messageInput = document.getElementById("input-message");
const sendMessageButton = document.getElementById("button-send-message");
const messagesInChat = document.getElementById("messages-chat");
const pageHeader = document.getElementById("chat-name");

const chargeChatName = () => {
  const chatName = localStorage.getItem("selectedUser");
  const name = document.createElement("h2");
  pageHeader.appendChild(name);
  if(chatName){
    name.textContent = chatName
  }else{
    name.textContent = "Chat/User Name"
  }
}

chargeChatName();

sendMessageButton.addEventListener("click", () => {
  const inputMessage = messageInput.value.trim();
  if(inputMessage !== ""){
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    const messageImage = document.createElement("div");
    messageImage.classList.add("message-image");
    messageImage.id = "message-image";
    newMessage.appendChild(messageImage);
    const image = document.createElement("img");
    image.src = "icons/account-online.svg"
    messageImage.appendChild(image);
    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    newMessage.appendChild(messageContent);
    const messageName = document.createElement("div");
    messageName.classList.add("message-name");
    messageContent.appendChild(messageName);
    const name = document.createElement("h3");
    name.textContent = "You";
    messageName.appendChild(name);
    const messageText = document.createElement("div");
    messageText.classList.add("message-text");
    messageText.textContent = inputMessage;
    messageContent.appendChild(messageText);
    const messageAge = document.createElement("div");
    messageAge.classList.add("message-age");
    messageAge.textContent = "Now";
    newMessage.appendChild(messageAge);
    messageInput.value = "";
    messagesInChat.appendChild(newMessage);
  }
}) 