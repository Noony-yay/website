import string
from one_letter_game import word_graph
from utils import graph


def main():
    while True:
        print("\nEnter 'exit game' to exit.")
        print("Enter 'show furthest' to show the two furthest words in the English language.")
        word1 = input("Type the starting word > ")
        if word1 == "exit game":
            return
        if word1 == "show furthest":
            print("Loading - this may take around 2 minutes.")
            words = open("one_letter_game/words.txt").read().split()
            words = [
                word for word in words 
                if all(c in string.ascii_lowercase for c in word)
            ]
            g = word_graph.create_graph(words)
            endpoint1, endpoint2, dist = word_graph.find_two_furthest_words(g)
            print(f"The two words furthest away from each other are {endpoint1} and {endpoint2}. The distance between them is {dist}.")
            continue

        word2 = input("Type the finish word > ")

        if len(word1) != len(word2):
            print("Oops! Words given have different lengths.")
            continue

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