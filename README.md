# **Project Description: Daily Eco-Challenges**

## **What is it?**  
A web app where users receive a new environmental challenge every day. By completing challenges, they earn Eco-Points, compete on a leaderboard, and collect badges that showcase their progress.  

## **Target Audience**  
- Environmentally conscious individuals who want to make a difference in their daily lives.  
- Gamification enthusiasts who enjoy challenges and rewards.  
- Companies or schools looking to engage employees/students in sustainability.  

## **Features**  

### 🌱 **Daily Challenges**  
- Every day, users receive a new environmental challenge (e.g., “Bike to work” or “Use a reusable bag instead of plastic”).  
- The challenge is displayed on the homepage and can be marked as completed by the user.  

**User Stories:**  
- As a user, I want to see a new environmental challenge every day so that I continuously find new ways to engage in sustainability.  
- As a user, I want to mark a challenge as completed so that I can track my progress and earn Eco-Points.  

### 🎖 **Eco-Points**  
- Users earn points for each completed challenge.  
- Points are recorded in the user's profile and can be used to unlock badges or compare with others.  

**User Stories:**  
- As a user, I want to earn points when I complete a challenge so that I can measure my achievements.  
- As a user, I want to see my total Eco-Points in my profile so that I can track my progress over time.  

### 🏆 **Badges & Profile**  
- Users can collect different badges based on their achievements (e.g., “5 challenges completed,” “1 week streak”).  
- A profile page provides an overview of the user’s progress, total points, and earned badges.  

**User Stories:**  
- As a user, I want to collect badges based on my achievements so that I can showcase my progress.  
- As a user, I want a profile page that gives me an overview of my challenges, Eco-Points, and badges so that I can track my activity.  

### 📊 **Leaderboard (Optional)**  
- A global or friend-based ranking list where users can see their position compared to others.  
- Points and badges influence the leaderboard ranking.  

**User Stories:**  
- As a user, I want to see a ranking list with my Eco-Points and badges so that I can compare my performance with others.  
- As a user, I want to filter the leaderboard between global and friend-based ranking so that I can compete with my friends or the entire community.  

### 📂 **Challenge Archive**  
- Users can view past challenges.  
- Option to complete old challenges if they are still relevant.  

**User Stories:**  
- As a user, I want to see past challenges so that I can track my history.  
- As a user, I want to complete old challenges if they are still relevant so that I can earn extra Eco-Points.  

### 🔑 **Login & Profile Management**  
- Users can sign up and log in via email or social media (Google/Facebook).  
- Option to edit the profile, change avatar, and manage notification settings.  

**User Stories:**  
- As a new user, I want to sign up via email or social media so that I can get started quickly.  
- As a registered user, I want to log in and edit my profile so that I can update my information and avatar.  
- As a user, I want to manage my notification settings so that I receive relevant information without being spammed.  

### 💚 **Donations to Charities**  
- Option to donate money to eco-friendly organizations directly through the app.  
- Ability to convert Eco-Points into donations (e.g., “1000 points = $10 to an organization”).  
- A list of approved organizations users can choose to support (e.g., WWF, Greenpeace, Nature Conservation Associations).  
- Integration of payment systems like Swish, PayPal, or Stripe for easy donations.  
- Statistics showing how much the user and the entire community have donated.  

**User Stories:**  
- As a user, I want to donate money directly through the app so that I can support eco-friendly organizations.  
- As a user, I want to convert my Eco-Points into donations so that my achievements also contribute financially to a good cause.  
- As a user, I want to see a list of approved organizations so that I can choose one to support.  
- As a user, I want to see statistics on my and the community’s donations so that I can understand our collective impact.  


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
