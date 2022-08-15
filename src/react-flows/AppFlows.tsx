import React, { useCallback } from 'react';
import ReactFlow, { addEdge, ConnectionLineType, useNodesState, useEdgesState } from 'react-flow-renderer';
import '../react-flows/AppFlows.css'

const dagre = require('dagre')

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 100;

const getLayoutedElements = (nodes: any, edges: any, direction = 'LR') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node: any) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge: any) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node: any) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? 'left' : 'top';
        node.sourcePosition = isHorizontal ? 'right' : 'bottom';
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
};


const OverviewFlow = ({ initialNodes, initialEdges }: { initialNodes: any, initialEdges: any }) => {

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges
    );

    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
    console.log(nodes, edges)
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)),
        []
    );
    const onLayout = useCallback(
        (direction: any) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                nodes,
                edges,
                direction
            );

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges]
    );

    return (
        <div className="layoutflow">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
            />
            <div className="controls">
                <button style={{ padding: '8px', border: '1px solid #EBEBEB', backgroundColor: '#FBFBFB', cursor: 'pointer' }} onClick={() => onLayout('TB')}>vertical layout</button>
                <button style={{ padding: '8px', border: '1px solid #EBEBEB', backgroundColor: '#FBFBFB', cursor: 'pointer' }} onClick={() => onLayout('LR')}>horizontal layout</button>
            </div>
        </div>
    );
};

export default OverviewFlow;
