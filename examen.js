//declaration des variables globales

jQuery.noConflict();
var classes = [];
var eleves = [];
var updateKey;
var updateEleveKey
var etablissementUpdateKey
var displayed = false;
var searchKey = "";
var etablissementKey = "";
var eleveKey = "";
let name = [];
var updateVal = false;
var updateValPrec = false;
var updateValClasse = false;
var updateValEleve = false;
// ecoute de la fermeture des modals
jQuery("#modalEtablissement").on("hidden.bs.modal", function () {
    updateVal = false
});
jQuery("#modalClasse").on("hidden.bs.modal", function () {
    updateValPrec = false
});
jQuery("#modalEleve").on("hidden.bs.modal", function () {
    updateValEleve = false 
});
//fonction d'injection des formulaires
function listen() {
    
    //evenement lors du click sur le bouton d'ajout des etablissements
    $("#addEstablishmentBtn").click(function () {
       
        classes = [];
        $("#titreModifierEtablissemnt").hide();
        $("titreAjouterEtablissement").show();
        $("#formEtablissement").html("");
        $("newItemEtablissement").hide();
        $("#formEtablissement").append(` 
    <form  id="newItemForm" novalidate >
    <div class="form-group">
        <label for="inputNomEtablissement">Nom Etablissement</label>
        <div  id="validNomEtablissement" class="text-danger">
        Entrez entrez le nom de l'eatblissement
    </div>
        <input type="text" class="form-control" id="inputNomEtablissement" placeholder="Entrez le nom de l'etablissement"
        required  />     
    </div>
    <div class="form-group" >
        <label for="inputQuartierEtablissement">Quartier</label>
        <div id="validQuartier" class="text-danger">
        Entrez le nom du quartier
        </div>
        <input  class="form-control" id="inputQuartierEtablissement" placeholder="Entrez le quartier"
        required/>       
    </div>
    <div class="form-group" >
    <label for="DateEtablissement">Date de creation</label>
    <div id="validDate" class="text-danger">
    Entrez la date de creation de l'etablissement
    </div>
    <input type="date"  class="form-control" id="inputDateEtablissement" placeholder="Entrez la date de creation de l'etablissement"
    required/>       
</div>
    <div class="container-fluid mb-5">
    <div class="row mt-5">
        <div class="col-1"></div>
        <div class="col-12"><button type="button" class="btn btn-success rounded"
            <button type="button" class="btn btn-success rounded" data-toggle="modal" data-target="#modalClasse" id="addClasse">
            + Ajouter une classe
            </button>
            </div>
        <div class="col-2"></div>
    </div>
    <div class="row">
        <div class="col-1"> </div>
        <div id="list_section" class="col-12    bg-white  p-3 ">
        <table class="table table-striped table-hover" id="classeTable">
        <thead>
            <tr>
                <th class="update col-1 " id="numberprec"> </th>
                <th id="premier">Nom classe</th>
                <th>Filiere</th>
                <th>Professeur titulaire</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="tbodyClasse" class=bg-light></tbody>
    </table> 
            </table>
            <div class="row bg-light" id="messageClasse">
                <div class="col-5"> </div>
                <div col-2>
                    <p class="position-center mt-3 milieu"> Liste vide </p> 
                </div>
                <div class="class-5"> </div>
            </div>
        </div>
        <div class="col-1"></div>
    </div>
</div>
    <input id="saveEtablissement" type="button" value="Enregistrer" class="btn btn-success" />
    </form>
  
`);
        $("#validNomEtablissement").hide();
        $("#validQuartier").hide();
        $("#validDate").hide();
        enregistrement()//enregistrement des etablissements
        enregistrementEleve()//enregistrement des classes
        

        //evenement lors du click sur le bouton s'ajout des classes
        $("#addClasse").click(function () {
            eleves = [];
            $("#formClasse").html("");
            $("#newItemClasse").hide();
            $("#formClasse").append(`<form  id="newItemForm" novalidate >
            <div class="col-md-12 mb-3">
                <label for="nomClasse">Nom de la classe</label>
                <div  id="validNomClasse" class="text-danger">
                Entrez entrez le nom de la classe
            </div>
                <input type="text" class="form-control" id="nomClasse" placeholder="Entrez le nom de la classe"
                required  />     
            </div>
            <div class="col-md-12 mb-3" >
                <label for="filiere">Filiere</label>
                <div id="validFiliere" class="text-danger">
                Entrez la filiere
                </div>
                <input  class="form-control" id="filiere" placeholder="Entrez la filiere"
                required/>       
            </div>
            <div class="col-md-12 mb-3" >
                <label for="profTitulaire">Prof titulaire </label>
                <div id="validProfTitulaire" class="text-danger">
                Entrez le nom du prof titulaire 
                </div>
                <input  class="form-control" id="profTitulaire" placeholder="Entrez le nom du prof titulaire"
                required/>      
            </div>
            <div class="container-fluid mb-5">
        <div class="row mt-5">
            <div class="col-1"></div>
            <div class="col-12">
                <button type="button" class="btn btn-success rounded" data-toggle="modal" data-target="#modalEleve" id="addEleve">
                + Ajouter un eleve
                </button>
                </div>
            <div class="col-2"></div>
        </div>
        <div class="row">
            <div class="col-1"> </div>
            <div id="list_section" class="col-12    bg-white  p-3 ">
            <table class="table table-striped table-hover" id="EleveTable">
            <thead>
                <tr>
                    <th class="update col-1 " id="number"> </th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Date de naissance</th>
                    <th>Sexe</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="tbodyEleve" class=bg-light"></tbody>
        </table> 
            
                <div class="row bg-light" id="messageEleve">
                    <div class="col-5"> </div>
                    <div class="col-2">
                        <p class="position-center mt-3 milieu"> Liste vide </p> 
                    </div>
                    <div class="col-5"> </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
        </div>
            
            <input id="saveClasse" value="Enregistrer" type="button" class="btn btn-success"/>
            </form> `);
            $("#titreModifierClasse").hide();
            $("#titreAjouterClasse").show();
            $("#validNomClasse").hide();
            $("#validFiliere").hide();
            $("#validProfTitulaire").hide();
            enregistrementClasse();
            enregistrementEleve()
            
            //evenement lors du click sur le bouton s'ajout des eleves

            $("#addEleve").click(function(){
            $("#formEleve").html("");
            $("#formEleve").append(
                `<form  id="newItemForm" novalidate >
                <div class="col-md-12 mb-3">
                    <label for="nomEleve">Nom Eleve</label>
                    <div  id="validNomEleve" class="text-danger">
                    Entrez le nom de l'eleve
                </div>
                    <input type="text" class="form-control" id="nomEleve" placeholder="Entrez le nom de l'eleve"
                    required  />     
                </div>
                <div class="col-md-12 mb-3" >
                    <label for="prenomEleve">Prenom de l'eleve  </label>
                    <div id="validPrenom" class="text-danger">
                    Entrez le prenom de l'eleve
                    </div>
                    <input  class="form-control" id="prenomEleve" placeholder="Entrez le prenom de l'eleve"
                    required/>       
                </div>
                <div class="col-md-12 mb-3" >
                    <label for="dateNaissance">Date </label>
                    <div id="validNaissance" class="text-danger">
                    Entrez la date de naissance
                    </div>
                    <input type="date"  class="form-control" id="dateNaissance" placeholder="Entrez la date de naissance"
                    required/>      
                </div>
                <div class="col-md-12 mb-3" >
                    <label for="sexe">Sexe </label>
                    <div id="validSexe" class="text-danger">
                    Selectionnez le sexe
                    </div>
                    <select  class="form-control" id="sexe"
                    required>
                    <option selected disabled style="color: #c0c0c0;" value = "-- Choisissez le sexe --">-- Choisissez le sexe --</option>
                    <option value="Masculin" >Masculin</option>
                    <option value="Feminin">Feminin</option>
                    </select>      
                </div>
                <input type="button" id="saveEleve" value="Enregistrer" class="btn btn-success"/>
                </form> `
            );
            enregistrementEleve()
            enregistrementClasse()
            $("#titreModifierEleve").hide();
            $("#titreAjouterEleve").show();
            $("#validNomEleve").hide();
            $("#validPrenom").hide();
            $("#validNaissance").hide();
            $("#validSexe").hide();
            
            })
        });
        $("#validNomEtablissement").hide();
        $("#validQuartier").hide();
        $("#validDate").hide();
        $("#formSuppression").html("");
        $("#titreAjouterEtablissement").show();
        $("#titreModifierEtablissemnt").hide();
        $("#inputNomEtablissement").attr("value", "");
        $("#inputQuartierEtablissement").attr("value", "");
        $("#inputDateEtablissement").attr("value", "");
        $("#saveEtablissement").attr("value", "Enregistrer");
        var formEtablissement = $("#newItemForm");
    });
}


