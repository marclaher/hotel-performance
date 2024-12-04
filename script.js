// Configuració global per als gràfics
const margin = { top: 40, right: 30, bottom: 50, left: 70 }; // Augmentem el marge superior
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;


// Dades de mostra per al gràfic de cancel·lacions
const data = [
    { segment: "Direct", canceled: 12 },
    { segment: "Corporate", canceled: 18 },
    { segment: "Online TA", canceled: 42 },
    { segment: "Offline TA/TO", canceled: 25 },
    { segment: "Complementary", canceled: 5 }
];

// Escales per al gràfic de cancel·lacions
const x = d3.scaleBand()
    .domain(data.map(d => d.segment))
    .range([0, width])
    .padding(0.2);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.canceled)])
    .range([height, 0]);

// Gràfic 1: Percentatge de cancel·lacions
const svgCancellations = d3.select("#viz-cancellations")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Dibuixa les barres per al gràfic de cancel·lacions
svgCancellations.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.segment))
    .attr("y", d => y(d.canceled))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.canceled))
    .attr("fill", "#69b3a2");

// Afegeix els eixos al gràfic de cancel·lacions
svgCancellations.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

svgCancellations.append("g")
    .call(d3.axisLeft(y));

// Títol del gràfic de cancel·lacions
svgCancellations.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Percentatge de cancel·lacions segons el segment de mercat");

// Dades de mostra per al gràfic de calor
const heatmapData = [
    { year: 2015, month: "January", occupancy: 45 },
    { year: 2015, month: "February", occupancy: 50 },
    { year: 2015, month: "March", occupancy: 55 },
    { year: 2015, month: "April", occupancy: 60 },
    { year: 2015, month: "May", occupancy: 65 },
    { year: 2015, month: "June", occupancy: 70 },
    { year: 2015, month: "July", occupancy: 85 },
    { year: 2015, month: "August", occupancy: 80 },
    { year: 2015, month: "September", occupancy: 60 },
    { year: 2015, month: "October", occupancy: 55 },
    { year: 2015, month: "November", occupancy: 50 },
    { year: 2015, month: "December", occupancy: 45 },
    { year: 2016, month: "January", occupancy: 50 }
];

// Ordenar els mesos per ordre cronològic
const monthsOrder = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

// Escales per al gràfic de calor
const heatmapX = d3.scaleBand()
    .domain(monthsOrder)
    .range([0, width])
    .padding(0.05);

const heatmapY = d3.scaleBand()
    .domain([...new Set(heatmapData.map(d => d.year))])
    .range([0, height])
    .padding(0.05);

const colorScale = d3.scaleLinear()
    .domain([40, 100]) // Ajusta segons els valors d'ocupació
    .range(["#e0f3f3", "#007f7f"]);

// Gràfic 2: Gràfic de calor
const svgHeatmap = d3.select("#viz-heatmap")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Dibuixa les cel·les del gràfic de calor
svgHeatmap.selectAll()
    .data(heatmapData, d => `${d.year}:${d.month}`)
    .enter()
    .append("rect")
    .attr("x", d => heatmapX(d.month))
    .attr("y", d => heatmapY(d.year))
    .attr("width", heatmapX.bandwidth())
    .attr("height", heatmapY.bandwidth())
    .attr("fill", d => colorScale(d.occupancy))
    .attr("stroke", "#ffffff");

// Etiquetes per al gràfic de calor
svgHeatmap.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(heatmapX));

svgHeatmap.append("g")
    .call(d3.axisLeft(heatmapY));

// Títol del gràfic de calor
svgHeatmap.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Gràfic de calor: Ocupació segons mes i any");
