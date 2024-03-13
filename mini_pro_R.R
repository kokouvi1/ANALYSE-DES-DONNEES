###################################################
#CHARGEMENT DU PACKAGE
###################################################
library(tidyverse)
library(dplyr)
library(readr)
rlang::last_trace()



###################################################
#IMPORTATION DE LA BASE DE DONNEE
###################################################
mini_pro <- read_delim("C:/Users/Acer/Desktop/Export - Evaluation jeune 24-11-2023 17h26.csv", delim = ";", escape_double = FALSE, trim_ws = TRUE)
View(mini_pro)

####################################################
#SELECTION DES VARIABLES D'INTERET
####################################################
mini_pro <- mini_pro[c("Avant ce témoignage avais-tu envie d'entreprendre (monter un projet, t'engager dans une action...) ?","Comment as tu préparé l'intervention avant la venue de l'entrepreneur ?","Tu as trouvé le parcours de l'intervenant.e : Accessible (je peux le faire)","Enrichissant (j'ai appris des choses)",
										 "Inspirant (ça me met en mouvement)","Le fonctionnement du monde professionnel et ses codes est-il plus clair pour toi ?","As-tu découvert un/des métier(s) ou secteur(s) que tu ne connaissais pas ??","As-tu compris le vocabulaire utilisé par l'intervenant.e ?","T'es-tu senti en confiance pour échanger avec l'intervenant.e ?","Qu'est-ce que tu as le plus apprécié lors de cette rencontre ?","Comprends-tu mieux l'intérêt des matières enseignées à l'école pour ta vie professionnelle future ?","Les transformations du monde d'aujourd'hui et de demain sont-ils plus clairs pour toi ?","Aimerais-tu assister à une nouvelle rencontre de ce type ?","Est-ce que cela t'a donné confiance dans ton avenir professionnel ?","Te sens-tu plus capable de te lancer dans un projet qui te tient à cœur ?","Pour mon projet professionnel futur, j'ai compris qu'il est important de travailler sur :")]

#############################
#RENOMMAGE DES COLONNES
########################################

# Nouveaux noms de colonnes
nouveu <- c(
	"Avant_Entreprendre",
	"Preparation_Intervention",
	"Parcours_Accessible",
	"Parcours_Enrichissant",
	"Parcours_Inspirant",
	"Comprehension_Codes_Professionnels",
	"Decouverte_Nouveaux_Metiers",
	"Comprehension_Vocabulaire",
	"Confiance_Echanger",
	"Appreciation_Rencontre",
	"Comprehension_Interet_Matieres_Ecole",
	"Clarte_Transformations_Monde",
	"Souhait_Assister_Nouvelle_Rencontre",
	"Confiance_Avenir_Professionnel",
	"Capable_Lancer_Projet",
	"Importance_Travailler_Projet"
)

# Renommer les colonnes
colnames(mini_pro) <- nouveu



##########################################
#TRANSFORMATION DES VARIABLES 
#########################################





mini_pro <- mini_pro %>%
	mutate(`Parcours_Accessible` = 
				 	ifelse(`Parcours_Accessible` < 3, "Non", "Oui"))


mini_pro <- mini_pro %>%
	mutate(`Parcours_Enrichissant` =
				 	ifelse(`Parcours_Enrichissant` < 3, "Pas enrichissant",  "Enrichissant"))

mini_pro <- mini_pro %>%
	mutate(`Parcours_Inspirant` =
				 	ifelse(`Parcours_Inspirant` < 3, "Pas inspirant", "Inspirant"))



mini_pro <- mini_pro %>%
	mutate(`Comprehension_Vocabulaire` = 
				 	ifelse(`Comprehension_Vocabulaire` 
				 				 < 3, "Pas compris" , "Oui compris"))



mini_pro <- mini_pro %>%
	mutate(`Confiance_Echanger` =
				 	ifelse(`Confiance_Echanger` < 3, "Non pas confiance", "Oui confiance"))


mini_pro <- mini_pro %>%
	mutate(`Confiance_Avenir_Professionnel` =
				 	ifelse(`Confiance_Avenir_Professionnel` < 3, "Non confiance professionnel", "Oui confiance professionnel"))