//fonction de validation pour le formulaire des eleves
function validationEleve(nb1, nb2, nb3, nb4){
    validEleve = true;
    if (nb1 == "") {
        $("#validNomEleve").show();
        validEleve = false;
      }
      if (nb2 == "") {
        $("#validPrenom").show();
        validEleve = false;
      }
      if (nb3 == "") {
        $("#validNaissance").show();
        validEleve = false;
      }
      
      if (nb4 == "-- Choisissez le sexe --") {
        $("#validSexe").show();
        validEleve = false;
      }
      return validEleve;
    
}

//fonction de validation pour la soumition du formulaire des eleves

function submitionEleve(){
    
    $("#titreModifierEleve").hide();
    $("#titreAjouterEleve").show();
    if (updateValEleve == false) {  ///
      var win = false;//doublon = win
      
      $("#tbodyEleve").html("");
      $("#messageEleve").hide();
      var tabEleve = []; // tabinput = tabEleve
      var nomEleve = $("#nomEleve").val();
      var prenom = $("#prenomEleve").val();
      var dateNaissance = $("#dateNaissance").val();
      var sexe = $("#sexe").find(":selected").text(); 
      
      for (item of eleves) {
        if (
          item[1] == nomEleve &&
          item[2] == prenom &&
          item[3] == dateNaissance &&
          item[4] == sexe
        ) {
          win = true;
          displayEleve(eleves);
          updateValEleve = false;
        }
      }
      if (win == false) {
        tabEleve.push(Math.random());
        tabEleve.push(nomEleve);
        tabEleve.push(prenom);
        tabEleve.push(dateNaissance);
        tabEleve.push(sexe);
        eleves.push(tabEleve);
        displayEleve(eleves);
      }
    } else if (updateValEleve) {

      var nomEleve = $("#nomEleve").val();
      var prenom = $("#prenomEleve").val();
      var dateNaissance = $("#dateNaissance").val();
      var sexe = $("#sexe").find(":selected").text();
      $("#saveEleve").attr("value", "Enregistrer");
      jQuery("#modalEleve").modal("hide");
      updateEleve(updateEleveKey, nomEleve, prenom, dateNaissance, sexe);
    }
}


// fontion pour l'affichage des eleves enregistres

