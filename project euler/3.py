import math

num = 600851475143

def find_factor(n):
    for i in range(2, n+1):
        if n % i == 0:
            return i

while num != 1:
    p = find_factor(num)
    print(p)
    num = num//p
