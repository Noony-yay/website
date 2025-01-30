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


if __name__ == "__main__":
    pytest.main()
