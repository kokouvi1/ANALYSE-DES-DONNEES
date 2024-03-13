# Importation de la base de données qu'on nommera "projet_2024"
library(readxl)
library(psych)
library(dplyr)
library(ggplot2)
library(mice)
library(gmodels)
library(lmtest)
#update.packages()
projet_2024 <-read_excel("C:/Users/pc/Desktop/mes dossiers/COURS 2023-2024/DEUXIEME SEMESTRE/MICRO ECONOMETRIE/PROJET_2024/DM 2024/heart.xlsx")
summary(projet_2024)
str(projet_2024)



##################################################################################

################            ANALYSE UNIVARIEE   ##################################

##################################################################################

######################     VARIABLE QUANTITATIVE       #########################



################################################################################
##############                   AGE                  ##########################
projet_2024$Age <- projet_2024$age
sd(projet_2024$Age) 

pourcentages_age <- prop.table(table(projet_2024$Age)) * 100 # Calculer les pourcentages


# Créer un histogramme de la distribution de l'âge
ggplot(projet_2024, aes(x = Age)) +
  geom_histogram(fill = "blue", color = "red", bins = 20) +  # Utiliser bins pour contrôler le nombre de barres
  labs(title = "Distribution de l'âge", x = "Âge", y = "Nombre de personnes")



#######################           taux_chol         ###########################
projet_2024$taux_chol <- projet_2024$totChol

#Statistique descriptive pour la variable taux_chol
sd(projet_2024$taux_chol)

# Calculer les pourcentages pour la variable taux_chol
pourcentages_taux_chol <- prop.table(table(projet_2024$taux_chol)) * 100


# Créer un histogramme de la distribution du taux de cholestérol
ggplot(projet_2024, aes(x = taux_chol)) +
  geom_histogram(fill = "blue", color = "red", bins = 20) +  # Utiliser bins pour contrôler le nombre de barres
  labs(title = "Distribution du taux de cholestérol", x = "Taux de cholestérol", y = "Nombre de personnes")




##################             indice_mass_cor           #######################
projet_2024$indice_mass_cor <- projet_2024$BMI
#Statistique descriptive pour la variable indice_mass_cor
sd(projet_2024$indice_mass_cor)

# Calculer les pourcentages pour la variable indice_mass_cor
pourcentages_indice_mass_cor <- prop.table(table(projet_2024$indice_mass_cor)) * 100

# Créer un histogramme de la distribution de l'indice de masse corporelle
ggplot(projet_2024, aes(x = indice_mass_cor)) +
  geom_histogram(fill = "blue", color = "red", bins = 20) +  # Utiliser bins pour contrôler le nombre de barres
  labs(title = "Distribution de l'indice de masse corporelle", x = "Indice de masse corporelle", y = "Nombre de personnes")


################################################################################

########################          rythme_card            ######################
projet_2024$rythme_card <- projet_2024$heartRate
#Statistique descriptive pour la variable rythme_card
sd(projet_2024$rythme_card)

# Calculer les pourcentages pour la variable rythme_card
pourcentages_rythme_card <- prop.table(table(projet_2024$rythme_card)) * 100

# Créer un histogramme de la distribution du rythme cardiaque
ggplot(projet_2024, aes(x = rythme_card)) +
  geom_histogram(fill = "blue", color = "red", bins = 20) +  # Utiliser bins pour contrôler le nombre de barres
  labs(title = "Distribution du rythme cardiaque", x = "Rythme cardiaque", y = "Nombre de personnes")



################################################################################

#################           taux_glucose         ###############################
projet_2024$taux_glucose <- projet_2024$glucose
#Statistique descriptive pour la variable taux_glucose
sd(projet_2024$taux_glucose)

# Calculer les pourcentages pour la variable taux_glucose
pourcentages_taux_glucose <- prop.table(table(projet_2024$taux_glucose)) * 100

# Créer un histogramme de la distribution du taux de glucose
ggplot(projet_2024, aes(x = taux_glucose)) +
  geom_histogram(fill = "blue", color = "red", bins = 20) +  # Utiliser bins pour contrôler le nombre de barres
  labs(title = "Distribution du taux de glucose", x = "Taux de glucose", y = "Nombre de personnes")



################################################################################
#####################    GENRE                        ##########################
projet_2024$genre <- projet_2024$male
#Statistique descriptive pour la variable genre
table(projet_2024$genre)

# Calculer les pourcentages pour la variable genre
pourcentages_genre <- prop.table(table(projet_2024$genre)) * 100

#Representation graphique de la variable genre
ggplot(projet_2024, aes(x = genre)) +
  geom_bar(fill = "blue", color = "red") +
  geom_text(stat = "count", aes(label = paste(round(..count../sum(..count..) * 100, 1), "%")), vjust = -0.5) +
  labs(title = "Répartition par genre")

################################################################################
##################         FUMEUR                 #############################
projet_2024$fumeur <- projet_2024$currentSmoker
#Statistique descriptive pour la variable fumeur
table(projet_2024$fumeur)
# Calculer les pourcentages pour la variable fumeur
pourcentages_fumeur <- prop.table(table(projet_2024$fumeur)) * 100

#Representation graphique de la variable fumeur
ggplot(projet_2024, aes(x = fumeur)) +
  geom_bar(fill = "blue", color = "black") +
  geom_text(stat = "count", aes(label = paste(round(..count../sum(..count..) * 100, 1), "%")), vjust = -0.5) +
  labs(title = "Répartition par statut de fumeur")

################################################################################
############          SOUS  TRAITEMENT             #############################
projet_2024$sous_traitement <- projet_2024$BPMeds
#Statistique descriptive pour la variable sous_traitement
table(projet_2024$sous_traitement)

# Calculer les pourcentages pour la variable sous_traitement
pourcentages_sous_traitement <- prop.table(table(projet_2024$sous_traitement)) * 100

#Representation graphique de la variable sous_traitement
ggplot(projet_2024, aes(x = sous_traitement)) +
  geom_bar(fill = "blue", color = "black") +
  geom_text(stat = "count", aes(label = paste(round(..count../sum(..count..) * 100, 1), "%")), vjust = -0.5) +
  labs(title = "Répartition par statut de sous_traitement")

###############################################################################
################            A FAIT UNE ATTAQUE          #######################
projet_2024$A_fait_une_attaque <- projet_2024$prevalentStroke
#Statistique descriptive pour la variable A FAIT UNE ATTAQUE
table(projet_2024$A_fait_une_attaque)

# Calculer les pourcentages pour la variable A FAIT UNE ATTAQUE
pourcentages_A_fait_une_attaque <- prop.table(table(projet_2024$A_fait_une_attaque)) * 100

#Representation graphique de la variable A FAIT UNE ATTAQUE
ggplot(projet_2024, aes(x = A_fait_une_attaque)) +
  geom_bar(fill = "blue", color = "black") +
  geom_text(stat = "count", aes(label = paste(round(..count../sum(..count..) * 100, 1), "%")), vjust = -0.5) +
  labs(title = "Répartition par statut de A_fait_une_attaque")

################################################################################

################                A_hypertension      ##########################
projet_2024$A_hypertension <- projet_2024$prevalentHyp
#Statistique descriptive pour la variable A_hypertension
table(projet_2024$A_hypertension)

# Calculer les pourcentages pour la variable A_hypertension
pourcentages_A_hypertension <- prop.table(table(projet_2024$A_hypertension)) * 100