function displayEleve(table){
  
    var pretEleve = false;
    $("#messageEleve").hide();
    if (table.length == 0) {
        $("#messageEleve").show();
    }
    $("#number").hide();
    $("#tbodyEleve").html("");
    var newTable = [];
    newTable = table;
   
    for (var item of newTable) {
        
        $("#tbodyEleve").append(
            `<tr class="newPrec">
                <td class=" col-1 saveEleve" >
                    ${item[0]}
                </td>
                <td class="col-4">
                    ${item[1]}
                </td>
                <td class="col-4">
                    ${item[2]}
                </td>
                <td class=" col-3" >
                    ${item[3]}
                <td class=" col-3" >
                    ${item[4]}
                </td>
                <td class="col-2 update">
                    <button type="button" class="btn btn-secondary rounded update updateEleve" data-toggle="modal" data-target="#modalEleve">
                        Modifier
                    </button>
                    <button type="button" class="btn btn-danger  delete deleteEleve" data-toggle="modal" data-target="#modalSuppression">
                        Supprimer
                    </button>
                </td>
            </tr>`
        );
        $(".saveEleve").hide();

        //evenement pour la suppression d'un eleve
        $(".deleteEleve").click(function (e) {
            $("#deleteButtonEtablissement").hide();
            $("#deleteButtonEleve").show();
            $("#deleteButtonClasse").hide();
            displayed = false;
            $("#formSuppression").html("");
            eleveKey = $(this).parents("tr").children().first().text();
            var eleveName = "";
            eleveName = searchEleveKey(eleveKey);
            $("#formSuppression").append(
                ' <p class="objectDelete">' +
                '<span class="font-weight-bold" i>' +
                " Nom de l'eleve:" +
                "</span> " +
                eleveName + " ?" +
                "</p>"
            );
            jQuery("#modalSuppression").modal("show");
            $("#deleteButtonEleve").click(function () {
                
                jQuery("#modalSuppression").modal("hide");
                $("#modalDelete").html("");
                deleteEleve();
                
            });
        });
        $("#modalEleve").on("hidden.bs.modal", function () {
            $("#modalEleve").css("margin", "auto");
            eleveKey = 0;
        });

        // evenement pour la modification d'un eleve
        $(".updateEleve").click(function (e) {
            var $val = $(this).parents("tr").children().first().text();
            
            $("#formEleve").html("");
           

            $("#formEleve").append(`<form  id="newItemForm" novalidate >
            <div class="col-md-12 mb-3">
                <label for="nomEleve">Nom Eleve</label>
                <div  id="validNomEleve" class="text-danger">
                Entrez le nom de l'eleve
            </div>
                <input type="text" class="form-control" id="nomEleve" placeholder="Entrez le nom de l'eleve"
                required  />     
            </div>
            <div class="col-md-12 mb-3" >
                <label for="prenomEleve">Prenom de l'eleve  </label>
                <div id="validPrenom" class="text-danger">
                Entrez le prenom de l'eleve
                </div>
                <input  class="form-control" id="prenomEleve" placeholder="Entrez le prenom de l'eleve"
                required/>       
            </div>
            <div class="col-md-12 mb-3" >
                <label for="dateNaissance">Date </label>
                <div id="validNaissance" class="text-danger">
                Entrez la date de naissance
                </div>
                <input type="date"  class="form-control" id="dateNaissance" placeholder="Entrez la date de naissance"
                required/>      
            </div>
            <div class="col-md-12 mb-3" >
                <label for="sexe">Sexe </label>
                <div id="validSexe" class="text-danger">
                Selectionnez le sexe
                </div>
                <select  class="form-control" id="sexe"
                    required>
                    <option selected disabled style="color: #c0c0c0;" value = "-- Choisissez le sexe --">-- Choisissez le sexe --</option>
                    <option value="Masculin" >Masculin</option>
                    <option value="Feminin">Feminin</option>
                </select>      
            </div>
            <input id="saveEleve" type="button" value="Enregistrer" class="btn btn-success"/>
            </form>`);
            $("#validNomEleve").hide();
            $("#validPrenom").hide();
            $("#validNaissance").hide();
            $("#validSexe").hide();
            updateValEleve = true;
            $("#titreAjouterEleve").hide();
            $("#titreModifierEleve").show();
            enregistrementEleve()
            updateEleveKey = $val;
            for (var tab of eleves) {
                if (tab[0] == updateEleveKey) {
                    $("#nomEleve").attr("value", tab[1]);
                    $("#prenomEleve").attr("value", tab[2]);

                    $("#dateNaissance").attr("value", tab[3]);
                    $("#sexe").val(tab[4]);
                    
                    // displayEleve(tab[4])
                }
            }
            $("#saveEleve").attr("value", "Modifier");
            enregistrementEleve()
            
        });
        pretEleve = true;
    }
    if (pretEleve) {
        jQuery("#modalEleve").modal("hide");
    }

}


// fonction pour mettre a jour un eleve
function updateEleve(eleveKey, nomEleve, prenom, naissance, sexe) {
    var index = searchUpdateEleve(eleveKey);
    var win = false;
    for (item of eleves) {
        
        if (
            item[1] == nomEleve &&
            item[2] == prenom &&
            item[3] == naissance &&
            item[4] == sexe
        ) {
            win = true;
            displayEleve(eleves);
            updateValEleve = false;
        }
    }
    if (win == false) {
        eleves[index][1] = nomEleve;
        eleves[index][2] = prenom;
        eleves[index][3] = naissance;
        eleves[index][4] = sexe;
        displayEleve(eleves);
        updateValEleve = false;
    }
}

//fonction de suppression d'un eleve
function deleteEleve() {
   
    if (eleveKey !== 0) {
        
        var newTab = searchEleve(eleveKey);
        $("#modalDelete").html("");
        eleves = newTab;
        displayEleve(newTab);
        
        
    }
}

//fonction pour la cle de recherche en vue de la modification d'un eleve

