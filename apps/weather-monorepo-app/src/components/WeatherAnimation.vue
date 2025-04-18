<template>
  <div class="weather-animation absolute inset-0 pointer-events-none overflow-hidden">
    <div v-if="weatherType === 'rain'" class="rain-container">
      <div v-for="i in 100" :key="i" class="rain-drop" :style="getRainStyle()"></div>
    </div>

    <div v-if="weatherType === 'snow'" class="snow-container">
      <div v-for="i in 100" :key="i" class="snow-flake" :style="getSnowStyle()"></div>
    </div>

    <div v-if="weatherType === 'clouds'" class="clouds-container">
      <div v-for="i in 5" :key="i" class="cloud" :style="getCloudStyle()"></div>
    </div>

    <div v-if="weatherType === 'clear'" class="sun-container">
      <div class="sun"></div>
      <div v-for="i in 5" :key="i" class="sun-ray" :style="getSunRayStyle(i)"></div>
    </div>

    <div v-if="weatherType === 'thunderstorm'" class="thunder-container">
      <div class="thunder" :class="{ 'active': isThunderActive }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  weatherCode: {
    type: String,
    required: true
  }
});

const weatherType = computed(() => {
  const code = props.weatherCode;
  if (code.startsWith('01')) return 'clear';
  if (code.startsWith('02') || code.startsWith('03') || code.startsWith('04')) return 'clouds';
  if (code.startsWith('09') || code.startsWith('10')) return 'rain';
  if (code.startsWith('11')) return 'thunderstorm';
  if (code.startsWith('13')) return 'snow';
  return 'clear';
});


const getRainStyle = () => {
  const delay = Math.random() * 5;
  const duration = 0.5 + Math.random() * 0.5;
  const left = Math.random() * 100;

  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  };
};


const getSnowStyle = () => {
  const delay = Math.random() * 5;
  const duration = 5 + Math.random() * 10;
  const left = Math.random() * 100;
  const size = 3 + Math.random() * 7;

  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  };
};


const getCloudStyle = () => {
  const delay = Math.random() * 30;
  const duration = 60 + Math.random() * 60;
  const top = Math.random() * 40;
  const scale = 0.5 + Math.random() * 0.5;
  const opacity = 0.7 + Math.random() * 0.3;

  return {
    top: `${top}%`,
    transform: `scale(${scale})`,
    opacity: opacity,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  };
};


const getSunRayStyle = (index) => {
  const rotation = (index - 1) * 72; // 360 / 5 = 72 degrees

  return {
    transform: `rotate(${rotation}deg)`
  };
};


const isThunderActive = ref(false);
let thunderInterval;

const startThunderAnimation = () => {
  thunderInterval = setInterval(() => {
    isThunderActive.value = true;
    setTimeout(() => {
      isThunderActive.value = false;
    }, 200);
  }, 5000);
};

watch(() => weatherType.value, (newType) => {
  if (newType === 'thunderstorm') {
    startThunderAnimation();
  } else {
    clearInterval(thunderInterval);
  }
});

onMounted(() => {
  if (weatherType.value === 'thunderstorm') {
    startThunderAnimation();
  }
});

onUnmounted(() => {
  clearInterval(thunderInterval);
});
</script>

<style scoped>

.rain-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.rain-drop {
  position: absolute;
  top: -20px;
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.7));
  animation: rain linear infinite;
}

@keyframes rain {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

/* Snow Animation */
.snow-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.snow-flake {
  position: absolute;
  top: -10px;
  background-color: white;
  border-radius: 50%;
  animation: snow linear infinite;
}

@keyframes snow {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}


.clouds-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.cloud {
  position: absolute;
  left: -150px;
  width: 150px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  animation: cloud linear infinite;
}

.cloud:before, .cloud:after {
  content: '';
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

.cloud:before {
  width: 80px;
  height: 80px;
  top: -30px;
  left: 20px;
}

.cloud:after {
  width: 60px;
  height: 60px;
  top: -20px;
  left: 70px;
}

@keyframes cloud {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}


.sun-container {
  position: absolute;
  top: 10%;
  right: 10%;
}

.sun {
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(255,236,95,1) 0%, rgba(255,167,38,1) 100%);
  border-radius: 50%;
  box-shadow: 0 0 50px rgba(255, 236, 95, 0.7);
  animation: pulse 5s infinite alternate;
}

.sun-ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 4px;
  background: linear-gradient(to right, rgba(255,236,95,0.8), rgba(255,236,95,0));
  transform-origin: 0 0;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 50px rgba(255, 236, 95, 0.7);
  }
  100% {
    transform: scale(1.1);
    box-shadow: 0 0 70px rgba(255, 236, 95, 0.9);
  }
}


.thunder-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.thunder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.1s;
}

.thunder.active {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
