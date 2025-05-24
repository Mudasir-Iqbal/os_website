/**
 * Visualization script for OS Architecture Explorer - Horizontal Tree Version
 * Uses D3.js to create an interactive horizontal tree visualization similar to OSINT Framework
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the dimensions of the visualization container
    const container = document.getElementById('visualization');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Set up the SVG container
    const svg = d3.select('#visualization')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(50,0)'); // Add some left margin
    
    // Create a tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
    
    // Set up the info panel
    const infoPanel = document.getElementById('info-panel');
    const infoTitle = document.getElementById('info-title');
    const infoContent = document.getElementById('info-content');
    const closeInfoBtn = document.getElementById('close-info');
    
    // Close info panel when close button is clicked
    closeInfoBtn.addEventListener('click', function() {
        infoPanel.classList.remove('active');
    });
    
    // Set up the search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    // Create a hierarchy from the data
    const root = d3.hierarchy(osTreeData);
    
    // Count the maximum number of nodes at any level to determine height
    const nodesByLevel = {};
    root.descendants().forEach(d => {
        if (!nodesByLevel[d.depth]) {
            nodesByLevel[d.depth] = 0;
        }
        nodesByLevel[d.depth]++;
    });
    
    // Find the level with the most nodes
    const maxNodesAtAnyLevel = Math.max(...Object.values(nodesByLevel));
    
    // Calculate the vertical spacing needed
    const verticalSpacing = 40; // Minimum space between nodes
    const treeHeight = maxNodesAtAnyLevel * verticalSpacing;
    
    // Create a tree layout - horizontal, left to right with fixed node size
    const treeLayout = d3.tree()
        .size([treeHeight, width - 200]) // [height, width] for horizontal layout
        .nodeSize([verticalSpacing, 0]); // Fixed vertical spacing between nodes
    
    // Collapse all nodes initially except the root
    root.descendants().forEach(d => {
        if (d.depth > 0) {
            d._children = d.children;
            d.children = null;
        }
    });
    
    // Initial node positions
    root.x0 = height / 2;
    root.y0 = 0;
    
    // Counter for unique IDs
    let i = 0;
    
    // Function to update the visualization
    function update(source) {
        // Compute the new tree layout
        const treeData = treeLayout(root);
        
        // Get all nodes and links
        const nodes = treeData.descendants();
        const links = treeData.links();
        
        // Normalize for fixed-depth
        nodes.forEach(d => {
            // For horizontal layout, swap x and y
            d.y = d.depth * 180; // Horizontal distance between levels
        });
        
        // ****************** Nodes section ******************
        
        // Update the nodes
        const node = svg.selectAll('g.node')
            .data(nodes, d => d.id || (d.id = ++i));
        
        // Enter any new nodes at the parent's previous position
        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${source.y0},${source.x0})`)
            .on('click', click);
        
        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('r', 8)
            .style('fill', d => d._children ? '#3498db' : '#fff')
            .style('stroke', '#3498db')
            .style('stroke-width', '1.5px');
        
        // Add labels for the nodes
        nodeEnter.append('text')
            .attr('dy', '.35em')
            .attr('x', 15)
            .attr('text-anchor', 'start')
            .text(d => d.data.name);
        
        // Add tooltips
        nodeEnter
            .on('mouseover', function(event, d) {
                if (d.data.description) {
                    tooltip.transition()
                        .duration(200)
                        .style('opacity', .9);
                    tooltip.html(d.data.description)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');
                }
            })
            .on('mouseout', function() {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });
        
        // UPDATE
        const nodeUpdate = nodeEnter.merge(node);
        
        // Transition to the proper position for the nodes
        nodeUpdate.transition()
            .duration(750)
            .attr('transform', d => `translate(${d.y},${d.x})`);
        
        // Update the node attributes and style
        nodeUpdate.select('circle')
            .attr('r', 8)
            .style('fill', d => d._children ? '#3498db' : '#fff')
            .attr('cursor', 'pointer');
        
        // Remove any exiting nodes
        const nodeExit = node.exit().transition()
            .duration(750)
            .attr('transform', d => `translate(${source.y},${source.x})`)
            .remove();
        
        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 0);
        
        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 0);
        
        // ****************** Links section ******************
        
        // Update the links
        const link = svg.selectAll('path.link')
            .data(links, d => d.target.id);
        
        // Enter any new links at the parent's previous position
        const linkEnter = link.enter().insert('path', 'g')
            .attr('class', 'link')
            .attr('d', d => {
                const o = {x: source.x0, y: source.y0};
                return diagonal(o, o);
            });
        
        // UPDATE
        const linkUpdate = linkEnter.merge(link);
        
        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(750)
            .attr('d', d => diagonal(d.source, d.target));
        
        // Remove any exiting links
        link.exit().transition()
            .duration(750)
            .attr('d', d => {
                const o = {x: source.x, y: source.y};
                return diagonal(o, o);
            })
            .remove();
        
        // Store the old positions for transition
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }
    
    // Helper function to create a straight line from parent to child nodes
    // This is different from the curved diagonal in the radial version
    function diagonal(s, d) {
        // For a straight line, we need to create a path with two points
        return `M ${s.y} ${s.x}
                L ${d.y} ${d.x}`;
    }
    
    // Toggle children on click
    function click(event, d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        
        // Show info panel
        infoTitle.textContent = d.data.name;
        
        let content = `<p>${d.data.description || 'No description available.'}</p>`;
        
        // Add children list if available
        if (d._children) {
            content += '<h3>Subtopics:</h3><ul>';
            d._children.forEach(child => {
                content += `<li>${child.data.name}</li>`;
            });
            content += '</ul>';
        }
        
        infoContent.innerHTML = content;
        infoPanel.classList.add('active');
        
        update(d);
    }
    
    // Search functionality
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (!searchTerm) return;
        
        // Find node that matches search term
        let foundNode = null;
        
        function searchTree(node) {
            if (node.data.name.toLowerCase().includes(searchTerm) || 
                (node.data.description && node.data.description.toLowerCase().includes(searchTerm))) {
                foundNode = node;
                return true;
            }
            
            if (node.children) {
                for (let i = 0; i < node.children.length; i++) {
                    if (searchTree(node.children[i])) {
                        return true;
                    }
                }
            }
            
            if (node._children) {
                // Expand node to show children
                node.children = node._children;
                node._children = null;
                
                for (let i = 0; i < node.children.length; i++) {
                    if (searchTree(node.children[i])) {
                        return true;
                    }
                }
            }
            
            return false;
        }
        
        searchTree(root);
        
        if (foundNode) {
            // Expand all parent nodes
            let current = foundNode;
            while (current.parent) {
                if (current.parent._children) {
                    current.parent.children = current.parent._children;
                    current.parent._children = null;
                }
                current = current.parent;
            }
            
            // Update the visualization
            update(root);
            
            // Show info panel for found node
            infoTitle.textContent = foundNode.data.name;
            
            let content = `<p>${foundNode.data.description || 'No description available.'}</p>`;
            
            // Add children list if available
            if (foundNode._children) {
                content += '<h3>Subtopics:</h3><ul>';
                foundNode._children.forEach(child => {
                    content += `<li>${child.data.name}</li>`;
                });
                content += '</ul>';
            }
            
            infoContent.innerHTML = content;
            infoPanel.classList.add('active');
        }
    }
    
    // Initialize the visualization
    update(root);
    
    // Add zoom functionality
    const zoom = d3.zoom()
        .scaleExtent([0.5, 2])
        .on('zoom', (event) => {
            svg.attr('transform', event.transform);
        });
    
    d3.select('svg').call(zoom);
});
