function parsePost(text) {
  var lines = text.split("\n");
  var details = {};
  for (var i = 0; i < lines.length; i++) {
    var colon = lines[i].indexOf(":");
    if (colon >= 0) {
      var key = lines[i].substring(0, colon).trim().toLowerCase();
      var value = lines[i].substring(colon + 1).trim();
      details[key] = value;
    }
    if (lines[i] == "") {
      details.content = lines.slice(i + 1).join("\n");
      break;
    }
  }
  return details;
}

function buildPost(post) {
  var postElement = document.createElement("div");
  postElement.className = "post";

  var imgElement = document.createElement("div");
  imgElement.className = "post-image";
  var image = document.createElement("img");
  image.src = post.image;
  imgElement.appendChild(image);

  var titleElement = document.createElement("div");
  titleElement.className = "post-title";
  titleElement.innerHTML = post.title;

  var shortElement = document.createElement("div");
  shortElement.className = "post-short";
  shortElement.innerHTML = post.description;

  postElement.addEventListener("click", () => {
    if (post.link) {
      location.assign(post.link);
    }
  });

  postElement.appendChild(imgElement);
  postElement.appendChild(titleElement);
  postElement.appendChild(shortElement);

  return postElement;
}

function loadPosts(current_post) {
  var req = new XMLHttpRequest();
  req.open("GET", "posts/posts.json", true);
  req.addEventListener("load", () => {
    try {
      var posts = JSON.parse(req.responseText);
      // Show all posts
      var workContainer = document.querySelector(".work");
      var blogContainer = document.querySelector(".blog");
      for (var i = 0; i < posts.length; i++) {
        var postElement = buildPost(posts[i]);
        if (posts[i].label === "work") {
          workContainer.appendChild(postElement);
        }
        else {
          blogContainer.appendChild(postElement);
        }
      }
    } catch (e) {
      document.querySelector(".work .error").style.display = "block";
      document.querySelector(".blog .error").style.display = "block";
      console.error(e);
    }
  });
  req.send();
}