function searchUpdateEleve(eleveKey) {
    var n = 0;
    for (var item of eleves) {
        if (item[0] == eleveKey) {
            return n;
        }
        n++;
    }
}

//fonction pour la cle de recherche en vue de la suppression d'un eleve
function searchEleve(eleveKey) {
    var n = 0;
    for (var item of eleves) {
        if (item[0] == eleveKey) {
            eleves.splice(n, 1);
        } else {
            n++;
        }
    }
    return eleves;
}
function searchEleveKey(eleveKey) {
    for (var tab of eleves) {
        if (tab[0] == eleveKey) {
            return tab[1];
        }
    }
}

// partie Classe
//fonction pour la validation du formulaire de classe
function validationClasse(val1, val2, val3) {
    var validClasse = true;
    var newVal1 = val1;
    var newVal2 = val2;
    var newVal3 = val3;
    if (newVal1 == "") {
        $("#validNomClasse").show();
        validClasse = false;
    }
    if (newVal2 == "") {
        $("#validFiliere").show();
        validClasse = false;
    }
    if (newVal3 == "") {
        $("#validProfTitulaire").show();
        validClasse = false;
    }

    return validClasse;
}

//fonction pour la soumission du formulaire de classe
function submissionClasse(idEtablissement) {
    $("#titreModifierClasse").hide();
    $("#titreAjouterClasse").show();
    if (updateValPrec == false) {
        var doublon = false;
        $("#tbodyClasse").html("");
        $("#message").hide();
        var tabInput = [];
        var nomClasse = $("#nomClasse").val();
        var filiere = $("#filiere").val();
        var profTitulaire = $("#profTitulaire").val();

        for (let item of classes) {////
            if (
                item[1] == nomClasse &&
                item[2] == filiere &&
                item[3] == profTitulaire

            ) {
                
                doublon = true;
                
                displayClasse(classes);
                updateValPrec = false;
            }
        }
        if (doublon == false) {
            
            tabInput.push(Math.random());
            tabInput.push(nomClasse);
            tabInput.push(filiere);
            tabInput.push(profTitulaire);
            tabInput.push(eleves);
            classes.push(tabInput);
            displayClasse(classes);
        }
    } else if (updateValPrec) {
     
        var nomClasse = $("#nomClasse").val();
        var filiere = $("#filiere").val();
        var profTitulaire = $("#profTitulaire").val();
        $("#saveClasse").attr("value", "Enregistrer");
        jQuery("#modalClasse").modal("hide");
        updateClasse(updateKey, nomClasse, filiere, profTitulaire);
    }

}


