import React from 'react';

//components
import Header from 'components/Header';
import Footer from 'components/Footer';

//style
import './cgu.scss';

const Cgu = () => (
	<div className="cgu">
		<div className="cgu__header">
			<Header />
		</div>
		<main className="cgu__body">

			<h1 className="cgu__body__mainTitle">Conditions générales d'utilisation</h1>
			<h2 className="cgu__body__articleTitle">ARTICLE 1 : Objet</h2>
			<p className="cgu__body__articleContent">
				Les présentes « conditions générales d'utilisation » ont pour objet
				l'encadrement juridique des modalités de mise à disposition des services
				du site Poker Tool et leur utilisation par « l'Utilisateur ».
				Les conditions générales d'utilisation doivent être acceptées par tout
				Utilisateur souhaitant accéder au site. Elles constituent le contrat entre le
				site et l'Utilisateur. L’accès au site par l’Utilisateur signifie son acceptation
				des présentes conditions générales d’utilisation.
				Éventuellement :
				En cas de non-acceptation des conditions générales d'utilisation
				stipulées dans le présent contrat, l'Utilisateur se doit de renoncer à
				l'accès des services proposés par le site.
				Poker Tool se réserve le droit de modifier unilatéralement et à
				tout moment le contenu des présentes conditions générales
				d'utilisation.
			</p>

			<h2 className="cgu__body__articleTitle">ARTICLE 2 : Mentions légales</h2>
			<p className="cgu__body__articleContent">
				L'édition du site Poker Tool est assurée par la promotion "Robin" pour projet de fin d'études.
			</p>

			<h2 className="cgu__body__articleTitle">ARTICLE 3 : Définitions</h2>
			<p className="cgu__body__articleContent">
				La présente clause a pour objet de définir les différents termes essentiels
				du contrat :
				Utilisateur : ce terme désigne toute personne qui utilise le site ou
				l'un des services proposés par le site.
				Contenu utilisateur : ce sont les données transmises par l'Utilisateur
				au sein du site.
				Membre : l'Utilisateur devient membre lorsqu'il est identifié sur le
				site.
				Identifiant et mot de passe : c'est l'ensemble des informations
				nécessaires à l'identification d'un Utilisateur sur le site. L'identifiant
				et le mot de passe permettent à l'Utilisateur d'accéder à des
				services réservés aux membres du site. Le mot de passe est
				confidentiel.
			</p>

			<h2 className="cgu__body__articleTitle">ARTICLE 4 : accès aux services</h2>
			<p className="cgu__body__articleContent">
				Le site permet à l'Utilisateur un accès gratuit aux services suivants :
				Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un
				accès à Internet. Tous les frais supportés par l'Utilisateur pour accéder au
				service (matériel informatique, logiciels, connexion Internet, etc.) sont à
				sa charge.
				Selon le cas :
				L’Utilisateur non membre n'a pas accès aux services réservés aux
				membres. Pour cela, il doit s'identifier à l'aide de son identifiant et de son
				mot de passe.
				Le site met en œuvre tous les moyens mis à sa disposition pour assurer un
				accès de qualité à ses services. L'obligation étant de moyens, le site ne
				s'engage pas à atteindre ce résultat.
				Tout événement dû à un cas de force majeure ayant pour conséquence un
				dysfonctionnement du réseau ou du serveur n'engage pas la
				responsabilité de Poker Tool.
				L'accès aux services du site peut à tout moment faire l'objet d'une
				interruption, d'une suspension, d'une modification sans préavis pour une
				maintenance ou pour tout autre cas. L'Utilisateur s'oblige à ne réclamer
				aucune indemnisation suite à l'interruption, à la suspension ou à la
				modification du présent contrat.
			</p>

			<h2 className="cgu__body__articleTitle">ARTICLE 5 : Propriété intellectuelle</h2>
			<p className="cgu__body__articleContent">
				Les marques, logos, signes et tout autre contenu du site font l'objet d'une
				protection par le Code de la propriété intellectuelle et plus
				particulièrement par le droit d'auteur.
				L'Utilisateur sollicite l'autorisation préalable du site pour toute
				reproduction, publication, copie des différents contenus.
				L'Utilisateur s'engage à une utilisation des contenus du site dans un cadre
				strictement privé. Une utilisation des contenus à des fins commerciales
				est strictement interdite.
				Tout contenu mis en ligne par l'Utilisateur est de sa seule responsabilité.
				L'Utilisateur s'engage à ne pas mettre en ligne de contenus pouvant
				porter atteinte aux intérêts de tierces personnes. Tout recours en justice
				engagé par un tiers lésé contre le site sera pris en charge par l'Utilisateur.
				Le contenu de l'Utilisateur peut être à tout moment et pour n'importe
				quelle raison supprimé ou modifié par le site. L'Utilisateur ne reçoit
				aucune justification et notification préalablement à la suppression ou à la
				modification du contenu Utilisateur.
			</p>

			<h2 className="cgu__body__articleTitle">ARTICLE 6 : Données personnelles</h2>
			<p className="cgu__body__articleContent">
				Les informations demandées à l’inscription au site sont nécessaires et
				obligatoires pour la création du compte de l'Utilisateur. En particulier,
				l'adresse électronique pourra être utilisée par le site pour
				l'administration, la gestion et l'animation du service.
				Le site assure à l'Utilisateur une collecte et un traitement d'informations
				personnelles dans le respect de la vie privée conformément à la loi n°7817 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.
				En vertu des articles 39 et 40 de la loi en date du 6 janvier 1978,
				l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et
				d'opposition de ses données personnelles.
			</p>

			<h2 className="cgu__body__articleTitle">ARTICLE 7 : Responsabilité et force majeure</h2>
			<p className="cgu__body__articleContent">
				Les sources des informations diffusées sur le site sont réputées fiables.
				Toutefois, le site se réserve la faculté d'une non-garantie de la fiabilité des
				sources. Les informations données sur le site le sont à titre purement
				informatif. Ainsi, l'Utilisateur assume seul l'entière responsabilité de
				l'utilisation des informations et contenus du présent site.
				L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation
				du mot de passe, quelle que soit sa forme, est interdite.
				L'Utilisateur assume les risques liés à l'utilisation de son identifiant et mot
				de passe. Le site décline toute responsabilité.
				Tout usage du service par l'Utilisateur ayant directement ou
				indirectement pour conséquence des dommages doit faire l'objet d'une
				indemnisation au profit du site.
				Une garantie optimale de la sécurité et de la confidentialité des données
				transmises n'est pas assurée par le site. Toutefois, le site s'engage à
				mettre en œuvre tous les moyens nécessaires afin de garantir au mieux la
				sécurité et la confidentialité des données.
				La responsabilité du site ne peut être engagée en cas de force majeure ou
				du fait imprévisible et insurmontable d'un tiers.
			</p>

			<h2 className="cgu__body__articleTitle">ARTICLE 8 : Liens hypertextes</h2>
			<p className="cgu__body__articleContent">
				De nombreux liens hypertextes sortants sont présents sur le site,
				cependant les pages web où mènent ces liens n'engagent en rien la
				responsabilité de Poker Tool qui n'a pas le contrôle de ces liens.
				L'Utilisateur s'interdit donc à engager la responsabilité du site concernant
				le contenu et les ressources relatives à ces liens hypertextes sortants.
			</p>

			<h2 className="cgu__body__articleTitle">ARTICLE 9 : Évolution du contrat</h2>
			<p className="cgu__body__articleContent">
				Le site se réserve à tout moment le droit de modifier les clauses stipulées
				dans le présent contrat.
			</p>


			<h2 className="cgu__body__articleTitle">ARTICLE 10 : Durée</h2>
			<p className="cgu__body__articleContent">
				La durée du présent contrat est indéterminée. Le contrat produit ses
				effets à l'égard de l'Utilisateur à compter de l'utilisation du service.
			</p>

		</main>
		<div className="cgu__footer">
			<Footer />
		</div>
	</div>
);

export default Cgu;