#Representation graphique de la variable A_hypertension
ggplot(projet_2024, aes(x = A_hypertension)) +
  geom_bar(fill = "blue", color = "black") +
  geom_text(stat = "count", aes(label = paste(round(..count../sum(..count..) * 100, 1), "%")), vjust = -0.5) +
  labs(title = "Répartition par statut de A_hypertension")


################################################################################

####################          diabetique         ############################
projet_2024$diabetique <- projet_2024$diabetes
#Statistique descriptive pour la variable diabetique
table(projet_2024$diabetique)

# Calculer les pourcentages pour la variable diabetique
pourcentages_diabetique <- prop.table(table(projet_2024$diabetique)) * 100

#Representation graphique de la variable diabetique
ggplot(projet_2024, aes(x = diabetique)) +
  geom_bar(fill = "blue", color = "black") +
  geom_text(stat = "count", aes(label = paste(round(..count../sum(..count..) * 100, 1), "%")), vjust = -0.5) +
  labs(title = "Répartition par statut de diabetique")


################################################################################


################################################################################


################################################################################


################################################################################

#################           diplome         ###############################
projet_2024$diplome <- projet_2024$education
#Statistique descriptive pour la variable diplome
table(projet_2024$diplome)

# Calculer les pourcentages pour la variable diplome
pourcentages_diplome <- prop.table(table(projet_2024$diplome)) * 100

#Representation graphique de la variable diplome
ggplot(projet_2024, aes(x = diplome)) +
  geom_bar(fill = "blue", color = "black") +
  geom_text(stat = "count", aes(label = paste(round(..count../sum(..count..) * 100, 1), "%")), vjust = -0.5) +
  labs(title = "Répartition par statut de diplome")

################################################################################


################################################################################

#################           atteind_maladie_coro         ###############################
projet_2024$atteind_maladie_coro <- projet_2024$TenYearCHD
#Statistique descriptive pour la variable atteind_maladie_coro
table(projet_2024$atteind_maladie_coro)

# Calculer les pourcentages pour la variable atteind_maladie_coro
pourcentages_atteind_maladie_coro <- prop.table(table(projet_2024$atteind_maladie_coro)) * 100

#Representation graphique de la variable atteind_maladie_coro
ggplot(projet_2024, aes(x = atteind_maladie_coro)) +
  geom_bar(fill = "blue", color = "black") +
  geom_text(stat = "count", aes(label = paste(round(..count../sum(..count..) * 100, 1), "%")), vjust = -0.5) +
  labs(title = "Répartition par statut atteind d'une maladie coronanienne")









#################################################################################

##############################  ANALYSE BIVARIEE     ############################

#################################################################################



################################################################################

#################         VARIABLE QUANTITATIVE             ####################

################################################################################

# verification de la normalite des distributions
shapiro.test(projet_2024$atteind_maladie_coro)
shapiro.test(projet_2024$Age)
shapiro.test(projet_2024$taux_chol)
shapiro.test(projet_2024$indice_mass_cor)
shapiro.test(projet_2024$taux_glucose)
shapiro.test(projet_2024$rythme_card)

################################################################################

####     Relation entre age et atteind une malaide coronanienne       ##########

################################################################################


# Convertir atteind_maladie_coro en facteur
projet_2024$atteind_maladie_coro <- factor(projet_2024$atteind_maladie_coro)

# Créer le boxplot avec les ajustements nécessaires
p_age <- ggplot(projet_2024, aes(x = atteind_maladie_coro, y = Age, fill = atteind_maladie_coro, group = atteind_maladie_coro)) +
  geom_boxplot(alpha = 0.8, color = "black", outlier.color = "red") +
  labs(title = "Distribution de l'âge en fonction de atteind_maladie_coro",
       x = "Atteinte de la maladie coronarienne", y = "Âge") +
  theme_minimal() +
  theme(plot.title = element_text(hjust = 0.5)) +
  scale_fill_manual(values = c("gray", "blue"))

# Afficher le graphique
print(p_age)

################################################################################


# Effectuer le test de Mann-Whitney pour la variable Age en fonction de atteind_maladie_coro
wilcox.test(Age ~ atteind_maladie_coro, data = projet_2024)




################################################################################

####    Relation entre taux_chol et atteind d'une maladie coronarienne    #####

################################################################################


# Créer un boxplot pour la variable taux_chol en fonction de atteind_maladie_coro
p_chol <- ggplot(projet_2024, aes(x = atteind_maladie_coro, y = taux_chol, fill = atteind_maladie_coro)) +
  geom_boxplot(alpha = 0.8, color = "black", outlier.color = "red") + # Ajouter de la transparence et changer la couleur des bords et des outliers
  labs(title = "Distribution du taux de cholestérol en fonction de atteind_maladie_coro",
       x = "Atteinte de la maladie coronarienne", y = "Taux de cholestérol") + # Ajouter des étiquettes aux axes
  theme_minimal() + # Utiliser un thème minimal pour une apparence propre
  theme(plot.title = element_text(hjust = 0.5)) + # Centrer le titre du graphique
  scale_fill_manual(values = c("gray", "blue")) # Changer les couleurs de remplissage pour améliorer la lisibilité

# Afficher le graphique
print(p_chol)


################################################################################


# Effectuer le test de Mann-Whitney pour la variable taux_chol en fonction de atteind_maladie_coro
wilcox.test(taux_chol ~ atteind_maladie_coro, data = projet_2024)





###############################################################################

# Relation entre indice de la masse corporel et atteind d'une maladie coronarienne

###############################################################################

# Créer un boxplot pour la variable indice_mass_cor en fonction de atteind_maladie_coro
p_mass_cor <- ggplot(projet_2024, aes(x = atteind_maladie_coro, y = indice_mass_cor, fill = atteind_maladie_coro)) +
  geom_boxplot(alpha = 0.8, color = "black", outlier.color = "red") + # Ajouter de la transparence et changer la couleur des bords et des outliers
  labs(title = "Distribution de l'indice de masse corporelle en fonction de atteind_maladie_coro",
       x = "Atteinte de la maladie coronarienne", y = "Indice de masse corporelle") + # Ajouter des étiquettes aux axes
  theme_minimal() + # Utiliser un thème minimal pour une apparence propre
  theme(plot.title = element_text(hjust = 0.5)) + # Centrer le titre du graphique
  scale_fill_manual(values = c("gray", "blue")) # Changer les couleurs de remplissage pour améliorer la lisibilité

# Afficher le graphique
print(p_mass_cor)

###############################################################################

# Effectuer le test de Mann-Whitney pour la variable indice_mass_cor en fonction de atteind_maladie_coro
wilcox.test(indice_mass_cor ~ atteind_maladie_coro, data = projet_2024)


################################################################################

####   Relation entre rythme_card et atteind d'une maladie coronarienne    #####

################################################################################

# Créer un boxplot pour la variable rythme_card en fonction de atteind_maladie_coro
p_rythme_card <- ggplot(projet_2024, aes(x = atteind_maladie_coro, y = rythme_card, fill = atteind_maladie_coro)) +
  geom_boxplot(alpha = 0.8, color = "black", outlier.color = "red") + # Ajouter de la transparence et changer la couleur des bords et des outliers
  labs(title = "Distribution du rythme cardiaque en fonction de atteind_maladie_coro",
       x = "Atteinte de la maladie coronarienne", y = "Rythme cardiaque") + # Ajouter des étiquettes aux axes
  theme_minimal() + # Utiliser un thème minimal pour une apparence propre
  theme(plot.title = element_text(hjust = 0.5)) + # Centrer le titre du graphique
  scale_fill_manual(values = c("gray", "blue")) # Changer les couleurs de remplissage pour améliorer la lisibilité

