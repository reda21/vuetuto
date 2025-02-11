export class EventSystem {
  constructor(simulation) {
    this.simulation = simulation;
    this.eventChance = 0.05; // 5% de chance par jour
    this.activeEvents = new Set();
    this.eventDurations = {
      political: { min: 30, max: 90 },    // Les événements politiques durent plus longtemps
      disaster: { min: 7, max: 30 },       // Les catastrophes naturelles ont une durée moyenne
      public: { min: 3, max: 14 },         // Les événements publics sont plus courts
      economic: { min: 14, max: 45 }        // Événements économiques
    };
    
    // Historique des événements pour un contexte plus cohérent
    this.eventHistory = [];
    this.maxHistoryLength = 10;
  }

  async generateEvent() {
    if (Math.random() > this.eventChance) return;

    // Pondérer les types d'événements selon la situation actuelle
    const eventWeights = this.calculateEventWeights();
    const eventType = this.selectEventType(eventWeights);
    
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Génère un événement détaillé de type ${eventType} pour l'année ${this.simulation.currentDate.getFullYear()}.
          Contexte Actuel :
          - ${this.simulation.infectedCountries.size} pays infectés
          - Panique globale à ${Math.round(this.simulation.globalPanic)}%
          - Progression de la recherche : ${Math.round(this.simulation.researchProgress)}%
          - Événements récents : ${this.getRecentEventsContext()}
          
          interface Response {
            title: string;
            description: string;
            location: string;
            effects: {
              panicChange: number;         // de -20 à +20
              spreadMultiplier: number;    // de 0.5 à 2.0
              researchChange: number;      // de -10 à +10
              economicImpact: number;      // de -10 à +10
              localizedEffect?: {
                region: string;
                multiplier: number;
              }
            },
            relatedEvents?: string[];      // Références aux événements passés sur lesquels celui-ci se base
          }
          
          Exemple de réponse:
          {
            "title": "Controverse lors du Sommet Mondial de la Santé",
            "description": "Les tensions internationales montent alors que des accusations de dissimulations dans la recherche sur le virus émergent lors du Sommet Mondial de la Santé à Genève",
            "location": "Suisse",
            "effects": {
              "panicChange": 15,
              "spreadMultiplier": 1.1,
              "researchChange": -5,
              "economicImpact": -3,
              "localizedEffect": {
                "region": "Europe",
                "multiplier": 1.3
              }
            },
            "relatedEvents": ["Réunion précédente de l'OMS", "Spéculations sur une fuite de laboratoire"]
          }`,
          data: {
            eventType,
            year: this.simulation.currentDate.getFullYear(),
            infectedCountries: this.simulation.infectedCountries.size,
            globalPanic: this.simulation.globalPanic,
            recentEvents: this.eventHistory.slice(-3)
          }
        })
      });

      const event = await response.json();
      this.triggerEvent(event, eventType);
    } catch (error) {
      console.error("Échec de la génération de l'événement :", error);
    }
  }

  calculateEventWeights() {
    const weights = {
      political: 1,
      disaster: 1,
      public: 1,
      economic: 1
    };

    // Ajuster les poids en fonction de la situation actuelle
    if (this.simulation.globalPanic > 70) {
      weights.political *= 1.5;
      weights.public *= 0.7;
    }

    if (this.simulation.researchProgress > 50) {
      weights.political *= 1.3;
      weights.economic *= 1.2;
    }

    if (this.simulation.stats.dead > 1000000) {
      weights.disaster *= 1.4;
      weights.public *= 1.3;
    }

    return weights;
  }

  selectEventType(weights) {
    const types = Object.keys(weights);
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (const type of types) {
      if (random < weights[type]) return type;
      random -= weights[type];
    }
    return types[0];
  }

  getRecentEventsContext() {
    return this.eventHistory
      .slice(-3)
      .map(event => event.title)
      .join(", ");
  }

  triggerEvent(event, type) {
    const duration = Math.floor(
      Math.random() * 
      (this.eventDurations[type].max - this.eventDurations[type].min) + 
      this.eventDurations[type].min
    );

    const activeEvent = {
      ...event,
      type,
      duration,
      daysLeft: duration,
      startDate: new Date(this.simulation.currentDate)
    };

    this.activeEvents.add(activeEvent);
    this.eventHistory.push({
      title: event.title,
      type,
      date: new Date(this.simulation.currentDate)
    });

    // Réduire l'historique s'il est trop long
    if (this.eventHistory.length > this.maxHistoryLength) {
      this.eventHistory.shift();
    }

    this.showEventNotification(activeEvent);
    this.generateDetailedNews(activeEvent);
  }

  async generateDetailedNews(event) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Génère un article de presse détaillé sur cet événement :
          ${JSON.stringify(event)}
          
          interface Response {
            headline: string;
            content: string;
            quotes?: string[];
            relatedNews?: string[];
          }
          
          Exemple :
          {
            "headline": "Le Sommet Mondial se termine dans le chaos alors que de nouvelles preuves émergent",
            "content": "Le Sommet Mondial de la Santé à Genève s'est terminé...",
            "quotes": [
              "Nous ne pouvons ignorer ces allégations - Directeur de l'OMS",
              "Nos recherches ont toujours été transparentes - Ministre de la Santé"
            ],
            "relatedNews": [
              "Tensions lors du précédent sommet de la santé",
              "Enquête en cours sur la sécurité des laboratoires"
            ]
          }`,
          data: event
        })
      });

      const newsData = await response.json();
      this.displayDetailedNews(newsData, event);
    } catch (error) {
      console.error("Échec de la génération des nouvelles détaillées :", error);
    }
  }

  displayDetailedNews(newsData, event) {
    const newsContainer = document.getElementById('news-container');
    const newsItem = document.createElement('div');
    newsItem.className = `news-item ${event.type}`;
    
    const date = document.createElement('div');
    date.className = 'date';
    date.textContent = this.simulation.formatDate(this.simulation.currentDate);
    
    const headline = document.createElement('h3');
    headline.textContent = newsData.headline;
    
    const content = document.createElement('div');
    content.className = 'news-content';
    content.innerHTML = `
      <p>${newsData.content}</p>
      ${newsData.quotes ? `
        <div class="quotes">
          ${newsData.quotes.map(quote => `<blockquote>${quote}</blockquote>`).join('')}
        </div>
      ` : ''}
      ${newsData.relatedNews ? `
        <div class="related-news">
          <small>Nouvelles Associées :</small>
          <ul>${newsData.relatedNews.map(news => `<li>${news}</li>`).join('')}</ul>
        </div>
      ` : ''}
    `;
    
    newsItem.appendChild(date);
    newsItem.appendChild(headline);
    newsItem.appendChild(content);
    
    newsContainer.insertBefore(newsItem, newsContainer.firstChild);
    
    // Garder uniquement les dernières actualités
    while (newsContainer.children.length > 5) {
      newsContainer.removeChild(newsContainer.lastChild);
    }
  }

  showEventNotification(event) {
    const notification = document.createElement('div');
    notification.className = `event-notification ${event.type}`;
    notification.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <p>Durée : ${event.duration} jours</p>
    `;

    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  update() {
    for (const event of this.activeEvents) {
      event.daysLeft--;
      
      // Appliquer les effets de l'événement
      this.simulation.globalPanic = Math.max(0, Math.min(100,
        this.simulation.globalPanic + (event.effects.panicChange / event.duration)
      ));
      this.simulation.globalResearch += event.effects.researchChange / event.duration;
      
      if (event.daysLeft <= 0) {
        this.activeEvents.delete(event);
      }
    }
  }

  getSpreadMultiplier() {
    return Array.from(this.activeEvents).reduce((mult, event) => 
      mult * event.effects.spreadMultiplier, 1);
  }
}