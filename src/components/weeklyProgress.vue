<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()
let user = ref(null)

let weekDays = ref([
])

let daysDone = ref(0)

onMounted(async () => {
  user.value = userStore.currentUser;
  //If userStore doesnt have a current user, get current user from local storage
  if (user.value === null || user.value === undefined) {
    user.value = JSON.parse(localStorage.getItem('currentUser'))
  }

  user.value = userStore.currentUser;
  generateWeek();
  findCompletedTasks()
  calculateProgress();
  asignProgressValue();
})


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
    case 0: circleFill.value = progressValues.value.oneDay;
      imageUrl.value = deadUrl.value;
      break;

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
        <img :src="imageUrl" class="planet-img">
        <div id="doughnutChart">
          <h3 class="h3" id="chartNumber">{{ daysDone }}/7</h3>
          <svg width="110" height="110" viewBox="0 0 110 110">

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
        <svg width="42" height="42" viewBox="0 0 42 42">
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
  gap: 0.5rem;
}

.planet-img {
  height: 50px;
  width: 50px;
  border-radius: 50px;
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

@media (min-width: 768px) {
  .h3 {
    font-size: 24px;
  }

  #componentWrapper {
    padding: 2rem;
  }

  #doughnutChart circle.circleBg {
    stroke-width: 10;
  }

  #doughnutChart svg {
    width: 140px;
    height: 140px;
  }

  #topRigt {
    gap: 1.5rem;
  }

  #topRigt img {
    height: 70px;
    width: 70px;
  }

  #week {
    margin-top: 2rem;
  }

  .weekDay svg {
    width: 70px;
    height: 70px;
  }

  .weekDay svg .circleBg {
    stroke-width: 4;
  }

  #chartNumber {
    font-size: 24px;
  }

  .p-day {
    font-size: 18px;
  }
}
</style>