//fonction pour l'affichage des classe
function displayClasse(table) {
    var isreadyPrec1 = false;
    $("#messageClasse").hide();
    if (table.length == 0) {
        $("#messageClasse").show();
    }
    $("#numberprec").hide();
    $("#tbodyClasse").html("");
    var newTable = [];
    newTable = table;
    for (var item of newTable) {
        $("#tbodyClasse").append(
            ' <tr class="newPrec">' +
            '<td class=" col-1 saveClasse" >' +
            item[0] +
            "</td>" +
            '<td class=" col-4 " >' +
            item[1] +
            "</td>" +
            '<td class=" col-4 " >' +
            item[2] +
            "</td>" +
            '<td class=" col-3" >' +
            item[3] +
            "</td>" +
            '<td class=" col-2 update " >' +
            '<button type="button" class="btn btn-secondary rounded update updateClasse " data-toggle="modal" data-target="#modalClasse" >' +
            "Modifier" +
            "</button>" +
            '<button type="button" class="btn btn-danger  delete deleteClasse" data-toggle="modal" data-target="#modalSuppression">' +
            "Supprimer" +
            "</button>" +
            "</td>" +
            "</tr>"
        );
        $(".saveClasse").hide();////////////
        $(".deleteClasse").click(function (e) {
            $("#deleteButtonEtablissement").hide();
            $("#deleteButtonEleve").hide();
            $("#deleteButtonClasse").show();
            displayed = false;
            $("#formSuppression").html("");
            etablissementKey = $(this).parents("tr").children().first().text();
            var classeName = ""
            classeName = searchClasseKey(etablissementKey);
            $("#formSuppression").append(
                ' <p class="objectDelete">' +
                '<span class="font-weight-bold" i>' +
                " Nom de la classe  :" +
                "</span> " +
                classeName +
                "</p>"
            );
            jQuery("#modalSuppression").modal("show");

            //evenement de suppression d'une classe
            $("#deleteButtonClasse").click(function () {
               
                jQuery("#modalSuppression").modal("hide");
                $("#modalDelete").html("");
                deleteClasse();
                
                
            });
        });
        $("#modalEtablissement").on("hidden.bs.modal", function () {
            $("#modalEtablissement").css("margin", "auto");
            etablissementKey = 0;
        });
        //evenement de mis a jour
        $(".updateClasse").click(function (e) {
            var $val = $(this).parents("tr").children().first().text();

            $("#formClasse").html("");
            //ajout du formualire
            $("#formClasse").append(` <form  id="newItemForm" novalidate >
        <div class="col-md-4 mb-3">
            <label for="nomClasse">Nom de la classe</label>
            <div  id="validNomClasse" class="text-danger">
            Entrez entrez le nom de la classe
        </div>
            <input type="text" class="form-control" id="nomClasse" placeholder="Entrez le nom de la classe"
            required  />     
        </div>
        <div class="col-md-4 mb-3" >
            <label for="filiere">Filiere</label>
            <div id="validFiliere" class="text-danger">
            Entrez la filiere
            </div>
            <input  class="form-control" id="filiere" placeholder="Entrez la filiere"
            required/>       
        </div>
        <div class="col-md-4 mb-3" >
            <label for="profTitulaire">Prof titulaire </label>
            <div id="validProfTitulaire" class="text-danger">
            Entrez le nom du prof titulaire 
            </div>
            <input  class="form-control" id="profTitulaire" placeholder="Entrez le nom du prof titulaire"
            required/>      
        </div>
        <div class="container-fluid mb-5">
    <div class="row mt-5">
        <div class="col-1"></div>
        <div class="col-12"><button type="button" class="btn btn-success rounded"
            <button type="button" class="btn btn-success rounded" data-toggle="modal" data-target="#modalEleve" id="addEleve">
            + Ajouter un eleve
            </button>
            </div>
        <div class="col-2"></div>
    </div>
    <div class="row">
        <div class="col-1"> </div>
        <div id="list_section" class="col-12    bg-white  p-3 ">
        <table class="table table-striped table-hover" id="EleveTable">
        <thead>
            <tr>
                <th class="update col-1 " id="number"> </th>
                <th id="premier">Nom</th>
                <th>Prenom</th>
                <th>Date de naissance</th>
                <th>Sexe</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="tbodyEleve" class=bg-light></tbody>
    </table> 
        
            <div class="row bg-light" id="messageEleve">
                <div class="col-5"> </div>
                <div col-2>
                    <p class="position-center mt-3 milieu"> Liste vide </p> 
                </div>
                <div class="class-5"> </div>
            </div>
        </div>
        <div class="col-1"></div>
    </div>
    </div>
        
        <input id="saveClasse" value="Enregistrer" type="button" class="btn btn-success"/>
        </form> `);
            $("#validNomClasse").hide();
            $("#validFiliere").hide();
            $("#validProfTitulaire").hide();
            updateValPrec = true;
            $("#titreAjouterClasse").hide();
            $("#titreModifierClasse").show();
            enregistrementClasse()
            updateKey = $val;
            for (var tab of classes) {
                if (tab[0] == updateKey) {
                    $("#nomClasse").attr("value", tab[1]);
                    $("#filiere").attr("value", tab[2]);

                    $("#profTitulaire").attr("value", tab[3]);
                    eleves = tab[4]
                    displayEleve(tab[4]);
                    
                }
            }
            $("#saveClasse").attr("value", "Modifier");
            enregistrementClasse()

            //evenement d'ajout d'un eleve
            $("#addEleve").click(function(){
                $("#formEleve").html("");
                $("#newItemClasse").hide();
                $("#formEleve").append(
                    `<form  id="newItemForm" novalidate >
                    <div class="col-md-12 mb-3">
                        <label for="nomEleve">Nom Eleve</label>
                        <div  id="validNomEleve" class="text-danger">
                        Entrez le nom de l'eleve
                    </div>
                        <input type="text" class="form-control" id="nomEleve" placeholder="Entrez le nom de l'eleve"
                        required  />     
                    </div>
                    <div class="col-md-12 mb-3" >
                        <label for="prenomEleve">Prenom de l'eleve  </label>
                        <div id="validPrenom" class="text-danger">
                        Entrez le prenom de l'eleve
                        </div>
                        <input  class="form-control" id="prenomEleve" placeholder="Entrez le prenom de l'eleve"
                        required/>       
                    </div>
                    <div class="col-md-12 mb-3" >
                        <label for="dateNaissance">Date </label>
                        <div id="validNaissance" class="text-danger">
                        Entrez la date de naissance
                        </div>
                        <input type="date"  class="form-control" id="dateNaissance" placeholder="Entrez la date de naissance"
                        required/>      
                    </div>
                    <div class="col-md-12 mb-3" >
                        <label for="sexe">Sexe </label>
                        <div id="validSexe" class="text-danger">
                        Selectionnez le sexe
                        </div>
                        <select  class="form-control" id="sexe"
                    required>
                    <option selected disabled style="color: #c0c0c0;" value = "-- Choisissez le sexe --">-- Choisissez le sexe --</option>
                    <option value="Masculin" >Masculin</option>
                    <option value="Feminin">Feminin</option>
                    </select>     
                    </div>
                    <input id="saveEleve" type="button" value="Enregistrer" class="btn btn-success"/>
                    </form> `
                );
                $("#validNomEleve").hide();
                $("#validPrenom").hide();
                $("#validNaissance").hide();
                $("#validSexe").hide();
                enregistrementEleve()
                })
                
            
        });
        isreadyPrec1 = true;
    }
    if (isreadyPrec1) {
        jQuery("#modalClasse").modal("hide");
    }
}

//fonction pour la mis a jjour d'une classe
function updateClasse(etablissementKey, nomClasse, filiere, profTitulaire) {
    var rang = searchUpdateClasse(etablissementKey);
    var doublon = false;
    for (item of classes) {
        
        if (
            item[1] == nomClasse &&
            item[2] == filiere &&
            item[3] == profTitulaire
        ) {
            doublon = true;
            displayClasse(classes);
            updateValPrec = false;
        }
    }
    if (doublon == false) {
        classes[rang][1] = nomClasse;
        classes[rang][2] = filiere;
        classes[rang][3] = profTitulaire;
        classes[rang][4] = eleves;
        displayClasse(classes);
        updateValPrec = false;
    }
}

//fonction de suppression d'une classe
function deleteClasse() {
   
    if (etablissementKey !== 0) {
        
        var newTab = searchClasse(etablissementKey);
        displayClasse(newTab);
        classes = newTab;
        
    }
}

// fonctions pour rechercher la cle pour la mis a jour d'une classe
function searchUpdateClasse(etablissementKey) {
    var n = 0;
    for (var item of classes) {
        if (item[0] == etablissementKey) {
            return n;
        }
        n++;
    }
}

