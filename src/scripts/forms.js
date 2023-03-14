import { renderUserInfo } from "./user.js";
import { requestListAllUsers, requestUpdateUser } from "./requests.js";

import { requestUpdateEmployee } from "./requests.js";
import { renderAllUsers } from "./admin.js";

import { requestDeleteUser } from "./requests.js";

import { requestEditDepartment } from "./requests.js";
import { renderAllDepartments } from "./admin.js";

import { requestDeleteDepartment } from "./requests.js";

import { requestListCompanies } from "./requests.js";
import { requestCreateDepartment } from "./requests.js";

import { requestListAllDepartments } from "./requests.js";
import { requestHireEmployee } from "./requests.js";
import { requestDismissEmployee } from "./requests.js";

export const editProfile = () => {
  const formulario = document.createElement("form");
  formulario.classList.add("formbase");

  let h2 = document.createElement("h2");
  let inputName = document.createElement("input");
  let inputEmail = document.createElement("input");
  let inputPassword = document.createElement("input");
  let buttonEdit = document.createElement("button");

  inputName.classList.add("input-default");
  inputEmail.classList.add("input-default");
  inputPassword.classList.add("input-default");
  buttonEdit.classList = "big-button button-default button-style-200";

  h2.innerText = "Editar Perfil";

  inputName.placeholder = "Seu nome";
  inputName.name = "username";

  inputEmail.placeholder = "Seu e-mail";
  inputEmail.name = "email";

  inputPassword.placeholder = "Sua senha";
  inputPassword.name = "password";

  buttonEdit.innerText = "Editar perfil";
  buttonEdit.addEventListener("click", objectModal);

  formulario.append(h2, inputName, inputEmail, inputPassword, buttonEdit);

  function objectModal() {
    const backgroundModal = document.getElementById("backgroundModal");
    const formulario = document.querySelector("form");
    formulario.addEventListener("submit", async (event) => {
      event.preventDefault();

      const inputs = [...event.target];

      const body = {};

      inputs.forEach(({ name, value }) => {
        if (name) {
          body[name] = value;
        }
      });

      // console.log(body);
      await requestUpdateUser(body);
      renderUserInfo();
      backgroundModal.remove();
      window.location.reload();
    });
    return formulario;
  }
  return formulario;
};

export const editUser = (id) => {
  const formulario = document.createElement("form");

  formulario.classList.add("formbase");

  const h2 = document.createElement("h2");
  const selecKind_of_work = document.createElement("select");
  const optionPresential = document.createElement("option");
  const optionHome_office = document.createElement("option");
  const optionHibrid = document.createElement("option");

  const selectProfessional_level = document.createElement("select");
  const optionInternship_level = document.createElement("option");
  const optionJunior_level = document.createElement("option");
  const optionFull_level = document.createElement("option");
  const optionSenior_level = document.createElement("option");

  const buttonEdit = document.createElement("button");

  selecKind_of_work.classList.add("input-default");
  selecKind_of_work.name = "kind_of_work";
  selecKind_of_work.id = "profission-kind";

  optionPresential.value = "presencial";
  optionPresential.name = "presencial";
  optionPresential.innerText = "Presencial";

  optionHome_office.value = "home office";
  optionHome_office.name = "home office";
  optionHome_office.innerText = "Home Office";

  optionHibrid.value = "hibrido";
  optionHibrid.name = "hibrido";
  optionHibrid.innerText = "Hibrido";

  selectProfessional_level.classList.add("input-default");
  selectProfessional_level.name = "professional_level";
  selectProfessional_level.id = "profission-rank";

  optionInternship_level.value = "estágio";
  optionInternship_level.innerText = "Estágio";

  optionJunior_level.value = "júnior";
  optionJunior_level.innerText = "Júnior";
  optionFull_level.value = "pleno";

  optionFull_level.innerText = "Pleno";

  optionSenior_level.value = "sênior";
  optionSenior_level.innerText = "Sênior";

  buttonEdit.classList = "big-button button-default button-style-200";

  h2.innerText = "Editar Usuário";
  selecKind_of_work.name = "username";
  buttonEdit.innerText = "Editar";

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const backgroundModal = document.getElementById("backgroundModal");
    const body = {
      kind_of_work: event.target[0].value,
      professional_level: event.target[1].value,
    };

    await requestUpdateEmployee(body, id).then(() => {
      renderAllUsers();
      backgroundModal.remove();
    });
  });

    selecKind_of_work.append(optionPresential, optionHome_office, optionHibrid);
    selectProfessional_level.append(
    optionInternship_level,
    optionJunior_level,
    optionFull_level,
    optionSenior_level
  );
    formulario.append(
    h2,
    selecKind_of_work,
    selectProfessional_level,
    buttonEdit
  );

  return formulario;
};

