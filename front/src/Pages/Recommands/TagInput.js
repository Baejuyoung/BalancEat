import React, { useState } from 'react';

import { FOODS } from './foodlist';
import './styleTagInput.css';
// import './styleTagInput.scss';
// import styles from "./ReactTags.module.scss";

import { WithContext as ReactTags } from 'react-tag-input';
//const ReactTags = require('react-tag-input').WithOutContext;
const suggestions = FOODS.map(country => {
	return {
		id: country,
		text: country,
	};
});

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagInput = () => {
	const [tags, setTags] = useState([]);

	const handleDelete = i => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	const handleAddition = tag => {
		setTags([...tags, tag]);
	};

	const handleDrag = (tag, currPos, newPos) => {
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		setTags(newTags);
	};

	const handleTagClick = index => {
		console.log('The tag at index ' + index + ' was clicked');
	};
	const onClearAll = () => {
		setTags([]);
	};

	return (
		<div>
			<ReactTags
				tags={tags}
				suggestions={suggestions}
				delimiters={delimiters}
				handleDelete={handleDelete}
				handleAddition={handleAddition}
				handleDrag={handleDrag}
				handleTagClick={handleTagClick}
				onClearAll={onClearAll}
				inputFieldPosition="bottom"
				autocomplete
				allowDeleteFromEmptyInput
				clearAll={true}
			/>
		</div>
	);
};
export default TagInput;

// render(<App />, document.getElementById('root'));
