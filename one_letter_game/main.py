import string
from one_letter_game import word_graph
from utils import graph


def main():
    while True:
        word1 = input("Type the starting word > ")
        word2 = input("Type the finish word > ")

        if len(word1) != len(word2):
            print("Oops! Words given have different lengths.")
            continue
        if word1 == "exit" or word2 == "exit":
            return

        words = open("one_letter_game/words.txt").read().split()
        words = [
            word for word in words 
            if all(c in string.ascii_lowercase for c in word)
        ]
        words = [word for word in words if len(word) == len(word1)]
        
        g = word_graph.create_graph(words)

        path = word_graph.find_path(g, word1, word2)
        if path == []:
            print("Couldn't find path.")
            continue
        print(f"Found {len(path)}-steps path!")
        print(" --> ".join(path))


if __name__ == "__main__":
    main()