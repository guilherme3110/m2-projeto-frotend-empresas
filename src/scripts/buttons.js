 const btnMobile = document.querySelector(".btn-mobile");

 export const toggleMenu = () => {
    const nav = document.getElementById("nav");
    nav.classList.toggle("active")
}

btnMobile.addEventListener("click", toggleMenu);

export const toHome = () => {
    const buttonToLogin = document.querySelector("#button-to-home")
    buttonToLogin.addEventListener("click", () => {
        window.location.replace("../home/index.html");
    })
}

export const toLogin = () => {
    const buttonToLogin = document.querySelector("#button-to-login")
    buttonToLogin.addEventListener("click", () => {
        window.location.replace("../login/index.html");
    })
}

export const toRegister = () => {
    const buttonToLogin = document.querySelector("#button-to-register")
    buttonToLogin.addEventListener("click", () => {
        window.location.replace("../register/index.html");
    })
}

export const logout = () => {
    const buttonLogout = document.querySelector("#button-logout")
    buttonLogout.addEventListener("click", () => {
        localStorage.clear();
        window.location.replace("../home/index.html");
    })
}

export const buttonToRegister = () => {
    const buttonRegister = document.querySelector("#button-change-to-register");
    buttonRegister.addEventListener("click", (event) => {
      
      window.location.replace("../register/index.html");
    });
  }

export const backToLogin = () => {
const returnToLogin = document.querySelector("#return-login");
returnToLogin.addEventListener("click", () => {
    window.location.replace("../home/index.html");
})
}