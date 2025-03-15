<template>
  <div class="body" @scroll="handleScroll">
    <nav class="navbar fixed-top navbar-expand-lg"
    :class="{'navbar-dark bg-dark': currentPage !== 'homePage'}"
    style="border-bottom: 1px solid #212529;">
      <div class="container-fluid">
        <a @click="scrollToPage('homePage')">
          <img :src="currentPage === 'homePage' ? require(`@/assets/images/logo-dark.png`) : require(`@/assets/images/logo-light.png`)" 
          style="width:35px; align-items: center; cursor: pointer;">
        </a>
        <a class="navbar-brand" 
          :class="{'nav-dark': currentPage === 'homePage', 'nav-light': currentPage !== 'homePage'}" 
          @click="scrollToPage('aboutPage')">
          ABOUT
        </a>
        <a class="navbar-brand" 
          :class="{'nav-dark': currentPage === 'homePage', 'nav-light': currentPage !== 'homePage'}" 
          @click="scrollToPage('backgroundPage')">
          BACKGROUND
        </a>
        <a class="navbar-brand" 
          :class="{'nav-dark': currentPage === 'homePage', 'nav-light': currentPage !== 'homePage'}" 
          @click="scrollToPage('projectsPage')">
          PROJECTS
        </a>
        <a class="navbar-brand" 
          :class="{'nav-dark': currentPage === 'homePage', 'nav-light': currentPage !== 'homePage'}" 
          style="margin-right: 10%;" 
          @click="scrollToPage('contactsPage')">
          CONTACTS
        </a>
      </div>
    </nav>

    <div class="vstack">
      <div id="homePage" class="container-fluid section vh-100 d-flex align-items-center justify-content-center">
        <HomePage ref="homePage" />
      </div>
      <div id="aboutPage" class="container-fluid section vh-100 d-flex align-items-center justify-content-center">
        <AboutMePage ref="aboutPage" />
      </div>
      <div id="backgroundPage" class="container-fluid section vh-100 d-flex align-items-center justify-content-center">
        <BackgroundPage ref="backgroundPage" />
      </div>
      <div id="projectsPage" class="container-fluid section vh-100 d-flex align-items-center justify-content-center">
        <ProjectsPage ref="projectsPage" />
      </div>
      <div id="contactsPage" class="container-fluid section vh-100 d-flex align-items-center justify-content-center">
        <ContactsPage ref="contactsPage" />
      </div>
    </div>

    <footer class="music-bar">
      <div class="vstack" style="text-align: right;justify-content: center;margin-right:20px">
        <div class="music-author">{{ Object.values(songTitles[currentSongIndex])[0] }}</div>
        <div class="music-title">{{ Object.keys(songTitles[currentSongIndex])[0] }}</div>
      </div>

      <div class="controls">
        <button @click="previousSong" class="btn control-btn">
          <span class="icon">⏮</span>
        </button>
        <button @click="toggleAudio" class="btn play-btn" :style="getPlayButtonStyle">
          {{ isPlaying ? '⏸' : '‣' }}
        </button>
        <button @click="nextSong" class="btn control-btn">
          <span class="icon">⏭</span>
        </button>
      </div>

      <div class="progress-container" @click="seek">
        <div class="progress-bar" ref="progressBar"></div>
        <div class="progress-bar-dot" :style="{ left: progressPercent + '%' }"></div>
      </div>
    </footer>

    <div class="scroll-down-btn-container">
      <button @click="scrollToNextPage" :class="{'scroll-down-btn-dark': currentPage !== 'aboutPage', 'scroll-down-btn-light': currentPage === 'aboutPage'}">
        {{ currentPage == sections[sections.length-1] ? '↑' : '↓'}}
      </button>
    </div>
  </div>
</template>

