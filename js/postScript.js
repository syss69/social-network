const createPostButton = document.getElementById("create-post-button");
const newPostInput = document.getElementById("new-post-input");
const pagePosts = document.getElementById("page-posts");
const buttonUploadFile = document.getElementById("add-file-to-post");
const inputFile = document.getElementById("file-input");

localStorage.setItem("storedImage", "");

const createPost = (content, media) => {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");
  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");
  postDiv.appendChild(postHeader);
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  postHeader.appendChild(userInfo);
  const userPhoto = document.createElement("img");
  userPhoto.src = "icons/account-online.svg"; // change later with api call
  const userName = document.createElement("h2");
  userName.textContent = "You"; // change later with api call
  userInfo.appendChild(userPhoto);
  userInfo.appendChild(userName);
  const postAge = document.createElement("h4");
  postAge.textContent = "now"; // change later with api call
  postHeader.appendChild(postAge);
  const postContent = document.createElement("div");
  postContent.classList.add("post-content");
  postDiv.appendChild(postContent);
  const postContentText = document.createElement("div");
  postContentText.classList.add("post-content-text");
  postContent.appendChild(postContentText);
  const postText = document.createElement("p");
  postContentText.appendChild(postText);
  postText.textContent = content;
  if (media !== "") {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-box");
    postContent.appendChild(imageContainer);
    const photo = document.createElement("img");
    photo.src = media;
    imageContainer.appendChild(photo);
  }
  const postFooter = document.createElement("div");
  postFooter.classList.add("post-footer");
  const buttonClasses = "btn btn-link btn-sm d-flex align-items-center border";
  const likeButton = document.createElement("button");
  const likeIcon = document.createElement("img");
  likeIcon.src = "icons/heart-gray.svg";
  likeButton.classList.add(...buttonClasses.split(" "));
  likeButton.appendChild(likeIcon);
  likeButton.addEventListener("click", () => {
    likeIcon.src = likeIcon.src.includes("heart-gray.svg")
      ? "icons/heart-red.svg"
      : "icons/heart-gray.svg";
  });
  const commentButton = document.createElement("button");
  commentButton.classList.add(...buttonClasses.split(" "));
  const commentIcon = document.createElement("img");
  commentIcon.src = "icons/comment.svg";
  commentButton.appendChild(commentIcon);
  const sendButton = document.createElement("button");
  sendButton.classList.add(...buttonClasses.split(" "));
  const sendIcon = document.createElement("img");
  sendIcon.src = "icons/send-gray.svg";
  sendButton.appendChild(sendIcon);
  postFooter.appendChild(likeButton);
  postFooter.appendChild(commentButton);
  postFooter.appendChild(sendButton);
  postDiv.appendChild(postFooter);
  newPostInput.value = "";
  pagePosts.prepend(postDiv);
};

createPostButton.addEventListener("click", () => {
  const newPostContent = newPostInput.value.trim();
  const selectedFile = localStorage.getItem("storedImage");
  if (newPostContent !== "" || selectedFile !== "") {
    createPost(newPostContent, selectedFile);
  }
});

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
});
