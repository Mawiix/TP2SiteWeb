function verificationUsager()
{
    //On s'assure que la matricule est plus grande que 0
    if ($("#matricule").val() <= 0)
    {
        alert("Le numéro de matricule ne peut pas être 0 ou négatif");
    }
    //On s'assure que le nombre d'articles dans le panier soit égal ou plus grande que 0
    else if ($("#panier").val() < 0)
    {
        alert("Le nombre d'articles dans le panier ne peut être négatif!");
    }
    else
    {
        //On va ajouter les éléments dans le local storage
        //ajouter du code ici
    }
}
function livreUsager()
{
    //ajouter du code ici
}
function verificationLivre()
{
    //On veut un ISBN plus grand ou égal que 0
    if ($("#isbn").val() < 0)
    {
        alert("Le Code ISBN ne peut être négatif!");
    }
    //On veut un code barre de livre plus grand ou égal à 0
    else if ($("#code").val() < 0)
    {
        alert("Le code barre/numéro du livre ne peut être négatif!");
    }
    //On veut un nombre de page plus grand que 0
    else if ($("#page").val() <= 0)
    {
        alert("Le nombre de pages ne peut être négatif!");
    }
    else
    {
        //On va chercher les valeurs dans le formulaire et on les mets dans des variables pour un accès ultérieur
        var titre = $("#titre").val();
        var auteur = $("#auteur").val();
        var maison = $("#maison").val();
        var isbn = $("#isbn").val();
        
        var code = $("#code").val();
        var annee = $("#annee").val();
        var page = $("#page").val();
        var statut = $("#statut").val();

        //On crée un array livre qui va contenir les informations sur un livre
        var livre = [titre, auteur, maison, isbn, code, annee, page, statut];
        
        //On vérifie si le localStorage existe dans le navigateur
        if (typeof (Storage) !== "undefined") {
            //On ajoute 1 au nombres de livres (car on ajoute un livre)
            localStorage.setItem("nombreDeLivres", parseInt(localStorage.getItem("nombreDeLivres")) + 1);
            //on ajoute le livre à la variable (livre + noActuelDuLivreQu'onEstRendu) et on le "stringify" afin de pouvoir stocker un array.
            localStorage.setItem("livre" + localStorage.getItem("nombreDeLivres"), JSON.stringify(livre));
        }
    }
}
function lireLivre()
{
    //On crée un array pour tous les livres
    var livres = new Array();
    for(i = 1; i <= localStorage.getItem("nombreDeLivres"); i++)
    {
        //On va chercher un livre
        var livre = JSON.parse(localStorage["livre" + i]);
        //On le stock dans le tableau
        livres[i-1] = livre;
    }
    
    //On crée/on va chercher les élements pour créer la table
    var tableDiv = document.getElementById("livresBiblio");
    var table = document.getElementById("livres");
    var thead = document.createElement("THEAD");
    var tableBody = document.createElement("TBODY");

    //Le Header du tableau
    var header = ["Titre", "Auteur", "Maison", "ISBN", "Code", "Année", "Nombre de pages", "Status"];

    table.border = "1";
    table.appendChild(thead);
    table.appendChild(tableBody);

    var trH = document.createElement("TR");
    for (i = 0; i < header.length; i++) {
        var th = document.createElement("TH");
        th.appendChild(document.createTextNode(header[i]));
        trH.appendChild(th);
        thead.appendChild(trH);
    }

    for(i = 0; i < livres.length; i++)
    {
        var tr = document.createElement("TR");
        for(j = 0; j < livres[i].length; j++)
        {
            var td = document.createElement("TD");
            td.appendChild(document.createTextNode(livres[i][j]));
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }
    tableDiv.appendChild(table);
    //On utilise cette fonction pour pouvoir sorter le tableau
    $('#livres').tablesorter();
}