# Afficher le graphique
print(p_rythme_card)

################################################################################

# Effectuer le test de Mann-Whitney pour le rythme cardiaque en fonction de atteind_maladie_coro
wilcox.test(rythme_card ~ atteind_maladie_coro, data = projet_2024)



################################################################################

#####  Relation entre taux_glucose et atteind d'une maladie coronarienne    ####

################################################################################

# Créer un boxplot pour la variable taux_glucose en fonction de atteind_maladie_coro
p_glucose <- ggplot(projet_2024, aes(x = atteind_maladie_coro, y = taux_glucose, fill = atteind_maladie_coro)) +
  geom_boxplot(alpha = 0.8, color = "black", outlier.color = "red") + # Ajouter de la transparence et changer la couleur des bords et des outliers
  labs(title = "Distribution du taux de glucose en fonction de atteind_maladie_coro",
       x = "Atteinte de la maladie coronarienne", y = "Taux de glucose") + # Ajouter des étiquettes aux axes
  theme_minimal() + # Utiliser un thème minimal pour une apparence propre
  theme(plot.title = element_text(hjust = 0.5)) + # Centrer le titre du graphique
  scale_fill_manual(values = c("gray", "blue")) # Changer les couleurs de remplissage pour améliorer la lisibilité

# Afficher le graphique
print(p_glucose)

################################################################################

# Effectuer le test de Mann-Whitney pour le taux de glucose en fonction de atteind_maladie_coro
wilcox.test(taux_glucose ~ atteind_maladie_coro, data = projet_2024)




#################################################################################

#############         VARIABLE QUALITATIVE            #########################

###############################################################################
####       Relation entre genre et atteindre la maladie coronanienne  ##########
################################################################################

# Calculer les effectifs par combinaison de genre et atteind_maladie_coro
effectifs_genre <- projet_2024 %>%
  group_by(genre, atteind_maladie_coro) %>%
  summarise(count = n())

# Convertir les variables pertinentes en facteurs si nécessaire
effectifs_genre$genre <- factor(effectifs_genre$genre)
effectifs_genre$atteind_maladie_coro <- as.factor(effectifs_genre$atteind_maladie_coro)

# Créer le graphique en barres avec ggplot
p_genre <- ggplot(effectifs_genre, aes(x = atteind_maladie_coro, y = count, fill = genre)) +
  geom_bar(stat = "identity", position = "dodge", color = "black") +
  geom_text(aes(label = count), position = position_dodge(width = 0.9), vjust = -0.5, size = 3) +
  labs(title = "Distribution de l'atteinte de la maladie coronarienne par genre",
       x = "Atteinte de la maladie coronarienne",
       y = "Effectifs",
       fill = "Genre") +
  facet_wrap(~ genre) +
  theme_minimal() +
  theme(legend.position = "bottom") +
  scale_fill_manual(values = c("orange", "lightblue"), labels = c("homme", "femme"))  

# Afficher le graphique avec une légende correcte
print(p_genre)



# Créer une table croisée pour compter les occurrences de chaque combinaison de niveaux de genre et atteind_maladie_coro

table_croisee_genre <- table(projet_2024$genre, projet_2024$atteind_maladie_coro) # La frequence
prop.table(table(projet_2024$atteind_maladie_coro, projet_2024$genre)) # % marginaux)
prop.table(table(projet_2024$atteind_maladie_coro, projet_2024$genre), margin = 1) # profils lignes

# Effectuer un test du chi-carré pour évaluer l'association entre les variables
test_chi2_genre <- chisq.test(table_croisee_genre)# test independance

# Afficher les résultats du test
print(test_chi2_genre)

################################################################################

#######   Relation entre sous traitement et atteind_maladie_coro      ##########

################################################################################
# Calculer les effectifs par combinaison sous traitement et atteind_maladie_coro
effectifs_sous_traitement <- projet_2024 %>%
  group_by(sous_traitement, atteind_maladie_coro) %>%
  summarise(count = n())


# Convertir les variables en facteurs
effectifs_sous_traitement$sous_traitement <- factor(effectifs_sous_traitement$sous_traitement)
effectifs_sous_traitement$atteind_maladie_coro <- factor(effectifs_sous_traitement$atteind_maladie_coro)

# Créer un graphique en barres pour visualiser la distribution de "atteind_maladie_coro" par "sous_traitement" avec séparation des catégories "oui" et "non"
p_sous_traitement <- ggplot(effectifs_sous_traitement, aes(x = atteind_maladie_coro, y = count, fill = sous_traitement)) +
  geom_bar(stat = "identity", position = "dodge", color = "black") +
  geom_text(aes(label = count), position = position_dodge(width = 0.9), vjust = -0.5, size = 3) +
  labs(title = "Distribution de l'atteinte de la maladie coronarienne par sous-traitement",
       x = "Atteinte de la maladie coronarienne",
       y = "Effectifs",
       fill = "Sous-traitement") +
  facet_wrap(~sous_traitement) +
  theme_minimal() +
  theme(legend.position = "bottom") +
  scale_fill_manual(values = c("orange", "lightblue"), labels = c("Oui", "Non"))  # Définir les étiquettes de la légende

# Afficher le graphique avec une légende correcte
print(p_sous_traitement)


# Créer une table croisée pour compter les occurrences de chaque combinaison de niveaux de sous_traitement et atteind_maladie_coro
table_croisee_sous_traitement <- table(projet_2024$sous_traitement, projet_2024$atteind_maladie_coro) # La frequence
prop.table(table(atteind_maladie_coro, sous_traitement)) # % marginaux)
prop.table(table(atteind_maladie_coro, sous_traitement), margin = 1) # profils lignes

# Effectuer un test du chi-carré pour évaluer l'association entre les variables
test_chi2_sous_traitement <- chisq.test(table_croisee_sous_traitement)# test independance

# Afficher les résultats du test
print(test_chi2_sous_traitement)


################################################################################

###  Relation entre A_fait_une_attaque et atteind une maladie coronarienne  ####

################################################################################
# Calculer les effectifs par combinaison A fait une attaque caediaque et atteind_maladie_coro
effectifs_attaque <- projet_2024 %>%
  group_by(A_fait_une_attaque, atteind_maladie_coro) %>%
  summarise(count = n())
# Convertir les variables en facteurs
effectifs_attaque$A_fait_une_attaque <- factor(effectifs_attaque$A_fait_une_attaque)
effectifs_attaque$atteind_maladie_coro <- factor(effectifs_attaque$atteind_maladie_coro)

# Créer un graphique en barres pour visualiser la distribution de "atteind_maladie_coro" par "sous_traitement" avec séparation des catégories "oui" et "non"
p_a_fait_une_attaque <- ggplot(effectifs_attaque, aes(x = atteind_maladie_coro, y = count, fill = A_fait_une_attaque)) +
  geom_bar(stat = "identity", position = "dodge", color = "black") +
  geom_text(aes(label = count), position = position_dodge(width = 0.9), vjust = -0.5, size = 3) +
  labs(title = "Distribution de l'atteinte de la maladie coronarienne par a fait une attaque",
       x = "Atteinte de la maladie coronarienne",
       y = "Effectifs",
       fill = "a fait une attaque") +
  facet_wrap(~A_fait_une_attaque) +
  theme_minimal() +
  theme(legend.position = "bottom") +
  scale_fill_manual(values = c("orange", "lightblue"), labels = c("Oui", "Non"))  # Définir les étiquettes de la légende

