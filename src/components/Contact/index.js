import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';

//style
import './contact.scss';

const Contact = () => (

    <div className="contact">
        <Header />
        <main className="contact__body">
            <h1 className="contact__body__title">Formulaire de contact</h1>
            <form className="contact__body__form">
                <div className="contact__body__form__name">
                    <label className="contact__body__form__label">Votre nom</label>
                    <input className="contact__body__form__input" type="text"></input>
                </div>
                <div className="contact__body__form__email">
                    <label className="contact__body__form__label">Votre adresse email</label>
                    <input className="contact__body__form__input" type="email"></input>
                </div>
                <div className="contact__body__form__message">
                    <label className="contact__body__form__label">Votre message</label>
                    <textarea rows="5" className="contact__body__form__textarea"></textarea>
                </div>
                <button className="contact__body__form__submit">Envoyer mon message</button>
            </form>
        </main>
        <Footer />
    </div>
)

export default Contact;

