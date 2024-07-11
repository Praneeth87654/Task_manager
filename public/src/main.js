document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');
  
    if (registerButton) {
      registerButton.addEventListener('click', register);
    }
  
    if (loginButton) {
      loginButton.addEventListener('click', login);
    }
  });
  
  async function register() {
    const firstName = document.getElementById('inputFirstName').value;
    const lastName = document.getElementById('inputLastName').value;
    const email = document.getElementById('inputEmail').value;
    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;
  
    try {
      const response = await axios.post('/api/v1/auth/register', {
        firstName,
        lastName,
        email,
        username,
        password
      });
  
      if (response.status === 201) {
        iziToast.success({
          title: 'Success',
          message: 'User registered successfully',
        });
        window.location.href = '/login.html'; // Redirect to the login page
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        iziToast.error({
          title: 'Error',
          message: 'User already exists',
        });
      } else {
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while registering',
        });
      }
    }
  }
  
  async function login() {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
  
    console.log('Login button clicked'); // Debugging log
  
    try {
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password
      });
  
      if (response.status === 200) {
        iziToast.success({
          title: 'Success',
          message: 'Login successful',
        });
        window.location.href = '/tasks.html'; // Redirect to the tasks page
      }
    } catch (error) {
      console.error('Error logging in:', error); // Debugging log
      if (error.response && error.response.status === 400) {
        iziToast.error({
          title: 'Error',
          message: 'Invalid email or password',
        });
      } else {
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while logging in',
        });
      }
    }
  }
  