# Afficher le graphique avec une légende correcte
print(p_a_fait_une_attaque)

# Créer une table croisée pour compter les occurrences de chaque combinaison de niveaux de A_fait_une_attaque et atteind_maladie_coro
table_croisee_attaque <- table(projet_2024$A_fait_une_attaque, projet_2024$atteind_maladie_coro) # La frequence
prop.table(table(atteind_maladie_coro, A_fait_une_attaque)) # % marginaux)
prop.table(table(atteind_maladie_coro, A_fait_une_attaque), margin = 1) # profils lignes

# Effectuer le test exact de Fisher pour évaluer l'association entre les variables car chi2 n'est pas adapte

# Effectuer le test exact de Fisher
fisher.test(table_croisee_attaque) # test independance




################################################################################

####   Relation entre A_hypertension et atteind une maladie coronarienne   #####

################################################################################
# Calculer les effectifs par combinaison de l'hypertension et atteind_maladie_coro
effectifs_hypertension <- projet_2024 %>%
  group_by(A_hypertension, atteind_maladie_coro) %>%
  summarise(count = n())

# Convertir les variables en facteurs
effectifs_hypertension$A_hypertension <- factor(effectifs_hypertension$A_hypertension)
effectifs_hypertension$atteind_maladie_coro <- factor(effectifs_hypertension$atteind_maladie_coro)

# Créer un graphique en barres pour visualiser la distribution de "atteind_maladie_coro" par "sous_traitement" avec séparation des catégories "oui" et "non"
p_hypertension <- ggplot(effectifs_hypertension, aes(x = atteind_maladie_coro, y = count, fill = A_hypertension)) +
  geom_bar(stat = "identity", position = "dodge", color = "black") +
  geom_text(aes(label = count), position = position_dodge(width = 0.9), vjust = -0.5, size = 3) +
  labs(title = "Distribution de l'atteinte de la maladie coronarienne par a l'hypertension",
       x = "Atteinte de la maladie coronarienne",
       y = "Effectifs",
       fill = "a l'hypertension") +
  facet_wrap(~A_hypertension) +
  theme_minimal() +
  theme(legend.position = "bottom") +
  scale_fill_manual(values = c("orange", "lightblue"), labels = c("Oui", "Non"))  # Définir les étiquettes de la légende

# Afficher le graphique avec une légende correcte
print(p_hypertension)


# Créer une table croisée pour compter les occurrences de chaque combinaison de niveaux de A_hypertension et atteind_maladie_coro

table_croisee_hypertension <- table(projet_2024$A_hypertension, projet_2024$atteind_maladie_coro) # La frequence
prop.table(table(atteind_maladie_coro, A_hypertension)) # % marginaux)
prop.table(table(atteind_maladie_coro, A_hypertension), margin = 1) # profils lignes

# Effectuer un test du chi-carré pour évaluer l'association entre les variables
test_chi2_hypertension <- chisq.test(table_croisee_hypertension)# test independance

# Afficher les résultats du test
print(test_chi2_hypertension)

################################################################################

####   Relation entre diabetique et atteind une maladie coronarienne   #########

################################################################################
# Calculer les effectifs par combinaison de DIABETIQUE   et atteind_maladie_coro
effectifs_diabetique <- projet_2024 %>%
  group_by(diabetes, atteind_maladie_coro) %>%
  summarise(count = n())
# Convertir les variables en facteurs
effectifs_diabetique$diabetes <- factor(effectifs_diabetique$diabetes)
effectifs_diabetique$atteind_maladie_coro <- factor(effectifs_diabetique$atteind_maladie_coro)

# Créer un graphique en barres pour visualiser la distribution de "atteind_maladie_coro" par "sous_traitement" avec séparation des catégories "oui" et "non"
p_diabetique <- ggplot(effectifs_diabetique, aes(x = atteind_maladie_coro, y = count, fill = diabetes)) +
  geom_bar(stat = "identity", position = "dodge", color = "black") +
  geom_text(aes(label = count), position = position_dodge(width = 0.9), vjust = -0.5, size = 3) +
  labs(title = "Distribution de l'atteinte de la maladie coronarienne par le diabete ",
       x = "Atteinte de la maladie coronarienne",
       y = "Effectifs",
       fill = "Diabetique") +
  facet_wrap(~diabetes) +
  theme_minimal() +
  theme(legend.position = "bottom") +
  scale_fill_manual(values = c("orange", "lightblue"), labels = c("Oui", "Non"))  # Définir les étiquettes de la légende

# Afficher le graphique avec une légende correcte
print(p_diabetique)


# Créer une table croisée pour compter les occurrences de chaque combinaison de niveaux de diabetique et atteind_maladie_coro

table_croisee_diabetique <- table(projet_2024$diabetique, projet_2024$atteind_maladie_coro) # La frequence
prop.table(table(atteind_maladie_coro, diabetique)) # % marginaux)
prop.table(table(atteind_maladie_coro, diabetique), margin = 1) # profils lignes

# Effectuer un test du chi-carré pour évaluer l'association entre les variables
test_chi2_diabetique <- chisq.test(table_croisee_diabetique)# test independance

# Afficher les résultats du test
print(test_chi2_diabetique)



################################################################################

####     Relation entre fumeur et atteind une maladie coronarienne    ##########

################################################################################
# Calculer les effectifs par combinaison de fumeur et atteind_maladie_coro
effectifs_fumeur <- projet_2024 %>%
  group_by(fumeur, atteind_maladie_coro) %>%
  summarise(count = n())

# Convertir les variables en facteurs
effectifs_fumeur$fumeur <- factor(effectifs_fumeur$fumeur)
effectifs_fumeur$atteind_maladie_coro <- factor(effectifs_fumeur$atteind_maladie_coro)

# Créer un graphique en barres pour visualiser la distribution de "atteind_maladie_coro" par "sous_traitement" avec séparation des catégories "oui" et "non"
p_fumeur <- ggplot(effectifs_fumeur, aes(x = atteind_maladie_coro, y = count, fill = fumeur)) +
  geom_bar(stat = "identity", position = "dodge", color = "black") +
  geom_text(aes(label = count), position = position_dodge(width = 0.9), vjust = -0.5, size = 3) +
  labs(title = "Distribution de l'atteinte de la maladie coronarienne par le fumeur ",
       x = "Atteinte de la maladie coronarienne",
       y = "Effectifs",
       fill = "fumeur") +
  facet_wrap(~fumeur) +
  theme_minimal() +
  theme(legend.position = "bottom") +
  scale_fill_manual(values = c("orange", "lightblue"), labels = c("Oui", "Non"))  # Définir les étiquettes de la légende

# Afficher le graphique avec une légende correcte
print(p_fumeur)


# Créer une table croisée pour compter les occurrences de chaque combinaison de niveaux de fumeur et atteind_maladie_coro

table_croisee_fumeur <- table(projet_2024$fumeur, projet_2024$atteind_maladie_coro) # La frequence
prop.table(table(atteind_maladie_coro, fumeur)) # % marginaux)
prop.table(table(atteind_maladie_coro, fumeur), margin = 1) # profils lignes

# Effectuer un test du chi-carré pour évaluer l'association entre les variables
test_chi2_fumeur <- chisq.test(table_croisee_fumeur)# test independance

# Afficher les résultats du test
print(test_chi2_fumeur)




################################################################################

####   Relation entre diplome et atteind d'une maladie coronarienne    #########

