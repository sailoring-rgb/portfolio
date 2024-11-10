<template>
  <div class="cursor" id="cursor"></div>

  <div class="body" @scroll="handleScroll" style="overflow-y: scroll;">
    <nav class="navbar fixed-top navbar-expand-lg" style="border-bottom: 1px solid #e2dfd6;">
      <div class="container-fluid">
        <a href="#homePage">
          <img src="./assets/logo.png" style="width:50px;align-items: center;">
        </a>
        <a class="navbar-brand" @click="scrollToPage('aboutPage')" >ABOUT</a>
        <a class="navbar-brand" @click="scrollToPage('backgroundPage')" >BACKGROUND</a>
        <a class="navbar-brand" @click="scrollToPage('projectsPage')" >PROJECTS</a>
        <a class="navbar-brand" style="margin-right: 10%;" @click="scrollToPage('contactsPage')" >CONTACTS</a>
      </div>
    </nav>

    <HomePage ref="homePage" />
    <AboutMePage ref="aboutPage" />
    <BackgroundPage ref="backgroundPage" />
    <ProjectsPage ref="projectsPage" />
    <ContactsPage ref="contactsPage" />

    <div class="card-container">
      <div v-if="!isMinimized">
        <div class="card d-flex justify-content-center align-items-center shadow">
          <p class="music-title">{{ Object.keys(songTitles[currentSongIndex])[0] }}</p>
          <p class="music-author">{{ Object.values(songTitles[currentSongIndex])[0] }}</p>

          <div class="progress-container">
            <div class="progress-bar" ref="progressBar"></div>
            <div class="progress-bar-dot" :style="{ left: progressPercent + '%' }"></div>
          </div>

          <div class="controls" >
            <button @click="previousSong" class="btn" style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; margin-right: -10px;  color: #e2dfd6;">⏮</button>
            <button @click="toggleAudio" class="btn" style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; background: #e2dfd6; border-radius: 100px; width:45px; color: #687160;">
              {{ isPlaying ? '⏸' : '▸' }}
            </button>
            <button @click="nextSong" class="btn" style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; margin-left: -10px; color: #e2dfd6;">⏭</button>
          </div>
        </div>
      </div>

      <div v-if="isMinimized" style="position: fixed; left: 90%; bottom: 20px; transform: translateX(-50%);">
        <button @click="toggleAudio" class="btn minimized-btn" :class="{ 'minimized': isMinimized }">
          {{ isPlaying ? '⏸' : '▸' }}
        </button>
      </div>
      
      <div class="minimize-maximize-btn" @click="toggleMinimized" :class="{ 'minimized': isMinimized }"></div>
    </div>

    <div class="scroll-down-btn-container">
      <button @click="scrollToNextPage" class="scroll-down-btn">
        {{ currentPage == sections[sections.length-1] ? '↑' : '↓'}}
      </button>
    </div>
  </div>
</template>

<script>
//import AOS from "aos";
//import "aos/dist/aos.css";
import { TweenMax } from "gsap";

