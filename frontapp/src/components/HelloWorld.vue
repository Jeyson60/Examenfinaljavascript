<template>
  <div>
    
    <div v-if="!loggedIn" class="login-section">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label>Correo:
          <input type="text" v-model="email" />
        </label>
        <br />
        <label>Contraseña:
          <input :type="showPassword ? 'text' : 'password'" v-model="password" />
        </label>
        <br />
        <label>
          <input type="checkbox" v-model="showPassword" />
          Mostrar Contraseña
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <button @click="togglePasswordUpdateSection">Actualizar Contraseña</button>
      <div v-if="showPasswordUpdateSection" class="password-update-section">
        <h3>Actualizar Contraseña</h3>
        <form @submit.prevent="updatePassword">
          <label>Nueva Contraseña:
            <input type="password" v-model="newPassword" />
          </label>
          <br />
          <button type="submit">Actualizar Contraseña</button>
        </form>
      </div>
      <p v-if="passwordUpdated" class="password-updated">Contraseña actualizada correctamente.</p>
    </div>

    
    <div v-if="loggedIn" class="book-section">
      <h2>Registro de Libros</h2>
      <form @submit.prevent="addBook">
        <label>Nombre del Libro:
          <input type="text" v-model="bookName" />
        </label>
        <br />
        <label>Autor del Libro:
          <input type="text" v-model="author" />
        </label>
        <br />
        <label>¿Libro Leído?
          <input type="checkbox" v-model="isRead" />
        </label>
        <br />
        <button type="submit">Agregar Libro</button>
      </form>

      
      <h3>Libros Registrados</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre del Libro</th>
            <th>Autor</th>
            <th>¿Leído?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books" :key="index">
            <td>{{ book.name }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.isRead ? 'Sí' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false,
      email: "",
      password: "",
      newPassword: "",
      showPassword: false,
      passwordUpdated: false,
      showPasswordUpdateSection: false,
      bookName: "",
      author: "",
      isRead: false,
      books: [],
    };
  },
  methods: {
    login() {
      
      this.loggedIn = true;
    },
    updatePassword() {
      
      this.passwordUpdated = true;
      setTimeout(() => {
        this.passwordUpdated = false;
      }, 3000); 
    },
    addBook() {
      
      const newBook = {
        name: this.bookName,
        author: this.author,
        isRead: this.isRead,
      };
      this.books.push(newBook);

      
      this.bookName = "";
      this.author = "";
      this.isRead = false;
    },
    togglePasswordUpdateSection() {
      this.showPasswordUpdateSection = !this.showPasswordUpdateSection;
    },
  },
};
</script>

<style scoped>

div {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}


.login-section {
  padding-bottom: 20px;
}


.password-update-section {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.password-updated {
  color: #4caf50;
}


.book-section {
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


form {
  display: grid;
  gap: 10px;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}


table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #4caf50;
  color: white;
}

h2, h3 {
  color: #333;
}

</style>
