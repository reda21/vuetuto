<template>
    <!-- Le conteneur où le graphique sera injecté -->
    <h1>virus</h1>
    <div ref="worldmap" style="width: 100%; height: 500px;"></div>
    <p>width: {{ width }} height: {{ height }}</p>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import * as d3 from "d3";
  import * as topojson from "topojson-client";
  import world from "../countries-110m.json";
  //import * as topojson from "topojson-client";
  import type { FeatureCollection } from "geojson";
  
  // Références pour accéder au conteneur et stocker la largeur et la hauteur
  const worldmap = ref<HTMLDivElement | null>(null);
  const width = ref(0);
  const height = ref(0);
  
  onMounted(() => {
    if (worldmap.value) {
      // Récupérer les dimensions du conteneur
      const rect = worldmap.value.getBoundingClientRect();
      width.value = rect.width;
      height.value = rect.height;
  
      // Création du SVG et définition de ses attributs
      const svg = d3
        .select(worldmap.value)
        .append("svg")
        .attr("width", width.value)
        .attr("height", height.value)
        .attr("viewBox", `0 0 ${width.value} ${height.value}`);
  
      // Définition de la projection Mercator
      const projection = d3
        .geoMercator()
        .scale((width.value - 3) / (2 * Math.PI))
        .translate([width.value / 2, height.value / 1.5]);
  
      // Création du générateur de chemins avec la projection
      const path = d3.geoPath().projection(projection);
  
      // Conversion de l'objet JSON en Topology en forçant le typage
      const worldTopology = world as unknown as Topology;
      const countries = topojson.feature(
        worldTopology,
        worldTopology.objects.countries
      ) as FeatureCollection;
  
      console.info("countries", countries);
  
      // Données de population pour certains pays (les clés sont des chaînes)
      const populationData: { [key: string]: number } = {
        "156": 1425671352, // Chine
        "356": 1428627663, // Inde
        "840": 334233854,  // États-Unis
        "360": 277534122,  // Indonésie
        "586": 240485658,  // Pakistan
        "566": 223804632,  // Nigéria
        "76": 215313498,   // Brésil
        "50": 171186372,   // Bangladesh
        "643": 144713314,  // Russie
        "484": 130207371,  // Mexique
        // Quelques pays à population modérée
        "392": 125124989,  // Japon
        "608": 115559009,  // Philippines
        "231": 104353846,  // Éthiopie
        "818": 104258327,  // Égypte
        "276": 83369843,   // Allemagne
        "364": 85028759,   // Iran
        "792": 85341241,   // Turquie
        "704": 97338579,   // Vietnam
        "410": 51744876,   // Corée du Sud
        "250": 67391582,   // France
        // Certains petits pays
        "36": 25688079,    // Australie
        "458": 4850274,    // Malaisie
        "702": 5975689,    // Singapour
        "554": 5185288,    // Nouvelle-Zélande
      };
  
      // Calcul de la population restante et attribution aux pays non listés
      const totalKnownPopulation = Object.values(populationData).reduce(
        (a, b) => a + b,
        0
      );
      const remainingPopulation = 8231613070 - totalKnownPopulation;
      const remainingCountries = countries.features.filter(
        (c) => !populationData[c.id.toString()]
      ).length;
      const averageRemaining = remainingPopulation / remainingCountries;
  
      countries.features.forEach((country) => {
        const id = country.id.toString();
        if (!populationData[id]) {
          populationData[id] = Math.floor(averageRemaining * (0.5 + Math.random()));
        }
        // Assurer que properties est défini
        country.properties = country.properties || {};
        country.properties.population = populationData[id];
      });
  
      // Ajout des chemins pour chaque pays
      svg
        .selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", path as unknown as string) // Utilisation d'un cast pour satisfaire TypeScript
        .attr("fill", "#ccc")
        .attr("stroke", "#333");
    }
  });
  </script>
  
  <style scoped>
  /* Vos styles spécifiques ici */
  </style>
  