<script>
//import AOS from "aos";
//import "aos/dist/aos.css";
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
      index: 0,
      element: null,
      scale: null,
      range: null,
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
        {'Sailing': 'Christopher Cross'},
        {'Broken Wings': 'Mr. Mister'},
        {"It's Over": 'Level 42'},
        {"Don't Wanna Lose You": 'Gloria Estefan'},
        {'Every Time You Go Away': 'Paul Young'},
        {'Against All Odds': 'Phil Collins'},
        {'Forever Young': 'Alphaville'},
        {'Every Breath You Take': 'The Police'}
      ],
      songs: [
        require('@/assets/songs/7475.mp3'),
        require('@/assets/songs/saveAPrayer.mp3'),
        require('@/assets/songs/youNeededMe.mp3'),
        require('@/assets/songs/wereAllAlone.mp3'),
        require('@/assets/songs/oneDayInYourLife.mp3'),
        require('@/assets/songs/houseOfTheRisingSun.mp3'),
        require('@/assets/songs/oneMoreNight.mp3'),
        require('@/assets/songs/sailing.mp3'),
        require('@/assets/songs/brokenWings.mp3'),
        require('@/assets/songs/itsOver.mp3'),
        require('@/assets/songs/dontWannaLoseYou.mp3'),
        require('@/assets/songs/everyTimeYouGoAway.mp3'),
        require('@/assets/songs/againstAllOdds.mp3'),
        require('@/assets/songs/foreverYoung.mp3'),
        require('@/assets/songs/everyBreathYouTake.mp3')
      ],
      sections: ['homePage', 'aboutPage', 'backgroundPage', 'projectsPage', 'contactsPage'],
      currentPage: 'homePage',
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll);
    this.setupAudio();
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
      for (let section of this.sections) {
        let sectionElement = document.getElementById(section);
        if (sectionElement) {
          let { top, bottom } = sectionElement.getBoundingClientRect();
          if (top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2) {
            this.currentPage = section;
            break;
          }
        }
      }
    },

    scrollToNextPage() {
      let nextSectionIndex = this.sections.indexOf(this.currentPage) + 1;
      if (nextSectionIndex >= this.sections.length) {
        nextSectionIndex = 0;
      }
      this.currentPage = this.sections[nextSectionIndex];
      this.scrollToPage(this.currentPage);
    },

    scrollToPage(page) {
      let section = document.getElementById(page);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.audio) {
      this.audio.removeEventListener('ended', this.nextSong);
      this.audio.pause();
    }
  },
  computed: {
    getPlayButtonStyle() {
      return {
        fontSize: this.isPlaying ? '1.5rem' : '2rem',
      };
    },
  }
}
</script>

<style>
#app {
  background: #e2e0d7;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #e2e0d7;
  width: 100%;
  overflow: hidden;
}

.section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.scrollable-content {
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
}

::v-deep .nav-dark {
  color: #7a7b77;
}

::v-deep .nav-light {
  color: #e2dfd6;
}

::v-deep .navbar-brand {
  font-size: 12px;
  font-family: monospace;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
}

::v-deep .nav-dark:hover {
  font-family: monospace;
  letter-spacing: 1px;
  font-weight: bold;
  color: #000000;
  transform: scale(1.15);
}

::v-deep .nav-light:hover {
  font-family: monospace;
  letter-spacing: 1px;
  font-weight: bold;
  color: #e2dfd6;
  transform: scale(1.15);
}

.music-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 55px;
  background-color: #212529;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1000;
  padding: 10px;
  padding-right: 5vw;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: 20px;
}

.control-btn{
  border: none;
  cursor: pointer;
  color: #e2dfd6;
  font-family: monospace;
}

.control-btn:hover{
  border: none;
  cursor: pointer;
  color: #e2dfd6;
  font-family: monospace;
}

.play-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #e2dfd6;
  font-size: 1.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #212529;
  cursor: pointer;
  font-family:monospace;
  transition: background 0.5s, transform 0.3s;
}

.play-btn:hover{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #e2dfd6;
  font-size: 1.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #212529;
  cursor: pointer;
  font-family:monospace;
  transform: scale(1.1);
}

::v-deep .music-title{
  font-family: 'Arial Black';
  font-weight: 700;
  font-size: 11px;
  color: #e2dfd6;
  width: 170px;
}

::v-deep .music-author{
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-size: 11px;
  color: #e2dfd6;
  width: 170px;
}

::v-deep .progress-container {
  align-items: center;
  position: relative;
  width: 80%;
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
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  z-index: 2;
}

::v-deep .scroll-down-btn-light {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  font-size: 1.5rem;
  border: 2px solid #e2dfd6;
  color: #e2dfd6;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 4;
}

::v-deep .scroll-down-btn-dark {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  font-size: 1.5rem;
  border: 2px solid #7a7b77;
  border-radius: 50%;
  color: #7a7b77;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 4;
}

::v-deep .scroll-down-btn-dark:hover {
  transform: scale(1.2);
  color: #7a7b77;
  border: 2px solid #7a7b77;
}

::v-deep .scroll-down-btn-light:hover {
  transform: scale(1.2);
  color: #e2dfd6;
  border: 2px solid #e2dfd6;
}
</style>