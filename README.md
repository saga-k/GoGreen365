# Projektbeskrivning: Daily Eco-Challenges

## Vad är det?

En webbapp där användare får en ny miljöutmaning varje dag. Genom att genomföra utmaningar samlar de Eco-Points, kan tävla på en leaderboard och få badges som visar deras framsteg.

## Målgrupp

- **Miljömedvetna personer** som vill göra skillnad i vardagen.
- **Gamifiering-entusiaster** som gillar utmaningar och belöningar.
- **Företag eller skolor** som vill engagera sina anställda/elever i hållbarhet.

---

## Funktionalitet

### 🌱 Dagliga utmaningar

- Varje dag får användaren en ny miljöutmaning (exempel: _“Cykla till jobbet”_ eller _“Använd en tygkasse istället för plast”_).
- Utmaningen visas på startsidan och kan slutföras genom att användaren markerar den som genomförd.

#### User Stories

- **Som en** användare, **vill jag** se en ny miljöutmaning varje dag, **så att** jag ständigt får nya sätt att engagera mig i hållbarhet.
- **Som en** användare, **vill jag** kunna markera en utmaning som genomförd, **så att** jag kan följa mina framsteg och tjäna Eco-Points.

### 🎖 Eco-Points

- Användaren får poäng för varje genomförd utmaning.
- Poängen registreras i användarens profil och kan användas för att låsa upp badges eller jämföras med andra.

#### User Stories

- **Som en** användare, **vill jag** få poäng när jag genomför en utmaning, **så att** jag kan mäta min prestation.
- **Som en** användare, **vill jag** se mina totala Eco-Points i min profil, **så att** jag kan följa min utveckling över tid.

### 🏆 Badges & Profil

- Användare kan samla olika badges baserat på deras prestationer (exempel: _“5 utmaningar genomförda”_, _“1 vecka i rad”_).
- En profilsida visar en översikt av användarens framsteg, totala poäng och insamlade badges.

#### User Stories

- **Som en** användare, **vill jag** samla badges baserat på mina prestationer, **så att** jag kan visa mina framsteg.
- **Som en** användare, **vill jag** ha en profilsida med en översikt över mina utmaningar, Eco-Points och badges, **så att** jag kan hålla koll på min aktivitet.

### 📊 Leaderboard _(valfritt)_

- En global eller vänbaserad rankinglista där användare kan se sin position jämfört med andra.
- Poäng och badges kan påverka positionen på leaderboarden.

#### User Stories

- **Som en** användare, **vill jag** se en rankinglista med mina Eco-Points och badges, **så att** jag kan jämföra mina prestationer med andra.
- **Som en** användare, **vill jag** kunna filtrera leaderboarden mellan global och vänbaserad ranking, **så att** jag kan tävla med mina vänner eller med hela communityn.

### 📂 Arkiv

- Användaren kan se tidigare utmaningar.
- Möjlighet att slutföra gamla utmaningar om de fortfarande är relevanta.

#### User Stories

- **Som en** användare, **vill jag** kunna se tidigare utmaningar, **så att** jag kan följa min historik.
- **Som en** användare, **vill jag** kunna slutföra gamla utmaningar om de fortfarande är relevanta, **så att** jag kan samla extra Eco-Points.

### 🔑 Login & Profilhantering

- Användare kan registrera sig och logga in via e-post eller sociala medier (_Google/Facebook_).
- Möjlighet att redigera sin profil, ändra avatar och hantera notifikationsinställningar.

#### User Stories

- **Som en** ny användare, **vill jag** kunna registrera mig via e-post eller sociala medier, **så att** jag snabbt kan komma igång.
- **Som en** registrerad användare, **vill jag** kunna logga in och redigera min profil, **så att** jag kan uppdatera min information och avatar.
- **Som en** användare, **vill jag** kunna hantera mina notifikationsinställningar, **så att** jag får relevant information utan att bli spamad.

### 💚 Donationer till välgörenhetsorganisationer

- Möjlighet att donera pengar till miljövänliga organisationer direkt via appen.
- Alternativ att konvertera Eco-Points till donationer (_exempel: “1000 poäng = 10 kr till en organisation”_).
- Lista med godkända organisationer som användaren kan välja att stödja (_exempel: WWF, Greenpeace, Naturskyddsföreningen_).
- Integrering av betalsystem som **Swish, PayPal eller Stripe** för snabba donationer.
- Statistik över hur mycket användaren och hela communityn har donerat.

#### User Stories

- **Som en** användare, **vill jag** kunna donera pengar direkt via appen, **så att** jag kan stödja miljövänliga organisationer.
- **Som en** användare, **vill jag** kunna konvertera mina Eco-Points till donationer, **så att** mina prestationer också bidrar ekonomiskt till en god sak.
- **Som en** användare, **vill jag** se en lista med godkända organisationer, **så att** jag kan välja en organisation att stödja.
- **Som en** användare, **vill jag** se statistik över mina och communityns donationer, **så att** jag kan se vår gemensamma påverkan.

# Tech stack and installation instructions

This project is built using Vue 3 along with Vite as the build tool, Pinia for state management, and Vue Router for routing. It also uses json-server to manage JSON data files located in the public folder. Additional tooling includes ESLint and Prettier for code quality and formatting.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above)
- npm (comes with Node.js) or yarn

## Installation

1. **Clone the repository:**

```
git clone https://github.com/yourusername/grupp_5.git
cd grupp_5
```

2. **Install dependencies:**

Using npm:

```
npm install
```

Or using yarn:

```
yarn install
```

## Development

### Running the Dev Server

Start the development server with Vite:

```
npm run dev
```

Open your browser and navigate to http://localhost:5173 (the URL may vary if configured differently).

### Running json-sever

This project uses two JSON files located in the public folder:

challenges.json
userdata.json
These files serve as data sources for the project. Start the server with a command such as:

```
npx json-server --watch public/challenges.json
```

or

```
npm json-server --watch public/challenges.json
```

Open your browser and navigate to http://localhost:3000 to see json-server data.

## Additional Information

- **Vue 3:** For more details about Vue, please refer to the [Vue.js documentation](https://vuejs.org/).
- **Vite:** Learn more about Vite at the [Vite documentation](https://vitejs.dev/).
- **Pinia:** For state management, check out the [Pinia documentation](https://pinia.vuejs.org/).
- **Vue Router:** More information is available in the [Vue Router documentation](https://router.vuejs.org/).
