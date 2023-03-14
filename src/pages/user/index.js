import { logout, toggleMenu } from "../../scripts/buttons.js";
import { renderUserInfo } from "../../scripts/user.js";
import { renderCompanyAndDepartmentName } from "../../scripts/user.js";
import { renderDepartmentCoworkers } from "../../scripts/user.js";

logout();
toggleMenu()
renderUserInfo();
renderCompanyAndDepartmentName();
renderDepartmentCoworkers();

