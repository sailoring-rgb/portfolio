<template>
  <div class="aboutMe" id="aboutMePage">
    <div class="portfolio-page">
      <h3 class="title" >Get to know more <br><i>about me</i>!</h3>
      <h5 class="description">kfsjefcisjfmcsrfmnc</h5>
      <img :src="require(`@/assets/images/me-sticker.png`)" class="sticker" data-aos="zoom-in"/>
      <img :src="require(`@/assets/images/bg2.png`)" class="background" />
    </div>
  </div>
</template>

<script>
//import AOS from "aos";
//import "aos/dist/aos.css";

export default {
  name: 'AboutMePage',
  data(){
    return{
      title: 'Get to know more <br><i>about me</i>!',
      offset: 0,
      skipCount: 0,
      skipDelay: 15,
      speed: 150
    }
  },

  mounted() {
  },

  methods: {
    wordFlick() {
      setInterval(() => {
        const currentWord = this.words[this.currentWordIndex];

          if (this.offset >= currentWord.length) {
            this.skipCount++;
            if (this.skipCount === 3) {
              this.skipCount = 0;
            }
          } else {
            this.offset++;
          }
        this.title = currentWord.substring(0, this.offset);
      }, this.speed);
    },
  },

  updated() {
    //AOS.refresh();
  },
};
</script>

<style scoped>
.aboutMe {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  height: 100vh;
  overflow-y: hidden;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.sticker {
  position: absolute;
  top: 15%;
  left: 20%;
  width: 550px;
  height: auto;
  z-index: 1;
}

.title {
  position: absolute;
  top: 50%;
  left: 67%;
  transform: translate(-5%, -100%);
  font-size: 60px;
  color: #e2dfd6;
  font-family: 'EB Garamond';
  font-weight: 900;
  text-align: right;
  z-index: 3;
  text-shadow: 1px 1px 3px #00000037;
}

.description {
  position: absolute;
  top: 50%;
  left: 67%;
  transform: translate(-5%, -100%);
  font-size: 15px;
  color: #e2dfd6;
  font-family: monospace;
  text-align: right;
  z-index: 3;
  margin-top: 50px;
  text-shadow: 1px 1px 3px #00000037;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
