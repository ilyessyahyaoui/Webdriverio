@echo off
echo Installation des dépendances...

echo Exécution des tests...
npx wdio wdio.conf.js --suite feature1
npx wdio wdio.conf.js --suite feature3
npx wdio wdio.conf.js --suite feature2
