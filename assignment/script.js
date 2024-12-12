fetch('getOrgChart.php')
    .then(response => response.json())
    .then(data => {
        const root = d3.stratify()
            .id(d => d.id)
            .parentId(d => d.parent_id)(data);

        const treeLayout = d3.tree().size([800, 400]);
        treeLayout(root);

        const svg = d3.select("#orgChart").append("svg")
            .attr("width", 1000)
            .attr("height", 600);

        const g = svg.append("g").attr("transform", "translate(50, 50)");

        // Links
        g.selectAll("line")
            .data(root.links())
            .enter()
            .append("line")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)
            .style("stroke", "#ccc");

        // Nodes
        const node = g.selectAll("g.node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        node.append("circle").attr("r", 10).style("fill", "#69b3a2");
        node.append("text")
            .attr("dy", -15)
            .attr("text-anchor", "middle")
            .text(d => d.data.name);
    });