import HomePage from './components/HomePage.vue'
import AboutMePage from './components/AboutMePage.vue'
import ProjectsPage from './components/ProjectsPage.vue'
import ContactsPage from './components/ContactsPage.vue'
import BackgroundPage from './components/BackgroundPage.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    AboutMePage,
    BackgroundPage,
    ProjectsPage,
    ContactsPage
  },
  data(){
    return {
      audio: null,
      isPlaying: false,
      currentSongIndex: 0,
      progressPercent: 0,
      isMinimized: true,
      cursorPosition: { x: 0, y: 0 },
      cursorDots: [],
      amount: 15,
      index: 0,
      element: null,
      scale: null,
      range: null,
      limit: null,
      anglespeed: null,
      lockX: null,
      lockY: null,
      angleX: null,
      angleY: null,
      idle: false,
      timeoutID: null,
      lastFrame: 0,
      x: 0,
      y: 0,
      songTitles: [ 
        {"'74-'75": 'The Connells'},
        {'Save A Prayer': 'Duran Duran'},
        {'You Needed Me': 'Anne Murray'},
        {"We're All Alone": 'Rita Coolidge'},
        {'One Day In Your Life': 'Michael Jackson'},
        {'House Of The Rising Sun': 'The Animals'},
        {'One More Night': 'Phil Collins'},
        {'Daydream': 'Wallace Collection'},
        {'Sailing': 'Christopher Cross'},
        {'Three Times A Lady': 'Commodores'},
        {'Broken Wings': 'Mr. Mister'},
        {"It's Over": 'Level 42'},
        {"Don't Wanna Lose You": 'Gloria Estefan'},
        {'Every Time You Go Away': 'Paul Young'},
        {'Against All Odds': 'Phil Collins'},
        {'Forever Young': 'Alphaville'},
        {'Every Breath You Take': 'The Police'},
        {'A Groovy Kind Of Love': 'Phil Collins'}
      ],
      songs: [
        require('@/assets/songs/7475.mp3'),
        require('@/assets/songs/saveAPrayer.mp3'),
        require('@/assets/songs/youNeededMe.mp3'),
        require('@/assets/songs/wereAllAlone.mp3'),
        require('@/assets/songs/oneDayInYourLife.mp3'),
        require('@/assets/songs/houseOfTheRisingSun.mp3'),
        require('@/assets/songs/oneMoreNight.mp3'),
        require('@/assets/songs/daydream.mp3'),
        require('@/assets/songs/sailing.mp3'),
        require('@/assets/songs/threeTimesALady.mp3'),
        require('@/assets/songs/brokenWings.mp3'),
        require('@/assets/songs/itsOver.mp3'),
        require('@/assets/songs/dontWannaLoseYou.mp3'),
        require('@/assets/songs/everyTimeYouGoAway.mp3'),
        require('@/assets/songs/againstAllOdds.mp3'),
        require('@/assets/songs/foreverYoung.mp3'),
        require('@/assets/songs/everyBreathYouTake.mp3'),
        require('@/assets/songs/aGroovyKindOfLove.mp3')
      ],
      sections: ['homePage', 'aboutPage', 'backgroundPage', 'projectsPage', 'contactsPage'],
      currentPage: '',
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll);
    this.setupAudio();
    window.addEventListener("mousemove", this.onMouseMove);
    this.initializeCursor();
    //window.addEventListener("touchmove", this.onTouchMove);
  },
  methods: {
    setupAudio() {
      this.audio = new Audio(this.songs[this.currentSongIndex]);
      this.audio.loop = false;
      this.audio.addEventListener('ended', this.nextSong);
      this.audio.addEventListener('timeupdate', this.updateProgress);
    },

    toggleAudio() {
      this.isPlaying
        ? this.audio.pause()
        : this.audio.play().catch(error => {
          console.warn("Play failed:", error);
        });
      this.isPlaying = !this.isPlaying;
    },

    nextSong() {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
      this.changeSong();
    },

    previousSong() {
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
      this.changeSong();
    },

    changeSong() {
      this.audio.src = this.songs[this.currentSongIndex];
      if (this.isPlaying) {
        this.audio.play().catch(error => {
          console.warn("Play failed:", error);
        });
      }
    },

    updateProgress() {
      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      if (!isNaN(percent)) {
        this.progressPercent = percent;
      }
    },

    seek(event) {
      const progressBar = this.$refs.progressBar;
      const clickPosition = (event.clientX - progressBar.offsetLeft) / progressBar.offsetWidth;
      const newTime = clickPosition * this.audio.duration;
      this.audio.currentTime = newTime;
    },

    toggleMinimized() {
      this.isMinimized = !this.isMinimized;
    },

    handleScroll() {
      const scrollTop = event.target.scrollTop;
      this.textMarginRight = `${scrollTop * 2}px`;
    },

    scrollToNextPage() {
      let nextSectionIndex = this.sections.indexOf(this.currentPage) + 1;
      if (nextSectionIndex >= this.sections.length) {
        nextSectionIndex = 0;
      }
      this.currentPage = this.sections[nextSectionIndex];
      this.scrollToPage(this.currentPage);
    },

    scrollToPage(page){
      const nextSection = this.$refs[page];
      nextSection.$el.scrollIntoView({ behavior: 'smooth' });
    },

    startIdleTimer() {
      const idleTimeout = 150;
      this.timeoutID = setTimeout(this.goInactive(), idleTimeout);
      this.idle = false;
    },

    resetIdleTimer() {
      clearTimeout(this.timeoutID);
      this.startIdleTimer();
    },

    goInactive() {
      this.idle = true;
      for (let dot of this.cursorDots) {
          dot.lock();
      }
    },

    buildDots(cursor) {
      class Dot {
        constructor(index = 0) {
          this.index = index;
          this.anglespeed = 0.05;
          this.x = 0;
          this.y = 0;
          this.scale = 1 - 0.05 * index;
          this.range = 26/2 - 26/2 * this.scale+2;
          this.limit = 26 * 0.75 * this.scale;
          this.element = document.createElement("span");
          TweenMax.set(this.element, {scale: this.scale});
          cursor.appendChild(this.element);
        }

        lock() {
            this.lockX = this.x;
            this.lockY = this.y;
            this.angleX = Math.PI * 2 * Math.random();
            this.angleY = Math.PI * 2 * Math.random();
        }

        draw() {
          if (!this.idle || this.index <= Math.floor(20 * 0.3)) {
            TweenMax.set(this.element, {x: this.x, y: this.y});
          } else {
            this.angleX += this.anglespeed;
            this.angleY += this.anglespeed;
            this.y = this.lockY + Math.sin(this.angleY) * this.range;
            this.x = this.lockX + Math.sin(this.angleX) * this.range;
            TweenMax.set(this.element, {x: this.x, y: this.y});
          }
        }
      }

      for (let i = 0; i < 20; i++) {
          let dot = new Dot(i);
          this.cursorDots.push(dot);
      }
    },

    initializeCursor() {
      const cursor = document.getElementById("cursor");
      if (!cursor) return;

      this.lastFrame += new Date();
      this.buildDots(cursor);

      const animateDots = timestamp => {
        const delta = timestamp - this.lastFrame;

        let { x, y } = this.cursorPosition;

        // Adjust the cursor and dot movements to follow the mouse
        this.cursorDots.forEach((dot, index, dots) => {
          let nextDot = dots[index + 1] || dots[0];
          
          // Ensure the dots' positions are always relative to the cursor position
          dot.x = x;
          dot.y = y;
          dot.draw(delta); 

          if (!this.idle || index <= Math.floor(20 * 0.3)) {
            const dx = (nextDot.x - dot.x) * 0.35;
            const dy = (nextDot.y - dot.y) * 0.35;
            x += dx;
            y += dy;
          }
        });

        this.lastFrame = timestamp;
        requestAnimationFrame(animateDots);
      };

      animateDots();
    },

    onMouseMove(event) {
      this.cursorPosition = { x: event.clientX / 2 - 5, y: event.clientY / 2 - 5};
      const cursor = document.getElementById('cursor');
      if (cursor) {
        cursor.style.left = `${this.cursorPosition.x}px`;
        cursor.style.top = `${this.cursorPosition.y}px`;
      }
      this.resetIdleTimer();
    },
  },

  beforeUnmount() {
    if (this.audio) {
      this.audio.removeEventListener('ended', this.nextSong);
      this.audio.pause();
    }
    
    if (this.onMouseMove) {
      window.removeEventListener("mousemove", this.onMouseMove);
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #e2dfd6;
}

.scrollable-content {
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
}

::v-deep .navbar-brand {
  font-size: 12px;
  font-family: monospace;
  letter-spacing: 1px;
  color: #e2dfd6;
  transition: all 0.3s ease;
}

::v-deep .navbar-brand:hover {
  font-size: 11px;
  font-family: monospace;
  letter-spacing: 1px;
  font-weight: bold;
  color: #e2dfd6;
  transform: scale(1.3);
}

.card-container {
  position: fixed;
  bottom: 5%;
  right: 7%;
  z-index: 1;
  width: 22%;
  min-width: 150px;
  max-width: 390px;
}

::v-deep .card {
  border: none;
  border-radius: 15px;
  background: #687160;
  height: 150px;
}

::v-deep .card.minimized {
  width: 60px;
  height: 60px;
  padding: 0;
}

::v-deep .controls {
  margin-top: 10px;
}
button {
  margin: 0 5px;
}

::v-deep .music-title{
  font-family: 'Arial Black';
  font-weight: 700;
  font-size: 18px;
  color: #e2dfd6;
  text-align: center;
}

::v-deep .music-author{
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-size: 12px;
  margin-top: -5%;
  color: #e2dfd6;
  text-align: center;
}

::v-deep .minimize-maximize-btn.minimized::after {
  position: fixed;
  content: '⤴';
  left: 92%;
  font-size: 0.8rem;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 50%;
  border: 1px solid #e2dfd6;
  color: #e2dfd6;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-200%);
  cursor: pointer;
}

::v-deep .minimize-maximize-btn:not(.minimized)::after {
  position: absolute;
  top: 5px;
  right: 5px;
  margin: 5px;
  content: '⤵';
  font-size: 0.6rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  border-radius: 50%;
  border: 1px solid #e2dfd6;
  color: #e2dfd6;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

::v-deep .minimized-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif; 
  font-size: 1.5rem;
  background: #e2dfd6;
  border-radius: 50%;
  color: #000;
  width: 50px;
  height: 50px;
  box-shadow: 1px 1px 15px #0000003d;
  cursor: pointer;
}

::v-deep .minimized-btn:hover{
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif; 
  font-size: 1.5rem;
  border: 2px solid #e2dfd6;
  border-radius: 50%;
  color: #e2dfd6;
  width: 50px;
  height: 50px;
  cursor: pointer;
}

::v-deep .progress-container {
  align-items: center;
  position: relative;
  width: 75%;
  margin-top: 0.5vh;
}

::v-deep .progress-bar {
  height: 1.5px;
  background-color: #e2dfd6;
  width: 100%;
  position: relative;
  z-index: 0;
}

::v-deep .progress-bar-dot {
  position: absolute;
  top: 50%;
  width: 7px;
  height: 7px;
  background-color: #e2dfd6;
  border-radius: 50%;
  border: 0.2vw solid #e2dfd6;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.scroll-down-btn-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

::v-deep .scroll-down-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  font-size: 1.5rem;
  border: 2px solid #e2dfd6;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: #e2dfd6;
  cursor: pointer;
  transition: transform 0.3s ease;
  text-shadow: 1px 1px 3px #00000062;
  box-shadow: 1px 1px 3px #00000062;
}

::v-deep .scroll-down-btn:hover {
  transform: scale(1.2);
}
</style>

<style>
.cursor {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  border-radius: 0;
  background-color: #e2dfd6;
  transform-origin: center;
  pointer-events: none;
  z-index: 1000;
}

.cursor span {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #e2dfd6;
  transform: translate(-50%, -50%);
}
</style>