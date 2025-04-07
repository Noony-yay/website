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
    '''Finds the shortest path between two given words using BFS.
    
    @returns:
        Path between start and end words as a list of strings.
        Empty list if end is not reachable.
    '''

    # Converting the words (given as strings) to Word objects
    start = find_word_in_graph(graph, start)
    end = find_word_in_graph(graph, end)

    queue: list[tuple[Word, Word]] = [(start, "start")]
    # Queue is going to look like this: [(word, word it came from), ...].

    visited = {}
    # Visited is going to look like this: {word: word it came from, ...}.
    
    current: Word = ...

    # If current is end: we reached the end word.
    # If queue is empty: we went through all the nodes we can reach and
    #                    didn't reach the end word, meaning it's not reachable.
    while current != end and queue != []:
        current, previous = queue.pop(0)
        if current in visited:
            # Means we already found a faster way to reach it and we don't
            # want to overrun it.
            continue
        visited[current] = previous

        for neighbor in current.neighbors:
            if neighbor in visited:
                # Means there is a faster way to reach it.
                continue
            queue.append((neighbor, current))
    
    if current != end:
        # Means we couldn't find a way to reach end.
        return []
    
    # Finding the path using the dictionary visited
    path = []
    while current != start:
        path.append(current.word)
        current = visited[current]
    path.append(start.word)
    
    # Because we go from the end to the start, the list will be reversed.
    # For convenience, we reverse it back before returning.
    return path[::-1]

def find_furthest_word(start_word: Word) -> tuple[Word, int, set[Word]]:
    '''
    Finds the word furthest away from the given word.

    @returns: a tuple containing the word furthest away,
              its distance from the starting word,
              and the set of words that are connected to start_word.
    '''
    
    queue: list[tuple[Word, int]] = [(start_word, 0)]
    # Queue is going to look like this: [(word, distance from start_word)]

    visited: set[Word] = set()

    current: Word = ...
    cur_dist: int = ...

    while queue != []:
        current, cur_dist = queue.pop(0)
        visited.add(current)
        for neighbor in current.neighbors:
            if neighbor in visited:
                continue
            queue.append((neighbor, cur_dist+1))
    
    return (current, cur_dist, visited)

def find_two_furthest_words(g: graph.Graph) -> tuple[Word, Word, int]:
    '''
    Finds the two words furthest away from each other in the entire graph.

    @returns: a tuple containing the two furthest words and the distance
              between them.
    '''

    visited: set[Word] = set()
    max_dist = -1
    furthest_words: tuple[Word, Word] = ...

    while len(visited) != len(g.nodes):
        for start in g.nodes:
            if start not in visited:
                break

        first_endpoint, _, current_visited = find_furthest_word(start)
        second_endpoint, dist, _ = find_furthest_word(first_endpoint)

        visited.update(current_visited)

        if dist > max_dist:
            max_dist = dist
            furthest_words = (first_endpoint, second_endpoint)
            print(f"Found new best: {max_dist=}, {furthest_words=}")
    
    return (furthest_words[0], furthest_words[1], max_dist)
