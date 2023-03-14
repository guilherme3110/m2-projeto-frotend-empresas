import { getLocalStorage } from "./localStorage.js";
import { toast } from "./toast.js";

const baseURL = "http://localhost:6278/";

export async function requestRegister(body) {
  try {
    const request = await fetch(baseURL + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(request);

    if (request.ok == true) {
      const response = await request.json();

      toast("Sucess!", `Criação de usuário bem sucedida`);

      setTimeout(() => {
        window.location.assign("../login/index.html");
      }, 3000);
    } else {
      toast("Fail!", `Preencha os campos novamente`);
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function requestLogin(body) {
  try {
    const request = await fetch(baseURL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (request.ok == true) {
      const response = await request.json();
      console.log(response);

      toast("Sucess!", `Login efetivado com sucesso!`);

      setTimeout(() => {
        localStorage.setItem("user", response.token);
        localStorage.setItem("@user", JSON.stringify(response));

        requestValidateUser(response.token);
      }, 3000);
    } else {
      const pError = document.getElementById("error");
      pError.classList.remove("hidden");
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}

export const requestValidateUser = async (token) => {
  try {
    const request = await fetch(baseURL + "auth/" + "validate_user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();
    const admin = response.is_admin;

    console.log(admin);

    if (admin === true) {
      localStorage.setItem("user-type", "adm");
      window.location.replace("../admin/index.html");
    } else {
      localStorage.setItem("user-type", "user");
      window.location.replace("../user/index.html");
    }
  } catch (err) {
    console.log(err);
  }
};

export const requestListCompanies = async () => {
  const response = await fetch(baseURL + "companies");
  const data = await response.json();

  return data;
};

export const requestCompaniesBySector = async (sector) => {
  const response = await fetch(baseURL + "companies/" + `${sector}`);
  const data = await response.json();

  return data;
};

export const requestListSectors = async () => {
  const response = await fetch(baseURL + "sectors");
  const data = await response.json();

  return data;
};

export const requestUserProfileInfo = async () => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "users/" + "profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const requestSameDepartamentUsers = async () => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(
      baseURL + "users/" + "departments/" + "coworkers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const requestUserCompanyDepartment = async () => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "users/" + "departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    const response = await request.json();
    if (request.ok) {
    } else {
      console.log(response.error);
    }

    return response;
  } catch (err) {
    console.log(err);
  }
};

export async function requestUpdateUser(body) {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export const requestListAllUsers = async () => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(`${baseURL}users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const requestUsersUndepartamented = async () => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "users/" + "out_of_work", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const requestUpdateEmployee = async (body, id) => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "admin/" + "update_user/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    });

    if (request.ok) {
      const response = await request.json();

      toast("Empregado editado com sucesso!");
    } else {
      toast("Falha na solicitação");
    }

  } catch (err) {
    console.log(err);
  }
};

export const requestDeleteUser = async (id) => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "admin/" + "delete_user/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (request.ok) {
      toast("Usuário removido com sucesso!");

    } else {
      toast("Não foi possivel remover o usuário");
    }
  } catch (err) {
    console.log(err);
  }
};

export async function requestRegisterCompany(body) {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export const requestListAllDepartments = async () => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const requestListAllCompanyDepartments = async (id) => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "departments/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

export async function requestCreateDepartment(body) {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    });

    console.log(request);

    if (request.ok) {
      const response = await request.json();

      toast("Empregado editado com sucesso!");
    } else {
      toast("Falha na solicitação");
    }
    
  } catch (err) {
    console.log(err);
  }
}

export async function requestHireEmployee(body) {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "departments/" + "hire", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function requestDismissEmployee(id) {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "departments/" + "dismiss/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function requestEditDepartment(body, uuid) {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "departments/" + uuid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    });

    if (request.ok) {
      const response = await request.json();

      toast("Empregado editado com sucesso!");
    } else {
      toast("Falha na solicitação");
    }
  } catch (err) {
    console.log(err);
  }
}

export const requestDeleteDepartment = async (id) => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "departments/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (request.ok) {
      toast("Departamento removido com sucesso!");

    } else {
      toast("Não foi possivel remover o departamento");
    }
  } catch (err) {
    console.log(err);
  }
};
