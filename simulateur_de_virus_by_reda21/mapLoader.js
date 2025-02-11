export async function loadWorldMap(container, simulation) {
  const width = container.node().getBoundingClientRect().width;
  const height = container.node().getBoundingClientRect().height;

  // Effacer tout SVG existant
  container.selectAll('svg').remove();

  const svg = container
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height]);

  const projection = d3.geoMercator()
    .scale((width - 3) / (2 * Math.PI))
    .translate([width / 2, height / 1.5]);

  const path = d3.geoPath().projection(projection);

  // Charger les données de la carte du monde
  const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
  const world = await response.json();
  const countries = topojson.feature(world, world.objects.countries).features;

  // Ajouter les données de population aux pays
  const populationData = {
    // Pays les plus peuplés (estimations 2023)
    156: 1425671352, // Chine
    356: 1428627663, // Inde
    840: 334233854,  // États-Unis
    360: 277534122,  // Indonésie
    586: 240485658,  // Pakistan
    566: 223804632,  // Nigéria
    76: 215313498,   // Brésil
    50: 171186372,   // Bangladesh
    643: 144713314,  // Russie
    484: 130207371,  // Mexique
    // Ajouter quelques pays avec une population modérée
    392: 125124989,  // Japon
    608: 115559009,  // Philippines
    231: 104353846,  // Éthiopie
    818: 104258327,  // Égypte
    276: 83369843,   // Allemagne
    364: 85028759,   // Iran
    792: 85341241,   // Turquie
    704: 97338579,   // Vietnam
    410: 51744876,   // Corée du Sud
    250: 67391582,   // France
    // Ajouter certains petits pays
    36: 25688079,    // Australie
    458: 4850274,    // Malaisie
    702: 5975689,    // Singapour
    554: 5185288,    // Nouvelle-Zélande
  };

  // Répartir la population restante parmi les autres pays
  const totalKnownPopulation = Object.values(populationData).reduce((a, b) => a + b, 0);
  const remainingPopulation = 8231613070 - totalKnownPopulation;
  const remainingCountries = countries.filter(c => !populationData[c.id]).length;
  const averageRemaining = remainingPopulation / remainingCountries;

  countries.forEach(country => {
    if (!populationData[country.id]) {
      // Population aléatoire pour les pays inconnus autour de la moyenne
      populationData[country.id] = Math.floor(
        averageRemaining * (0.5 + Math.random())
      );
    }
    country.properties.population = populationData[country.id];
  });

  svg.selectAll('path')
    .data(countries)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('id', d => `country-${d.id}`)
    // Fonctionnalité d'infobulle
    .on('mouseover', function(event, d) {
      const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
      
      tooltip.transition()
        .duration(200)
        .style('opacity', .9);
        
      // Afficher la population actuelle et initiale
      const currentStats = simulation?.countryStats?.[d.id] || { dead: 0 };
      const originalPopulation = d.properties.population + currentStats.dead;
        
      tooltip.html(`
        <strong>${d.properties.name}</strong><br>
        Population Actuelle : ${d.properties.population.toLocaleString()}<br>
        Population Initiale : ${originalPopulation.toLocaleString()}<br>
        Décès : ${currentStats.dead.toLocaleString()}<br>
        ${d.properties.lockdown ? 'En Confinement' : ''}
      `)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
    })
    .on('mouseout', function() {
      d3.select('.tooltip').remove();
    });

  return {
    svg,
    simulation,
    projection,
    path,
    countries,
    width,
    height
  };
}