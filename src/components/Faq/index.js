import React from 'react';

//components
import Header from 'components/Header';
import Footer from 'components/Footer';
import Question from 'components/Faq/Question';

//styles
import './faq.scss';

const Faq = () => (
    <div className="faq">
        <div className="faq_header">
            <Header />
        </div>
        <main className="faq__body">
            <h1 className="faq__body__title">
                Questions fréquement posées
            </h1>
            <ul>
                <Question
                    question="Comment avoir accès à toutes les fonctionnalités ?"
                    answer="Vous devez vous authentifier pour accéder à toutes les fonctionnalités de Poker Tool. Pour cela, vous pouvez créer un compte à partir de la page d'accueil, ou si vous en possédez déjà un, vous pouvez vous identifier en cliquant sur le bouton connexion en haut à droite de la page. "
                />
                <Question
                    question="Pourquoi dois-je créer un compte pour accéder à toutes les fonctionnalités"
                    answer="Les fonctionnalitées nécessitant un compte ont besoin de stocker des informations en base de données: vos tournois, vos jetons, votre identifiant... Afin de pouvoir stocker et sécuriser ces informations, une authentification est nécessaire. "
                />
                <Question
                    question="L’application est-elle gratuite ?"
                    answer="Oui. Poker Tool est gratuit et  le restera."
                />
                <Question
                    question="A quoi sert Poker Tool ?"
                    answer="Poker Tool propose des fonctionnalités qui facilite l'organisation d'un tournoi de poker à petite échelle. Idéal pour les poker entre amis !"
                />
                <Question
                    question="Puis-je utiliser l’application à titre professionnel ?"
                    answer="Poker Tool n'a pas pour vocation d'être utilisé à des fins professionnelles. Néanmoins, s'il peut vous être utile, vous pouvez l'utiliser. "
                />
                <Question
                    question="Qu’en est-il de la version mobile ?"
                    answer="Poker Tool s'adapte à la taille de l'écran que vous utilisez. Il n'y a pas d'application Mobile prévu pour le moment."
                />
                <Question
                    question="Comment me désinscrire du site ?"
                    answer='Pour vous désinscrire, rendez vous dans votre profil et cliquer sur le bouton "supprimer mon profil. Toutes vos informations seront supprimer définitivement.'
                />
                <Question
                    question="Puis-je accéder au code source de Poker Tool ?"
                    answer={<span>Oui. Poker Tool est open source. Vous pouvez retrouver le code source en suivant ce lien: <a style={{color: "#EE581E", wordWrap: "break-word"}} href="https://github.com/juan5987/poker-tool">https://github.com/juan5987/poker-tool</a></span>}
                />
            </ul>
        </main>
        <div className="faq_footer">
            <Footer />
        </div>
    </div>

)

export default Faq;