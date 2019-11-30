// topiclink/topiclinkcommand.js

import Command from '@ckeditor/ckeditor5-core/src/command';

export default class TopicLinkCommand extends Command {
    constructor( editor ) {super( editor );}
	execute( topic ) {
		const editor = this.editor;

		editor.model.change( writer => {
			// Create <topiclink> elment with name attribute...
			const topiclink = writer.createElement( 'topiclink', { topicId: topic.topicId, title: topic.title } );

			// ... and insert it into the document.
			editor.model.insertContent( topiclink );

			// Put the selection on inserted element.
			writer.setSelection( topiclink, 'on' );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;

		const isAllowed = model.schema.checkChild( selection.focus.parent, 'topiclink' );

		this.isEnabled = isAllowed;
	}
}