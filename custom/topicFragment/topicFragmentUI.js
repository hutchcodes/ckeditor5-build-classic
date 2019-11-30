// topicfragment/topicfragmentui.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import linkIcon from './theme/icons/link.svg';
import { debug } from 'util';

export default class TopicFragmentUI extends Plugin {
	init() {
		this._createToolbarTopicFragmentButton();
		console.log( 'TopicFragmentUI#init() got called' );
	}

	/**
	 * Creates a toolbar TopicFragment button. Clicking this button will show
	 * a {@topicFragment #_balloon} attached to the selection.
	 *
	 * @private
	 */
	_createToolbarTopicFragmentButton() {
		const editor = this.editor;
		const linkCommand = editor.commands.get( 'topicfragment' );
		const t = editor.t;

		// Handle the `Ctrl+K` keystroke and show the panel.
		// editor.keystrokes.set( linkKeystroke, ( keyEvtData, cancel ) => {
		// 	// Prevent focusing the search bar in FF and opening new tab in Edge. #153, #154.
		// 	cancel();

		// 	if ( linkCommand.isEnabled ) {
		// 		this._showUI();
		// 	}
		// } );

		editor.ui.componentFactory.add( 'topicfragment', locale => {
			const button = new ButtonView( locale );

			button.isEnabled = true;
			button.label = t( 'Topic Fragment' );
			button.icon = linkIcon;
			button.tooltip = true;

			// Bind button to the command.
			button.bind( 'isOn', 'isEnabled' ).to( linkCommand, 'value', 'isEnabled' );

			// Show the panel on button click.
			this.listenTo( button, 'execute', () => {
				//linkCommand.execute ({ topicId: '123', title: 'FooName' });
				// console.log("executing");
				 	window.AKS.SelectTopic('topicfragment');
				}
			);
			
			return button;
		} );
	}

}