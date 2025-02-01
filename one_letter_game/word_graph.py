from utils import graph


class Word(graph.Node):
    def __init__(self, word: str):
        super().__init__()
        self.word = word

    def __repr__(self):
        return f"Word['{self.word}']"


def should_create_edge(word1: str, word2: str) -> bool:
    counter = 0 # counts the number of letters that are the same in both words
    if len(word1) != len(word2):
        # First need to check if the words are the same length.
        # In this version, words of different lengths can't be connected.
        return False
    for i in range(len(word1)):
        if word2[i] == word1[i]:
            counter += 1
    if len(word1) - counter == 1:
        # If there is only one letter that is different between the two words,
        # an edge should be created.
        return True
    # Else:
    return False

def create_graph(words: list[str]) -> graph.Graph:
    '''
    Creates a graph with the words given.

    @params:
        words - A list of all of the words that should be added to the
                new graph. To make the function easier to call, the words
                are strings and not Word objects.
    
    @returns:
        A graph with the words received.
    '''

    g = graph.Graph()
    for word in words:
        # Converts the str to a Word object and adds it to the graph.
        g.nodes.append(Word(word))
        for i in range(len(g.nodes)-1):
            # Goes over all of the words that are already in the graph
            # and creates an edge if needed.
            if should_create_edge(word, g.nodes[i].word):
                g.create_edge(g.nodes[-1], g.nodes[i])
    return g

def find_word_in_graph(graph: graph.Graph, word_str: str) -> Word:
    '''Finds a Word object correlating to a string given.'''
    for word in graph.nodes:
        if word.word == word_str:
            return word
    
    # If the function reaches here, it means word_str doesn't have
    # a correlating Word object in the graph.
    raise ValueError(f"String '{word_str}' is not a real word.")

def find_path(graph: graph.Graph, start: str, end: str) -> list[str]:
    # TODO: return the path and not just bool
    start = find_word_in_graph(graph, start)
    end = find_word_in_graph(graph, end)
    queue: list[tuple[Word, Word]] = [(start, "start")]
    visited = {}
    current: Word = ...
    while current != end and queue != []:
        current, previous = queue.pop(0)
        if current in visited:
            continue

        visited[current] = previous
        for neighbor in current.neighbors:
            if neighbor in visited:
                continue
            queue.append((neighbor, current))
    if current != end:
        return []
    path = []
    while current != start:
        path.append(current.word)
        current = visited[current]
    path.append(start.word)
    return path[::-1]