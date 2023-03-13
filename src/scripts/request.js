
export async function getAllSectors(){
    const sectors = await fetch(`http://localhost:6278/sectors`,{
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    return sectors
}
// getAllSectors()

const user = getUser() || {};
const { token } = user;

const baseUrl = "http://localhost:6278/";
const requestHeaders = {
    "Content-Type" : "application/json",
    Authorization: `Beare ${token}`,
};
const email = localStorage.getItem(`@KenzieEmpresas:user`)

export function getUser(){
    const user = JSON.parse(localStorage.getItem("token"))
    return user
}
export async function requestUserInfos(){
    const userInfoGet = await fetch(`ttp://localhost:6278/users/profile`,{
        method: 'GET',
        headers: {
            "Content-Type" : "applicatioon/json",
            Authorization: `Bearer ${token}`,
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    console.log(userInfoGet)
    return userInfoGet
}

export async function requestUserCoworkers(){
    const coworkersInfosGet = await fetch(`http://localhost:6278/users/departments/coworkers`,{
        method: 'GET',
        headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`,
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    console.log(coworkersInfosGet)
    return coworkersInfosGet
}
export async function patchUserInfos(data){
    const patchedInfos = await fetch(`http://localhost:6278/users`,{
        method: 'PATCH',
        body: data,
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    .catch(err=> console.log(err))
}

export async function getAllDptsADm(){
    const allDpts =  await fetch (`http://localhost:6278/departments`, {
    method: 'GET',
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      }
      
  })
  .then(res => res.json()) 
  .then(res => {
      return res
  })
  .catch(err=> console.log(err))
  return allDpts
}

export async function getOutofWork(){
    const allOut =  await fetch (`http://localhost:6278/admin/out_of_work`, {
      method: 'GET',
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        }
        
    })
    .then(res => res.json()) 
    .then(res => {
        return res
    })
    .catch(err=> console.log(err))
    return allOut
}

export async function getallUsers(){
    const allUsers =  await fetch (`http://localhost:6278/users`, {
      method: 'GET',
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        }
        
    })
    .then(res => res.json()) 
    .then(res => {
        return res
    })
    .catch(err=> console.log(err))
    return allUsers
}

export async function renderChosenDpt(chosenDpt){
    const ul_departamento= document.querySelector(`#ul-departamento`)
    const url_chosen_dpt = `http://localhost:6278/departments`
  
    ul_departamento.innerHTML=''
  
    const dpt_enterprises = await fetch (url_chosen_dpt,{
        method: 'GET',
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          }
    })
    .then(res => res.json()) 
      .then(res => {
          return res
        })
        dpt_enterprises.map((e) => {
            console.log(e)
              if(e.name == chosenDpt)
              ul_departamento.insertAdjacentHTML('beforeend', `
              <li class="card-departamento">
              <h3 class="h3-departamento" >${e.name}</h3>
              <p class="p-descrição" >${e.description}</p>
              <p class="p-nome">${e.companies.name}</p>
              <div class="div-icones">
                  <img class="img-olho" src="/src/Assets/iconEye.png" alt="">
                  <img class="img-lapis" src="/src/Assets/iconPencil.png" alt="">
                  <img class="img-delete" src="/src/Assets/iconTrash.png" alt="">
              </div>
          </li>`)
          })
          if(chosenDpt == ""){
            dpt_enterprises.map((e) => {
              console.log(e)
                ul_departamento.insertAdjacentHTML('beforeend', `
                <li class="card-departamento">
                <h3 class="h3-departamento" >${e.name}</h3>
                <p class="p-descrição" >${e.description}</p>
                <p class="p-nome">${e.companies.name}</p>
                <div class="div-icones">
                    <img class="img-olho" src="/src/Assets/iconEye.png" alt="">
                    <img class="img-lapis" src="/src/Assets/iconPencil.png" alt="">
                    <img class="img-delete" src="/src/Assets/iconTrash.png" alt="">
                </div>`
            )}
          )}
}

export async function postNewDpt(data){
    const postDpt =  await fetch (`http://localhost:6278/departments`, {
      method: 'POST',
      body: data,
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        }
       
    })
    .then(res => res.json()) 
    .then(res => {
        return res
    })
    .catch(err=> console.log(err))
    console.log(postDpt)
    return postDpt
  }
  export async function getAllCompanies(){
    const companies = await fetch(`http://localhost:6278/companies`,{
      method: 'GET',
      headers: {
        "Authorization": "Bearer null",
    }})
    .then(res => res.json()) 
    .then(res => {
        const res2 = res.JSON
        return res
    })
    console.log(companies)
    return companies 
  }

  
  export async function patchUserInfosAdm(data){
    const patchInf =  await fetch (`http://localhost:6278/admin/update_user/5a202da4-f14b-4418-8ffd-a4c7ab3c1145`, {
      method: 'PATCH',
      body: data,
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        }
       
    })
    .then(res => res.json()) 
    .then(res => {
        return res
    })
    .catch(err=> console.log(err))
    
    return patchInf
  }
  export async function delUserInfos(data){
 
    const delInfo =  await fetch (` http://localhost:6278/admin/delete_user/${data}`, {
      method: 'DELETE',
      body: data,
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        }
    })
    .then(res => {
        return res})
    .catch(err=> console.log(err))
    
    return delInfo
    }



























