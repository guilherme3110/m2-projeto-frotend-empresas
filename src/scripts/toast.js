export const toast = (title, message) => {
  const body = document.querySelector("body");

  const container = document.createElement("div");
  container.classList.add("toast-container");

  const containerTitle = document.createElement("div");
  containerTitle.classList.add("containerTitle")

  if (title == "Sucess!") {
    container.classList.add("successToast");
  }

  if (title == "Fail!") {
    container.classList.add("failToast");
  }

  const textContainer = document.createElement("div");

  const h3 = document.createElement("h3");
  h3.innerText = title;
  h3.classList.add("text-3")

  const span = document.createElement("span");
  span.innerText = `${message} `;
  span.classList.add("text-4")

  containerTitle.append(h3)
  textContainer.append(span);

  container.append(containerTitle, textContainer);

  body.appendChild(container);
};