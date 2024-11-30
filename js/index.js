var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var regexUrl =
  /(https:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
var regexName = /^[A-Za-z]([A-Za-z]| ){3,}$/i;
var sitesArr;

if ((sitesArr = JSON.parse(localStorage.getItem("data")))) {
  displayData(sitesArr);
}
if(localStorage.getItem("mood")=="night"){

  nightMood()
}

function getData() {
  if (regexUrl.test(siteUrl.value) && regexName.test(siteName.value)) {
    var siteDetails = {
      name: siteName.value,
      url: siteUrl.value,
    };
    sitesArr.push(siteDetails);
    localStorage.setItem("data", JSON.stringify(sitesArr));
    displayData(sitesArr);
    clearInputs();
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
  } else if (!regexUrl.test(siteUrl.value) && !regexName.test(siteName.value)) {
    Swal.fire({
      icon: "error",
      title: `Site Name and Url is not valid , 
    Please follow the rules below :`,
      text: `Site name must contain at least 3 characters without any special characters
      and URL must be a valid one`,
      footer: '<a href="#">Why do I have this issue?</a>',
    });
    clearInputs() 
  } else if (!regexName.test(siteName.value)) {
    Swal.fire({
      icon: "error",
      title: `Site Name is not valid , 
    Please follow the rules below :`,
      text: "  Site name must contain at least 3 characters without any special characters!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
    clearInputs() 
  } else if (!regexUrl.test(siteUrl.value)) {
    Swal.fire({
      icon: "error",
      title: `Site Url is not valid , 
    Please follow the rules below :`,
      text: "Site URL must be a valid one!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
    clearInputs() 
  }
}

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
}

function displayData(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    content += `<tr>
  <td scope="row" class="fs-5">${i + 1}</td>
  <td class="fs-5">${arr[i].name}</td>
  <td><a href=${
    arr[i].url
  } target="_blank"><button class="btn btn-warning"><i class="fa-solid fa-eye me-2" ></i> Visit</button></a></td>
  <td><button class="btn btn-danger" onclick="deleteitem(${i})"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
</tr>`;
  }
  document.getElementById("tableContent").innerHTML = content;
}

function deleteitem(index) {
  sitesArr.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(sitesArr));
  displayData(sitesArr);
}

function validationSiteName() {
  if (regexName.test(siteName.value)) {
    console.log(regexName.test(siteName.value));
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
  }
}

function validationSiteurl() {
  if (regexUrl.test(siteUrl.value)) {
    console.log(regexUrl.test(siteUrl.value));
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
  }
}
var searchValue;

function searchForSiteName() {
  var cartona = "";
  searchValue = document.getElementById("searchForSiteName").value;
  for (var i = 0; i < sitesArr.length; i++) {
    if (
      JSON.parse(localStorage.getItem("data"))[i].name.includes(searchValue)
    ) {
      {
        cartona += `<tr>
      <td scope="row" class="fs-5">${i + 1}</td>
      <td class="fs-5">${sitesArr[i].name}</td>
      <td><a href=${
        sitesArr[i].url
      } target="_blank"><button class="btn btn-warning"><i class="fa-solid fa-eye me-2" ></i> Visit</button></a></td>
      <td><button class="btn btn-danger" onclick="deleteitem(${i})"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
    </tr>`;
      }
    }
  }
  document.getElementById("tableContent").innerHTML = cartona;
}

function nightMood() {
  document.documentElement.style.setProperty("--main-color", "#2c3034");
  document.documentElement.style.setProperty("--text-color", "white");
  document.getElementById("nightMood").classList.replace("fa-moon", "fa-sun");
  document.querySelector(".table").classList.add("table-dark", "table-striped");
  document.getElementById("nightMood").onclick = normalMood;
  localStorage.setItem("mood" , "night")
}

function normalMood() {
  document.documentElement.style.setProperty("--main-color", "#f7ecde");
  document.documentElement.style.setProperty("--text-color", "#212529");
  document.getElementById("nightMood").classList.replace("fa-sun", "fa-moon");
  document
    .querySelector(".table")
    .classList.remove("table-dark", "table-striped");
  document.getElementById("nightMood").onclick = nightMood;
  localStorage.setItem("mood" , "light")

}
