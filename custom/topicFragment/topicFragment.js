// topicfragment/topicfragment.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import TopicFragmentEditing from './topicfragmentediting';
import TopicFragmentUI from './topicfragmentui';

export default class TopicFragment extends Plugin {
	static get requires() {
		return [ TopicFragmentEditing, TopicFragmentUI ];
	}
}

window.CKEditor