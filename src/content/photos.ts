/**
 * Photographies d'illustration (licence Unsplash). Elles ne représentent pas
 * des chantiers réalisés par Maîtrise RGE et doivent être remplacées par des
 * photos réelles dès qu'elles sont disponibles.
 */
export type Photo = { src: string; alt: string; credit: string };

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop`;

export const photos = {
  heroHouse: {
    src: u("1776860150305-108ed577d7d4"),
    alt: "Pompe à chaleur air/eau installée devant une maison en briques, entourée de végétation",
    credit: "alpha innotec",
  },
  pacModern: {
    src: u("1776860155275-eee24bfb1dee"),
    alt: "Unité extérieure de pompe à chaleur le long de la façade d'une maison contemporaine",
    credit: "alpha innotec",
  },
  pacGarden: {
    src: u("1710829558360-6f8f5e49fedd"),
    alt: "Pompe à chaleur air/eau posée sur une dalle dans le jardin d'une maison",
    credit: "alpha innotec",
  },
  pacWood: {
    src: u("1710829558487-53baf9e26003"),
    alt: "Équipement thermodynamique installé contre un bardage en bois",
    credit: "alpha innotec",
  },
  pacFacade: {
    src: u("1776860150272-653efc74193c"),
    alt: "Pompe à chaleur installée sur une pelouse devant une façade moderne",
    credit: "alpha innotec",
  },
  attic: {
    src: u("1591684080176-bb2b73f9ec68"),
    alt: "Technicien éclairé par une lampe frontale travaillant dans des combles isolés",
    credit: "Greg Rosenke",
  },
  atticFloor: {
    src: u("1711375201123-61eddb7804d7"),
    alt: "Intervention dans des combles, sur un plancher en cours de préparation",
    credit: "Simplified Safety",
  },
  facadeWorks: {
    src: u("1593623671658-6b842c7f9697"),
    alt: "Maison en travaux avec échafaudage sur la façade",
    credit: "Brett Jordan",
  },
  insulationWall: {
    src: u("1607400201889-565b1ee75f8e"),
    alt: "Pose d'isolant en laine minérale entre les montants d'un mur",
    credit: "Erik Mclean",
  },
  solarRoofs: {
    src: u("1630608354129-6a7704150401"),
    alt: "Maisons aux toitures équipées de capteurs solaires",
    credit: "Mischa Frank",
  },
  solarHouse: {
    src: u("1655300256335-beef51a914fe"),
    alt: "Maison individuelle avec panneaux photovoltaïques sur la toiture",
    credit: "Watt A Lot",
  },
  solarInstall: {
    src: u("1660330589257-813305a4a383"),
    alt: "Installateur sécurisé par un harnais posant des panneaux sur un toit",
    credit: "Raze Solar",
  },
} satisfies Record<string, Photo>;

export const photoCredits = Array.from(new Set(Object.values(photos).map((p) => p.credit)));
