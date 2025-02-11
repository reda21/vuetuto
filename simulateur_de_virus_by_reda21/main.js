import { loadWorldMap } from './mapLoader.js';
import { Virus } from './virus.js';
import { Simulation } from './simulation.js';
import { EventSystem } from './event-system.js';

let simulation;
let worldMap;

function initializeMainMenu() {
  const mobileButton = document.getElementById('mobile-mode');
  const computerButton = document.getElementById('computer-mode');
  const mainMenu = document.getElementById('main-menu');
  const gameContainer = document.getElementById('game-container');

  mobileButton.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    document.body.classList.add('mobile-mode');
    initializeGame();
  });

  computerButton.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    document.body.classList.remove('mobile-mode');
    initializeGame();
  });
}

async function initializeGame() {
  const mapContainer = d3.select('.world-map');
  worldMap = await loadWorldMap(mapContainer, simulation);
  
  const startCountrySelect = document.getElementById('startCountry');
  worldMap.countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.id;
    option.textContent = country.properties.name;
    startCountrySelect.appendChild(option);
  });

  document.getElementById('generateVirus').addEventListener('click', generateVirusProfile);
  document.getElementById('startSimulation').addEventListener('click', startGame);
  initializeRangeValues();
}

async function generateVirusProfile() {
  const name = document.getElementById('virusName').value || 'Virus Inconnu';
  const description = document.getElementById('virusDescription').value;
  const infectivity = parseInt(document.getElementById('infectivity').value);
  const lethality = parseInt(document.getElementById('lethality').value);

  try {
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Génère un profil unique de virus basé sur ces caractéristiques :
        Nom : ${name}
        Description : ${description}
        Infectiosité : ${infectivity}/100
        Létalité : ${lethality}/100

        interface Response {
          profile: string;
          specialAbility: {
            name: string;
            description: string;
            effect: string;
          }
        }
        
        Exemple :
        {
          "profile": "Un virus mystérieux qui combine des éléments numériques et biologiques...",
          "specialAbility": {
            "name": "Infection Numérique",
            "description": "Se propage à la fois dans les réseaux physiques et numériques",
            "effect": "Taux de propagation accru dans les pays technologiquement avancés"
          }
        }`,
        data: {
          name,
          description,
          infectivity,
          lethality
        }
      })
    });

    const data = await response.json();
    const profileDiv = document.getElementById('virusProfile');
    profileDiv.innerHTML = `
      <h3>${name}</h3>
      <p>${data.profile}</p>
      <div class="special-ability">
        <h4>${data.specialAbility.name}</h4>
        <p>${data.specialAbility.description}</p>
        <p><em>${data.specialAbility.effect}</em></p>
      </div>
    `;
    profileDiv.classList.remove('hidden');
  } catch (error) {
    console.error('Échec de la génération du profil du virus:', error);
  }
}

async function startGame() {
  const name = document.getElementById('virusName').value || 'Virus Inconnu';
  const description = document.getElementById('virusDescription').value;
  const infectivity = parseInt(document.getElementById('infectivity').value);
  const lethality = parseInt(document.getElementById('lethality').value);
  const startCountry = document.getElementById('startCountry').value;
  const mutationRate = parseInt(document.getElementById('mutationRate').value);
  const resistanceLevel = parseInt(document.getElementById('resistanceLevel').value);
  const incubationPeriod = parseInt(document.getElementById('incubationPeriod').value);

  const virus = new Virus({
    name,
    description,
    infectivity,
    lethality,
    startCountry,
    mutationRate,
    resistanceLevel,
    incubationPeriod
  });

  simulation = new Simulation(virus, worldMap);
  simulation.eventSystem = new EventSystem(simulation);
  worldMap.simulation = simulation;
  simulation.start();
}

function initializeRangeValues() {
  document.querySelectorAll('input[type="range"]').forEach(input => {
    const valueSpan = input.nextElementSibling;
    valueSpan.textContent = input.value + '%';
    
    input.addEventListener('input', () => {
      valueSpan.textContent = input.value + '%';
    });
  });
}

initializeMainMenu();