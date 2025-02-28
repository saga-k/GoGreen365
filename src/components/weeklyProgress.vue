<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useChallengeStore } from '@/stores/challengeStore';

//Below is hardcoded mockdata for testing, add dynamic updates later

const userStore = useUserStore()
const challengeStore = useChallengeStore()
let user = ref(null)
let isLoading = ref(true)

let weekDays = ref([
])

let daysDone = ref(0)

onMounted(async () => {
  try {
    // Vänta på att både users och challenges laddas
    await Promise.all([userStore.fetchUsers(), challengeStore.fetchChallenges()])

    // Hämta inloggad användare från userStore (eller från localStorage om ej satt)
    let currentUser = userStore.currentUser
    if (!currentUser) {
      const stored = localStorage.getItem('currentUser')
      if (stored) {
        currentUser = JSON.parse(stored)
        userStore.currentUser = currentUser
      }
    }
    if (currentUser) {
      challengeStore.setCurrentUser(currentUser.id)
    }

    console.log("Today's challenge:", challengeStore.todaysChallenge)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }

  user.value = userStore.currentUser;
  console.log('user', user.value)

  generateWeek();
  findCompletedTasks()
  calculateProgress();
  asignProgressValue();
})


let testWeek = []
const generateWeek = () => {
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    weekDays.value.push({
      day: date.toLocaleDateString('swe', { weekday: 'short' }),
      date: date.toISOString().split('T')[0],
      challengeDone: false
    });
  }
};

const findCompletedTasks = () => {
  let completedTasks = user.value.completedTasks
  console.log('completedtasks', completedTasks)

  for (let i = 0; i < weekDays.value.length; i++) {
    for (let j = 0; j < completedTasks.length; j++) {
      if (weekDays.value[i].date === completedTasks[j].dateCompleted) {
        weekDays.value[i].challengeDone = true
      }
    }
  }

}

const calculateProgress = () => {

  for (let i = 0; i < weekDays.value.length; i++) {
    if (weekDays.value[i].challengeDone === true) {
      daysDone.value++
    }
  }
}

const progressValues = ref({
  oneDay: { filled: 44.88, empty: 269.28 },
  twoDays: { filled: 89.76, empty: 224.4 },
  threeDays: { filled: 134.64, empty: 179.52 },
  fourDays: { filled: 179.52, empty: 134.64 },
  fiveDays: { filled: 224.4, empty: 89.76 },
  sixDays: { filled: 269.28, empty: 44.88 },
  sevenDays: { filled: 314.16, empty: 0 }
});

let circleFill = ref()

const happyUrl = ref('/src/assets/happyPlanet.svg')
const sadUrl = ref('/src/assets/sadPlanet.svg')
const deadUrl = ref('/src/assets/deadPlanet.svg')

let imageUrl = ref()

const asignProgressValue = () => {
  switch (daysDone.value) {
    case 1: circleFill.value = progressValues.value.oneDay;
      imageUrl.value = deadUrl.value;
      break;

    case 2: circleFill.value = progressValues.value.twoDays;
      imageUrl.value = deadUrl.value;
      break;

    case 3: circleFill.value = progressValues.value.threeDays;
      imageUrl.value = sadUrl.value;
      break;

    case 4: circleFill.value = progressValues.value.fourDays;
      imageUrl.value = sadUrl.value;
      break;

    case 5: circleFill.value = progressValues.value.fiveDays;
      imageUrl.value = happyUrl.value;
      break;

    case 6: circleFill.value = progressValues.value.sixDays;
      imageUrl.value = happyUrl.value;
      break;

    case 7: circleFill.value = progressValues.value.sevenDays;
      imageUrl.value = happyUrl.value;
      break;
  }
}


</script>

<template>

  <div id="componentWrapper">
    <h3 class="h3" id="title">Veckans Framsteg</h3>
    <div id="firstRow">
      <div id="topRigt">
        <img :src="imageUrl" style="height: 50px; width: 50px; border-radius: 50px;">
        <div id="doughnutChart">
          <h3 class="h3" id="chartNumber">{{ daysDone }}/7</h3>
          <svg width="110" height="110" view-box="0 0 110 110">

            <circle class="circleBg" cx="55" cy="55" r="50" fill="none" stroke="#ddd" stroke-width="10"></circle>

            <circle class="circleBg" cx="55" cy="55" r="50" fill="none" stroke="var(--peach)" stroke-width="10"
              transform="rotate(-90 55 55)" :stroke-dasharray="`${circleFill?.filled} ${circleFill?.empty}`">
            </circle>
          </svg>
        </div>
      </div>
    </div>

    <div id="week">
      <div v-for="(weekDay, index) in weekDays" :key="index" class="weekDay">
        <p class="p-small p-day">{{ weekDay.day }}</p>
        <svg width="42" height="42" view-box="0 0 42 42">
          <circle class="circleBg" cx="21" cy="21" r="19" fill="none"
            :stroke="weekDay.challengeDone ? 'var(--green)' : '#ddd'" stroke-width="3"></circle>
        </svg>
      </div>

    </div>
  </div>
</template>

<style scoped>
#componentWrapper {
  width: 100%;
  height: min-content;
  border: solid 1px var(--border-color);
  background-color: white;
  border-radius: 20px;
  padding: 1rem;
}

#firstRow {
  display: flex;
  justify-content: right;
}

#title {
  position: absolute;
  z-index: 1;
}

#topRigt {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

#doughnutChart {
  display: flex;
  justify-content: center;
  align-items: center;
}

#chartNumber {
  position: absolute;
  z-index: 1;
}

#week {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.weekDay {
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-day {
  position: absolute;
  z-index: 1;
}
</style>