export const removeUser = (name, id) => {
  const formulario = document.createElement("form");

  formulario.classList.add("formbase");

  const h2 = document.createElement("h2");
  const buttonRemove = document.createElement("button");

  buttonRemove.classList = "big-button button-default button-style-300";

  h2.innerText = `Realmente deseja remover o usuário ${name}?`;
  h2.classList.add("titleRemoveModal");

  buttonRemove.innerText = "Deletar";

  buttonRemove.addEventListener("click", (event) => {
    event.preventDefault();

    requestDeleteUser(id).then(() => {
      const backgroundModal = document.getElementById("backgroundModal");
      renderAllUsers();
      backgroundModal.remove();
    });
  });
  formulario.append(h2, buttonRemove);

  return formulario;
};

export const removeDepartment = (name, id) => {
  const formulario = document.createElement("form");

  formulario.classList.add("formbase");

  const h2 = document.createElement("h2");
  const buttonRemove = document.createElement("button");

  buttonRemove.classList = "big-button button-default button-style-300";

  h2.innerText = `Realmente deseja deletar o Departamento ${name} e demitir seus funcionários?`;
  h2.classList.add("titleRemoveModal");

  buttonRemove.innerText = "Confirmar";

  buttonRemove.addEventListener("click", (event) => {

    requestDeleteDepartment(id).then(() => {
      const listAllDepartments = requestListAllDepartments();
      const backgroundModal = document.getElementById("backgroundModal");
      renderAllDepartments(listAllDepartments);
      backgroundModal.remove();
    });
  });

  formulario.append(h2, buttonRemove);

  return formulario;
};

export const editDepartmentDescription = (description, id) => {
  const formulario = document.createElement("form");

  formulario.classList.add("formbase");

  const h2 = document.createElement("h2");
  const textArea = document.createElement("textarea");
  const buttonEdit = document.createElement("button");

  textArea.classList.add("textArea");
  buttonEdit.classList = "big-button button-default button-style-200";

  h2.innerText = "Editar Departamento";
  textArea.placeholder = `${description}`;
  buttonEdit.innerText = "Salvar alterações";

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log(event.target.elements[0].value);

    const backgroundModal = document.getElementById("backgroundModal");
    const body = {
      description: event.target.elements[0].value,
    };
    console.log(id);

    await requestEditDepartment(body, id).then(() => {
      backgroundModal.remove();
      window.location.reload();
    });
  });

  formulario.append(h2, textArea, buttonEdit);

  return formulario;
};

export const createDepartment = async () => {
  const backgroundModal = document.getElementById("backgroundModal");
  const companies = await requestListCompanies();

  const formulario = document.createElement("form");
  formulario.classList.add("formbase");

  const h2 = document.createElement("h2");
  const selectList = document.createElement("select");

  const departmentName = document.createElement("input");
  const description = document.createElement("input");
  const option = document.createElement("option");
  const button = document.createElement("button");

  departmentName.classList.add("input-default");
  description.classList.add("input-default");
  selectList.classList.add("input-default");
  button.classList = "big-button button-default button-style-200";

  h2.innerText = "Criar Departamento";
  departmentName.placeholder = "Nome do departamento";
  description.placeholder = "Descrição";
  button.innerText = "Criar o departamento";

  option.innerText = "Selecionar Empresa";
  option.value = "all-companies";

  selectList.appendChild(option);
  formulario.append(h2, departmentName, description, selectList, button);

  formulario.addEventListener("submit", async (event) => {
    const body = {
      name: event.target.elements[0].value,
      description: event.target.elements[1].value,
      company_uuid: event.target.elements[2].value,
    };

    await requestCreateDepartment(body).then(() => {
      backgroundModal.remove();
      window.location.reload();
    });
  });

  companies.forEach((company) => {
    const option0 = document.createElement("option");

    option0.innerText = company.name;
    option0.name = company.name;
    option0.id = company.name;
    option0.value = company.uuid;

    selectList.append(option0);
  });

  return formulario;
};

