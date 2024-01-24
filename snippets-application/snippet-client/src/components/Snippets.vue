<template>
    <div class="wrapper">
      <div class="loop quizzes">
        <h3>Snippets</h3>
        <ul>
          <li v-for="snippet in snippets">
            {{ snippet.title }} || {{ snippet.programming_language }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        user: {},
        snippets: [],
        pic: "",
      };
    },
    async created() {
      const { id } = this.$route.params;
  
      try {
        const response = await axios.get(
          `http://localhost:8080/snippets/user/${id}`
        );
  
        this.snippets = response.data;
        // this.pic = `https://api.dicebear.com/7.x/initials/svg?seed=${this.user.username}&backgroundColor=27b8c7`;
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/snippets`
        );
        this.snippets = response.data;
        console.log(this.snippets)
      } catch(error) {
        console.log(error);
      }
    },
    methods: {
      async addQuiz() {
        const token = localStorage.getItem("authToken");
        console.log(token);
      },
    },
  };
  </script>
  
  <style scoped>
  .profile {
    display: flex;
    margin: 0 auto;
    padding: 20px;
  }
  
  .profile p {
    color: #f8f8ff;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .profile i {
    color: #27b8c7;
    margin-right: 10px;
  }
  
  .profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .left-column {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .right-column {
    flex: 1;
    display: flex;
    justify-content: left;
    flex-direction: column;
  }
  
  .specialties {
    color: #f8f8ff;
    background-color: #565263;
    text-align: left;
    padding: 15px;
    width: 100%;
  }
  
  .loop ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .loop ul li {
    color: #f8f8ff;
    border: 1px solid #d7a8c3;
    border-radius: 2px;
    display: inline-block;
    font-size: 12px;
    margin: 0 7px 7px 0;
    padding: 7px;
    text-transform: uppercase;
  }
  
  .quizzes {
    color: #f8f8ff;
    background-color: #73677c;
    text-align: left;
    padding: 15px;
    width: 100%;
  }
  </style>
  