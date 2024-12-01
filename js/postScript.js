const createPostButton =  document.getElementById("create-post-button");
const newPostInput = document.getElementById("new-post-input");
const pagePosts = document.getElementById("page-posts");

createPostButton.addEventListener("click", () => {
    const newPostContent = newPostInput.value.trim();
    if( newPostContent == "" ){
        alert("Empty input!")
       }
    else{
        const newPost = document.createElement("div");
        newPost.classList.add("post");
        newPost.innerHTML += `
          <div class="post-header">
            <div class="user-info">
              <img src="icons/account-online.svg" />
              <h2>Account Name</h2>
            </div>
            <h4>now</h4>
          </div>
          <div class="post-content">
          <div class="post-content-text">
            <p>
              ${newPostContent}
            </p>
          </div>
            <div class="image-box"></div>
          </div>
          <div class="post-footer">
            <img src="icons/heart-gray.svg" />
            <img src="icons/comment.svg" />
            <img src="icons/send-gray.svg" />
          </div>`
          newPostInput.value= ""
          pagePosts.prepend(newPost)
    }
})
