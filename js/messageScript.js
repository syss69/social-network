const messageInput = document.getElementById("input-message");
const sendMessageButton = document.getElementById("button-send-message");
const messagesInChat = document.getElementById("messages-chat");

sendMessageButton.addEventListener("click", () => {
  const messageContent = messageInput.value.trim();
  if(messageContent === ""){
    alert("Empty input")
  }else{
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.innerHTML = `
      <div class="message-image" id="message-image">
          <img src="icons/account-online.svg">
        </div>
        <div class="message-content">
          <div class="message-name">
            <h3>
              You
            </h3>
          </div>
          <div class="message-text">
            ${messageContent}
          </div>
        </div>
        <div class="message-age">
          Now
        </div>
    `
    messageInput.value = "";
    messagesInChat.appendChild(newMessage);
  }
}) 