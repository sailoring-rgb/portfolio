<template>
  <div class="aboutMe" id="aboutMePage">
    <div class="content-wrapper">
      <img :src="require(`@/assets/images/me-sticker.png`)" class="sticker" data-aos="zoom-in" data-aos-delay="500"/>
      <div class="text-container">
          <h3 class="title" data-aos="fade-down" data-aos-anchor-placement="top-bottom">
            Get to know more <br><i>about me</i>!
          </h3>
          <div class="btn-links">
            <a href="https://www.linkedin.com/in/ana-henriques-824805113/" class="name" data-aos="fade-down">LINKEDIN</a>
            <a href="https://mega.nz/file/AHARUCjJ#IJuzjSyHsB85Oz3gbEQFVikQY1jSfK7vuYwWVllHhuM" target="_blank" class="curriculum" data-aos="fade-down">
              RESUME
            </a>
          </div>
          <p class="description" data-aos="fade-left" data-aos-anchor-placement="top-bottom" data-aos-delay="500">
            I'm <b>Ana</b> (Paula) <b>Henriques</b>, a <b>software engineer</b> passionate about building intuitive and impactful software, from web and mobile applications to anything that sparks my curiosity. To me, software development is more than just writing lines of code: <mark>it's about creating experiences while solving real-world challenges, and continuously learning in an ever-evolving field</mark>.<br><br>

            Beyond programming, you’ll often find me <b>deep in thought</b>, lost in a book that makes me question existence, or analyzing the hidden layers of a great movie. I have an insatiable <b>curiosity for different cultures</b> as I <b>love traveling</b> — <mark>exploring new places or simply understanding how people across the world think and live</mark>.
          </p>
      </div>
    </div>
    <img :src="require(`@/assets/images/about-bg.png`)" class="background" />
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

  mounted() {
    AOS.init();
    this.markElements();
  },

  methods: {
    markElements(){
      const markers = [...document.querySelectorAll('mark')];

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          setTimeout(() => {
          entry.target.style.animationPlayState = 'running';
        }, 500);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.8,
    });

    markers.forEach(mark => {
      observer.observe(mark);
    });
    }
  },

  updated() {
    AOS.refresh();
    this.markElements();
  },
};
</script>

<style scoped>
.aboutMe {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-items: center; 
  gap: 40px;
  height: 100vh;
  padding: 0 5%;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  align-items:center;
  gap: 80px;
  max-width: 1200px;
  width: 100%;
  position: absolute;
  top: 12%;
  left: 20%;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 45%;
}

.sticker {
  width: 500px;
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

.btn-links {
  display: flex;
  flex-direction: row;
}

.name {
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
  margin-right: 15px;
  text-decoration: none;
}

.name:hover {
  transform: scale(1.15);
}

.curriculum {
  z-index: 1;
  font-size: 11px;
  letter-spacing: 2px;
  color: #2e302b;
  font-weight: bold;
  font-family: monospace;
  border: 1px solid #e2dfd6;
  border-color: #e2dfd6;
  border-radius: 20px;
  background: #e2dfd6;
  padding: 5px;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 10px;
  margin-bottom: 50px;
  text-decoration: none;
}

.curriculum:hover {
  transform: scale(1.15);
}

.description {
  font-size: 15px;
  color: #e2dfd6;
  font-family: monospace;
  text-align: right;
  z-index: 3;
  text-shadow: 1px 1px 3px #00000037;
  text-align: justify;
  width: 110%;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

mark {
  --color1: #7a8d60;
  --color2: #7a8d60;
  --bg-height: 35%;
    
  all: unset;
  background-image: linear-gradient(var(--color1), var(--color2));
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0 var(--bg-height);
  animation: highlight 3s 1 ease-out;
  animation-fill-mode: forwards;
  animation-play-state: paused;
}


@keyframes highlight {
  to {
    background-size: 100% var(--bg-height);
  }
}
</style>
