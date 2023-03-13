import { getAllSectors } from './request.js'

export function getUser() {
    const user = JSON.parse(localStorage.getItem("@KenzieEmpresas:user"))
    return user
  }
  
  async function renderSector(){
      const selectTag = document.querySelector(`#list_empresas`)
      const sectorAll = await getAllSectors()
  
      sectorAll.map(sector =>{
          selectTag.insertAdjacentHTML('beforeend', `
          <option id="${sector.description}" class="sectorOption"  value="${sector.description}"> 
               ${sector.description} 
          </option>`)
      })
  }
  
  
  async function renderChosenSection(chosenSector){
      const ul_chosen_sectors = document.querySelector(`#ul_chosen_sectors`)
      const url_chosen_sectors = "http://localhost:6278/companies/"
  
      ul_chosen_sectors.innerHTML=''
  
      const sector_enterprises = await fetch (url_chosen_sectors,{
          method: 'GET',
      })
      .then(res => res.json()) 
        .then(res => {
            return res
          })
  
          sector_enterprises.map(element => {
              if(element.sectors.description == chosenSector)
              ul_chosen_sectors.insertAdjacentHTML('beforeend', `
          <li id="${element.name}" class="sectorOption"  value="${element.name}"> 
               <h2>${element.name} </h2>
               <p>${element.opening_hours}</p>
               <button>${chosenSector}</button>
          </li>`)
          });
      
  }
  
  const list_empresas =  document.getElementById("list_empresas")
  if(list_empresas){
      list_empresas.addEventListener('change', (e)=>{
     
      const chosenSector =  list_empresas.value
      renderChosenSection(chosenSector)
  })}

  renderSector()