const heading = document.querySelector('[heading]');
const searchUserByInput = document.querySelector('[search]');
const searchButton = document.querySelector('[search-button]');

const userAvtar = document.querySelector('[user-avatar]');
const userName = document.querySelector('[user-name]');
const userId = document.querySelector('[user-id]');
const userDateOfJoining = document.querySelector('[date-of-joining]');
const userBio = document.querySelector('[user-bio]');

const numberOfRepos = document.querySelector('[number-of-repos]');
const numberOfGists = document.querySelector('[number-of-gists]');
const followersCount = document.querySelector('[followers-count]');
const followingCount = document.querySelector('[following-count]');

const userEmail = document.querySelector('[user-email]');
const userLocation = document.querySelector('[user-location]');
const twitterUsername = document.querySelector('[twitter-username]');
const blogLink = document.querySelector('[blog-link]');
const userCompany = document.querySelector('[user-company]');
const isUserHirable = document.querySelector('[is-user-hirable]');

const emailLogo = document.querySelector('[user-email]');
const locationLogo = document.querySelector('[location-logo]');
const twitterLogo = document.querySelector('[twitter-logo]');
const blogLogo = document.querySelector('[blog-logo]');
const companyLogo = document.querySelector('[company-logo]');


searchUserByInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let user = searchUserByInput.value;
        retrieveData(user);
        searchUserByInput.value = '';
    }
});

searchButton.addEventListener('click', () => {
    let user = searchUserByInput.value;
    retrieveData(user);
    searchUserByInput.value = '';
})

async function retrieveData(user) {
    let response = await fetch(`https://api.github.com/users/${user}`);
    let data = await response.json();

    if (data.message === 'Not Found') {
        return;
    }

    renderData(data);

}

function renderData(data) {
    if (data.avatar_url) {
        userAvtar.style.display = '';
    }
    userAvtar.src = data.avatar_url;

    userName.innerText = data.name;

    userId.innerText = `@${data.login}`;
    userId.href = data.html_url;

    let dateOfJoining = new Date(data.created_at);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    userDateOfJoining.innerText = `Joined: ${dateOfJoining.toLocaleDateString('en-GB', options)}`;

    userBio.innerText = data.bio;


    numberOfRepos.innerText = `Repos: ${data.public_repos}`;

    numberOfGists.innerText = `Gists: ${data.public_gists}`;

    followersCount.innerText = `Followers: ${data.followers}`;

    followingCount.innerText = `Following: ${data.following}`;


    if (data.email) {
        emailLogo.style.display = '';
        emailLogo.src = "https://cdn-icons-png.flaticon.com/128/3296/3296464.png";
    }
    userEmail.innerText = data.email;
    userEmail.href = `mailto:${data.email}`;

    if (data.location) {
        locationLogo.style.display = '';
        locationLogo.src = "https://cdn-icons-png.flaticon.com/128/11510/11510528.png";
    }
    userLocation.innerText = data.location;

    if (data.twitter_username) {
        twitterLogo.style.display = '';
        twitterLogo.src = "https://cdn-icons-png.flaticon.com/128/5969/5969020.png";
        twitterUsername.innerHTML = `@${data.twitter_username}`;
    }
    twitterUsername.href = `https://twitter.com/${data.twitter_username}`;

    if (data.blog) {
        blogLogo.style.display = '';
        blogLogo.src = "https://cdn-icons-png.flaticon.com/128/8901/8901481.png";
    }
    blogLink.innerText = data.blog;
    blogLink.href = data.blog;

    if (data.company) {
        companyLogo = "https://cdn-icons-png.flaticon.com/128/4300/4300059.png";
    }
    userCompany.innerText = data.company;

    isUserHirable.innerText = data.hireable;

}
