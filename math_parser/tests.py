import unittest
import main

class LexerTest(unittest.TestCase):
    def test_simple_add(self):
        tokens = main.lexer("1+3")
        excepted_tokens = [main.Token(main.TokenType.NUMBER, 1),
                           main.Token(main.TokenType.PLUS_OR_MINUS, "+"),
                           main.Token(main.TokenType.NUMBER, 3)]
        self.assertEqual(tokens, excepted_tokens)
    
    def test_multiple_digits(self):
        tokens = main.lexer("13+345")
        excepted_tokens = [main.Token(main.TokenType.NUMBER, 13),
                           main.Token(main.TokenType.PLUS_OR_MINUS, "+"),
                           main.Token(main.TokenType.NUMBER, 345)]
        self.assertEqual(tokens, excepted_tokens)

    def test_spaces(self):
        tokens = main.lexer("13 - 345")
        excepted_tokens = [main.Token(main.TokenType.NUMBER, 13),
                           main.Token(main.TokenType.PLUS_OR_MINUS, "-"),
                           main.Token(main.TokenType.NUMBER, 345)]
        self.assertEqual(tokens, excepted_tokens)

    def test_invalid_character(self):
        with self.assertRaises(SyntaxError):
            main.lexer("13 - b 345")


if __name__ == "__main__":
    unittest.main()
