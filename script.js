// Exemple de visualització inicial amb D3.js
const width = 800;
const height = 400;

const svg = d3.select("#viz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "24px")
    .text("Visualització en construcció");
