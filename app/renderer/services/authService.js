import firebase from 'firebase';
import axios from 'axios';

class AuthService {
  // Configure Firebase.
  config = {
    apiKey: 'AIzaSyAbqqXtHNIuNrsamkCxRk9sOuMO-ZWDiEk',
    authDomain: 'codeforcauseorg.firebaseapp.com',
    databaseURL: 'https://codeforcauseorg.firebaseio.com',
    projectId: 'codeforcauseorg',
    storageBucket: 'codeforcauseorg.appspot.com',
    messagingSenderId: '940087336446',
    appId: '1:940087336446:web:1de6caaf414d75e12bf4af',
    measurementId: 'G-SDYLZFHHBL',
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  firebase = firebase;

  user = {};

  setAxiosInterceptors = ({ onLogout }) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.setSession(null);

          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      },
    );
  };

  handleAuthentication() {
    this.firebase.initializeApp(this.config);
  }

  handleEmailAndPasswordLogin(email, password) {
    return new Promise((resolve, reject) => {
      this.firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          resolve(result.user);
          return;
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  handleEmailAndPasswordSignUp(email, password) {
    this.firebase
      .auth()
      .createUserWithEmailAndPassword('ak@gmail.com', 'ak@12345678')
      .then((user) => {
        console.log(user);
      })
      .catch((e) => {
        if (e.code === 'auth/email-already-in-use') {
          console.log('Todo: Implement snackbar notosnackbar');
        }
        console.log(e);
      });
  }

  logout = () => {
    this.firebase.auth().signOut();
    this.setSession(null);
  };

  setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  getAccessToken = () => localStorage.getItem('accessToken');
}

const authService = new AuthService();

export default authService;
