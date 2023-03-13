const newUser4 = {}

export async function registerForm(){
    const inputs = document.querySelectorAll("inputRegister")
    const btn_confirmCadastro = document.querySelector("#btn_confirmCadastro")

    console.log(inputs)
    btn_confirmCadastro.addEventListener("click", async(event)=> {
        event.preventDefault()

        inputs.forEach((inputs)=>{
            newUser4[inputs.name] = input.value
    })

    console.log(newUser4)
    const newUserjSon = newUser4.json
    const request = await register(newUser4)
    console.log(request)
    localStorage.setItem('@KenzieEmpresas:user', JSON.stringify(request))

    })
    return newUser4

}

export async function register(data){
    const loginData = await fetch(`http://localhost:6278/auth/register`,{
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .catch((err) => console.log(err))
    const loginDataJson = await loginData.json();

    if(!loginData.ok){
        console.log('erro')
    }else{

    }
    return loginDataJson
}

registerForm()