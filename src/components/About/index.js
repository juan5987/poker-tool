import React from 'react';

//components
import Footer from 'components/Footer';
import Header from 'components/Header';

//style
import './about.scss';

const About = () => (

<div className="about">
    <Header />
    <div className="about__body">
        <h1 className="about__body__title">A propos</h1>
        <p className="about__body__paragraph">Poker Tool était à l'origine un projet de fin de formation dans le cadre d'une reconversion professionnelle. Nous étions un groupe de 5 personnes à avoir travaillé sur le projet initial.</p>
        <p className="about__body__paragraph">Étant à l'initiative du projet, j'ai décidé de refaire le site de zéro afin d'améliorer mes compétences personnelles dans le Développement Web et de faire évoluer Poker Tool.</p>
        <p className="about__body__paragraph">Poker Tool a été construit à l'aide de JavaScript côté front et back. Pour cela, j'ai utilisé notamment React, Redux, Node.js, Express.js et PostgreSQL</p>
        <p className="about__body__paragraph">L'application est complètement gratuite et permet à ses utilisateurs d'organiser rapidement et simplement des tournois de poker à petite échelle. Idéal pour une table de copains souhaitant faire une partie !</p>
        <p className="about__body__paragraph">Si vous avez des questions sur le fonctionnement de l'application, je vous invite à vous rendre dans la FAQ via le lien en pied de page.</p>
        <p className="about__body__paragraph"><strong>Juan MACHADO</strong></p>

    </div>
    <Footer />

</div>

)

export default About;