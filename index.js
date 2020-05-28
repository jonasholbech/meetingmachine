import { interpret } from "xstate";
import meetingMachine from "./machineConfig";
const service = interpret(meetingMachine).start();
let state = service.send("START");
const app = document.querySelector(".app");
setup();

function setup() {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector(".buttons").addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      state = service.send(e.target.dataset.action);
      buildDOM(state);
    }
  });
  app.appendChild(copy);
  buildDOM(state);
}
function buildDOM(state) {
  console.log(state);
  console.log(state.context);
  console.log(state.nextEvents);
  app.querySelector("h1").textContent = state.context.header;
  app.querySelector("p").textContent = state.context.description;
  app.querySelector(".buttons").innerHTML = "";
  state.nextEvents.forEach((ev) => {
    const b = document.createElement("button");
    b.textContent = ev;
    b.dataset.action = ev;
    app.querySelector(".buttons").appendChild(b);
  });
}
