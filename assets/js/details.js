const siteName = document.querySelector(".siteName");
const params = new URLSearchParams(location.search);
const id = params.get("id")
console.log(id);
const sites = JSON.parse(localStorage.getItem("sites"));
console.log(sites[id]);


siteName.textContent = sites[id].Name;
document.querySelector(".siteUrl").textContent = sites[id].url;
document.querySelector(".userName").textContent = sites[id].Name;
document.querySelector(".userEmail").textContent = sites[id].userEmail;
document.querySelector(".userPass").textContent = sites[id].userPass;
