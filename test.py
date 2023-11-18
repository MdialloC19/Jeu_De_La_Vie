import numpy as np
import copy
parcours=((-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1))
def tour(matrice):
  cass=copy.deepcopy(matrice)
  for i in range(len(matrice)):
    for j in range(len(matrice[0])):
      cpt=0
      for dl,dc in parcours:
        l,c=i+dl,j+dc
        if(0<=l<len(matrice) and 0<=c<len(matrice[0])):
          cpt+=matrice[l][c]
      if(matrice[i][j]==1 and  cpt!=2 and cpt!=3):
        cass[i][j]=0
      if(matrice[i][j]==0 and cpt==3):
        cass[i][j]=1
  return cass
 
cases=np.array([[0,0,0],[1,1,1],[0,0,0]])
print(tour(cases))

