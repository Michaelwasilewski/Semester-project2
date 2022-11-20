const { resolve } = require('path');

export default {
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        signUp: resolve(__dirname, 'signin.html'),
        logIn: resolve(__dirname, 'login.html'),
        welcome: resolve(__dirname, 'home.html'),
        createPost: resolve(__dirname, 'create-bid.html'),
        singlePost: resolve(__dirname, 'single-listing.html'),
        editPost: resolve(__dirname, 'edit-bid.html'),
      },
    },
  },
};
