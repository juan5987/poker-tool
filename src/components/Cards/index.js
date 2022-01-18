import React from 'react';

//components
import Card from './Card';

//style
import './cards.scss'

//assets
import chip from 'assets/images/chips.jpg';
import tournament from 'assets/images/tournoi.jpg';
import timer from 'assets/images/squared_timer.png';

const Cards = () => {
  const cards = [
    {
      image: tournament,
      title:'Gérer vos Tournois',
      description: 'Créez vos propres tournois en les paramétrant entièrement: Nom, Date, Lieu, Cash-Price, Tapis de départ, Blinds etc... !!!',
    },

    {
      image:timer,
      title:'Gérer votre Timer',
      description:'Le timer est un outil qui permet aux joueurs de connaître les diverses informations indispensables au bon déroulement d’une partie.',
    },
    {
      image:chip,
      title:'Gérer vos Jetons',
      description:'Virtualisez les jetons de votre propre mallette de poker ! Choisissez leur couleur, leur valeur et le nombre.',
    }
  ]
  
  return (
    <div className='cards'>
      {
        cards.map((card)=>(
          < Card 
          key={card.title}
          image={card.image}
          title={card.title}
          description={card.description}
          />

        ))
      }
    </div>
  );
};

export default Cards;
