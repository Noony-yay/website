num = 20

def can_divide(n):
    for i in range(1, 21):
        if n % i != 0:
            return False
    return True

while not can_divide(num):
    num +=1

print(num)