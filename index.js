let mobile_menu_login = document.getElementById('mobile_menu_login');
let menuicons = document.getElementById('menuicons');
let form = document.getElementById('url_submit');
let submit = document.getElementById('submit');
let url = document.getElementById('url');
let error = document.getElementById('error');
let outputs = document.getElementById('outputs');
let isMenuOpen = false;

window.onload=display();

let i = outputs.children.length+1;
// console.log(outputs.children.length)

menuicons.addEventListener("click", () => {
    if (innerWidth <= 980) {
        if (isMenuOpen == false) {
            mobile_menu_login.style.visibility = "visible";
            mobile_menu_login.style.opacity = "1";
            mobile_menu_login.style.height = "385px";
            mobile_menu_login.style.zIndex = "1";
            mobile_menu_login.style.transition = "1s";
            isMenuOpen = true;
        } else {
            mobile_menu_login.style.visibility = "invisible";
            mobile_menu_login.style.opacity = "-1";
            mobile_menu_login.style.height = "0px";
            mobile_menu_login.style.transition = "1s";
            isMenuOpen = false;
        }
    }
});



form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!url.checkValidity() || url.value == "") {
        error.style.display = "block";
        url.style.border = "3px solid hsl(0, 87%, 67%)"
        // console.log(copybtn.previousSibling.innerHTML);
    }
    else {
        error.style.display = "none";
        url.style.border = "none"
        submit.value="Wait..."
        submit.style.cursor="wait"
        fetchApi();
    }

})



function fetchApi() {
    fetch(`https://api.shrtco.de/v2/shorten?url=${url.value}`)
        .then(res => res.json())
        .then(res => {
            if (res.ok) {
                display_Add(res);
                submit.value="Shorten It!"
                submit.style.cursor="pointer"
                url.value="";
            }
            else {
                error.style.display = "block";
                error.innerText = "Please Enter Correct Url"
            }
        })
}
function display(){
    if (localStorage.getItem('short_links_list') != null) {
        outputs.innerHTML = `${localStorage.getItem('short_links_list')}`
    }
}

function display_Add(res) {
    // console.log(res);
    if (localStorage.getItem('short_links_list') == null) {
        outputs.innerHTML = `
                                <div class="output">
                                    <div class="site">
                                        ${url.value}
                                    </div>
                                    <div class="output_site_copybtn">
                                        <div class="output_site" id="output_site${i}">
                                            ${res.result.full_short_link3}
                                        </div>
                                        <button class="copybtn" id="copybtn${i}" onclick="copybtnf(output_site${i},copybtn${i})">Copy</button>
                                        </div>
                                </div>`
        localStorage.setItem('short_links_list', outputs.innerHTML)
    }
    else {
        outputs.innerHTML = `${localStorage.getItem('short_links_list')}
                                <div class="output">
                                    <div class="site">
                                        ${url.value}
                                    </div>
                                    <div class="output_site_copybtn">
                                        <div class="output_site" id="output_site${i}">
                                            ${res.result.full_short_link3}
                                        </div>
                                        <button class="copybtn" id="copybtn${i}" onclick="copybtnf(output_site${i},copybtn${i})">Copy</button>
                                    </div>
                                </div>`
        localStorage.setItem('short_links_list', outputs.innerHTML)
    }
    i++;
}

function copybtnf(shortlink, copybtn) {
    navigator.clipboard.writeText(shortlink.innerHTML);
    // console.log(shortlink);
    copybtn.style.background="var(--primary_2)";
    copybtn.innerHTML="Copied !";
    setInterval(() => {
        copybtn.style.background="var(--primary_1)";
        copybtn.innerHTML="Copy"
        copybtn.classList.add="copybtn";
    }, 5000);
    
}
