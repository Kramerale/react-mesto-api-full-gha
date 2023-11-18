import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import { ProtectedRoute } from './ProtectedRoute';
import api from '../utils/api';
import * as auth from '../utils/auth';
import resolve from '../images/resolve.svg';
import reject from '../images/reject.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoImage, setInfoImage] = React.useState("");
  const [infoMessage, setInfoMessage] = React.useState("");
  const [infoAriaLabel, setAriaLabel] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt)
      .then(data => {
        if (data) {
          setIsLoggedIn(true);
          setEmail(data.email);
          navigate("/");
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.error(err);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleRegisterSubmit (email, password) {
    auth.register(email, password)
    .then(() => {
      setInfoImage(resolve);
      setInfoMessage("Вы успешно зарегистрировались!");
      setAriaLabel("Попап, информирующий о статусе регистрации");
      navigate('/signin');
    })
    .catch((err) => {
      setInfoImage(reject);
      setInfoMessage("Что-то пошло не так! Попробуйте ещё раз.");
      setAriaLabel("Попап, информирующий о статусе регистрации");
      navigate('/signup');
      console.error(err);
    })
    .finally(handleInfoTooltip)
  }

  function handleLoginSubmit (email, password) {
    auth.authorize(email, password)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      setIsLoggedIn(true);
      setEmail(email);
      navigate('/');
    })
    .catch((err) => {
      setInfoImage(reject);
      setInfoMessage("Что-то пошло не так! Попробуйте ещё раз.");
      setAriaLabel("Попап, информирующий о статусе регистрации");
      navigate('/signin');
      handleInfoTooltip();
      console.error(err);
    })
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(res => {
        const [userInfo, cardData] = res;
        setCurrentUser(userInfo);
        setCards(cardData);
      })
      .catch(console.error)
    }
  }, [isLoggedIn])

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltip () {
    setIsInfoTooltipOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    if(!isLiked) {
      api.addCardLike(card._id)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
    } else {
      api.deleteCardLike(card._id)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
    }
  }

  function handleCardDelete (card) {
    api.deleteUserCard(card._id)
    .then(() => {
      setCards(cardList => cardList.filter(c => c._id !== card._id));
    })
    .catch(console.error)
  }

  function handleUpdateUser (data) {
    api.editUserInfo(data)
    .then(newUserInfo => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch(console.error)
  }

  function handleUpdateAvatar (data) {
    api.editUserAvatar(data)
    .then(newUserAvatar => {
      setCurrentUser(newUserAvatar);
      closeAllPopups();
    })
    .catch(console.error)
  }

  function handleAddPlaceSubmit (data) {
    api.addCard(data)
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(console.error)
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function signOut () {
    localStorage.removeItem("jwt");
    setEmail("");
    setCurrentUser({});
    setCards([]);
    setIsLoggedIn(false);
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page__container">
        <Header email={email} onClick={signOut}/>
        <Routes>
          <Route path="/" exact element={
            <>
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar = {handleEditAvatarClick}
                onEditProfile = {handleEditProfileClick}
                onAddPlace = {handleAddPlaceClick}
                onCardClick = {handleCardClick}
                onCardLike = {handleCardLike}
                onCardDelete = {handleCardDelete}
                cards = {cards}
              />
              <Footer/>
            </>
          }/>

          <Route path="/signin" element={
            <Login onLogin = {handleLoginSubmit}/>
          }/>

          <Route path="signup" element={
            <Register onRegister = {handleRegisterSubmit}/>
          }/>

          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/signin"}/>} />
        </Routes>

        <EditProfilePopup
          isOpen = {isEditProfilePopupOpen}
          onClose = {closeAllPopups}
          onUpdateUser = {handleUpdateUser}
        />

        <AddPlacePopup
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onUpdateCardList = {handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar}
        />

        <ImagePopup
          card = {selectedCard}
          onClose = {closeAllPopups}
        />
        <InfoTooltip
          isOpen = {isInfoTooltipOpen}
          onClose = {closeAllPopups}
          ariaLabel = {infoAriaLabel}
          image = {infoImage}
          message = {infoMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
