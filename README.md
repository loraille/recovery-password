
# RECOVERY PASSWORD
## Description
RECOVERY PASSWORD permet de changer de password après la perte ou oubli de celui ci,grâce à 3 écrans simples.  
La techno utilisée est react native et express. 
Pour la gestion du mail , Mailjet est utilisé tout auter service devrait pouvoir fonctionner, il faudra installer 
les dépendances en fonction.

## installation
-Création de deux collections sur mongo db
 1. tokens
 2. users

-Côté backend et frontend
```bash
  yarn install
```

### Backend
-Création à la racine du backend un fichier .env

```bash
CONNECTION_STRING='your mongodb adress'
API_KEY='your mailjet API_KEY'
API_SECRET='your mailjet secret API_KEY'
EMAIL_USER='your adress'
```
-Démarrage du serveur
```bash
nodemon
```
### Frontend
-Création à la racine, d'un dossier modules avec dedans un fichier var.js contenant la variable de l'adresse du backend
```bash
const urlBackend = 'url du backend';
export { urlBackend };
```
## Demo

<div style="display: flex;">
  <img src="https://github.com/loraille/recovery-password/blob/1848ba0b75bbead29c40246f739c07812cc36a07/frontend/pass-recovery%20(1).jpg" alt="page1" width="150">
  <img src="https://github.com/loraille/recovery-password/blob/1848ba0b75bbead29c40246f739c07812cc36a07/frontend/pass-recovery%20(2).jpg" alt="page2" width="150">
  <img src="https://github.com/loraille/recovery-password/blob/1848ba0b75bbead29c40246f739c07812cc36a07/frontend/pass-recovery%20(3).jpg" alt="page3" width="150">
</div>