export const eyeFunction = async (description, name, id) => {
  const backgroundModal = document.getElementById("backgroundModal");
  const listAllUsers = await requestListAllUsers();
  const listAllDepartments = await requestListAllDepartments();

  const formulario = document.createElement("form");
  formulario.classList.add("formbase");

  const h2 = document.createElement("h2");

  const sectionTop = document.createElement("section");
  const divLeft = document.createElement("div");
  const pDepartDescription = document.createElement("p");
  const pCompanyName = document.createElement("p");

  const divRight = document.createElement("div");
  const buttonHire = document.createElement("button");
  const selectList = document.createElement("select");
  const option = document.createElement("option");

  sectionTop.classList.add("topSectionEye");
  divLeft.classList.add("divLeftEye");
  divRight.classList.add("divRightEye");
  buttonHire.classList = "button-default button-style-300";
  selectList.classList.add("input-default");
  pDepartDescription.classList.add("pDescriptionText");

  h2.innerText = "Nome Departamento";
  pDepartDescription.innerText = `${description}`;
  pCompanyName.innerText = `${name}`;
  buttonHire.innerText = "Contratar";

  option.innerText = "Selecionar usuário";

  divLeft.append(pDepartDescription, pCompanyName);
  selectList.appendChild(option);
  divRight.append(selectList, buttonHire);
  sectionTop.append(divLeft, divRight);
  formulario.append(h2, sectionTop);

  formulario.addEventListener("submit", async (event) => {

    const body = {
      user_uuid: event.target.elements[0].value,
      department_uuid: id,
    };

    await requestHireEmployee(body).then(() => {
      const buttonHidden = document.querySelector(".hidden");

      buttonHidden.classList.toggle("hidden");
      window.location.reload();
    });
  });

  listAllUsers.forEach((user) => {
    if (user.username !== "ADMIN" && user.department_uuid == null) {
      const option0 = document.createElement("option");
      option0.innerText = user.username;
      option0.name = user.username;
      option0.id = user.department_uuid;
      option0.value = user.uuid;
      selectList.append(option0);
    }
  });

  const sectionBottom = document.createElement("section");
  const ul = document.createElement("ul");

  listAllUsers.forEach((user) => {
    const departments = [...listAllDepartments];

    const getDepartamentName = () => {
      let depart = "";

      departments.forEach((department) => {
        if (department.uuid === user.department_uuid) {
          depart = department.companies.name;
        }
      });
      return depart;
    };

    // if (user.username !== "ADMIN") {
    if (user.username !== "ADMIN" && user.department_uuid == id) {
      // ul.innerHTML = ""
      const li = document.createElement("li");
      const divAbout = document.createElement("div");
      const username = document.createElement("p");
      const userProfessional_level = document.createElement("p");
      const companyName = document.createElement("p");
      const divButton = document.createElement("div");
      const button = document.createElement("button");

      sectionBottom.classList.add("bottomSectionEye");
      ul.classList.add("ulBottomEye");
      li.classList.add("liBottomEye");
      divAbout.classList = "div-about divAboutEye";
      divButton.classList.add("divButtonEye");
      button.classList = "button-default button-style-400";

      if (user.department_uuid == null) {
        button.classList.add("hidden");
      }

      button.addEventListener("click", (event) => {
        // event.preventDefault();
        requestDismissEmployee(user.uuid);
      });

      username.innerText = user.username;
      userProfessional_level.innerText = user.professional_level;
      companyName.innerText = getDepartamentName();
      button.innerText = "Desligar";

      divAbout.append(username, userProfessional_level, companyName);
      divButton.append(button);
      li.append(divAbout, divButton);
      ul.append(li);
      sectionBottom.append(ul);
      formulario.append(sectionBottom);
    }
  });

  return formulario;
};