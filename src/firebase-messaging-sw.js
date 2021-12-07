importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyCUHcwExHpaz498wvFWtoaixNIsR5XeQl4",
  authDomain: "utags-gallery.firebaseapp.com",
  projectId: "utags-gallery",
  storageBucket: "utags-gallery.appspot.com",
  messagingSenderId: "389711233724",
  appId: "1:389711233724:web:c51b82f73c5327c62cc6b9",
  measurementId: "G-MCGZXZY03W"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    const title = 'Hello World from SW!';
    const options = {
        body: payload.data.status
    };
    return self.registration.showNotification(title, options);
});