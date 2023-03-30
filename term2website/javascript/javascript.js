let currentDirectory = "~"; 

function handleCommand() {
  const commandLine = document.getElementById("command-line");
  const output = document.createElement("div");
  output.className = "output";
  const input = commandLine.value.trim();
  output.innerHTML = `<span class="prompt">user@webpage:${currentDirectory}$ ${input}</span>`; 

  const args = input.split(" ");
  const command = args[0];
  const commandArgs = args.slice(1); 

  switch (command) {
    case "cd":
      if (commandArgs.length === 0) {
        currentDirectory = "~";
      } else if (commandArgs.length === 1) {
        if (commandArgs[0] === "..") {
          const lastSlashIndex = currentDirectory.lastIndexOf("/");
          if (lastSlashIndex === -1) {
            currentDirectory = "/";
          } else if (lastSlashIndex === 0) {
            currentDirectory = "~";
          } else {
            currentDirectory = currentDirectory.substring(0, lastSlashIndex);
          }
        } else {
          currentDirectory += `/${commandArgs[0]}`;
        }
      } else {
        output.innerHTML += `<br>cd: too many arguments`;
      }
      break;
    case "ls":
      if (commandArgs.length === 0) {
        output.innerHTML += `<br>index.html`;
      } else {
        output.innerHTML += `<br>ls: invalid option -- ${commandArgs[0]}<br>Try 'ls --help' for more information.`;
  }
  break;
case "clear":
  document.querySelectorAll(".output").forEach(element => element.remove());
  commandLine.focus();
  return;
default:
  output.innerHTML += `<br>${command}: command not found`;
  break;
} 

output.innerHTML += '<br>';
document.querySelector(".body").appendChild(output); commandLine.value = "";
} 

document.addEventListener("DOMContentLoaded", () => { const commandLine = document.getElementById("command-line");commandLine.addEventListener("keydown", event => { if (event.key === "Enter") { handleCommand();} });});
