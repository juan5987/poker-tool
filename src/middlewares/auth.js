import axios from 'axios';
import { api } from '../config';

const authMiddleware = (store) => (next) => (action) => {

  switch (action.type) {

    case "LOG_IN": {
      
      const state = store.getState();
      const token = localStorage.getItem('token');

      axios({
        method: 'post',
        url: `${api}/login`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          email: state.user.connection.email,
          password: state.user.connection.password,
        },
      })
        .then(response => {
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('token', response.data.token);
          store.dispatch({type: "LOG_IN_SUCCESS"});
          store.dispatch({type: "CLOSE_MODALS"});
        })
        .catch((error) => {     
          store.dispatch({type:"LOG_IN_FAILED", message: error.response.data.message});
        });
      break;
    }

    case "SUBMIT_REGISTRATION_FORM": {
      const state = store.getState();
      const token = localStorage.getItem('token');

      axios({
        method: 'post',
        url: `${api}/register`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          username: state.user.registration.username,
          email: state.user.registration.email,
          emailConfirm: state.user.registration.emailConfirm,
          password: state.user.registration.password,
          passwordConfirm: state.user.registration.passwordConfirm,
        },
      })
        .then(response => {
          store.dispatch({type: "CLOSE_MODALS"});
          store.dispatch({type: "OPEN_CONFIRMATION_MODAL"})

        })
        .catch((error) => {     
          store.dispatch({type:"REGISTRATION_FAILED", message: error.response.data.message});
        });

      break;
    }

    case "CONFIRM_REGISTRATION": {
      const token = localStorage.getItem('token');

      axios({
        method: 'get',
        url: `${api}/confirmation/${action.confirmationCode}`,
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then(response => {
          store.dispatch({type:"CONFIRM_REGISTRATION__SUCCESS"});
          store.dispatch({type:"OPEN_CONNECTION_MODAL"});
        })
        .catch((error) => {     
          console.log(error);
        });

      break;
    }

    case "SUBMIT_FORGOT_PASSWORD_FORM": {

      const state = store.getState();
      const token = localStorage.getItem('token');

      axios({
        method: 'post',
        url: `${api}/forgot-password`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          email: state.user.forgotPassword.email,
        }
      })
      .then(response => {
        store.dispatch({type:"SUBMIT_FORGOT_PASSWORD_FORM_SUCCESS"})
      })
      .catch((error) => {
        store.dispatch({type:"FORGOT_PASSWORD_FAILED", message: error.response.data.message});
      })
      break;
    }
    case "SUBMIT_RESET_PASSWORD_FORM": {
      const state = store.getState();
      const token = localStorage.getItem('token');
      store.dispatch({type:"HIDE_RESET_PASSWORD_SUCCESS_MESSAGE"})

      axios({
        method: 'patch',
        url: `${api}/forgot-password/${action.forgotPasswordCode}`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          password: state.user.resetPassword.password,
          passwordConfirm: state.user.resetPassword.passwordConfirm,
        }
      })
      .then(response => {
        store.dispatch({type:"SUBMIT_RESET_PASSWORD_FORM_SUCCESS"});
      })
      .catch((error) => {
        store.dispatch({type:"SUBMIT_RESET_PASSWORD_FORM_FAILED", message: error.response.data.message});
      })
      break;
    }

    case "GET_PROFILE_FROM_API": {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      axios({
        method: 'get',
        url: `${api}/profile/${userId}`,
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(response => {
        store.dispatch({type: "GET_PROFIL_FROM_API_SUCCESS", payload: response.data});
      })
      .catch((error) => {
        console.log(error);
        store.dispatch({type:"GET_PROFIL_FROM_API_ERROR", message: error.response.data.message});
      })
    }
    break;

    case "SUBMIT_PROFILE": {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const state = store.getState();

      axios({
        method: 'patch',
        url: `${api}/profile/${userId}`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          username: state.user.profile.username,
          email: state.user.profile.email,
          password: state.user.profile.password,
          passwordConfirm: state.user.profile.passwordConfirm,
        }
      })
      .then((response) => {
        console.log(response);
        store.dispatch({type: "SUBMIT__PROFILE__SUCCESS", message: response.data.message});
      })
      .catch((error) => {
        console.error(error.response.data.message)
        store.dispatch({type: "SUBMIT__PROFILE__FAILED", message: error.response.data.message});
      });
    }
    break;
    
    default:
      next(action);
      break;
  }
  
};

export default authMiddleware;
