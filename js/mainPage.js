let posts = [];

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    posts = data.filter((data) => data.userId == 1);
    console.log(posts);
    posts.forEach((post) => {
      loadPosts(post);
    });
  });

const addPhotos = () => {
  const photos = Math.floor(Math.random() * 3); //just for the example to add a random number of photos (0, 1, 2) because i don not found api for posts
  return photos;
};

const loadPosts = (post) => {
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
  userName.textContent = "User / Group name"; // change later with api call
  userInfo.appendChild(userPhoto);
  userInfo.appendChild(userName);
  const postAge = document.createElement("h4");
  postAge.textContent = "1 hour ago"; // change later with api call
  postHeader.appendChild(postAge);
  const postContent = document.createElement("div");
  postContent.classList.add("post-content");
  postDiv.appendChild(postContent);
  const postContentText = document.createElement("div");
  postContentText.classList.add("post-content-text");
  postContent.appendChild(postContentText);
  const postText = document.createElement("p");
  postContentText.appendChild(postText);
  postText.textContent = post.body;
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-box");
  postContent.appendChild(imageContainer);
  const numPhoto = addPhotos(); // to change later with real api
  if (numPhoto > 0) {
    for (let i = 0; i < numPhoto; i++) {
      const photo = document.createElement("img");
      photo.src = "https://picsum.photos/400";
      imageContainer.appendChild(photo);
    }
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
  sendButton.addEventListener("click", () => {
    window.location.href = "chats.html";
  });
  sendButton.appendChild(sendIcon);
  postFooter.appendChild(likeButton);
  postFooter.appendChild(commentButton);
  postFooter.appendChild(sendButton);
  postDiv.appendChild(postFooter);
  pagePosts.appendChild(postDiv);
};
