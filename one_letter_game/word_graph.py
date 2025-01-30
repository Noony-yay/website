from utils import graph


class Word(graph.Node):
    def __init__(self, word: str):
        super().__init__()
        self.word = word

    def __repr__(self):
        return f"Word['{self.word}']"


def should_create_edge(word1: str, word2: str) -> bool:
    counter = 0
    if len(word1) != len(word2):
        return False
    for i in range(len(word1)):
        if word2[i] == word1[i]:
            counter += 1
    if len(word1) - counter == 1:
        return True
    return False

def create_graph(words: list[str]) -> graph.Graph:
    g = graph.Graph()
    for word in words:
        g.nodes.append(Word(word))
        for i in range(len(g.nodes)-1):
            if should_create_edge(word, g.nodes[i].word):
                g.create_edge(g.nodes[-1], g.nodes[i])
    return g

def find_word_in_graph(graph: graph.Graph, word_str: str) -> Word:
    for word in graph.nodes:
        if word.word == word_str:
            return word
    raise ValueError(f"String '{word_str}' is not a real word.")

def find_path(graph: graph.Graph, start: str, end: str) -> bool:
    # TODO: return the path and not just bool
    start = find_word_in_graph(graph, start)
    end = find_word_in_graph(graph, end)
    queue: list[Word] = [start]
    visited: set[Word] = set()
    current: Word = ...
    while current != end and queue != []:
        current = queue.pop(0)
        visited.add(current)
        for neighbor in current.neighbors:
            if neighbor in visited:
                continue
            queue.append(neighbor)
    if current == end:
        return True
    return False