################################################################################
# Calculer les effectifs par combinaison de diplome et atteind_maladie_coro
effectifs_diplome <- projet_2024 %>%
  group_by(diplome, atteind_maladie_coro) %>%
  summarise(count = n())

# Convertir les variables en facteurs
effectifs_diplome$diplome <- factor(effectifs_diplome$diplome)
effectifs_diplome$atteind_maladie_coro <- factor(effectifs_diplome$atteind_maladie_coro)

# Créer un graphique en barres pour visualiser la distribution de "atteind_maladie_coro" par "sous_traitement" avec séparation des catégories "oui" et "non"
p_diplome <- ggplot(effectifs_diplome, aes(x = atteind_maladie_coro, y = count, fill = diplome)) +
  geom_bar(stat = "identity", position = "dodge", color = "black") +
  geom_text(aes(label = count), position = position_dodge(width = 0.9), vjust = -0.5, size = 3) +
  labs(title = "Distribution de l'atteinte de la maladie coronarienne par le niveau d'education ",
       x = "Atteinte de la maladie coronarienne",
       y = "Effectifs",
       fill = "diplome") +
  facet_wrap(~diplome) +
  theme_minimal() +
  theme(legend.position = "bottom") +
  scale_fill_manual(values = c("orange", "lightblue","blue","violet"), labels = c("brevet","Bac","etude pro", "etudes universitaire"))  # Définir les étiquettes de la légende

# Afficher le graphique avec une légende correcte
print(p_diplome)



# Créer une table croisée pour compter les occurrences de chaque combinaison de niveaux de diplome et atteind_maladie_coro

table_croisee_diplome <- table(projet_2024$diplome, projet_2024$atteind_maladie_coro) # La frequence
prop.table(table(atteind_maladie_coro, diplome)) # % marginaux)
prop.table(table(atteind_maladie_coro, diplome), margin = 1) # profils lignes

# Effectuer un test du chi-carré pour évaluer l'association entre les variables
test_chi2_diplome <- chisq.test(table_croisee_diplome)# test independance

# Afficher les résultats du test
print(test_chi2_diplome)


##########################################################################

################    DISCRETISATION DES VARIABLES      #####################

##########################################################################



#Male
# discretisqtion de la colonne "male" en une variable catégorielle avec des niveaux "Femme" et "Homme"
projet_2024$genre <- ifelse(projet_2024$male == 0, "Femme", "Homme")
# Suppression de la colonne originale "male"
projet_2024 <- subset(projet_2024, select = -male)

#CurrentSmoker
#Discrétisation de la colonne "currentSmoker"
projet_2024$fumeur <- ifelse(projet_2024$currentSmoker == 1, "oui", "non")
# Suppression de la colonne "currentSmoker"
projet_2024 <- subset(projet_2024, select = -currentSmoker)

#BPMeds
# Discrétisation de la colonne "BPMeds"
projet_2024$sous_traitement <- ifelse(projet_2024$BPMeds == 1, "oui", "non")
# Suppression de la colonne "BPMeds"
projet_2024 <- subset(projet_2024, select = -BPMeds)

#prevalentStroke
#Discrétisation de la colonne prevalentStroke
projet_2024$A_fait_une_attaque <- ifelse(projet_2024$prevalentStroke == 1, "oui", "non")
#Supression de la colonne prevalentStroke
projet_2024 <- subset(projet_2024, select = -prevalentStroke)

#PrevalentHyp
# Discétisation de lala colonne "prevalentHyp"
projet_2024$A_hypertension <- ifelse(projet_2024$prevalentHyp == 1, "oui", "non")
# Suppression de la colonne "prevalentHyp"
projet_2024 <- subset(projet_2024, select = -prevalentHyp)

#Diabetes
#Discrétisation de la colonne Diabetes
projet_2024$diabetique <- ifelse(projet_2024$diabetes == 1, "oui", "non")
#Suppression de la colonne originale
projet_2024 <- subset(projet_2024, select = -diabetes)

#CHD
#Discrétisation de la variable CHD
projet_2024$atteind_maladie_coro <- ifelse(projet_2024$TenYearCHD == 1, "oui", "non")
#Suppression de la colonne originale
projet_2024 <- subset(projet_2024, select = -TenYearCHD)

# Age
breaks <- c(0, 35, 64, Inf)
projet_2024$Age <- cut(projet_2024$age, breaks, labels = c("Jeune adulte", "Adulte d'âge moyen", "Personne âgée"))
# Suppression de la colonne originale d'âge
projet_2024 <- subset(projet_2024, select = -c(age))

# Taux de cholestérol
breaks_chol <- c(0, 200, 239, 240, Inf)
projet_2024$taux_chol <- cut(projet_2024$totChol, breaks_chol, labels = c("Normal", "Légèrement élevé", "Élevé", "Très élevé"))
# Supprimer la colonne originale de taux de cholestérol
projet_2024 <- subset(projet_2024, select = -c(totChol))

# Indice de masse corporelle (BMI)
breaks_bmi <- c(0, 18.5, 24.9, 29.9, Inf)
projet_2024$indice_mass_cor <- cut(projet_2024$BMI, breaks_bmi, labels = c("Insuffisance pondérale", "Poids normal", "Surpoids", "Obésité"))
# Supprimer la colonne originale de l'indice de masse corporelle (BMI)
projet_2024 <- subset(projet_2024, select = -c(BMI))

# Rythme cardiaque
breaks_heart_rate <- c(0, 60, 100, Inf)
projet_2024$rythme_card <- cut(projet_2024$heartRate, breaks_heart_rate, labels = c("Bradycardie", "Normale", "Tachycardie"))
# Supprimer la colonne originale de rythme cardiaque
projet_2024 <- subset(projet_2024, select = -c(heartRate))

# Taux de glucose
breaks_glucose <- c(0, 70, 100, 125, Inf)
projet_2024$taux_glucose <- cut(projet_2024$glucose, breaks_glucose, labels = c("Hypoglycémie", "Normale", "Prédiabète", "Diabète"))
# Supprimer la colonne originale de taux de glucose
projet_2024 <- subset(projet_2024, select = -c(glucose))

# Niveau d'éducation
breaks <- c(0.5, 1.5, 2.5, 3.5, 4.5)
labels <- c("Brevet", "Bac", "Études pro", "Études universitaires")
projet_2024$diplome <- cut(projet_2024$education, breaks, labels = labels)
# Supprimer la colonne originale d'éducation
projet_2024 <- subset(projet_2024, select = -c(education))


# Analyse des valeurs manquantes et traitements si besoin
# Identification et Traitement des valeurs manquantes 
# Compter le nombre de valeurs manquantes par variable
missing_count <- sapply(projet_2024, function(x) sum(is.na(x)))

# Afficher le nombre de valeurs manquantes par variable
print(missing_count)

View(projet_2024)
str(projet_2024)

#################################################################################

################        Conversion en as.facteur           #####################


