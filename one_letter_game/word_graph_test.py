import pytest

from one_letter_game import word_graph

def test_should_create_edge():
    assert not word_graph.should_create_edge("dog", "cat")
    assert word_graph.should_create_edge("dog", "cog")
    assert not word_graph.should_create_edge("cat", "cog")
    assert not word_graph.should_create_edge("dog", "doge")

# TODO: continue
def test_create_graph():
    g = word_graph.create_graph(["cat", "cot", "dog"])
    assert len(g.nodes) == 3
    assert g.nodes[0].is_neighbor(g.nodes[1])
    assert not g.nodes[2].is_neighbor(g.nodes[0])

def test_find_furthest_word():
    g = word_graph.create_graph(["dog", "cot", "cog"])
    dog = word_graph.find_word_in_graph(g, "dog")
    furthest_word, dist, visited = word_graph.find_furthest_word(dog)
    assert furthest_word.word == "cot"
    assert dist == 2
    assert len(visited) == 3

def test_find_two_furthest_words():
    g = word_graph.create_graph(["dog", "cot", "cog", "hot"])
    dog = word_graph.find_word_in_graph(g, "dog")
    hot = word_graph.find_word_in_graph(g, "hot")
    endpoint1, endpoint2, dist =  word_graph.find_two_furthest_words(g)
    assert ((endpoint1, endpoint2, dist) == (dog, hot, 3) or 
            (endpoint1, endpoint2, dist) == (hot, dog, 3))
    
def test_find_two_furthest_words_with_disconnected_words():
    g = word_graph.create_graph(["hello", "dog", "cot", "cog", "hot"])
    dog = word_graph.find_word_in_graph(g, "dog")
    hot = word_graph.find_word_in_graph(g, "hot")
    endpoint1, endpoint2, dist =  word_graph.find_two_furthest_words(g)
    assert ((endpoint1, endpoint2, dist) == (dog, hot, 3) or 
            (endpoint1, endpoint2, dist) == (hot, dog, 3))


if __name__ == "__main__":
    pytest.main()
