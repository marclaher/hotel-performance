// Configuració del gràfic
const margin = { top: 20, right: 30, bottom: 50, left: 70 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("#viz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Dades inicials
const data = [
    { segment: "Direct", canceled: 12 },
    { segment: "Corporate", canceled: 18 },
    { segment: "Online TA", canceled: 42 },
    { segment: "Offline TA/TO", canceled: 25 },
    { segment: "Complementary", canceled: 5 }
];

// Escales
const x = d3.scaleBand()
    .domain(data.map(d => d.segment))
    .range([0, width])
    .padding(0.2);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.canceled)])
    .range([height, 0]);

// Eixos
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .call(d3.axisLeft(y));

// Barres
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.segment))
    .attr("y", d => y(d.canceled))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.canceled))
    .attr("fill", "#69b3a2");

// Títol
svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Percentatge de cancel·lacions segons el segment de mercat");
