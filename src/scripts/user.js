import openModal from "../scripts/modals.js";
import { requestUserProfileInfo } from "./requests.js";
import { requestSameDepartamentUsers } from "./requests.js";
import { requestUserCompanyDepartment } from "./requests.js";
import { editProfile } from "./forms.js";
import { requestUpdateUser } from "./requests.js";

  const sectionAboutUser = document.querySelector("#top-section-userPage");
  const titleCompanyName = document.querySelector(
  "#title-bottom-section-userPage"
);
  const ulCoworkers = document.querySelector("#card-list");

export const renderUserInfo = async () => {
  sectionAboutUser.innerHTML = "";
  const userInfo = await requestUserProfileInfo();
  const divAboutContainer = document.createElement("div");
  const divAboutUser = document.createElement("div");
  const UserName = document.createElement("h2");
  const pEmail = document.createElement("p");
  const pProfessional_level = document.createElement("p");
  const pKind_of_work = document.createElement("p");
  const VectorImg = document.createElement("img");

  divAboutContainer.id = "about-container";
  divAboutUser.id = "about-user";

  UserName.innerText = `${userInfo.username}`.toUpperCase();
  pEmail.innerText = `Email: ${userInfo.email}`;
  pProfessional_level.innerText = 
  `${userInfo.professional_level[0].toUpperCase() 
  + userInfo.professional_level.slice(1)}`;
  pKind_of_work.innerText = userInfo.kind_of_work;

  VectorImg.src = "../../img/Vector.png";
  VectorImg.alt = "pencil";
  VectorImg.id = "edit";

  VectorImg.addEventListener("click", async () => {
    const userEdit = editProfile();
    openModal(userEdit);
  });

  divAboutContainer.append(divAboutUser, VectorImg);
  divAboutUser.append(pEmail, pProfessional_level, pKind_of_work);
  sectionAboutUser.append(UserName, divAboutContainer);
};

export const renderCompanyAndDepartmentName = async () => {
  titleCompanyName.innerHTML = "";
  const companyInfo = await requestUserCompanyDepartment();

  const userInfo = await requestUserProfileInfo();

  if (companyInfo.error) {

    titleCompanyName.classList.add("hidden");

    renderUnemployed() 

  } else {
    const company = [...companyInfo.departments];

    const verifyDepartment = () => {
      let departament = "" 

      company.forEach((department) => {
        if (department.uuid === userInfo.department_uuid) {
          departament = department.name;
        }
      });
      return departament;
    };

    const companyName = document.createElement("h2");
    const p = document.createElement("p");
    const departmentName = document.createElement("h2");

    p.innerText = "-";
    companyName.innerText = companyInfo.name;
    departmentName.innerText = verifyDepartment();

    titleCompanyName.append(companyName, p, departmentName);
  }
};

export const renderDepartmentCoworkers = async () => {
  ulCoworkers.innerHTML = "";
  const coworkers = await requestSameDepartamentUsers();

  coworkers.forEach((coworker) => {
    const departmentCoworkers = [...coworker.users];

    departmentCoworkers.forEach((user) => {
      const li = document.createElement("li");
      const pName = document.createElement("p");
      const pProfessional_level = document.createElement("p");

      li.classList.add("cards");

      pName.innerText = user.username;
      pProfessional_level.innerText = user.professional_level;

      li.append(pName, pProfessional_level);
      ulCoworkers.appendChild(li);
    });
  });
};

const renderUnemployed = () => {
    ulCoworkers.innerHTML = ""
    
    const li = document.createElement("li");
    const pText = document.createElement("p");

    li.classList.add("cardsUnemployed");

    pText.innerText = "Você ainda não foi contratado"

    li.append(pText);
    ulCoworkers.append(li)
}