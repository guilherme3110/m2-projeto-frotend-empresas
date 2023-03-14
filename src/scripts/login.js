import { requestLogin } from "../scripts/requests.js";

export const eventLogin = () => {
  const form = document.querySelector("form");
  const elements = [...form.elements];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {};

    elements.forEach((element) => {
      if (element.tagName == "INPUT" && element.value !== "") {
        body[element.name] = element.value;
      }
    });
    const check = await requestLogin(body);
  });
};