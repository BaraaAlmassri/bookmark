const inputs = document.querySelectorAll(".form-control");
const bookMarkForm = document.querySelector(".bookMarkForm");
let sites = JSON.parse(localStorage.getItem("sites") || "[]");
const sitesData = document.querySelector(".sitesData");
const deleteAllBtn = document.querySelector(".deleteAll");
const searchInput = document.querySelector(".searchInput");


deleteAllBtn.addEventListener("click", () => {
    localStorage.removeItem("sites");
    sites = [];
    displaysites();
});



const validateSiteName = () => {
    const regex = /^[A-Z][a-zA-Z]{2,6}$/;

    if (!regex.test(inputs[0].value)) {
        inputs[0].classList.remove("is-valid");
        inputs[0].classList.add("is-invalid");
        document.querySelector(".nameError").textContent =
            "SiteName must begin with Capital letter with length 2-6";
        return false;
    } else {
        inputs[0].classList.remove("is-invalid");
        inputs[0].classList.add("is-valid");
        document.querySelector(".nameError").textContent = "";
        return true;
    }
};

const validateSiteUrl = () => {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

    if (!regex.test(inputs[1].value)) {
        inputs[1].classList.remove("is-valid");
        inputs[1].classList.add("is-invalid");
        document.querySelector(".urlError").textContent =
            "Please ensure the URL you enter is valid and safe.";
        return false;
    } else {
        inputs[1].classList.remove("is-invalid");
        inputs[1].classList.add("is-valid");
        document.querySelector(".urlError").textContent = "";
        return true;
    }
};

const validateSiteEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(inputs[2].value)) {
        inputs[2].classList.remove("is-valid");
        inputs[2].classList.add("is-invalid");
        document.querySelector(".emailError").textContent =
            "Invalid email address!";
        return false;
    } else {
        inputs[2].classList.remove("is-invalid");
        inputs[2].classList.add("is-valid");
        document.querySelector(".emailError").textContent = "";
        return true;
    }
};

const validateSitePassword = () => {
    const regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!regex.test(inputs[3].value)) {
        inputs[3].classList.remove("is-valid");
        inputs[3].classList.add("is-invalid");
        document.querySelector(".passError").textContent =
            "Password must include lowercase, uppercase, number & special char.";
        return false;
    } else {
        inputs[3].classList.remove("is-invalid");
        inputs[3].classList.add("is-valid");
        document.querySelector(".passError").textContent = "";
        return true;
    }
};

inputs[0].addEventListener("input", validateSiteName);
inputs[1].addEventListener("input", validateSiteUrl);
inputs[2].addEventListener("input", validateSiteEmail);
inputs[3].addEventListener("input", validateSitePassword);



bookMarkForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
        !validateSiteName() || !validateSiteUrl() || !validateSiteEmail() || !validateSitePassword()) {
        alert("Invalid data");
        return;
    }

    const site = {
        Name: inputs[0].value,
        url: inputs[1].value,
        userEmail: inputs[2].value,
        userPass: inputs[3].value,
    };

    const updateIndex = bookMarkForm.getAttribute("dataupdate-index");

    if (updateIndex !== null) {
       
        sites[updateIndex] = site;
        bookMarkForm.removeAttribute("dataupdate-index");
    } else {
        
        sites.push(site);
    }

    localStorage.setItem("sites", JSON.stringify(sites));
    displaysites();

    
    inputs.forEach((i) => {
        i.value = "";
        i.classList.remove("is-valid", "is-invalid");
    });
});



const displaysites = () => {

 const result = sites.map ((site ,index) => 
         `<tr>
                    <td>${index} </td>
                    <td>${site.Name} </td>
                    <td>${site.url} </td>
                     <td> <a href="./details.html?id=${index}">details</a>
                      <button class="btn btn-outline-primary ms-3" onclick="editSite(${index})">edit</button>
                      <button class='btn btn-outline-danger ms-3' onclick="deleteSite(${index})">delete</button></td>
                     
                    
         
         </tr>
         `
  );

   sitesData.innerHTML=result;

}

displaysites();



const deleteSite = (index) => {
    sites.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(sites));
    displaysites();
};



const editSite = (index) => {
    const site = sites[index];

    inputs[0].value = site.Name;
    inputs[1].value = site.url;
    inputs[2].value = site.userEmail;
    inputs[3].value = site.userPass;

    bookMarkForm.setAttribute("dataupdate-index", index);
};



searchInput.addEventListener("input", () => {
    const filterText = searchInput.value.toLowerCase();

    const filteredSites = sites.filter((site) =>
        site.Name.toLowerCase().includes(filterText)
    );

    const result = filteredSites
        .map(
            (site, index) =>
                `<tr>
            <td>${index}</td>
            <td>${site.Name}</td>
            <td>${site.url}</td>
            <td>
                <a href="./details.html?id=${index}">details</a>
                <button class="btn btn-outline-primary ms-3" onclick="editSite(${index})">edit</button>
                <button class="btn btn-outline-danger ms-3" onclick="deleteSite(${index})">delete</button>
            </td>
        </tr>`
        )
       

    sitesData.innerHTML = result;
});