// fonctions pour rechercher la cle pour la suppression d'une classe
function searchClasse(etablissementKey) {
    var n = 0;
    for (var item of classes) {
        if (item[0] == etablissementKey) {
            classes.splice(n, 1);
        } else {
            n++;
        }
    }
    return classes;
}


function searchClasseKey(etablissementKey) {
    for (var tab of classes) {
        if (tab[0] == etablissementKey) {
            return tab[1];
        }
    }
}

// fonction de validation du formulaire d'etablissement
function validationFormEtablissement(val1, val2, val3) {
    var valide = true;
    var newVal1 = val1;
    var newVal2 = val2;
    var newVal3 = val3;
    if (newVal1 == "") {
        $("#validNomEtablissement").show();
        valide = false;
    } if (newVal2 == "") {
        $("#validQuartier").show();
        valide = false;
    } if (newVal3 == "") {
        $("#validDate").show();
        valide = false;
    }
    return valide;
};

// fonction de soumission du formulaire d'etablissement
function submitionFormEtablissement(e) {
    $("#message").hide();
    $("#titreAjouterClasse").show();
    $("#titreModifierClasse").hide();
    if (updateVal == false) {
        $(".tbodyClasse").html("");
        var etablissements = [];
        var inputName = $("#inputNomEtablissement").val();
        var inputQuartier = $("#inputQuartierEtablissement").val();
        var inputDate = $("#inputDateEtablissement").val();
        etablissements.push(Math.random());
        etablissements.push(inputName);
        etablissements.push(inputQuartier);
        etablissements.push(inputDate);
        etablissements.push(classes);
        name.push(etablissements);
        display(name);
    } else if (updateVal) {
        var inputName = $("#inputNomEtablissement").val();
        var inputQuartier = $("#inputQuartierEtablissement").val();
        var inputDate = $("#inputDateEtablissement").val();
        $("#saveEtablissement").attr("value", 'Enregistrer');
        update(etablissementUpdateKey, inputName, inputQuartier, inputDate);
    }

}