###################################################################################
# Conversion comme as.factor des variables
projet_2024$genre_ok <- as.factor(projet_2024$genre)
projet_2024$diplome_ok <- as.factor(projet_2024$diplome)
projet_2024$fumeur_ok <- as.factor(projet_2024$fumeur)
projet_2024$indice_mass_cor_ok <- as.factor(projet_2024$indice_mass_cor)
projet_2024$taux_chol_ok <- as.factor(projet_2024$taux_chol)
projet_2024$taux_glucose_ok <- as.factor(projet_2024$taux_glucose)
projet_2024$diabetique_ok <- as.factor(projet_2024$diabetique)
projet_2024$a_hypertension_ok <- as.factor(projet_2024$A_hypertension)
projet_2024$a_fait_uneattaque_ok <- as.factor(projet_2024$A_fait_une_attaque)
projet_2024$age_ok <- as.factor(projet_2024$Age)
projet_2024$diplome_ok <- as.factor(projet_2024$diplome)
projet_2024$sous_traitement_ok <- as.factor(projet_2024$sous_traitement)
projet_2024$genre_ok <- as.factor(projet_2024$genre)
projet_2024$rythme_card_ok <- as.factor(projet_2024$rythme_card)

###############################################################################
################################################################################






################################################################################

###############         CONSTRUCTION DU MODELE            #####################

################################################################################


####################################################################################
##################################################################################
#################################################################################
################################################################################
#####################################################################################
###################################################################################
################################################################################
#################################################################################
###############################################################################
# Appliquer des transformations aux variables spécifiques
# Transformer les variables en binaire

projet_2024$genre_ok <- as.numeric(projet_2024$genre_ok == "Homme")
projet_2024$sous_traitement_ok <- as.numeric(projet_2024$sous_traitement_ok == "oui")
projet_2024$a_fait_uneattaque_ok <- as.numeric(projet_2024$a_fait_uneattaque_ok == "oui")
projet_2024$a_hypertension_ok <- as.numeric(projet_2024$a_hypertension_ok == "oui")
projet_2024$diabetique_ok <- as.numeric(projet_2024$diabetique_ok == "oui")
projet_2024$fumeur_ok <- as.numeric(projet_2024$fumeur_ok == 'oui')
projet_2024$diplome_ok <- as.numeric(projet_2024$diplome_ok)
projet_2024$indice_mass_cor_ok <- as.numeric(projet_2024$indice_mass_cor_ok)
projet_2024$taux_chol_ok <- as.numeric(projet_2024$taux_chol_ok)
projet_2024$taux_glucose_ok <- as.numeric(projet_2024$taux_glucose_ok)
projet_2024$diplome_ok <- as.numeric(projet_2024$diplome_ok)
projet_2024$age_ok <- as.numeric(projet_2024$age_ok)
projet_2024$rythme_card_ok <- as.numeric(projet_2024$rythme_card_ok)

###############################################################################
## Explicatives qualitative pas de carre car 0 au carre = 0 et 1 au carre = 1
##############################################################################
# Carré des variables explicatives
projet_2024$Age_carre <- projet_2024$age_ok^2
projet_2024$taux_glucose_carre <- projet_2024$taux_glucose_ok^2
projet_2024$taux_chol_carre <- projet_2024$taux_chol_ok^2
projet_2024$rythme_card_carre <- projet_2024$rythme_card_ok^2
projet_2024$indice_mass_cor_carre <- projet_2024$indice_mass_cor_ok^2
projet_2024$genre_carre <- projet_2024$genre_ok^2
projet_2024$fumeur_carre <- projet_2024$fumeur_ok^2
projet_2024$sous_traitement_carre <- projet_2024$sous_traitement_ok^2
projet_2024$A_fait_une_attaque_carre <- projet_2024$a_fait_uneattaque_ok^2
projet_2024$diabetique_carre <- projet_2024$diabetique_ok^2
projet_2024$diplome_carre <- projet_2024$diplome_ok^2


# Appliquer la transformation exponentielle aux variables 
projet_2024 <- projet_2024 %>%
  mutate(
    Age_exp = exp(age_ok),
    taux_glucose_exp = exp(taux_glucose_ok),
    taux_chol_exp = exp(taux_chol_ok),
    rythme_card_exp = exp(rythme_card_ok),
    indice_mass_cor_exp = exp(indice_mass_cor_ok),
    genre_exp = exp(genre_ok),
    fumeur_exp = exp(fumeur_ok),
    sous_traitement_exp = exp(sous_traitement_ok),
    A_fait_une_attaque_exp = exp(a_fait_uneattaque_ok),
    diabetique_exp = exp(diabetique_ok),
    diplome_exp = exp(diplome_ok)
  )

#Appliquer la transformation logarithmique aux variables
projet_2024 <- projet_2024 %>%
  mutate(
    Age_log = log(age_ok),
    taux_glucose_log = log(taux_glucose_ok),
    taux_chol_log = log(taux_chol_ok),
    rythme_card_log = log(rythme_card_ok),
    indice_mass_cor_log = log(indice_mass_cor_ok),
    diplome_log = log(diplome_ok)
  )
###############################################################################
################################################################################
################################################################################
####################################################################################
##################################################################################
#################################################################################
################################################################################
#####################################################################################






################################################################################

############   Justificatif du choix du modele logistique          #############


###################################################################################
# Convertir les valeurs en numérique 
projet_2024$atteind_maladie_coro <- as.numeric(projet_2024$atteind_maladie_coro == "oui")

M0 <- glm(atteind_maladie_coro ~ 1, data = projet_2024, family = binomial)

#La variable Genre
# Initialisation du modèle avec une seule variable
M1 <- glm(atteind_maladie_coro ~ genre_ok, data = projet_2024, family = binomial)
M1a <- glm(atteind_maladie_coro ~  genre_carre, data = projet_2024, family = binomial)
M1b <- glm(atteind_maladie_coro ~  genre_exp, data = projet_2024, family = binomial)


AIC(M1, M1a)
BIC(M1, M1a)

AIC(M1, M1b)
BIC(M1, M1b) # On garde M1 sur le critere BIC



#La variable Age
M2 <- update(M1, . ~ . + age_ok)

M2a <- update(M1, . ~ . + Age_exp)
M2b <- update(M1, . ~ . + Age_log)
M2c <- update(M1, . ~ . + Age_carre)
AIC(M1, M2)
BIC(M1, M2)

AIC(M1, M2a)
BIC(M1, M2a)

AIC(M1, M2b)
BIC(M1, M2b) #On maintient M2 sur le critere AIC

AIC(M1, M2c)
BIC(M1, M2c)

lrtest(M2, M1) 




#La variable sous_traitement
M3 <- update(M2, . ~ . + sous_traitement_ok)
M3a <- update(M2, . ~ . + sous_traitement_carre)
M3b <- update(M2, . ~ . + sous_traitement_exp)

AIC(M3, M2)
BIC(M3, M2)

AIC(M3a, M2)
BIC(M3a, M2)

AIC(M3b, M2)
BIC(M3b, M2) #On maintient M3 sur BIC 
lrtest(M2b, M3)





#La variable fumeur

M4 <- update(M3, . ~ . + fumeur_ok)
M4a <- update(M3, . ~ . + fumeur_carre)
M4b <- update(M3, . ~ . + fumeur_exp)



#Tests statistiques
AIC(M3,M4)
BIC(M3,M4)

AIC(M3,M4a)
BIC(M3,M4a)

AIC(M3,M4b)#On retient M3 sur le critere d'AIC
BIC(M3,M4b)
lrtest(M3, M4)
waldtest(M3,M4)








# La variable a_fait_une_attaque
M5 <- update(M3, . ~ . + a_fait_uneattaque_ok)
M5a <- update(M3, . ~ . + A_fait_une_attaque_carre)
M5b <- update(M3, . ~ . + A_fait_une_attaque_exp)

AIC(M3,M5)  #On maintient M3 sur le critere AIC car M5 apporte moins d'information
AIC(M3,M5a)
AIC(M3,M5b)
lrtest(M3, M5)
waldtest(M3,M5)



