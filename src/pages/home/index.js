import { toggleMenu } from "../../scripts/buttons.js";
import { toLogin } from "../../scripts/buttons.js";
import { toRegister } from "../../scripts/buttons.js";
import { requestListCompanies } from "../../scripts/requests.js";
import { renderCompanies } from "../../scripts/homePage.js"
import {selectMenu} from "../../scripts/homePage.js"

const companies = await requestListCompanies()

toggleMenu()
toLogin();
toRegister();
requestListCompanies()
renderCompanies(companies)
selectMenu()
