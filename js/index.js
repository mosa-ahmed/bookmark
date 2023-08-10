var bookmarkName = document.getElementById("bookmarkName")
var bookmarkURL = document.getElementById("bookmarkURL")
var bookmarkList;

bookmarkList = localStorage.getItem("bookmarkList") ? JSON.parse(localStorage.getItem("bookmarkList")) : [];
displayBookmarks(bookmarkList);

function addBookmark(){
    if(validateBookmarkName() && validateBookmarkUrl())
    {
        var bookmark = {
            name: bookmarkName.value,
            url: bookmarkURL.value
        }
        bookmarkList.push(bookmark);
        displayBookmarks(bookmarkList);
        clearFormValues();
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));

        bookmarkName.classList.remove("is-valid");
        bookmarkURL.classList.remove("is-valid");
    }
    else{
        validateBookmarkName();
        validateBookmarkUrl();
        document.getElementById("box-info").classList.remove("d-none");
    }
}

function clearFormValues(){
    bookmarkName.value = "";
    bookmarkURL.value = "";
}

function displayBookmarks(bookmarks){
    var box = ``;
    for (var i = 0; i < bookmarks.length; i++)
    {
        box += `   <tr>
        <td>${i + 1}</td>
        <td>${bookmarks[i].name}</td>              
        <td>
          <a href="https://${bookmarks[i].url}" target="_blank" class="btn btn-visit">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </a>
        </td>
        <td>
          <button onclick="deleteBookmark(${i})" class="btn btn-delete pe-2">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
        </tr>`
    }
    document.getElementById("tableContent").innerHTML = box;
}

function deleteBookmark(index){
    bookmarkList.splice(index, 1);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    displayBookmarks(bookmarkList);
}

function closeModal(){
    document.getElementById("box-info").classList.add("d-none");
}

function validateBookmarkName(){
    var regex = /^[a-zA-Z]{1}[a-zA-Z0-9. ]{3,10}$/;
    if (regex.test(bookmarkName.value)){
        bookmarkName.classList.remove("is-invalid");
        bookmarkName.classList.add("is-valid");
        return true;
    }else{
        bookmarkName.classList.remove("is-valid");
        bookmarkName.classList.add("is-invalid");
        return false;
    }
}

function validateBookmarkUrl(){
    var regex = /^[a-zA-Z]{1,20}(.com|.net|.org|.edu){1}$/;
    if (regex.test(bookmarkURL.value)){
        bookmarkURL.classList.remove("is-invalid");
        bookmarkURL.classList.add("is-valid");
        return true;
    }else{
        bookmarkURL.classList.remove("is-valid");
        bookmarkURL.classList.add("is-invalid");
        return false;
    }
}