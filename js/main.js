var siteName = document.getElementById("siteName");
var webSite = document.getElementById("webSite");
var checkNameRight = document.getElementById("checkNameRight");
var checkSiteRight = document.getElementById("checkSiteRight");
var btn = document.querySelector("button");
var list = [];
//--------events--------------
btn.addEventListener("click", submit);
siteName.addEventListener("keyup", function () {
    checkYourSite()

    if (siteName.value == 0) {
        clearSpanBorder()
    } else {
        validateBorderName()
    }

});
webSite.addEventListener("keyup", validateBorderUrl);

// check if found data

function storeAtLocalStorage(booklist) {
    localStorage.setItem("submit", JSON.stringify(booklist));

}
(function checkLoaclStorage() {
    if (localStorage.getItem("submit")) {
        list = JSON.parse(localStorage.getItem("submit"));
        display(list);
    }else {
        list = [];
    }
})();

function submit() {
    var x = validateData() && validateURL()  ;
    if (x == true) {
        var user = {
            name: siteName.value,
            url: webSite.value,
        };
        list.push(user);
        display(list);
        storeAtLocalStorage(list);
        clearData();
        clearSpanBorder();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Site Name or Url is not valid, Please follow the rules below :',
            text: `  1-Site name must contain at least 3 characters
                    2-Site URL must be a valid one`,
        })
    }
}

//2-display
function display(bookMarks) {
    var content = "";
    for (var i = 0; i < bookMarks.length; i++) {
        content += `
                    <tr>
                        <td>${i + 1}</td>
                        <td class="text-capitalize">${bookMarks[i].name}</td>
                        <td><a target="_blank" href="http://${bookMarks[i].url}" class="btn btn-warning"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                        <td><button onclick="deleteData(${i})" class="btn btn-danger "><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
                    </tr>`;
    }
    document.getElementById("myRow").innerHTML = content;
}

//3-clear
function clearData() {
    siteName.value = "";
    webSite.value = "";
}

//4- delete
function deleteData(index) {
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(219, 5, 251)',
        cancelButtonColor: '#fcb605',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            list.splice(index, 1);
            display(list);
            storeAtLocalStorage(list);
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}


//5- validation
function validateData() {
    var regexName = /^[A-Za-z0-9_]{3,}$/;
    return regexName.test(siteName.value);
}

function validateURL() {
    var regexUrl = /^[A-Za-z0-9]{3,}\.com$/;
    return regexUrl.test(webSite.value);
}

function checkYourSite() {
    if (list.length > 0) {

        for (i = 0; i < list.length; i++) {
            if (siteName.value.toLowerCase() != list[i].name.toLowerCase()) {
                siteName.style = "border: 3px green solid";
                checkNameRight.innerHTML = `<i class="igreen fa-solid fa-check"></i>`;
            } else {
                siteName.style = "border: 3px red solid";
                checkNameRight.innerHTML = `<i class="fa-solid fa-exclamation text-danger"></i> `;

                Swal.fire({
                    icon: 'error',
                    title: "please change your name ,because is used in list",

                })
                break;
            }
        }
    } 
}

function validateBorderName() {
    if (validateData() == true) {
        siteName.style = "border: 3px green solid";
        checkNameRight.innerHTML = `<i class="igreen fa-solid fa-check"></i>`;
    } else {
        siteName.style = "border: 3px red solid";
        checkNameRight.innerHTML = `<i class="fa-solid fa-exclamation text-danger"></i>`;
    }
}

function validateBorderUrl() {
    if (validateURL() == true) {
        webSite.style = "border: 3px green solid";
        checkSiteRight.innerHTML = `<i class=" igreen fa-solid fa-check"></i>`;
    } else {
        webSite.style = "border: 3px red solid";
        checkSiteRight.innerHTML = `<i class="fa-solid fa-exclamation text-danger"></i> please write in end ".com"`;
    }
}

function clearSpanBorder() {
    siteName.style = "border:  1px white solid";
    webSite.style = "border:  1px white solid";
    checkSiteRight.innerHTML = "";
    checkNameRight.innerHTML = "";
}

