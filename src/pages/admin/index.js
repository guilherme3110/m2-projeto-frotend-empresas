import { logout, toggleMenu } from "../../scripts/buttons.js";
import { renderAllUsers } from "../../scripts/admin.js";
import { renderAllDepartments } from "../../scripts/admin.js";
import { requestListCompanies } from "../../scripts/requests.js";
import { requestListAllDepartments } from "../../scripts/requests.js";
import { selectMenu } from "../../scripts/admin.js";

import { editUser } from "../../scripts/forms.js";
import { removeUser } from "../../scripts/forms.js";
import { removeDepartment } from "../../scripts/forms.js";
import { createNewDepartment } from "../../scripts/admin.js";
import { eyeFunction } from "../../scripts/forms.js";

const listAllDepartments = await requestListAllDepartments();

logout();
renderAllUsers();
renderAllDepartments(listAllDepartments);
selectMenu();
editUser();
removeUser();
removeDepartment();
createNewDepartment();
eyeFunction();
