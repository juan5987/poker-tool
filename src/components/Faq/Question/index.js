import React from 'react';
import PropTypes from 'prop-types';

import './question.scss';

const Faquestion = ({ question, answer }) => (

	<div className="question">
		<div className="question__question">
			{question}
		</div>
		<div className="question__answer">
			{answer}
		</div>
	</div>

);

Faquestion.protoTypes = {
	question: PropTypes.string.isRequired,
	answer: PropTypes.string.isRequired,
};

export default Faquestion;