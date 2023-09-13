const data = []

for (let i = 0; i < 100; i++) { data.push(Math.random()); }; const height=200; const width=500; const
  y=d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);
