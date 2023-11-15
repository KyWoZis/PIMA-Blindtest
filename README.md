# PIMA-Blindtest
Groupe 4

# Projet

Notre projet consiste en un site web permettant de faire des Blindtest en multijoueur

# Installation 

Il faut installer node pour pouvoir run le projet

Après avoir clone le projet, faire `npm install`

Il faut configurer une base de donnée en local pour pouvoir run le projet, l'installation dépend de votre OS.
Récupérer les données de connexion à la DB une fois setup, cela servira pour ce qui suit.

Il faut configurer un fichier .env, un template se trouve dans le fichier **.env.example** à remplir avec les données de la DB SQL
Un fichier template.sql indique ce qu'il faut setup dans la base de donnée SQL pour pouvoir permettre au site de fonctionner. (Les tables nécessaires)

Après ça, la commande `npm run devstart` est censée run le projet.