# La variable A_hypertension
M6 <- update(M3, . ~ . + a_hypertension_ok)

#Tests statistiques
lrtest(M3, M6)
waldtest(M3, M6)
AIC(M3,M6) #On maintient M6 sur le critere d'AIC
BIC(M3,M6)



#La variable diabetique
M7 <- update(M6, . ~ . + diabetique_ok)

lrtest(M6, M7)
waldtest(M6, M7)
AIC(M6,M7) # On maintient M7 sur le critere d'AIC
BIC(M6,M7)


#La variable Taux de cholesterol
M8 <- update(M7, . ~ . + taux_chol_ok)
M8a <- update(M7, . ~ . + taux_chol_carre)
M8b <- update(M7, . ~ . + taux_chol_log)
M8c <- update(M7, . ~ . + taux_chol_exp)

AIC(M7,M8) 
BIC(M7,M8)

AIC(M7,M8a) 
BIC(M7,M8a)

AIC(M7,M8b) 
BIC(M7,M8b)

AIC(M7,M8c) # On maintient M8b sur le critere AIC
BIC(M7,M8c)




lrtest(M7, M8b)
waldtest(M7, M8b)




# La variable indice_masse_cor
M9 <- update(M8b, . ~ . + indice_mass_cor_ok) 
M9a <- update(M8b, . ~ . + indice_mass_cor_carre)
M9b <- update(M8b, . ~ . + indice_mass_cor_log)
M9c <- update(M8b, . ~ . + indice_mass_cor_exp)

AIC(M8b,M9) 
BIC(M8b,M9)

AIC(M8b,M9a) 
BIC(M8b,M9a)

AIC(M8b,M9b) 
BIC(M8b,M9b)

AIC(M8b,M9c) 
BIC(M8b,M9c)


lrtest(M8b, M9) # On maintient M8b sur le critere d'AIC


# La variable rythme cardiaque
M10 <- update(M8b, . ~ . + rythme_card_ok)
M10a <- update(M8b, . ~ . + rythme_card_exp)
M10b <- update(M8b, . ~ . + rythme_card_carre)
M10c <- update(M8b, . ~ . + rythme_card_log)


AIC(M8b,M10) 
BIC(M8b,M10)

AIC(M8b,M10a) 
BIC(M8b,M10a)

AIC(M8b,M10b) 
BIC(M8b,M10b)

AIC(M8b,M10c) #On maintient M8b sur le critere d'AIC
BIC(M8b,M10c)
lrtest(M8b, M10)



# La variable  taux de glucose
M11 <- update(M8b, . ~ . + taux_glucose)
M11a <- update(M8b, . ~ . + taux_glucose_carre)
M11b <- update(M8b, . ~ . + taux_glucose_exp)
M11c <- update(M8b, . ~ . + taux_glucose_log)

AIC(M8b,M11) 
BIC(M8b,M11)

AIC(M8b,M11a) 
BIC(M8b,M11a)

AIC(M8b,M11b) 
BIC(M8b,M11b) #On maintient M11b sur le critere AIC

AIC(M8b,M11c) 
BIC(M8b,M11c)

lrtest(M8b, M11b)

    

# La variable rythme diplome
M12 <- update(M11b, . ~ . + diplome)
M12a <- update(M11b, . ~ . + diplome_carre)
M12b <- update(M11b, . ~ . + diplome_exp)
M12c <- update(M11b, . ~ . + diplome_log)

AIC(M11b,M12) 
BIC(M11b,M12)

AIC(M11b,M12a) 
BIC(M11b,M12a)

AIC(M11b,M12b) 
BIC(M11b,M12b)

AIC(M11b,M12c) 
BIC(M11b,M12c)

       #On maintient M12 sur le critere BIC
lrtest(M11b, M12)

formula <- as.formula("target_variable ~ .")  # Définissez la formule de votre modèle




###############################################################################
# Les modeles potentiellement choisient
M12 <- glm(atteind_maladie_coro ~ genre_ok + age_ok + sous_traitement_ok + 
             a_hypertension_ok + diabetique_ok + taux_chol_log + taux_glucose_exp + 
             diplome
            , data = projet_2024, family = binomial)


#Ajout de la variable fumeur 
M12a <- glm(atteind_maladie_coro ~ genre_ok + age_ok + sous_traitement_ok + 
              a_hypertension_ok + diabetique_ok + taux_chol_log + taux_glucose_exp + 
              diplome + fumeur_ok
            , data = projet_2024, family = binomial)


#Ajout de la variable a_fait_une_attaque
M12b <- glm(atteind_maladie_coro ~ genre_ok + age_ok + sous_traitement_ok + 
              a_hypertension_ok + diabetique_ok + taux_chol_log + taux_glucose_exp + 
              diplome + fumeur_ok + a_fait_uneattaque_ok
            , data = projet_2024, family = binomial)

#Ajout de la variable indice_mass_cor
M12c <- glm(atteind_maladie_coro ~ genre_ok + age_ok + sous_traitement_ok + 
              a_hypertension_ok + diabetique_ok + taux_chol_log + taux_glucose_exp + 
              diplome + fumeur_ok + a_fait_uneattaque_ok + indice_mass_cor_ok
  , data = projet_2024, family = binomial)


#Ajout de la variable rythme cardiaque
M12d <- glm(atteind_maladie_coro ~ genre_ok + age_ok + sous_traitement_ok + 
              a_hypertension_ok + diabetique_ok + taux_chol_log + taux_glucose_exp + 
              diplome + fumeur_ok + a_fait_uneattaque_ok + indice_mass_cor_ok + rythme_card_ok
            , data = projet_2024, family = binomial)


# Prédiction des modèles 
projet_2024$pr_M9 <- predict(M12, type = "response")
projet_2024$pr_M10 <- predict(M12a, type = "response")
projet_2024$pr_M12 <- predict(M12b, type = "response")
projet_2024$pr_M13 <- predict(M12c, type = "response")
projet_2024$pr_M14 <- predict(M12d, type = "response")




# Chargement des bibliothèques nécessaires
library(ggplot2)
library(pROC)

# Calcul des courbes ROC
roc0 <- roc(projet_2024$atteind_maladie_coro, projet_2024$pr_M9)
roc1 <- roc(projet_2024$atteind_maladie_coro, projet_2024$pr_M10)
roc2 <- roc(projet_2024$atteind_maladie_coro, projet_2024$pr_M12)
roc3 <- roc(projet_2024$atteind_maladie_coro, projet_2024$pr_M13)
roc4 <- roc(projet_2024$atteind_maladie_coro, projet_2024$pr_M14)



# Tracé des courbes ROC
plot(roc0, col = "yellow")
plot(roc1, add = TRUE, col = 'red')
plot(roc2, add = TRUE, col = 'green')
plot(roc3, add = TRUE, col = 'black')
plot(roc4, add = TRUE, col = 'violet')






# Calcul des AUC
auc(roc0)
auc(roc1)
auc(roc2)
auc(roc3)
auc(roc4)













library(memisc)



#################################################################################

########  CONSTRUCTION D'UN TABLEAU DE SYNTHESE DES MODELES         ############


###############################################################################
# Création de la table de régression avec les cinq modèles


table1 <-mtable(M0,M12, M12a, M12b,M12c,M12d,summary.stats=TRUE)
table1 <-mtable(M0,M12, M12a, M12b,M12c,M12d,
                summary.stats=c("McFadden R-sq.", "Log-likelihood","Likelihood-ratio", "AIC","N"))
