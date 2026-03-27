import Router from './router/Router';

import ChatsPage from './pages/Chats';
import Profile from './pages/Profile';
import SignPage from './pages/Sign';
import NotFoundError from './pages/NotFoundError';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import './static/assets/css/style.scss';
import './globals';
import './utils/registerHandlebarsHelpers';

const router = new Router('.app');

router
  .use('/chats/:chatId', ChatsPage)
  .use('/profile', Profile)
  .use('/login', SignPage, { form: LoginForm }, false)
  .use('/signup', SignPage, { form: RegisterForm }, false)
  .use('/404', NotFoundError, {}, false)
  .start();

window.addEventListener('_pushstate', (event: CustomEventData) => router.go(event.detail));
