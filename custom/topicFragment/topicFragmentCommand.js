// topicfragment/topicfragmentcommand.js

import Command from '@ckeditor/ckeditor5-core/src/command';

export default class TopicFragmentCommand extends Command {
    constructor( editor ) {super( editor );}
	execute( topic ) {
		const editor = this.editor;

		editor.model.change( writer => {
			// Create <topicfragment> elment with name attribute...
			const topicfragment = writer.createElement( 'topicfragment', { topicId: topic.topicId, title: topic.title } );

			// ... and insert it into the document.
			editor.model.insertContent( topicfragment );

			// Put the selection on inserted element.
			writer.setSelection( topicfragment, 'on' );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;

		const isAllowed = model.schema.checkChild( selection.focus.parent, 'topicfragment' );

		this.isEnabled = isAllowed;
	}
}