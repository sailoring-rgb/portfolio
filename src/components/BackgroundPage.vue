<template>
    <div class="backgroundPage" id="backgroundPage">

      <div class="cont-wrapper">
        <h3 class="title" data-aos="zoom-out" data-aos-anchor-placement="top-bottom">Analyze my educational and professional background as a <i>software engineer</i>.</h3>
        
        <div class="image-card" data-aos="fade-up" data-aos-delay="350" @click="openCard('EDUCATION')">
          <img :src="require(`@/assets/images/flower2.jpg`)"/>
          <div class="overlay">EDUCATION</div>
        </div>

        <div class="image-card" data-aos="fade-up" data-aos-delay="650" @click="openCard('WORK')">
          <img :src="require(`@/assets/images/flower2.jpg`)"/>
          <div class="overlay">WORK EXPERIENCE</div>
        </div>

        <div class="image-card" data-aos="fade-up" data-aos-delay="950" @click="openCard('PUBLICATIONS')">
          <img :src="require(`@/assets/images/flower2.jpg`)"/>
          <div class="overlay">PUBLICATIONS</div>
        </div>

        <div v-if="isCardOpen" class="modal-overlay" @click="closeCard">
          <div class="modal-card" @click.stop data-aos="zoom-in">
            <h2>{{ selectedTitle }}</h2>
            <p>This is some detailed information about {{ selectedTitle }}.</p>
            <button class="close-btn" @click="closeCard">Close</button>
          </div>
        </div>

      </div>
      <!--img src="/images/background-bg.png" class="background" /-->
    </div>
  </template>
  
  <script>
  import AOS from "aos";
  import "aos/dist/aos.css";
  
  export default {
    name: 'BackgroundPage',
    data(){
      return{
        isCardOpen: false,
        selectedTitle: "",
      }
    },

    methods: {
      openCard(title) {
        this.selectedTitle = title;
        this.isCardOpen = true;
      },
      closeCard() {
        this.isCardOpen = false;
      }
    },

    mounted() {
      AOS.init();
    },

    updated() {
      AOS.refresh();
    }
  };
  </script>

  <style>
  .backgroundPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0 5%;
  }

  .title{
    font-size: 60px;
    color: #6c7a59;
    font-family: 'EB Garamond';
    font-weight: 900;
    text-align: left;
    line-height: 1em;
    z-index: 3;
    margin-bottom: 30px;
    margin-left: 3vw;
    width: 100vw;
    max-width: 600px;
    word-wrap: break-word;
  }

  .cont-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
    max-width: 1200px;
    width: 100%;
  }

  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-card {
    position: relative;
    width: 225px;
    height: 300px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s ease-in-out;
  }

  .image-card .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 15px;
    letter-spacing: 2px;
    font-family: monospace;
    font-weight: bold;
    text-align: center;
    transition: background 0.3s ease-in-out;
    opacity: 0;
  }

  .image-card:hover img {
    filter: brightness(50%);
  }

  .image-card:hover .overlay {
    background: rgba(0, 0, 0, 0.4);
    opacity: 1;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 50vw;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .modal-card h2 {
    font-size: 24px;
    color: #333;
  }

  .modal-card p {
    font-size: 16px;
    color: #555;
  }
  
  .close-btn {
    background: #ff5e5e;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 15px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    transition: background 0.3s;
  }

  .close-btn:hover {
    background: #ff2e2e;
  }
  </style>