const inputs = document.querySelectorAll(".form-control");

const bookMarkForm =document.querySelector(".bookMarkForm");

let sites =JSON.parse(localStorage.getItem("sites") || "[]");

const sitesData = document.querySelector(".sitesData")

const deleteAllBtn =document.querySelector(".deleteAll");

const searchInput = document.querySelector(".searchInput");



deleteAllBtn.addEventListener("click" , ()=>{
       localStorage.removeItem("sites");
       sites=[];
       displaysites();
})

const validateSiteName = () => {
           const regex=/^[A-Z][a-zA-z]{2,6}$/;

           if(!regex.test(inputs[0].value)){
               inputs[0].classList.remove("is-valid");
              inputs[0].classList.add("is-invalid");
              document.querySelector(".nameError").textContent="SiteName must begin with Capital letter with length 2-6";
              return false;
           }else{
               inputs[0].classList.remove("is-invalid");
               inputs[0].classList.add("is-valid");
              document.querySelector(".nameError").textContent="";
              return true;
           }
}

const validateSiteUrl = () => {
          const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;


           if(!regex.test(inputs[1].value)){
               inputs[1].classList.remove("is-valid");
              inputs[1].classList.add("is-invalid");
              document.querySelector(".urlError").textContent="Please ensure the URL you enter is valid and safe.";
              return false;
           }else{
               inputs[1].classList.remove("is-invalid");
               inputs[1].classList.add("is-valid");
              document.querySelector(".urlError").textContent="";
              return true;
           }
}

const validateSiteEmail = () => {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


           if(!regex.test(inputs[2].value)){
               inputs[2].classList.remove("is-valid");
              inputs[2].classList.add("is-invalid");
              document.querySelector(".emailError").textContent="Invalid email address!";
              return false;
           }else{
               inputs[2].classList.remove("is-invalid");
               inputs[2].classList.add("is-valid");
              document.querySelector(".emailError").textContent="";
              return true;
           }
}
const validateSitePassword = () => {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;


           if(!regex.test(inputs[3].value)){
               inputs[3].classList.remove("is-valid");
              inputs[3].classList.add("is-invalid");
              document.querySelector(".passError").textContent="at least one lowercase letter (a-z) at least one uppercase letter (A-Z) at least one number (0-9) at least one special character (@$!%*?&#)";
              return false;
           }else{
               inputs[3].classList.remove("is-invalid");
               inputs[3].classList.add("is-valid");
              document.querySelector(".passError").textContent="";
              return true;
           }
}

inputs[0].addEventListener("input" ,validateSiteName);
inputs[1].addEventListener("input" ,validateSiteUrl);
inputs[2].addEventListener("input" ,validateSiteEmail);
inputs[3].addEventListener("input" ,validateSitePassword);

bookMarkForm.addEventListener("submit" , (e) => {
       e.preventDefault();
     const isValid = true;

   if (!validateSiteEmail() || !validateSiteName() || !validateSitePassword() || !validateSiteUrl()) {
    alert('invalid data');
    return;
}

       const site = {
        Name : inputs[0].value,
        url : inputs[1].value,
        userEmail : inputs[2].value,
        userPass : inputs[3].value
       }

       console.log(site);
       sites.push(site)

       localStorage.setItem("sites" ,JSON.stringify(sites));
       displaysites();
})


const displaysites = () => {

 const result = sites.map ((site ,index) => 
         `<tr>
                    <td>${index} </td>
                    <td>${site.Name} </td>
                    <td>${site.url} </td>
                     <td> <a href="./details.html?id=${index}">details</a>
                      <button class='btn btn-outline-danger ms-3' onclick="deleteSite(${index})">delete</button></td>
                     
                    
         
         </tr>
         `
  );

   sitesData.innerHTML=result;

}

displaysites();

const deleteSite = (index) => {
       sites.splice(index,1);
        localStorage.setItem("sites" ,JSON.stringify(sites));
        displaysites();
}


searchInput.addEventListener("input" , ()=> {
    const filterText = searchInput.value.toLowerCase();

    const filteredSites = sites.filter((site)=>{
       return site.Name.toLowerCase().includes(filterText);
    });

 const result = filteredSites.map ((site ,index) => 
         `<tr>
                    <td>${index} </td>
                    <td>${site.Name} </td>
                    <td>${site.url} </td>
                     <td> <a href="./details.html?id=${index}">details</a>
                      <button class='btn btn-outline-danger ms-3' onclick="deleteSite(${index})">delete</button></td>
                     
                    
         
         </tr>
         `
  );

   sitesData.innerHTML=result;
    
});