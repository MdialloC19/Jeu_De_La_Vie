# Jeu de la Vie de Conway

Le Jeu de la Vie est un modèle mathématique de système autonome découvert par le mathématicien John Conway en 1970. Ce jeu se déroule sur une grille bidimensionnelle infinie et évolue en fonction d'états initiaux donnés. Chaque état suivant dépend uniquement de l'état actuel, sans intervention directe du joueur.

## Fonctionnalités principales

### Grille interactive

La classe `Canva` offre une grille interactive où chaque cellule peut être cliquée pour modifier son état.

### Insertion de motifs

Des motifs prédéfinis peuvent être insérés dans la grille principale en cliquant sur des éléments spécifiques, donnant ainsi un état initial à la simulation.

### Animation du jeu

Le bouton _Play/Pause_ permet de démarrer ou d'arrêter l'évolution automatique des états. Le jeu évolue selon les règles établies par Conway.

### Personnalisation de la taille de la grille

La taille de la grille peut être modifiée à l'aide d'une entrée spécifique, permettant des configurations variées pour le jeu.

### Vitesse de l'évolution

La vitesse de l'évolution automatique peut être ajustée grâce à un curseur dédié.

### Fonctionnalités complémentaires

Des fonctions pour réinitialiser la grille, exécuter une seule étape à la fois et afficher des informations supplémentaires sont également disponibles.

## Utilisation

### Installation

Le projet ne nécessite aucune installation particulière. Il peut être exécuté dans un navigateur web compatible avec les fonctionnalités ES6.

### Instructions

1. Ouvrez le fichier `index.html` dans un navigateur web.
2. Utilisez les boutons et les options de l'interface pour interagir avec la simulation.

### Exemple de code

```javascript
// Initialisation d'une grille interactive
const canva = new Canva("canvas", 100 * 25, 50 * 25, 25);

// Insertion d'un motif dans la grille
insert.addEventListener("click", (e) => {
  dropMatrix = tableauMatrix[e.target.id];
  isDroping = true;
});

// Actions sur la grille
canva.canvas.addEventListener("click", (e) => {
  // Votre code pour gérer les interactions avec la grille
});
```
