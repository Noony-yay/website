max = 0

for n1 in range(100, 1000):
    for n2 in range(100, 1000):
        product = n1*n2
        str_product = str(product)
        # print(product, product[len(product)::-1])
        if str_product == str_product[len(str_product)::-1]:
            if product > max:
                max = product

print(max)