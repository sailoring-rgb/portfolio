<template>
  <div class="aboutMe" id="aboutMePage">
    <div class="portfolio-page">
      <!--img :src="require(`@/assets/images/flower.jpg`)" class="background" /-->
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
    }
  },

  mounted() {
  },

  methods: {
  },

  updated() {
    //AOS.refresh();
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
  color: #e2dfd6;
  font-family: 'EB Garamond';
  font-weight: 900;
  text-align: center;
  z-index: 1;
  text-shadow: 1px 1px 3px #00000037;
}

.welcome-message {
  position: relative;
  z-index: 1;
  font-size: 10px;
  letter-spacing: 2px;
  transform: translateY(50%);
  color: #e2dfd6;
  font-family: monospace;
  border: 1px solid #e2dfd6;
  border-color: #e2dfd6;
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
