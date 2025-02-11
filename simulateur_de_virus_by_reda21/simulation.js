export class Simulation {
  constructor(virus, worldMap) {
    this.virus = virus;
    this.worldMap = worldMap;
    this.infectedCountries = new Set([virus.startCountry]);
    
    // Initialise les statistiques par pays
    this.countryStats = {};
    this.worldMap.countries.forEach(country => {
      this.countryStats[country.id] = {
        infected: 0,
        healthy: country.properties.population,
        dead: 0
      };
    });

    // Débuter avec des infections initiales dans le pays de départ
    const startCountry = this.worldMap.countries.find(c => c.id === virus.startCountry);
    this.countryStats[virus.startCountry].infected = 100;
    this.countryStats[virus.startCountry].healthy -= 100;

    // Calculer les statistiques globales
    this.updateTotalStats();

    this.gameSpeed = 1;
    this.isPaused = false;
    this.newsUpdateInterval = 15000;
    this.lastNewsUpdate = Date.now();
    this.totalDays = 0;
    
    this.globalResearch = 0;
    this.researchProgress = 0;
    this.vaccineAvailable = false;
    this.researchPointsNeeded = 10000;
    this.cureDevelopmentStarted = false;
    this.globalPanic = 0;
    this.lockdownThreshold = 70;
    this.worldMap.countries.forEach(country => {
      country.properties.lockdown = false;
      country.properties.vaccinated = 0;
      country.properties.healthcare = Math.random() * 0.7 + 0.3;
      country.properties.gdp = Math.random() * 0.7 + 0.3;
    });
    
    this.currentDate = new Date();
    this.endDate = new Date('2199-12-31');
    this.dayLength = 1000;
    
    // Intégration du système d'événements
    this.eventSystem = null;
  }

  updateTotalStats() {
    this.stats = Object.values(this.countryStats).reduce((total, stats) => {
      return {
        infected: total.infected + stats.infected,
        healthy: total.healthy + stats.healthy,
        dead: total.dead + stats.dead
      };
    }, { infected: 0, healthy: 0, dead: 0 });
  }

  formatDate(date) {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  start() {
    this.updateDisplay();
    this.simulationInterval = setInterval(() => this.tick(), this.dayLength / this.gameSpeed);
    this.addGameControls();
    this.generateNews("Un nouveau virus a été détecté ! Les scientifiques s'inquiètent de son potentiel de propagation.");
  }

  pause() {
    this.isPaused = true;
    clearInterval(this.simulationInterval);
  }

  resume() {
    this.isPaused = false;
    this.simulationInterval = setInterval(() => this.tick(), this.dayLength / this.gameSpeed);
  }

  setSpeed(speed) {
    this.gameSpeed = speed;
    if (!this.isPaused) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = setInterval(() => this.tick(), this.dayLength / this.gameSpeed);
    }
  }

  async generateNews(initialMessage = null) {
    try {
      if (initialMessage) {
        this.displayNewsItem(initialMessage);
        return;
      }

      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Génère un titre de nouvelle réaliste concernant une épidémie de virus. Contexte : ${this.infectedCountries.size} pays infectés, ${this.stats.infected.toLocaleString()} personnes infectées, ${this.stats.dead.toLocaleString()} décès.
          
          interface Response {
            headline: string;
          }
          
          {
            "headline": "L'Organisation Mondiale de la Santé déclare l'état d'urgence alors que le virus se propage dans 12 nouveaux pays"
          }
          `,
          data: {
            infected: this.stats.infected,
            dead: this.stats.dead,
            countries: this.infectedCountries.size
          }
        })
      });

      const data = await response.json();
      this.displayNewsItem(data.headline);
    } catch (error) {
      console.error('Échec de la génération des actualités:', error);
    }
  }

  displayNewsItem(text) {
    const newsContainer = document.getElementById('news-container');
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    
    const date = document.createElement('div');
    date.className = 'date';
    date.textContent = this.formatDate(this.currentDate);
    
    const content = document.createElement('div');
    content.textContent = text;
    
    newsItem.appendChild(date);
    newsItem.appendChild(content);
    
    newsContainer.insertBefore(newsItem, newsContainer.firstChild);
    
    while (newsContainer.children.length > 5) {
      newsContainer.removeChild(newsContainer.lastChild);
    }
  }

  tick() {
    if (this.isPaused) return;
    
    this.totalDays++;
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    
    if (this.currentDate > this.endDate) {
      this.gameOver();
      return;
    }
    
    // Mise à jour du système d'événements
    if (this.eventSystem) {
      this.eventSystem.generateEvent();
      this.eventSystem.update();
    }
    
    this.updateGlobalPanic();
    this.considerLockdowns();
    this.spreadVirus();
    this.calculateCasualties();
    this.updateResearch();
    this.attemptVirusMutation();
    this.updateVaccineProgress();
    this.updateDisplay();
    
    if (Date.now() - this.lastNewsUpdate >= this.newsUpdateInterval) {
      this.generateNews();
      this.lastNewsUpdate = Date.now();
    }

    if (this.stats.healthy <= 0 || (this.stats.infected <= 0 && this.totalDays > 10)) {
      this.gameOver();
    }
  }

  updateGlobalPanic() {
    const infectionRate = this.stats.infected / (this.stats.infected + this.stats.healthy);
    const deathRate = this.stats.dead / (this.stats.infected + this.stats.healthy + this.stats.dead);
    
    this.globalPanic = Math.min(100, 
      (infectionRate * 50) + (deathRate * 200) + 
      (this.infectedCountries.size / this.worldMap.countries.length * 50)
    );
  }

  considerLockdowns() {
    this.worldMap.countries.forEach(country => {
      if (!country.properties.lockdown && 
          this.infectedCountries.has(country.id) && 
          this.globalPanic > this.lockdownThreshold) {
        if (Math.random() < 0.1) { 
          country.properties.lockdown = true;
          this.generateNews(`${country.properties.name} a instauré un confinement !`);
        }
      } else if (country.properties.lockdown && this.globalPanic < this.lockdownThreshold * 0.7) {
        if (Math.random() < 0.05) { 
          country.properties.lockdown = false;
          this.generateNews(`${country.properties.name} a levé les mesures de confinement.`);
        }
      }
    });
  }

  spreadVirus() {
    const newInfections = new Set();
    const eventMultiplier = this.eventSystem ? this.eventSystem.getSpreadMultiplier() : 1;
    
    this.infectedCountries.forEach(countryId => {
      const country = this.worldMap.countries.find(c => c.id === countryId);
      const countryStats = this.countryStats[countryId];
      
      // Ajuster la probabilité de propagation en fonction des restrictions de voyage et des confinements
      const travelFactor = country.properties.lockdown ? 0.3 : 1;
      
      // Propagation vers les pays voisins par voyage aérien/maritime
      if (Math.random() < 0.15 * travelFactor) { 
        this.getNeighboringCountries(country).forEach(neighbor => {
          if (!this.infectedCountries.has(neighbor.id)) {
            const spreadProbability = this.virus.calculateSpreadProbability(country, neighbor) * 
              0.25 * eventMultiplier * travelFactor;
            
            if (Math.random() < spreadProbability) {
              newInfections.add(neighbor.id);
              this.countryStats[neighbor.id].infected = Math.floor(neighbor.properties.population * 0.0001);
              this.countryStats[neighbor.id].healthy -= this.countryStats[neighbor.id].infected;
              this.createInfectionParticle(country, neighbor);

              // Générer des actualités liées aux voyages
              if (Math.random() < 0.3) {
                this.generateTravelNews(country, neighbor);
              }
            }
          }
        });
      }

      // Propagation vers les pays frontaliers
      this.getBorderingCountries(country).forEach(borderingCountry => {
        if (!this.infectedCountries.has(borderingCountry.id)) {
          const spreadProbability = this.virus.calculateSpreadProbability(country, borderingCountry) * 0.1;
          if (Math.random() < spreadProbability) {
            newInfections.add(borderingCountry.id);
            this.countryStats[borderingCountry.id].infected = Math.floor(borderingCountry.properties.population * 0.00005);
            this.countryStats[borderingCountry.id].healthy -= this.countryStats[borderingCountry.id].infected;
            this.generateNews(`Propagation du virus : ${country.properties.name} partage une frontière avec ${borderingCountry.properties.name}`);
          }
        }
      });
      
      const spreadRate = this.virus.infectivity * 0.01 * eventMultiplier;
      const newCases = Math.floor(countryStats.healthy * spreadRate * 0.01);
      if (countryStats.healthy > newCases) {
        countryStats.infected += newCases;
        countryStats.healthy -= newCases;
      }
    });

    newInfections.forEach(id => this.infectedCountries.add(id));
    this.updateTotalStats();
    this.updateInfectedCountries();
  }

  attemptVirusMutation() {
    const mutation = this.virus.attemptMutation();
    if (mutation) {
      this.generateNews(`Mutation du virus détectée : ${mutation.name} - ${mutation.description}`);
    }
  }

  updateResearch() {
    const researchIncrease = Array.from(this.infectedCountries).reduce((acc, countryId) => {
      const country = this.worldMap.countries.find(c => c.id === countryId);
      return acc + (country.properties.gdp * 0.5);
    }, 0);

    this.globalResearch += researchIncrease;
    
    if (this.globalResearch >= this.researchPointsNeeded && !this.cureDevelopmentStarted) {
      this.cureDevelopmentStarted = true;
      this.generateNews("Le développement d'un remède global a commencé !");
    }
  }

  updateVaccineProgress() {
    if (this.cureDevelopmentStarted) {
      this.researchProgress += (this.globalResearch / 10000);
      
      if (this.researchProgress >= 100 && !this.vaccineAvailable) {
        this.vaccineAvailable = true;
        this.generateNews("Un vaccin a été développé ! Les pays commencent les programmes de vaccination.");
      }
      
      if (this.vaccineAvailable) {
        this.worldMap.countries.forEach(country => {
          if (country.properties.vaccinated < 1) {
            country.properties.vaccinated += (country.properties.gdp * 0.01);
          }
        });
      }
    }
  }

  calculateCasualties() {
    this.infectedCountries.forEach(countryId => {
      const country = this.worldMap.countries.find(c => c.id === countryId);
      const countryStats = this.countryStats[countryId];
      const mortality = this.virus.calculateMortalityRate(country);
      
      const newDeaths = Math.floor(countryStats.infected * mortality * 0.01);
      countryStats.dead += newDeaths;
      countryStats.infected -= newDeaths;
      
      // Mettre à jour la population totale du pays
      country.properties.population -= newDeaths;
    });
    this.updateTotalStats();
  }

  getNeighboringCountries(country) {
    return this.worldMap.countries.filter(c => 
      c.id !== country.id && Math.random() < 0.1
    );
  }

  // Déterminer les pays frontaliers (approximation grossière)
  getBorderingCountries(country) {
    const countryBorders = this.worldMap.svg.select(`#country-${country.id}`).node().getBoundingClientRect();

    // Filtrer les pays en fonction de la proximité
    return this.worldMap.countries.filter(otherCountry => {
      if (otherCountry.id === country.id) return false;
      const otherBorders = this.worldMap.svg.select(`#country-${otherCountry.id}`).node().getBoundingClientRect();

      // Test de proximité basé sur la somme des coordonnées
      const distanceThreshold = 50; // Seuil pour considérer les pays comme voisins
      const distance = Math.abs(countryBorders.x - otherBorders.x) + Math.abs(countryBorders.y - otherBorders.y);

      return distance < distanceThreshold;
    });
  }

  createInfectionParticle(source, target) {
    const sourcePoint = this.worldMap.path.centroid(source);
    const targetPoint = this.worldMap.path.centroid(target);

    // Déterminer s'il faut utiliser un bateau ou un avion selon la côte
    const useBoat = this.isCoastalRoute(source, target);
    
    // Créer un chemin courbé
    const dx = targetPoint[0] - sourcePoint[0];
    const dy = targetPoint[1] - sourcePoint[1];
    const dr = Math.sqrt(dx * dx + dy * dy);
    const sweep = Math.random() < 0.5 ? 0 : 1;
    
    const pathData = `M${sourcePoint[0]},${sourcePoint[1]}A${dr},${dr} 0 0,${sweep} ${targetPoint[0]},${targetPoint[1]}`;
    
    // Ajouter le chemin de déplacement
    const travelPath = this.worldMap.svg
      .append('path')
      .attr('class', 'airplane-path')
      .attr('d', pathData);

    // Créer le symbole du véhicule (avion ou bateau)
    const vehicle = this.worldMap.svg
      .append('path')
      .attr('class', useBoat ? 'boat' : 'airplane')
      .attr('d', useBoat ? 
        'M-2,-1 L2,-1 L3,0 L2,1 L-2,1 L-3,0 Z' : // Forme bateau
        'M-4,-4 L4,0 L-4,4 L-2,0 Z') // Forme avion agrandi
      .attr('transform', `translate(${sourcePoint[0]},${sourcePoint[1]})`);

    // Calculer l'angle de rotation du véhicule
    const angle = Math.atan2(targetPoint[1] - sourcePoint[1], targetPoint[0] - sourcePoint[0]) * 180 / Math.PI;

    // Animer le véhicule le long du chemin
    vehicle
      .transition()
      .duration(useBoat ? 3000 : 2000) // Les bateaux vont plus lentement
      .attrTween('transform', () => {
        return (t) => {
          const p = travelPath.node().getPointAtLength(t * travelPath.node().getTotalLength());
          return `translate(${p.x},${p.y}) rotate(${angle})`;
        };
      })
      .on('end', () => {
        vehicle.remove();
        travelPath.remove();

        // Ajouter une particule d'infection à destination
        this.worldMap.svg
          .append('circle')
          .attr('class', 'infection-particle')
          .attr('r', 2)
          .attr('cx', targetPoint[0])
          .attr('cy', targetPoint[1])
          .style('opacity', 1)
          .transition()
          .duration(1000)
          .style('opacity', 0)
          .remove();
      });
  }

  isCoastalRoute(country1, country2) {
    // Liste des pays sans accès à la mer (codes ISO numériques)
    const landlockedCountries = new Set([
      // Europe
      40, 203, 348, 492, 498, 499, 688, 705, 807,
      // Asie
      31, 51, 364, 417, 496, 795, 860,
      // Afrique
      108, 226, 231, 426, 454, 646, 686, 800, 894,
      // Amérique du Sud
      68, 600
    ]);
    
    // Si l'un des pays est sans accès, utiliser l'avion
    if (landlockedCountries.has(Number(country1.id)) || 
        landlockedCountries.has(Number(country2.id))) {
      return false;
    }
    
    // Pour les pays côtiers, choisir aléatoirement bateau ou avion
    const distance = this.calculateDistance(country1, country2);
    const boatThreshold = Math.exp(-distance / 1000);
    
    return Math.random() < boatThreshold;
  }

  calculateDistance(country1, country2) {
    const point1 = this.worldMap.path.centroid(country1);
    const point2 = this.worldMap.path.centroid(country2);
    
    const dx = point2[0] - point1[0];
    const dy = point2[1] - point1[1];
    
    return Math.sqrt(dx * dx + dy * dy);
  }

  async generateTravelNews(sourceCountry, targetCountry) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Génère un bref titre de nouvelle concernant la propagation du virus par le biais de voyages internationaux entre ${sourceCountry.properties.name} et ${targetCountry.properties.name}.
          
          interface Response {
            headline: string;
          }
          
          Exemple:
          {
            "headline": "Premier cas de virus au Brésil lié à un voyageur en provenance de Chine"
          }`,
          data: {
            sourceCountry: sourceCountry.properties.name,
            targetCountry: targetCountry.properties.name,
            virusName: this.virus.name
          }
        })
      });

      const data = await response.json();
      this.displayNewsItem(data.headline);
    } catch (error) {
      console.error('Échec de la génération des nouvelles de voyage:', error);
    }
  }

  updateInfectedCountries() {
    this.worldMap.svg.selectAll('.country')
      .attr('class', d => {
        const baseClass = this.infectedCountries.has(d.id) ? 'country infected' : 'country';
        return d.properties.lockdown ? baseClass + ' lockdown' : baseClass;
      })
      .style('fill', d => {
        if (!this.infectedCountries.has(d.id)) return '#3a3a3a';
        
        const countryStats = this.countryStats[d.id];
        const totalPop = countryStats.infected + countryStats.healthy + countryStats.dead;
        const infectionRate = countryStats.infected / totalPop;
        
        // Dégradé de couleur du noir (#000000) au rouge (#ff4757)
        const r = Math.round(255 * (infectionRate * 0.85));
        const g = Math.round(71 * infectionRate);
        const b = Math.round(87 * infectionRate);
        
        return `rgb(${r}, ${g}, ${b})`;
      });
  }

  gameOver() {
    this.pause();
    
    const gameOver = document.createElement('div');
    gameOver.className = 'game-over';
    
    const title = document.createElement('h2');
    title.textContent = this.stats.healthy <= 0 ? 'Virus Victorieux !' : 'Virus Contenu !';
    
    const summary = document.createElement('div');
    summary.className = 'stats-summary';
    summary.innerHTML = `
      <p>Nombre Total de Jours : ${this.totalDays}</p>
      <p>Pays Infectés : ${this.infectedCountries.size}</p>
      <p>Infections Totales : ${this.stats.infected.toLocaleString()}</p>
      <p>Décès Totaux : ${this.stats.dead.toLocaleString()}</p>
    `;
    
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Redémarrer la Simulation';
    restartButton.onclick = () => window.location.reload();
    
    gameOver.appendChild(title);
    gameOver.appendChild(summary);
    gameOver.appendChild(restartButton);
    
    document.body.appendChild(gameOver);
  }

  addGameControls() {
    document.getElementById('pauseSimulation').addEventListener('click', (e) => {
      if (this.isPaused) {
        this.resume();
        e.target.textContent = 'Pause';
        e.target.classList.remove('active');
      } else {
        this.pause();
        e.target.textContent = 'Reprendre';
        e.target.classList.add('active');
      }
    });

    document.getElementById('speedUp').addEventListener('click', () => {
      if (this.gameSpeed < 3) {
        this.setSpeed(this.gameSpeed + 0.5);
      }
    });

    document.getElementById('slowDown').addEventListener('click', () => {
      if (this.gameSpeed > 0.5) {
        this.setSpeed(this.gameSpeed - 0.5);
      }
    });
  }

  updateDisplay() {
    document.getElementById('infected').textContent = 
      this.stats.infected.toLocaleString();
    document.getElementById('healthy').textContent = 
      this.stats.healthy.toLocaleString();
    document.getElementById('dead').textContent = 
      this.stats.dead.toLocaleString();
    
    document.getElementById('global-panic').textContent = 
      `${Math.round(this.globalPanic)}%`;
    document.getElementById('research-progress').textContent = 
      `${Math.round(this.researchProgress)}%`;
    document.getElementById('countries-lockdown').textContent = 
      this.worldMap.countries.filter(c => c.properties.lockdown).length;
    
    document.getElementById('current-date').textContent = this.formatDate(this.currentDate);
    
    document.querySelector('.panic-level').style.width = `${this.globalPanic}%`;
    document.querySelector('.research-progress').style.width = `${this.researchProgress}%`;
  }
}