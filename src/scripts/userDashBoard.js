import { requestUserInfos, requestUserCoworkers, patchUserInfos } from "./request.js";


export async function requestUserInfos(){
    const p_user = document.querySelector("#p_user")
    const p_email = document.querySelector("#p_email")
    const p_modalidade = document.querySelector("#p_modalidade")

    const infos = await requestUserInfos()
    const email = await infos.email
    const username = await infos.username
    const modalidade = await infos.professional_level

    p_modalidade.innerHTML = modalidade
    p_user.innerHTML = username
    p_email.innerHTML = email
}

 requestUserInfos()

export async function renderCoworkerInfos(){
    const ul_cowokers = document.querySelector("#ul_coworkers")
    const cowokersInfos = await requestUserCoworkers()
    const companyAndDptName = document.getElementById(companyAndDptName)

    companyAndDptName.innerText(`${cowokersInfos.description}`)
    ul_cowokers.insertAdjacentHTML('afterbegin', `
        <li class="coworkers-card" id="${cowokersInfos.users.username}.card">
        <h3 class="h3-nome">${cowokersInfos.users.username}</h3>
        <p class="p-posição">${cowokersInfos.users.professional_level}</p>
        </li>
    `)}
renderCoworkerInfos()    

async function editUserInfos(){
    const editBtn = document.querySelector("#button-edit")
    const main = document.querySelector("main")

    editBtn.addEventListener('click', () => {
        main.insertAdjacentHTML('beforeend', `
        <div class="modal">
        <div class="div-modal" id="div_modal">
        button class="close-button-modal" id="closeBtn"><img src="/src/Assets/iconX.png" alt=""></button>
        <h2 class="h2-modal">Editar Perfil</h2>
        <form action="" class="form-editar">
            <input type="text" name="name" class="input-modal" placeholder="Seu Nome">
            <input type="text" name="email" class="input-modal" placeholder="Seu e-mail">
            <input type="text" name="password" class="input-modal" placeholder="Sua senha">
            <button class="buttonmodal" type="submit" id="editGoBtn">Editar Perfil</button>
        </form>
        
        </div>
        </div>`)

        const modal = document.querySelector("#.modal")
        const closeBtn = document.querySelector(".close-button-modal")
        if(closeBtn){
            console.log(closeBtn)
            closeBtn.addEventListener('click', (event)=> {
                event.preventDefault
                modal.classList.add("closemodal")})
        }})
        
        const inputs = document.querySelectorAll("input")
        const newInfosUser = {}
        const btnEdit =  document.querySelector(".buttonmodal")
    
        if(btnEdit){
        console.log(btnEdit)
        btnEdit.addEventListener('click',(event)=>{
            event.preventDefault
            newInfosUser[inputs.name]=inputs.value
            console.log(JSON.stringify(newInfosUser))
    })
    return newInfosUser
  }}

  patchUserInfos(editUserInfos())

  export async function logout(){
    const btn_logout = document.getElementById(btn_logout)
    console.log(btn_logout)
    if(btn_logout){
        btn_logout.addEventListener(`click` , (event) => {
            event.preventDefault
            localStorage.clear()
            window.location.replace("/index.html")
        })}
  }
  logout()
  editUserInfos()
  renderUserInfos()
  requestUserInfos()
    
