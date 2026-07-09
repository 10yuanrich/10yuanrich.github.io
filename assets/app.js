const searchInput = document.querySelector("#articleSearch");
const topicButtons = [...document.querySelectorAll(".topic-button")];
const cards = [...document.querySelectorAll(".article-card")];
let activeTopic = "全部主题";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  for (const card of cards) {
    const matchesTopic = activeTopic === "全部主题" || card.dataset.topic === activeTopic;
    const matchesSearch = !query || card.dataset.search.includes(query);
    card.hidden = !(matchesTopic && matchesSearch);
  }
}

searchInput.addEventListener("input", applyFilters);

for (const button of topicButtons) {
  button.addEventListener("click", () => {
    activeTopic = button.dataset.topic;
    topicButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyFilters();
  });
}

const canvas = document.querySelector("#knowledgeCanvas");
const ctx = canvas.getContext("2d");
const nodes = [
  { x: 70, y: 92, r: 22, label: "Source", color: "#2f7d68" },
  { x: 165, y: 48, r: 18, label: "Wiki", color: "#2e5aac" },
  { x: 250, y: 116, r: 20, label: "Links", color: "#b46a00" },
  { x: 350, y: 70, r: 18, label: "Read", color: "#5b4fb3" },
];

function drawGraph() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * ratio);
  canvas.height = Math.floor(rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(47, 125, 104, 0.25)";
  for (let i = 0; i < nodes.length - 1; i += 1) {
    ctx.beginPath();
    ctx.moveTo(nodes[i].x, nodes[i].y);
    ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
    ctx.stroke();
  }
  for (const node of nodes) {
    ctx.beginPath();
    ctx.fillStyle = node.color;
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 12px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.label, node.x, node.y);
  }
}

window.addEventListener("resize", drawGraph);
drawGraph();
