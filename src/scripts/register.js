import { requestRegister } from "../scripts/requests.js";

export const eventRegister = () => {
    const form = document.querySelector("form");
    const elements = [...form.elements];
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const body = {};
  
      elements.forEach((element) => {
        if (element.tagName == "INPUT" && element.value !== "" || element.tagName == "SELECT" && element.value !== "") {
          body[element.name] = element.value;
        }
        console.log(body);
      });
  
      const check = await requestRegister(body);
      console.log(check);
    });
  };