//fonction pour l'affichage d'es etablissements
function display(table) {
    $(".add").hide();
    $(".tbodyClasse").html("");
    var newTable = [];
    newTable = table;
    for (var item of newTable) {
        $(".tbodyClasse").append(
            ' <tr class="new">' +
            '<td class=" col-2 add" >' +
            item[0] +
            "</td>" +
            '<td class=" col" >' +
            item[1] +
            "</td>" +
            '<td class=" col" >' +
            item[2] +
            "</td>" +
            '<td class=" col" >' +
            item[3] +
            "</td>" +
            '<td class=" update " >' +
            '<button type="button" class="btn btn-secondary update update2">' +
            "Modifier" +
            "</button>" +
            "</td>" +
            '<td class=" delete " > ' +
            '<button type="button" class="btn btn-danger  delete delete2" data-toggle="modal" data-target="#modalSuppression">' +
            "Supprimer" +
            "</button>" +
            "</button>" +
            "</td>" +
            "</tr>"


        );
    }
    $(".add").hide();
    $(".delete2").click(function (e) {
        $("#deleteButtonClasse").hide();
        $("#deleteButtonEleve").hide();
        $("#deleteButtonEtablissement").show();
        $("#formSuppression").html("");
        searchKey = $(this).parents("tr").children().first().text();
        var etablissementName = "";
        etablissementName = searchName(searchKey);
        $("#formSuppression").append(' <p class="objectDelete">' +
            '<span class="font-weight-bold" i>' +
            " Nom de l'etablissement: " +
            "</span> " +
            etablissementName +
            "</p>"
        );
        $("#deleteButtonEtablissement").click(function () {
            deleteEtablissement();
            jQuery("#modalSuppression").modal("hide");
            $("#formSuppression").html("");
        });
    });
    $("#modalSuppression").on("hidden.bs.modal", function () {
        searchKey = 0;
    });

    //evenement de mis ajour d'un etablissement
    $(".update2").click(function (e) {
        
        updateVal = true;
        $("#titreAjouterEtablissement").hide();
        $("#titreModifierEtablissemnt").show();
        var $val = $(this).parents("tr").children().first().text();
        $("#formEtablissement").html("");
        $("#newItemEtablissement").hide();
        $("#formEtablissement").append(` 
        <form  id="newItemForm" novalidate >
        <div class="form-group col-12">
            <label for="inputNomEtablissement">Nom Etablissement</label>
            <div  id="validNomEtablissement" class="text-danger">
            Entrez entrez le nom de l'eatblissement
        </div>
            <input type="text" class="form-control" id="inputNomEtablissement" placeholder="Entrez le nom de l'etablissement"
            required  />     
        </div>
        <div class="form-group col-12" >
            <label for="inputQuartierEtablissement">Quartier</label>
            <div id="validQuartier" class="text-danger">
            Entrez le nom du quartier
            </div>
            <input  class="form-control" id="inputQuartierEtablissement" placeholder="Entrez le quartier"
            required/>       
        </div>
        <div class="form-group col-12" >
        <label for="DateEtablissement">Date</label>
        <div id="validDate" class="text-danger">
        Entrez la date de creation de l'etablissement
        </div>
        <input type="date"  class="form-control" id="inputDateEtablissement" placeholder="Entrez la date de creation de l'etablissement"
        required/>       
    </div>
        <div class="container-fluid mb-5">
        <div class="row mt-5">
            <div class="col-1"></div>
            <div class="col-12"><button type="button" class="btn btn-success rounded"
                <button type="button" class="btn btn-success rounded" data-toggle="modal" data-target="#modalClasse" id="addClasse">
                + Ajouter une classe
                </button>
                </div>
            <div class="col-2"></div>
        </div>
        <div class="row">
            <div class="col-1"> </div>
            <div id="list_section" class="col-12    bg-white  p-3 ">
            <table class="table table-striped table-hover" id="classeTable">
            <thead>
                <tr>
                    <th class="update col-1 " id="numberprec"> </th>
                    <th id="premier">Nom classe</th>
                    <th>Filiere</th>
                    <th>Professeur titulaire</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="tbodyClasse" class=bg-light></tbody>
        </table> 
                </table>
                <div class="row bg-light" id="messageClasse">
                    <div class="col-5"> </div>
                    <div col-2>
                        <p class="position-center mt-3 milieu"> Liste vide </p> 
                    </div>
                    <div class="class-5"> </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
        <input id="saveEtablissement" value="Enregistrer" type="button" class="btn btn-success" />
        </form>
      
    `);
   
        
        $("#validNomEtablissement").hide();
        $("#validQuartier").hide();
        $("#validDate").hide();
        //update(etablissementUpdateKey, inputName, inputQuartier, inputDate)
        //evenement d'ajout d'une classe
        $("#addClasse").click(function () {
            eleves = [];
            $("#formClasse").html("");
            $("#newItemClasse").hide();
            $("#titreModifierClasse").hide();
            $("#titreAjouterClasse").show();
            $("#formClasse").append(` <form  id="newItemForm" novalidate >
    <div class="col-md-12 mb-3">
        <label for="nomClasse">Nom de la classe </label>
        <div  id="validNomClasse" class="text-danger">
        Entrez entrez le nom de la classe
    </div>
        <input type="text" class="form-control" id="nomClasse" placeholder="Entrez le nom de la classe"
        required  />     
    </div>
    <div class="col-md-12 mb-3" >
        <label for="filiere">Filiere</label>
        <div id="validFiliere" class="text-danger">
        Entrez la filiere
        </div>
        <input  class="form-control" id="filiere" placeholder="Entrez la filiere"
        required/>       
    </div>
    <div class="col-md-12 mb-3" >
        <label for="profTitulaire">Prof titulaire </label>
        <div id="validProfTitulaire" class="text-danger">
        Entrez le nom du prof titulaire 
        </div>
        <input  class="form-control" id="profTitulaire" placeholder="Entrez le nom du prof titulaire"
        required/>      
    </div>
    <div class="container-fluid mb-5">
<div class="row mt-5">
    <div class="col-1"></div>
    <div class="col-12 "><button type="button" class="btn btn-success rounded"
        <button type="button" class="btn btn-success rounded" data-toggle="modal" data-target="#modalEleve" id="addEleve">
        + Ajouter un eleve
        </button>
        </div>
    <div class="col-2"></div>
</div>
<div class="row">
    <div class="col-1"> </div>
    <div id="list_section" class="col-12    bg-white  p-3 ">
    <table class="table table-striped table-hover" id="EleveTable">
    <thead>
        <tr>
            <th class="update col-1 " id="number"> </th>
            <th id="premier">Nom</th>
            <th>Prenom</th>
            <th>Date de naissance</th>
            <th>Sexe</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody id="tbodyEleve" class=bg-light></tbody>
</table> 
        
        <div class="row bg-light" id="messageEleve">
            <div class="col-5"> </div>
            <div col-2>
                <p class="position-center mt-3 milieu"> Liste vide </p> 
            </div>
            <div class="class-5"> </div>
        </div>
    </div>
    <div class="col-1"></div>
</div>
</div>
    
    <input id="saveClasse" value="Enregistrer" type="button" class="btn btn-success"/>
    </form> `);

    
            $("#validNomClasse").hide();
            $("#validFiliere").hide();
            $("#validProfTitulaire").hide();
            $("#titreModifierClasse").hide();
            $("#titreAjouterClasse").show();
            enregistrementClasse();

            //evenement d'ajout d'un eleve
            
            $("#addEleve").click(function(){
                $("#formEleve").html("");
                $("#newItemClasse").hide();
                $("#formEleve").append(
                    `<form  id="newItemForm" novalidate >
                    <div class="col-md-12 mb-3">
                        <label for="nomEleve">Nom Eleve</label>
                        <div  id="validNomEleve" class="text-danger">
                        Entrez le nom de l'eleve
                    </div>
                        <input type="text" class="form-control" id="nomEleve" placeholder="Entrez le nom de l'eleve"
                        required  />     
                    </div>
                    <div class="col-md-12 mb-3" >
                        <label for="prenomEleve">Prenom de l'eleve  </label>
                        <div id="validPrenom" class="text-danger">
                        Entrez le prenom de l'eleve
                        </div>
                        <input  class="form-control" id="prenomEleve" placeholder="Entrez le prenom de l'eleve"
                        required/>       
                    </div>
                    <div class="col-md-12 mb-3" >
                        <label for="dateNaissance">Date </label>
                        <div id="validNaissance" class="text-danger">
                        Entrez la date de naissance
                        </div>
                        <input type="date"  class="form-control" id="dateNaissance" placeholder="Entrez la date de naissance"
                        required/>      
                    </div>
                    <div class="col-md-12 mb-3" >
                        <label for="sexe">Sexe </label>
                        <div id="validSexe" class="text-danger">
                        Selectionnez le sexe
                        </div>
                        <select  class="form-control" id="sexe"
                    required>
                    <option selected disabled style="color: #c0c0c0;" value = "-- Choisissez le sexe --">-- Choisissez le sexe --</option>
                    <option value="Masculin" >Masculin</option>
                    <option value="Feminin">Feminin</option>
                    </select>     
                    </div>
                    <input type="button" id="saveEleve" value="Enregistrer" class="btn btn-success"/>
                    </form> `
                );
                enregistrementEleve();
                $("#validNomEleve").hide();
                $("#validPrenom").hide();
                $("#validNaissance").hide();
                $("#validSexe").hide();
                })
                $("#titreModifierClasse").hide();
                $("#titreAjouterClasse").show();
        });
        enregistrement();
       enregistrementClasse();
        $("#titreModifierClasse").hide();
        $("#titreAjouterClasse").show();
       
        etablissementUpdateKey = $val;
            for (var tab of name) {
                if (tab[0] == etablissementUpdateKey) {
                    $("#inputNomEtablissement").attr("value", tab[1]);
                    $("#inputQuartierEtablissement").attr("value", tab[2]);
                    $("#inputDateEtablissement").attr("value", tab[3]);
                    classes = tab[4];
                    displayClasse(tab[4]);
                }
            }
            $("#saveEtablissement").attr("value", "Modifier");//////////add = saveEtablissement
       jQuery("#modalEtablissement").modal("show");
       
    });
    displayed = true

    if (displayed) {
        displayed = false;
        jQuery("#modalEtablissement").modal("hide");
    }
}

