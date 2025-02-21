<script setup>
import { ref, onMounted } from 'vue';

//Below is hardcoded mockdata for testing, add dynamic updates later

let weekDays = ref([
  {
    day: 'Mån',
    challengeDone: true
  },
  {
    day: 'Tis',
    challengeDone: false
  },
  {
    day: 'Ons',
    challengeDone: false
  },
  {
    day: 'Tor',
    challengeDone: true
  },
  {
    day: 'Fre',
    challengeDone: true
  },
  {
    day: 'Lör',
    challengeDone: true
  },
  {
    day: 'Sön',
    challengeDone: true
  }
])

let daysDone = ref(0)

onMounted(() => {
  calculateProgress();
  console.log('daysdone', daysDone.value);
  asignProgressValue();
})

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

const asignProgressValue = () => {
  switch (daysDone.value) {
    case 1: circleFill.value = progressValues.value.oneDay;
      break;

    case 2: circleFill.value = progressValues.value.twoDays;
      break;

    case 3: circleFill.value = progressValues.value.threeDays;
      break;

    case 4: circleFill.value = progressValues.value.fourDays;
      break;

    case 5: circleFill.value = progressValues.value.fiveDays;
      console.log(circleFill.value);
      break;

    case 6: circleFill.value = progressValues.value.sixDays;
      break;

    case 7: circleFill.value = progressValues.value.sevenDays;
      break;
  }
}

</script>

<template>

  <div id="componentWrapper">
    <h3 class="h3" id="title">Veckans Framsteg</h3>
    <div id="firstRow">
      <div id="topRigt">
        <img src="/src/assets/happyPlanet.svg" style="height: 50px; width: 50px; border-radius: 50px;">
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
