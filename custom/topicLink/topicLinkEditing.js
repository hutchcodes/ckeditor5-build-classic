// topiclink/topiclinkediting.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import TopicLinkCommand from './topiclinkcommand'; 
import './theme/topiclink.css';  

export default class TopicLinkEditing extends Plugin {
    static get requires() {
		return [ Widget ];
    }
    
	constructor( editor ) {
		super( editor );

		this._defineSchema();
        this._defineConverters();
        
        this.editor.commands.add( 'topiclink', new TopicLinkCommand( this.editor ) );
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'topiclink', {
			// Allow wherever text is allowed:
			allowWhere: '$text',

			// The topiclink will acts as an inline node:
			isInline: true,

			// The inline-widget is self-contained so cannot be split by the caret and can be selected:
			isObject: true,

			// The topiclink can have many types, like date, name, surname, etc:
			allowAttributes: [ 'topicId', 'title' ]
		} );
    }
    
    _defineConverters() {
		const conversion = this.editor.conversion;

		conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'topiclink',
				classes: [ 'topiclink' ]
				
			},
			model: ( viewElement, modelWriter ) => {
				// Extract the "name" from "{name}".
				const innerText = viewElement.getChild( 0 ).data;
				
				const attr = {
					topicId: viewElement.getAttribute('topicid'), 
					title: viewElement.getAttribute('title') 
				}

				return modelWriter.createElement( 'topiclink', attr );
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'topiclink',
			view: ( modelItem, viewWriter ) => {
				const widgetElement = createTopicLinkView( modelItem, viewWriter );

				// Enable widget handling on topiclink element inside editing view.
				return toWidget( widgetElement, viewWriter );
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'topiclink',
			view: createTopicLinkView
		} );

		// Helper method for both downcast converters.
		function createTopicLinkView( modelItem, viewWriter ) {
			const topicId = modelItem.getAttribute( 'topicId' );
			const title = modelItem.getAttribute( 'title' );

			const topiclinkView = viewWriter.createContainerElement( 'topiclink', {
				class: 'topiclink',
				topicId: topicId,
				title: title
			} );

			// Insert the topiclink title (as a text).
			const innerText = viewWriter.createText( title );
			viewWriter.insert( viewWriter.createPositionAt( topiclinkView, 0 ), innerText );

			return topiclinkView;
		}
	}
}