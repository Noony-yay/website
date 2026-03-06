from dataclasses import dataclass
from enum import Enum
from typing import Union


class TokenType(Enum):
    NUMBER = 0
    PLUS_OR_MINUS = 1
    TIMES_OR_DIVIDE = 2
    LEFT_PARENTHESIS = 3
    RIGHT_PARENTHESIS = 4


@dataclass
class Token:
    '''Smallest lexical unit.'''
    token_type: TokenType
    value: Union[int, str]



def lexer(input: str) -> list[Token]:
    tokens: list[Token] = []
    pos = 0

    while pos < len(input):

        if input[pos] == "+" or input[pos] == "-":
            tokens.append(Token(TokenType.PLUS_OR_MINUS, input[pos]))
        elif input[pos] == "*" or input[pos] == "/":
            tokens.append(Token(TokenType.TIMES_OR_DIVIDE, input[pos]))
        elif input[pos] == "(":
            tokens.append(Token(TokenType.LEFT_PARENTHESIS, input[pos]))
        elif input[pos] == ")":
            tokens.append(Token(TokenType.RIGHT_PARENTHESIS, input[pos]))
        elif input[pos].isdigit():
            start_pos = pos
            while pos < len(input) and input[pos].isdigit():
                pos += 1
            tokens.append(Token(TokenType.NUMBER, int(input[start_pos:pos])))
            pos -= 1
        elif input[pos].isspace():
            pass
        else:
            raise SyntaxError(f"Invalid character {input[pos]} at position {pos}")

        pos += 1
    
    return tokens