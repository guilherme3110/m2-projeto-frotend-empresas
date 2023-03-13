export async function loginInput() {
    const inputs = document.querySelectorAll(".login_input")
    const button = document.querySelector("#login_btn_page")
    const loginUser = {};

    console.log(button)
  
    button.addEventListener("click", async (event) => {
      event.preventDefault()
      inputs.forEach((input) => {
        loginUser[input.name] = input.value
      })
      const newUserjSon = loginUser.json
      console.log(JSON.stringify(loginUser))
      localStorage.setItem("@KenzieEmpresas:user",JSON.stringify(loginUser))

      const request = await loginUser2(loginUser)
      
    })
    return loginUser
  }
  export async function getAuthorization(user) {
    console.log(await user)
    const userToken = await user
    const userAuth = await fetch('http://localhost:6278/auth/validate_user',
    {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken.token}`
        }
    })
    
    .then((response) => {
       
        return response.json()
    })

    .then((response) => {
        return response
    })

    return userAuth
}   

async function getUser(dataUser, token) {
    const token2 = JSON.parse(localStorage.getItem(`token- ${dataUser.email} `))
    console.log(token)
    return token;
}




 export async function loginUser2(loginInfo) {
    const bodyInfos = JSON.stringify(loginInfo)
    const loginData = await fetch('http://localhost:6278/auth/login',{ 
    method: 'POST',
   
    body: bodyInfos,
    headers: {
      'Content-Type': 'application/json'
 }})

 const loginDataJson =  await loginData.json()


  localStorage.setItem(`token`, JSON.stringify(loginDataJson))
 
  
  const auth = await getAuthorization(getUser(loginInfo, loginDataJson))
  
  localStorage.setItem("@KenzieUser",JSON.stringify(loginInfo.email))

  if(auth.is_admin){
    window.location.replace("../Pages/admDashboard.html")
  }
  else if(!auth.is_admin){
   
    window.location.replace("../Pages/userDashboard.html")
    
  }
  else{
    window.location.replace("/index.html")
  }
  return auth
  }
 
loginInput()