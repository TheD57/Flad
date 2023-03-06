<div align = center>

![Image de l'application](doc/Images/Banner_App.png)

</div>

**Nom de l’application** : FLAD :musical_note:
</br>

**Thème de l’application** :  Réseau social cross-plateforme dans le thème de la musique destiné aux utilisateurs d'appareils mobiles.
</br>

**Contexte** : 👇
</br>

:information_source: Ce projet est un travail universitaire pour la deuxième année du B.U.T Informatique de Clermont-Ferrand. 

## Répartition du Gitlab

La racine de notre gitlab est composée de deux dossiers essentiels au projet:

[**src**](src) : **Toute la partie codage de l'application web**

[**doc**](doc) : **Documentation de l'application**

## Fonctionnement

- ### Comment lancer le projet ? 

Tout d'abord si ce n'est pas fait cloner le dépôt de la branche **master/main**, pour cela copier le lien URL du dépôt git :

<div align = center>

![Comment cloner](doc/Images/HowToClone.png)

</div>

Puis, dans un terminal dans le répertoire que vous souhaiter taper la commande : **git clone https://codefirst.iut.uca.fr/git/FLAD_Dev/FLAD.git**

Ensuite dans un terminal, assurer vous que vous possédez node.js, pour cela il existe la commande : **npm -v**


:information_source: *Si vous ne disposez pas de node.js, allé sur le site [Download Node.js](https://nodejs.org/en/download/) pour pouvoir le télécharger, vous pouvez aussi utiliser nvm qui est un outil de gestion des versions de Node.js sur votre appareil, pour en savoir plus il existe le site [Guide NVM](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) !!!*
<br>

Pour la suite, il suffit seulement de vérifier que node.js est à jour et installer le client expo-cli via la commande : **npm install expo-cli** 

Maintenant vous pouvez à tout moment lancer l'application grâce à la commande : **npx expo start :sunglasses:**
<br>
:information_source: *Cliquer sur la touche 'w' si vous voulez le visualiser sur un navigateur (ce que je ne conseille pas) ou installer l'application 'Expo go' de votre téléphone et scanner le QR code proposer pour le visualiser (à noter que l'ordinateur dans lequel il se voit lancer doit être dans le même réseau local que votre téléphone)*

- ### Comment le lancer à partir de l'iut d'Aubière ?

Cela est un peu plus difficile mais faisable !!!
<br>
Tout d'abord aller dans votre compte scratch : **cd home/scratch/compte**

Puis récupérer votre adresse IP via la commande : **echo $http_proxy**

Exemple : http://193.49.118.36:8080

Maintenant aller dans le fichier ~/.npmrc (**vim ~/.npmrc**) et noter les informations suivantes (bien entendu remplacer l'IP ci-dessous par l'IP que vous avez récupérer juste avant) :

``` bash
proxy=http://193.49.118.36:8080
http_proxy=http://193.49.118.36:8080
https_proxy=http://193.49.118.36:8080
cache=/home/scratch/compte/npmcache
```

Puis installer le client expo-cli via la commande : **npm install expo-cli**

Et entrer la commande : **export NODE_OPTIONS=--openssl-legacy-provider**

Maintenant vous pouvez à tout moment lancer l'application grâce à la commande : **npx expo start :sunglasses:**
<br>
:information_source: *Cliquer sur la touche 'w' si vous voulez le visualiser sur un navigateur (ce que je ne conseille pas) ou installer l'application 'Expo go' de votre téléphone et scanner le QR code proposer pour le visualiser (à noter que l'ordinateur dans lequel il se voit lancer doit être dans le même réseau local que votre téléphone)*


## Environnement de Travail

Notre environnement de travail se base sur plusieurs outils et langages :👇

<div align = center>

---

&nbsp; ![React Native](https://img.shields.io/badge/React%20Native-000?style=for-the-badge&logo=react&logoColor=white&color=lightblue&textColor=white)
&nbsp; ![TypeScript](https://img.shields.io/badge/TypeScript-000?style=for-the-badge&logo=typescript&logoColor=white&color=blue)
&nbsp; ![JavaScript](https://img.shields.io/badge/JavaScript-000?style=for-the-badge&logo=javascript&logoColor=white&color=yellow)

---

</div>

## Deploiement
- [x] &nbsp; ![IOS](https://img.shields.io/badge/IOS-000?style=for-the-badge&logo=apple&logoColor=black&color=white)
- [x] &nbsp; ![Android](https://img.shields.io/badge/Android-000?style=for-the-badge&logo=android&logoColor=white&color=green)


## Technicien en charge de l'application

La composition pour le projet se voit réaliser par deux élèves de l'IUT d'Aubière:
<br>
⚙️ Emre KARTAL
<br>
⚙️ David D'ALMEIDA

<div align = center>
© PM2 (Projet inspiré par nos très chers développeurs de la Dafl Team (S.O les Dafl dev))
</div>
