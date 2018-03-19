function getUserInfo() {
    var searchUser = document.getElementById("user").value;

    var request = new XMLHttpRequest();
    request.open("GET", "https://api.github.com/users/" + searchUser, true);
    request.onload = function () {

        if (this.status == 200) {
            var info = JSON.parse(this.responseText);
            console.log(info);
            cleanDiv();
            showUserInfo(info);
            getRepoInfo(searchUser);
        } else {
            cleanDiv();
            showError();
        }
    }
    request.send();
}

function showUserInfo(userInfo) {

    var content = document.getElementById("content");
    var fullName = userInfo.name;
    var userName = userInfo.login;
    var avatar = userInfo.avatar_url;
    var bio = userInfo.bio;
    var divImg = document.createElement("div");

    divImg.innerHTML = "";
    divImg.setAttribute("id", "imageDiv");
    var avatarImg = document.createElement("img");
    avatarImg.src = avatar;
    divImg.append(avatarImg);
    var divInfo = document.createElement("div");
    divInfo.setAttribute("class", "userInformation");
    divInfo.append(divImg);
    var rightDiv = document.createElement("div");
    rightDiv.setAttribute("id", "rightDiv");

    divInfo.append(rightDiv);
    rightDiv.innerHTML = "";

    var usernameDiv = document.createElement("div");
    usernameDiv.setAttribute("id", "usernameDiv");
    var user_ptag = document.createElement("p");

    rightDiv.append(usernameDiv);
    usernameDiv.append(user_ptag);
    user_ptag.append("@" + userName);

    var fullNameDiv = document.createElement("div");
    fullNameDiv.setAttribute("id", "fullNameDiv");
    var fullName_tag = document.createElement("h2");

    rightDiv.append(fullNameDiv);
    fullNameDiv.append(fullName_tag);
    fullName_tag.append(fullName);

    if (bio != null) {
        var bioDiv = document.createElement("div");
        bioDiv.setAttribute("id", "bio");
        var bio_tag = document.createElement("p");
        rightDiv.append(bioDiv);
        bioDiv.append(bio_tag);
        bio_tag.append(bio);
    } else {}

    var titleRepo = document.createElement("div");
    titleRepo.setAttribute("id", "titleRepo");
    titleRepo.textContent = "Repositories";
    content.append(divInfo);
    content.append(titleRepo);
}

function getRepoInfo(searchUser) {
    var requestRepo = new XMLHttpRequest();
    requestRepo.open("GET", "https://api.github.com/users/" + searchUser + "/repos", true);
    requestRepo.onload = function () {
        if (this.status == 200) {
            userRepoInfo = JSON.parse(this.responseText);
            console.log(requestRepo);
            showUserRepo(userRepoInfo);
        }
    }
    requestRepo.send();
}

function showError() {
    var content = document.getElementById("content");
    var errorDiv = document.createElement("div");

    errorDiv.setAttribute("id", "errorDiv");
    var errorMsg = document.createElement("p");
    errorMsg.setAttribute("id", "errorMsg");
    container.append(errorDiv);
    errorDiv.append(errorMsg);
    errorMsg.textContent = "Does not exist";
    content.append(errorDiv);
}

function cleanDiv() {
    document.getElementById("content").innerHTML = "";
}

function showUserRepo(userRepoInfo) {

    var allRepos = document.createElement("div");
    allRepos.setAttribute("id", "allRepos");

    for (var i = 0; i < userRepoInfo.length; i++) {

        var repoName = userRepoInfo[i].name;
        var stars = userRepoInfo[i].stargazers_count;
        var forks = userRepoInfo[i].forks;
        var eachRepo = document.createElement("div");
        eachRepo.setAttribute("id", "eachRepo");
        var content = document.getElementById("content");
        content.append(allRepos);
        allRepos.append(eachRepo);

        var eachRepoName = document.createElement("div");
        eachRepoName.setAttribute("id", "eachRepoName");

        eachRepo.append(eachRepoName);
        eachRepoName.append(repoName);
        var starsForks = document.createElement("div");
        starsForks.setAttribute("id", "starForks");
        eachRepo.append(starsForks);


        var iconStar = document.createElement("img");
        iconStar.setAttribute("src", "icons/star.svg");
        iconStar.setAttribute("class", "iconStar");

        var iconForks = document.createElement("img");
        iconForks.setAttribute("src", "icons/fork.svg");
        iconForks.setAttribute("class", "iconForks");
        starsForks.append(iconStar, stars, iconForks, forks);
    }
}