#############################################
#ANNALYSE UNIVARIEE
#######################################################
Avant_Entreprendre <- table(mini_pro$Avant_Entreprendre)
Preparation_Intervention <- table(mini_pro$Preparation_Intervention)
Parcours_Accessible <- table(mini_pro$Parcours_Accessible)
Parcours_Enrichissant <- table(mini_pro$Parcours_Enrichissant)
Parcours_Inspirant <- table(mini_pro$Parcours_Inspirant)
Comprehension_Codes_Professionnels <- table(mini_pro$Comprehension_Codes_Professionnels)
Decouverte_Nouveaux_Metiers <- table(mini_pro$Decouverte_Nouveaux_Metiers)
Comprehension_Vocabulaire <- table(mini_pro$Comprehension_Vocabulaire)
Confiance_Echanger <- table(mini_pro$Confiance_Echanger)
Appreciation_Rencontre <- table(mini_pro$Appreciation_Rencontre)
Comprehension_Interet_Matieres_Ecole <- table(mini_pro$Comprehension_Interet_Matieres_Ecole)
Clarte_Transformations_Monde <- table(mini_pro$Clarte_Transformations_Monde)
Souhait_Assister_Nouvelle_Rencontre <- table(mini_pro$Souhait_Assister_Nouvelle_Rencontre)
Confiance_Avenir_Professionnel <- table(mini_pro$Confiance_Avenir_Professionnel)
Capable_Lancer_Projet <- table(mini_pro$Capable_Lancer_Projet)
Importance_Travailler_Projet <- table(mini_pro$Importance_Travailler_Projet)

prop.table(Avant_Entreprendre)*100
prop.table(Preparation_Intervention)*100
prop.table(Parcours_Accessible)*100
prop.table(Parcours_Enrichissant)*100
prop.table(Parcours_Inspirant)*100
prop.table(Comprehension_Codes_Professionnels)*100
prop.table(Decouverte_Nouveaux_Metiers)*100
prop.table(Comprehension_Vocabulaire)*100
prop.table(Confiance_Echanger)*100
prop.table(Appreciation_Rencontre)*100
prop.table(Clarte_Transformations_Monde)*100
prop.table(Souhait_Assister_Nouvelle_Rencontre)*100
prop.table(Confiance_Avenir_Professionnel)*100
prop.table(Capable_Lancer_Projet)*100



###########################################################################
#ANALYSE BIVARIEE
#############################################################
conteingent_access_ave_pro <- table(mini_pro$Parcours_Accessible , mini_pro$Confiance_Avenir_Professionnel)
prop.table(conteingent_access_ave_pro)*100

conte_capa_voca <- table(mini_pro$Capable_Lancer_Projet, mini_pro$Comprehension_Vocabulaire)
prop.table(conte_capa_voca)*100

appreci_voca <- table(mini_pro$Decouverte_Nouveaux_Metiers, mini_pro$Comprehension_Vocabulaire)
prop.table(appreci_voca)*100

pre_conf <- table(mini_pro$Confiance_Echanger, mini_pro$Preparation_Intervention)
prop.table(pre_conf)*100


confi_voca <- table(mini_pro$Comprehension_Vocabulaire, mini_pro$Confiance_Avenir_Professionnel)
prop.table(confi_voca)*100


############################################################
#TESTS STATISTIQUES
###########################################################
# CONFIANCE AVENIR PRO ET COMPREHENSION DU VOCABULAIRE
chi_squared_test <- chisq.test(confi_voca)

# Afficher les résultats du test
print(chi_squared_test)

#install.packages("vcd")
library(vcd)
assocstats(confi_voca)

#LIAISON ENTRE PARCOURS ACCESSIBLE ET LANCER UN PROJET
paracessi_lancer_pro <- table(mini_pro$Parcours_Accessible,mini_pro$Capable_Lancer_Projet)
prop.table(paracessi_lancer_pro)*100

chi_squared_test <- chisq.test(paracessi_lancer_pro)

# Afficher les résultats du test
print(chi_squared_test)


library(vcd)
assocstats(paracessi_lancer_pro)

##Préparation intervention et la comprehension des matieres
prein_compma <- table(mini_pro$Comprehension_Interet_Matieres_Ecole,mini_pro$Preparation_Intervention)

chi_squared_test <- chisq.test(prein_compma)

# Afficher les résultats du test
print(chi_squared_test)



library(vcd)
assocstats(prein_compma)
