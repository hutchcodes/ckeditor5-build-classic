// topiclink/topiclink.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import TopicLinkEditing from './topiclinkediting';
import TopicLinkUI from './topiclinkui';

export default class TopicLink extends Plugin {
	static get requires() {
		return [ TopicLinkEditing, TopicLinkUI ];
	}
}

window.CKEditor