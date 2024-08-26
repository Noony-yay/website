import numpy as np
import random
import matplotlib.pyplot as plt
gova = 150
rohav = 150
a = np.zeros((gova,rohav),dtype=np.int32)
# נשאר הרבה זמן
# a[19,22] = 1
# a[20,16] = 1
# a[20,17] = 1
# a[21,17] = 1
# a[21,21] = 1
# a[21,22] = 1
# a[21,23] = 1

# דאון
# a[4,5] = 1
# a[5,6] = 1
# a[6,4] = 1
# a[6,5] = 1
# a[6,6] = 1

#בלוט
# a[59,89] = 1
# a[60,91] = 1
# a[61,88] = 1
# a[61,89] = 1
# a[61,92:95] = 1

#רובה דאונים אינסופי
a[70,84] = 1
a[71,82] = 1
a[71,84] = 1
a[72,72] = 1
a[72,73] = 1
a[72:75,80:82] = 1
a[72:74,94:96] = 1
a[75,82] = 1
a[75,84] = 1
a[76,84] = 1
a[73,71] = 1
a[73,75] = 1
a[74:76,60:62] = 1
a[74:77,70] = 1
a[74:77,76] = 1
a[75,74] = 1
a[75,77] = 1
a[76,76] = 1
a[77,71] = 1
a[77,75] = 1
a[78,72] = 1
a[78,73] = 1

#סולל
# a[73,77] = 1
# a[72:75,76] = 1
# a[73:76,74] = 1
# a[76,72] = 1
# a[77,72] = 1
# a[77,70] = 1

#אקראי
# for i in range(gova*10):
#     tY = random.randint(1,gova-1)
#     tX = random.randint(1,rohav-1)
#     a[tY,tX] = 1

#קטן סימטרי נמשך אינסף
# a[75,60:68] = 1
# a[75,69:74] = 1
# a[75,77:80] = 1
# a[75,86:93] = 1
# a[75,94:99] = 1





plt.ion()
for ensofi in range(1000):
    plt.clf()
    plt.imshow(a)
    plt.pause(0.01)

    b = np.zeros((gova,rohav),dtype=np.int32)
    for iY in range (1,gova-1):
        for iX in range(1,rohav-1):
            dolkim = a[iY-1,iX-1] + a[iY,iX-1] + a[iY+1,iX-1] + a[iY+1,iX] + a[iY+1,iX+1] + a[iY,iX+1] + a[iY-1,iX+1] + a[iY-1,iX]
            if a[iY,iX] == 1:
                if dolkim == 2 or dolkim == 3:
                    b[iY,iX] = 1
            if a[iY,iX] == 0 and dolkim == 3:
                b[iY,iX] = 1
    a = b