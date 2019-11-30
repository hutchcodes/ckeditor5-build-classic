// topicfragment/topicfragmentediting.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import TopicFragmentCommand from './topicfragmentcommand'; 
import './theme/topicfragment.css';  

export default class TopicFragmentEditing extends Plugin {
    static get requires() {
		return [ Widget ];
    }
    
	constructor( editor ) {
		super( editor );

		this._defineSchema();
        this._defineConverters();
        
        this.editor.commands.add( 'topicfragment', new TopicFragmentCommand( this.editor ) );
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'topicfragment', {
			// Allow wherever text is allowed:
			allowWhere: '$text',

			// The topicfragment will acts as an inline node:
			isInline: true,

			// The inline-widget is self-contained so cannot be split by the caret and can be selected:
			isObject: true,

			// The topicfragment can have many types, like date, name, surname, etc:
			allowAttributes: [ 'topicId', 'title' ]
		} );
    }
    
    _defineConverters() {
		const conversion = this.editor.conversion;

		conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'topicfragment',
				classes: [ 'topicfragment' ]
				
			},
			model: ( viewElement, modelWriter ) => {
				// Extract the "name" from "{name}".
				const innerText = viewElement.getChild( 0 ).data;
				
				const attr = {
					topicId: viewElement.getAttribute('topicid'), 
					title: viewElement.getAttribute('title') 
				}

				return modelWriter.createElement( 'topicfragment', attr );
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'topicfragment',
			view: ( modelItem, viewWriter ) => {
				const widgetElement = createTopicFragmentView( modelItem, viewWriter );

				// Enable widget handling on topicfragment element inside editing view.
				return toWidget( widgetElement, viewWriter );
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'topicfragment',
			view: createTopicFragmentView
		} );

		// Helper method for both downcast converters.
		function createTopicFragmentView( modelItem, viewWriter ) {
			const topicId = modelItem.getAttribute( 'topicId' );
			const title = modelItem.getAttribute( 'title' );

			const topicfragmentView = viewWriter.createContainerElement( 'topicfragment', {
				class: 'topicfragment',
				topicId: topicId,
				title: title
			} );

			// Insert the topicfragment title (as a text).
			const innerText = viewWriter.createText( title );
			viewWriter.insert( viewWriter.createPositionAt( topicfragmentView, 0 ), innerText );

			return topicfragmentView;
		}
	}
}