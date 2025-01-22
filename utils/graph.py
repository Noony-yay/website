class Node:
    def __init__(self):
        self.neighbors: list["Node"] = []
        
    def __repr__(self):
        return f"Node[deg={self.degree()}]"
    
    def degree(self) -> int:
        return len(self.neighbors)
    

class Graph:
    def __init__(self):
        self.nodes: list[Node] = []
    
    def __str__(self) -> str:
        return str(self.nodes)

    def create_edge(self, node1: Node, node2: Node) -> None:
        if node1 not in self.nodes or node2 not in self.nodes:
            raise ValueError("Node not in Graph")
        if node1 in node2.neighbors or node2 in node1.neighbors:
            raise ValueError("Edge already exists")
        node1.neighbors.append(node2)
        node2.neighbors.append(node1)