/**
  * <Toolbar />
  */

import React from 'react';
import ToolbarItem from './toolbar-draggable-item';
import {PanelGroup,Panel} from 'react-bootstrap';
import ID from './UUID';
import store from './stores/store.js';

export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);

    const items = (this.props.items) ? this.props.items : this._defaultItems();
    this.state = {
      items: items
    };
    store.subscribe(state => this.setState({ store: state }));
  }

  static _defaultItemOptions(element) {
    switch(element) {
      case "Dropdown":
        return [
          {value: '', text: '', key: 'dropdown_option_' + ID.uuid()},
          {value: '', text: '', key: 'dropdown_option_' + ID.uuid()},
          {value: '', text: '', key: 'dropdown_option_' + ID.uuid()}
        ];
      case "Tags":
        return [
          {value: 'place_holder_tag_1', text: 'Place holder tag 1', key: 'tags_option_' + ID.uuid()},
          {value: 'place_holder_tag_2', text: 'Place holder tag 2', key: 'tags_option_' + ID.uuid()},
          {value: 'place_holder_tag_3', text: 'Place holder tag 3', key: 'tags_option_' + ID.uuid()}
        ];
      case "Checkboxes":
        return [
          {value: 'place_holder_option_1', text: 'Place holder option 1', key: 'checkboxes_option_' + ID.uuid()},
          {value: 'place_holder_option_2', text: 'Place holder option 2', key: 'checkboxes_option_' + ID.uuid()},
          {value: 'place_holder_option_3', text: 'Place holder option 3', key: 'checkboxes_option_' + ID.uuid()}
        ];
      case "RadioButtons":
        return [
          {value: 'place_holder_option_1', text: 'Place holder option 1', key: 'radiobuttons_option_' + ID.uuid()},
          {value: 'place_holder_option_2', text: 'Place holder option 2', key: 'radiobuttons_option_' + ID.uuid()},
          {value: 'place_holder_option_3', text: 'Place holder option 3', key: 'radiobuttons_option_' + ID.uuid()}
        ];
      default:
        return [];
    }
  }

  _defaultItems() {
    return [
      {
        key: 'Header',
        name: 'Header Text',
        icon: 'fa fa-header',
        static: true,
        content: 'Header Text...',
        elementType: 'noInputElement'
      },
      {
        key: 'Label',
        name: 'Label',
        static: true,
        icon: 'fa fa-font',
        content: 'Label Text...',
        elementType: 'noInputElement'
      },
      {
        key: 'Paragraph',
        name: 'Paragraph',
        static: true,
        icon: 'fa fa-paragraph',
        content: 'Paragraph Text...',
        elementType: 'noInputElement'
      },
      {
        key: 'LineBreak',
        name: 'Line Break',
        static: true,
        icon: 'fa fa-arrows-h',
        elementType: 'noInputElement'
      },
      {
        key: 'TextInput',
        canHaveAnswer: true,
        name: 'Text Input',
        label: 'Text Input Label',
        icon: 'fa fa-terminal',
        field_name: 'text_input_',
        elementType: 'simpleInputElement',
        canHaveTooltip: true,
        toolTip: ''
      },
      {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: 'Number Input',
        label: 'Number Input Label',
        icon: 'fa fa-plus',
        field_name: 'number_input_',
        elementType: 'simpleInputElement'
      },
      {
        key: 'TextArea',
        canHaveAnswer: true,
        name: 'Multi-line Input',
        label: 'Text Area Label',
        icon: 'fa fa-text-height',
        field_name: 'text_area_',
        elementType: 'simpleInputElement'
      },
      {
        key: 'Dropdown',
        canHaveAnswer: true,
        name: 'Dropdown',
        icon: 'fa fa-caret-square-o-down',
        label: 'Dropdown Label',
        field_name: 'dropdown_',
        options: [],
        elementType: 'simpleInputElement'
      },
      {
        key: 'Tags',
        canHaveAnswer: true,
        name: 'Tags',
        icon: 'fa fa-tags',
        label: 'Tags Label',
        field_name: 'tags_',
        options: [],
        elementType: 'customInputElement'
      },
      {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: 'Checkboxes',
        icon: 'fa fa-check-square-o',
        label: 'Checkboxes Label',
        field_name: 'checkboxes_',
        options: [],
        elementType: 'simpleInputElement'
      },
      {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: 'Multiple Choice',
        icon: 'fa fa-dot-circle-o',
        label: 'Radio Buttons Label',
        field_name: 'radio_buttons_',
        options: [],
        elementType: 'simpleInputElement'
      },
      
      {
        key: 'Image',
        name: 'Image',
        label: '',
        icon: 'fa fa-photo',
        field_name: 'image_',
        src: '',
        elementType: 'noInputElement'
      },
      {
        key: 'Rating',
        canHaveAnswer: true,
        name: 'Rating',
        label: 'Placeholder Label',
        icon: 'fa fa-star',
        field_name: 'rating_',
        elementType: 'customInputElement'
      },
      {
        key: 'DatePicker',
        canHaveAnswer: true,
        canDefaultToday: true,
        canReadOnly: true,
        name: 'Date',
        icon: 'fa fa-calendar',
        label: 'Date Picker Label',
        field_name: 'date_picker_',
        elementType: 'customInputElement'
      },
      {
        key: 'Signature',
        canReadOnly: true,
        name: 'Signature',
        icon: 'fa fa-pencil-square-o',
        label: 'Signature',
        field_name: 'signature_',
        elementType: 'customInputElement'
      },
      {
        key: 'HyperLink',
        name: 'Web site',
        icon: 'fa fa-link',
        static: true,
        content: 'HyperLink here ...',
        href: 'http://www.example.com',
        elementType: 'noInputElement'
      },
      {
        key: 'Download',
        name: 'File Attachment',
        icon: 'fa fa-file',
        static: true,
        content: 'File Attachment Label ...',
        field_name: 'download_',
        file_path: '',
        _href: '',
        elementType: 'customInputElement'
      },
      {
        key: 'Range',
        name: 'Range',
        icon: 'fa fa-sliders',
        label: 'Range Label',
        field_name: 'range_',
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: 'Easy',
        max_label: 'Difficult',
        elementType: 'customInputElement'
      },
      {
        key: 'Camera',
        name: 'Camera',
        icon: 'fa fa-camera',
        label: 'Camera Label',
        field_name: 'camera_',
        elementType: 'simpleInputElement'
      },
      {
        key: 'AccordionSection',
        name: 'Accordion Section',
        icon: 'fa fa-columns  fa-rotate-270',
        label: 'Section Label',
        field_name: 'accordionsection_',
        elementType: 'layout'
      },
      {
        key: 'PeoplePicker',
        canHaveAnswer: true,
        name: 'People Picker',
        icon: 'fa fa-user',
        label: 'People Picker Label',
        field_name: 'peoplepicker_',
        elementType: 'customInputElement'
      }
    ]
  }

  create(item) {
    var elementOptions = {
      id: ID.uuid(),
      element: item.key,
      text: item.name,
      static: item.static,
      required: false,
      dataKey: 'key'
    };

    if(item.static) {
      elementOptions['bold'] = false;
      elementOptions['italic'] = false;
    }

    if (item.helpText)
      elementOptions['helpText'] = item.helpText;

    if (item.canHaveTooltip)
      elementOptions['canHaveTooltip'] = item.canHaveTooltip;
      elementOptions['toolTip'] = item.toolTip;

    if (item.canHaveAnswer)
      elementOptions['canHaveAnswer'] = item.canHaveAnswer;

    if (item.canReadOnly)
      elementOptions['readOnly'] = false;

    if (item.canDefaultToday)
      elementOptions['defaultToday'] = false;

    if (item.content)
      elementOptions['content'] = item.content;

    if (item.href)
      elementOptions['href'] = item.href;

    if (item.key === "Image") {
      elementOptions['src'] = item.src;
    }

    if (item.key === "Download") {
      elementOptions['_href'] = item._href;
      elementOptions['file_path'] = item.file_path;
    }

    if (item.key === "Range") {
      elementOptions['step'] = item.step;
      elementOptions['default_value'] = item.default_value;
      elementOptions['min_value'] = item.min_value;
      elementOptions['max_value'] = item.max_value;
      elementOptions['min_label'] = item.min_label;
      elementOptions['max_label'] = item.max_label;
    }

    if (item.defaultValue)
      elementOptions['defaultValue'] = item.defaultValue;

    if (item.field_name)
      elementOptions['field_name'] = item.field_name + ID.uuid();

    if (item.label)
      elementOptions['label'] = item.label;

    if (item.options) {
      elementOptions['options'] = Toolbar._defaultItemOptions(elementOptions['element']);
    }

    if (item.key === "PeoplePicker") {
      elementOptions['data_source'] = item.data_source;
      elementOptions['data_list'] = item.data_list;
    }

    if (item.key === "AccordionSection") {
      elementOptions['components'] = [];
    }

    return elementOptions;
  }

  _onClick(item) {
    // ElementActions.createElement(this.create(item));
    store.dispatch('create', this.create(item));
  }

  render() {
    return (
      <div className="react-form-builder-toolbar">
        <PanelGroup accordion  defaultActiveKey="2" id="toolbar">
        <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>Info Elements</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <ul className="tool-bar-elements">
                {
                  this.state.items.map(item => {
                    if (item.elementType === "noInputElement"){
                      return <ToolbarItem data={item} key={item.key} onClick={this._onClick.bind(this, item)} onCreate={this.create} />;
                    }
                  
                  })
                }
              </ul>
            </Panel.Body>
          </Panel>
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>General Form Elements</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <ul className="tool-bar-elements">
                {
                  this.state.items.map(item => {
                    if (item.elementType === "simpleInputElement"){
                      return <ToolbarItem data={item} key={item.key} onClick={this._onClick.bind(this, item)} onCreate={this.create} />;
                    }
                  
                  })
                }
              </ul>
            </Panel.Body>
          </Panel>
          <Panel eventKey="3">
            <Panel.Heading>
              <Panel.Title toggle>Custom Form Elements</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <ul className="tool-bar-elements">
                {
                  this.state.items.map(item => {
                    if (item.elementType === "customInputElement"){
                      return <ToolbarItem data={item} key={item.key} onClick={this._onClick.bind(this, item)} onCreate={this.create} />;
                    }
                  
                  })
                }
              </ul>
            </Panel.Body>
          </Panel>
          <Panel eventKey="4">
            <Panel.Heading>
              <Panel.Title toggle>Layouts</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <ul className="tool-bar-elements">
                {
                  this.state.items.map(item => {
                    if (item.elementType === "layout"){
                      return <ToolbarItem data={item} key={item.key} onClick={this._onClick.bind(this, item)} onCreate={this.create} />;
                    }
                  
                  })
                }
              </ul>
            </Panel.Body>
          </Panel>
        </PanelGroup>
      </div>
    )
  }
}
