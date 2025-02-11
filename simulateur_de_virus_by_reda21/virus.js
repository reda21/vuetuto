export class Virus {
  constructor({ name, description, infectivity, lethality, startCountry, mutationRate, resistanceLevel, incubationPeriod }) {
    this.name = name;
    this.description = description;
    this.infectivity = infectivity;
    this.lethality = lethality;
    this.startCountry = startCountry;
    this.mutationRate = mutationRate;
    this.resistanceLevel = resistanceLevel;
    this.incubationPeriod = incubationPeriod;
    
    // Base rates - significantly reduced for slower spread
    this.spreadRate = (infectivity / 100) * 0.05; 
    this.deathRate = (lethality / 100) * 0.05;   
    this.mutationChance = (mutationRate / 100) * 0.001;
    this.mutations = [];

    // New properties affecting spread
    this.resistanceFactor = (resistanceLevel / 100);
    this.incubationFactor = Math.max(0.1, 1 - (incubationPeriod / 100) * 0.5);
  }

  calculateSpreadProbability(country, neighboringCountry) {
    let probability = this.spreadRate;
    
    // Consider lockdown status
    if (country.properties.lockdown) {
      probability *= 0.2; 
    }
    if (neighboringCountry.properties.lockdown) {
      probability *= 0.2;
    }
    
    // Consider population density with reduced effect
    const popDensity = country.properties.population / 1000000;
    probability *= Math.min(0.8, popDensity * 0.05);
    
    // Consider GDP and healthcare factors
    const distance = country.properties.gdp || 1;
    probability *= (1 / (distance + this.resistanceFactor));
    
    // Apply incubation period factor
    probability *= this.incubationFactor;
    
    // Apply mutation effects
    this.mutations.forEach(mutation => {
      probability *= mutation.spreadMultiplier || 1;
    });
    
    return Math.min(probability * 0.5, 0.3); 
  }

  calculateMortalityRate(country) {
    let rate = this.deathRate;
    
    // Healthcare system effectiveness
    const healthcare = country.properties.healthcare || 0.5;
    rate *= (1 - healthcare);
    
    // Lockdown reduces mortality due to better medical attention
    if (country.properties.lockdown) {
      rate *= 0.7;
    }
    
    // Apply mutation effects
    this.mutations.forEach(mutation => {
      rate *= mutation.lethalityMultiplier || 1;
    });
    
    return Math.min(rate, 1);
  }

  attemptMutation() {
    if (Math.random() < this.mutationChance) {
      const mutation = this.generateMutation();
      this.mutations.push(mutation);
      return mutation;
    }
    return null;
  }

  generateMutation() {
    const types = [
      {
        name: "Infectiosité Accrue",
        description: "Le virus est devenu plus contagieux",
        spreadMultiplier: 1.1,  
        lethalityMultiplier: 1
      },
      {
        name: "Létalité Accrue",
        description: "Le virus est devenu plus mortel",
        spreadMultiplier: 1,
        lethalityMultiplier: 1.1  
      },
      {
        name: "Résistance aux Vaccins",
        description: "Le virus a développé une résistance aux vaccins",
        spreadMultiplier: 1.05,
        lethalityMultiplier: 1.05
      },
      {
        name: "Adaptation Environnementale",
        description: "Le virus s'est adapté à différents climats",
        spreadMultiplier: 1.08,
        lethalityMultiplier: 0.95
      },
      {
        name: "Mode Furtif",
        description: "Le virus est devenu plus difficile à détecter",
        spreadMultiplier: 1.15,
        lethalityMultiplier: 0.9
      },
      {
        name: "Spécial Toby Fox",
        description: "Le virus commence à jouer Megalovania",
        spreadMultiplier: 1.1,
        lethalityMultiplier: 0.8
      }
    ];
    
    return types[Math.floor(Math.random() * types.length)];
  }
}