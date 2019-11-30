// topiclink/topiclinkui.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import linkIcon from './theme/icons/link.svg';
import { debug } from 'util';

export default class TopicLinkUI extends Plugin {
	init() {
		this._createToolbarTopicLinkButton();
		console.log( 'TopicLinkUI#init() got called' );
	}

	/**
	 * Creates a toolbar TopicLink button. Clicking this button will show
	 * a {@topicLink #_balloon} attached to the selection.
	 *
	 * @private
	 */
	_createToolbarTopicLinkButton() {
		const editor = this.editor;
		const linkCommand = editor.commands.get( 'topiclink' );
		const t = editor.t;

		// Handle the `Ctrl+K` keystroke and show the panel.
		// editor.keystrokes.set( linkKeystroke, ( keyEvtData, cancel ) => {
		// 	// Prevent focusing the search bar in FF and opening new tab in Edge. #153, #154.
		// 	cancel();

		// 	if ( linkCommand.isEnabled ) {
		// 		this._showUI();
		// 	}
		// } );

		editor.ui.componentFactory.add( 'topiclink', locale => {
			const button = new ButtonView( locale );

			button.isEnabled = true;
			button.label = t( 'Topic Link' );
			button.icon = linkIcon;
			button.tooltip = true;

			// Bind button to the command.
			button.bind( 'isOn', 'isEnabled' ).to( linkCommand, 'value', 'isEnabled' );

			// Show the panel on button click.
			this.listenTo( button, 'execute', () => {
				//linkCommand.execute ({ topicId: '123', title: 'FooName' });
				// console.log("executing");
				 	window.AKS.SelectTopic('topiclink');
				}
			);
			
			return button;
		} );
	}

}