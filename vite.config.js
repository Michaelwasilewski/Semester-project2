const { resolve } = require('path');

export default {
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'home.html'),
        signUp: resolve(__dirname, 'index.html'),
        logIn: resolve(__dirname, 'signin.html'),
        createPost: resolve(__dirname, 'create-bid.html'),
        singlePost: resolve(__dirname, 'single-listing.html'),
        profile: resolve(__dirname, 'profile.html'),
      },
    },
  },
};