(table1 <- relabel(table1,
                   "(Intercept)" = "Constante"
))





M12a <- glm(atteind_maladie_coro ~ genre_ok + age_ok + sous_traitement_ok + 
              a_hypertension_ok + diabetique_ok + taux_chol_log + taux_glucose_exp + 
              diplome + fumeur_ok
            , data = projet_2024, family = binomial)
summary(M12a)
exp(coef(M12a))
roc1$thresholds
roc1$sensitivities
roc1$specificities
roctable = data.frame("seuil"= roc1$thresholds, "se" = roc1$sensitivities, "sp" = roc1$specificities)
# Seuil pour la prévision

#index de youden
roctable$youden = roctable$se + roctable$sp - 1
roctable$youden
# �cart entre Se et Sp (maximisation du produit)
roctable$dif = abs(roctable$se - roctable$sp)
# Seuil pour la prévision
#index de youden
roctable$youden = roctable$se + roctable$sp - 1
# ecart entre Se et Sp (maximisation du produit)
roctable$dif = abs(roctable$se - roctable$sp)
roctable$prod = roctable$se * roctable$sp
#distance au mod�le parfait
roctable$dist = ((1-roctable$sp)^2 + (1-roctable$se)^2 )^0.5
# % paires concordantes : repond�ration de Se et Sp
prop.table(table(atteind_maladie_coro))
roctable$accuracy = 0.1197479 * roctable$se + 0.8802521 * roctable$sp
# % paires concordantes : repond�ration de Se et Sp
prop.table(table(atteind_maladie_coro))
###Graph / seuil
plot(roctable$seuil, roctable$se,  col="green")
points(roctable$seuil, roctable$sp, col="red")
points(roctable$seuil, roctable$youden, col="blue")
points(roctable$seuil, roctable$dist, col="purple")
points(roctable$seuil, roctable$accuracy, col="orange")
#Recherche des seuils optimaux
#youden max
which.max(roctable$youden)
(points = c("Inf",sort(roctable$seuil)))[which.max(roctable$youden)+1]
#ou directement :
coords(roc1, "best",  transpose = FALSE, best.method="youden")
#Distance minimale au modele parfait
coords(roc1, "best",  transpose = FALSE, best.method="closest.topleft")
# Ajouter une ligne verticale pour le seuil optimal basé sur l'index de Youden
seuil_optimal <- (points = c("Inf", sort(roctable$seuil)))[which.max(roctable$youden) + 1]
abline(v = seuil_optimal, col = "red", lty = 10)


#################################################################################

M12b <- glm(atteind_maladie_coro ~ genre_ok + age_ok + sous_traitement_ok + 
              a_hypertension_ok + diabetique_ok + taux_chol_log + taux_glucose_exp + 
              diplome + fumeur_ok + a_fait_uneattaque_ok
            , data = projet_2024, family = binomial)
summary(M12b)
exp(coef(M12b))
roc3$thresholds
roc3$sensitivities
roc3$specificities
roctable = data.frame("seuil"= roc2$thresholds, "se" = roc2$sensitivities, "sp" = roc2$specificities)
# Seuil pour la prévision
#index de youden
roctable$youden = roctable$se + roctable$sp - 1
# �cart entre Se et Sp (maximisation du produit)
roctable$dif = abs(roctable$se - roctable$sp)
roctable$prod = roctable$se * roctable$sp
#distance au mod�le parfait
roctable$dist = ((1-roctable$sp)^2 + (1-roctable$se)^2 )^0.5
# % paires concordantes : repond�ration de Se et Sp

# % paires concordantes : repond�ration de Se et Sp
prop.table(table(atteind_maladie_coro))
roctable$accuracy = 0.1197479 * roctable$se + 0.8802521 * roctable$sp
# % paires concordantes : repond�ration de Se et Sp
prop.table(table(atteind_maladie_coro))
###Graph / seuil
plot(roctable$seuil, roctable$se,  col="green")
points(roctable$seuil, roctable$sp, col="red")
points(roctable$seuil, roctable$youden, col="blue")
points(roctable$seuil, roctable$dist, col="purple")
points(roctable$seuil, roctable$accuracy, col="orange")
#Recherche des seuils optimaux
#youden max
which.max(roctable$youden)
(points = c("Inf",sort(roctable$seuil)))[which.max(roctable$youden)+1]
#ou directement :
coords(roc2, "best",  transpose = FALSE, best.method="youden")
#Distance minimale au modele parfait
coords(roc2, "best",  transpose = FALSE, best.method="closest.topleft")

# Ajouter une ligne verticale pour le seuil optimal basé sur l'index de Youden
seuil_optimal <- (points = c("Inf", sort(roctable$seuil)))[which.max(roctable$youden) + 1]
abline(v = seuil_optimal, col = "red", lty = 10)


###############################################################################
#Recherche des seuils optimaux
#youden max
which.max(roctable$youden)
(points = c("Inf",sort(roctable$seuil)))[which.max(roctable$youden)+1]
#ou directement :
coords(roc2, "best",  transpose = FALSE, best.method="youden")
#Distance minimale au modele parfait
coords(roc2, "best",  transpose = FALSE, best.method="closest.topleft")

#### Choix final: le modele M12a_ok car il predit aussi bien que le M12a (taux d'erreur presque egale) et est tres parcimonieux
M12a_ok <- glm(atteind_maladie_coro ~ genre_ok + age_ok + sous_traitement_ok + 
              a_hypertension_ok + diabetique_ok + taux_chol_log + taux_glucose_exp + 
              diplome + fumeur_ok
            , data = projet_2024, family = binomial)
summary(M12a_ok)
## transormation des coefs tous positif: Les coefficients sont deja tous positifs sauf diplome
# Convertir la variable diplome_ok en facteur non ordonné
projet_2024$diplome_ok <- factor(projet_2024$diplome_ok, levels = c("1", "2", "3", "4"), labels = c("brevet","Bac", "Études pro", "Études universitaires"))


M12a_ok <- glm(atteind_maladie_coro ~ genre_ok + age_ok + sous_traitement_ok + 
              a_hypertension_ok + diabetique_ok + taux_chol_log + taux_glucose_exp + 
              diplome_ok + fumeur_ok
            , data = projet_2024, family = binomial)
summary(M12a_ok)
exp(coef(M12a_ok))
#Recuperation de la liste des coeffs
scores = data.frame("coef"=coef(M12a_ok))
scores
#Profil avec XB max -> note de 100 ; profil de REF : note = 0
#valeur de XB (modulo constante) pour profil avec proba max
max_score = coef(M12a_ok)[2] + coef(M12a_ok)[3] + coef(M12a_ok)[4] + coef(M12a_ok)[5] + coef(M12a_ok)[6] + coef(M12a_ok)[7] + coef(M12a_ok)[8] + coef(M12a_ok)[9]  + coef(M12a_ok)[10] + coef(M12a_ok)[11] 
max_score
# changement d'echelle des coeffs
scores$scores = round(scores$coef*100/max_score)
#recherche de la valeur du score predit Y=1 selon cutpoint youden:
prob=(points = c("Inf",sort(roctable$seuil)))[which.max(roctable$youden)+1]
prob = as.numeric(prob)
prob
#valeur de XB correspondant au seuil optimal de youden :
xb = log(prob/(1-prob))
# neutralisation de constante
xb = xb - coef(M12a_ok)[1]
xb
score_seuil = round(xb*100/max_score)
score_seuil
scores$scores
# Le score seuil est 45