function deleteEtablissement() {
    if (searchKey !== 0) {
        var newTab = search(searchKey);
        i = newTab.length;
        if (i == 0) {
            $("#message").show();
        }
        $("#formSuppression").html("");
        display(newTab);
        name = newTab;
    }
}
$("#deleteButtonEtablissement").click(function(){
    deleteEtablissement();
    // $("#modalSuppression").modal("hide");
})

//fonction d'enregistrement d'un etablissement
function enregistrement(){
    $("#saveEtablissement").click(function () {
        var inputName = $("#inputNomEtablissement").val();
        var inputQuartier = $("#inputQuartierEtablissement").val();
        var inputDate = $("#inputDateEtablissement").val();
        $("#inputNomEtablissement").keyup(function () {
            if ($("#inputNomEtablissement").val() !== " ") {
                $("#validNomEtablissement").hide();
            }

        });
        $("#inputQuartierEtablissement").keyup(function () {
            if ($("#inputQuartierEtablissement").val() !== " ") {
                $("#validQuartier").hide();
            }

        });
        $("#inputDateEtablissement").keyup(function () {
            if ($("#inputDateEtablissement").val() !== " ") {
                $("#validDate").hide();
            }

        });
       
        if (validationFormEtablissement(inputName, inputQuartier, inputDate) === false) {
       ;
        } else {
        
            submitionFormEtablissement();
        }
    });
}


//fonction d'enregistrement d'une classe
function enregistrementClasse(){
    $("#saveClasse").click(function () {
        var nomClasse = $("#nomClasse").val();
        var profTitulaire = $("#profTitulaire").val();
        var filiere = $("#filiere").val();
        $("#nomClasse").keyup(function () {
            if ($("#nomClasse").val() !== " ") {
                $("#validNomClasse").hide();
            }

        });
        $("#filiere").keyup(function () {
            if ($("#filiere").val() !== " ") {
                $("#validFiliere").hide();
            }

        });
        $("#profTitulaire").keyup(function () {
            if ($("#profTitulaire").val() !== " ") {
                $("#validProfTitulaire").hide();
            }

        });
        if (validationClasse(nomClasse, filiere, profTitulaire) === false) {
            
        } else {
            
            submissionClasse();
        }
    });
}

//fonction d'enregistrement d'un eleve
function enregistrementEleve(){
    $("#saveEleve").click(function () {
     
        var nomEleve = $("#nomEleve").val();
        var prenom = $("#prenomEleve").val();
        var dateNaissance = $("#dateNaissance").val();
        var sexe = $("#sexe").find(":selected").text();
        $("#nomEleve").keyup(function () {
            if ($("#nomEleve").val() !== "") {
                $("#validNomEleve").hide();
            }

        });
        $("#prenomEleve").keyup(function () {
            if ($("#prenomEleve").val() !== "") {
                $("#validPrenom").hide();
            }

        });
        $("#dateNaissance").keyup(function () {
            if ($("#dateNaissance").val() !== "") {
                $("#validNaissance").hide();
            }

        });
        $("#sexe").keyup(function () {
            if ($("#sexe").val() !== " ") {
                $("#validSexe").hide();
            }

        });
        if (validationEleve(nomEleve, prenom, dateNaissance, sexe) === false) {
        
        } else {
       
            submitionEleve();
        }
    });
}

//cle de recherche
function searchName(etablissementKey) {
    for (var tab of name) {
        if (tab[0] == etablissementKey) {
            return tab[1];
        }
    }
}

function update(etablissementKey, inputName, inputQuartier, inputDate) {
    var position = searchUpdate(etablissementKey)
    name[position][1] = inputName;
    name[position][2] = inputQuartier;
    name[position][3] = inputDate;
    name[position][4] = classes;
    display(name);
    updateVal = false;
}

//cle de recherche mis a jour etablissement
function searchUpdate(etablissementKey) {
    var n = 0;
    for (var item of name) {
        if (item[0] == etablissementKey) {
            return n;
        }
        n++
    }
}

//cle de recherche suppression
function search(searchKey) {
    var n = 0;
    for (var item of name) {
        if (item[0] == searchKey) {
            name.splice(n, 1);
        } else {
            n++;
        }
    }

    var m = 0;
    for (var el of name) {
        m++;
    }
    return name;
}

$(document).ready(function(){
    var overlay = $("#modal-backdrop");
    var closeEta = $("#closeModalEtablissement")
    overlay.on("click", function(){
        closeEta.trigger("click");
    })
})

//appelle fonction listen
listen();
