sum = 0
previous_num = 1
num = 2
while num < 4000001:
    if num % 2 == 0:
        sum += num
    next_num = num + previous_num
    previous_num = num
    num = next_num
print(sum)