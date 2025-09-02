const choices = ["pedra", "papel", "tesoura"]; 
const rules = {
  pedra: "tesoura",
  papel: "pedra",
  tesoura: "papel",
};

const scorePlayerEl = document.getElementById("score-player");
const scoreCpuEl = document.getElementById("score-cpu");
const playerPickEl = document.getElementById("player-pick");
const cpuPickEl = document.getElementById("cpu-pick");
const outcomeEl = document.getElementById("outcome");
const resetBtn = document.getElementById("reset");

let scorePlayer = 0;
let scoreCpu = 0;

function getCpuChoice(){
  const idx = Math.floor(Math.random() * choices.length);
  return choices[idx];
}

function renderPicks(player, cpu){
  playerPickEl.textContent = iconFor(player) + " " + capitalize(player);
  cpuPickEl.textContent = iconFor(cpu) + " " + capitalize(cpu);
}

function iconFor(choice){
  switch(choice){
    case "pedra": return "🪨";
    case "papel": return "📄";
    case "tesoura": return "✂️";
    default: return "—";
  }
}

function capitalize(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function decideOutcome(player, cpu){
  if(player === cpu) return "Empate";
  if(rules[player] === cpu) return "Você venceu!";
  return "Você perdeu";
}

function handleChoice(player){
  const cpu = getCpuChoice();
  renderPicks(player, cpu);
  const result = decideOutcome(player, cpu);
  outcomeEl.textContent = result;

  if(result === "Você venceu!") scorePlayer++;
  else if(result === "Você perdeu") scoreCpu++;

  scorePlayerEl.textContent = String(scorePlayer);
  scoreCpuEl.textContent = String(scoreCpu);
}

function resetScore(){
  scorePlayer = 0;
  scoreCpu = 0;
  scorePlayerEl.textContent = "0";
  scoreCpuEl.textContent = "0";
  playerPickEl.textContent = "—";
  cpuPickEl.textContent = "—";
  outcomeEl.textContent = "Faça sua jogada!";
}

for(const btn of document.querySelectorAll(".choice")){
  btn.addEventListener("click", () => handleChoice(btn.dataset.choice));
}

resetBtn.addEventListener("click", resetScore);
