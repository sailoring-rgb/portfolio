<template>
  <div class="aboutMe" id="aboutMePage">
    <div class="portfolio-page">
      <div class="text-container">
        <h3 class="title" data-aos="fade-down" data-aos-anchor-placement="top-bottom">
          Get to know more <br><i>about me</i>!
        </h3>
        <div class="welcome-message" data-aos="fade-down">ANA HENRIQUES</div>
        <p class="description" data-aos="fade-left" data-aos-anchor-placement="top-bottom" data-aos-delay="500">
          kfsjefcisjfmcsrfmnc
        </p>
      </div>
      <img :src="require(`@/assets/images/me-sticker.png`)" class="sticker" data-aos="zoom-in"/>
      <img :src="require(`@/assets/images/bg2.png`)" class="background" />
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: 'AboutMePage',
  data(){
    return{
    }
  },

  computed: {
  },

  mounted() {
    AOS.init();
  },

  methods: {
  
  },

  updated() {
    AOS.refresh();
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

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  top: 25%;
  left: 64%;
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
  font-size: 60px;
  color: #e2dfd6;
  font-family: 'EB Garamond';
  font-weight: 900;
  text-align: right;
  z-index: 3;
  text-shadow: 1px 1px 3px #00000037;
  white-space: nowrap;
}

.welcome-message {
  z-index: 1;
  font-size: 11px;
  letter-spacing: 2px;
  color: #e2dfd6;
  font-weight: bold;
  font-family: monospace;
  border: 1px solid #e2dfd6;
  border-color: #e2dfd6;
  border-radius: 20px;
  padding: 5px;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 10px;
  margin-bottom: 50px;
}

.description {
  font-size: 15px;
  color: #e2dfd6;
  font-family: monospace;
  text-align: right;
  z-index: 3;
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
