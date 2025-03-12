<template>
  <div class="home" id="homePage">
    <div class="portfolio-page">
      <h2 class="title-overlay">{{ title }}</h2>
      <div class="welcome-message">WELCOME!</div>
      <img :src="require(`@/assets/images/portfolio.png`)" class="background" />
    </div>

  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: 'HomePage',
  data(){
    return{
      title: "",
      words: ["Olá.", "Hello.", "你好.", "नमस्ते.", "Hola.", "Bonjour.", "مرحبًا.", "Привет.", "Guten tag.", "こんにちは.", "Merhaba.", "Xin Chào.", "안녕하세요.", "Ciao.", "สวัสดี."],
      currentWordIndex: 0,
      offset: 0,
      forwards: true,
      skipCount: 0,
      skipDelay: 15,
      speed: 150
    }
  },

  mounted() {
    this.wordFlick();
    AOS.init({
      duration: 1000,
      once: true,
    });
  },

  methods: {
    wordFlick() {
      setInterval(() => {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.forwards) {
          if (this.offset >= currentWord.length) {
            this.skipCount++;
            if (this.skipCount === 3) {
              this.forwards = false;
              this.skipCount = 0;
            }
          } else {
            this.offset++;
          }
        } else {
          if (this.offset === 0) {
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            this.forwards = true;
          } else {
            this.offset--;
          }
        }
        this.title = currentWord.substring(0, this.offset);
      }, this.speed);
    },
  },

  updated() {
    AOS.refresh();
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  height: 100vh;
  background: #e2dfd6;
  overflow-y: hidden;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.title-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  font-size: 70px;
  color: #000000;
  font-family: 'EB Garamond';
  font-weight: 900;
  text-align: center;
  z-index: 1;
  text-shadow: 1px 1px 3px #00000037;
}

.welcome-message {
  position: relative;
  z-index: 1;
  font-size: 11px;
  letter-spacing: 2px;
  transform: translateY(50%);
  color: #000000;
  font-weight: bold;
  font-family: monospace;
  border: 1px solid #000000;
  border-color: #000000;
  border-radius: 20px;
  padding: 5px;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 5px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>
