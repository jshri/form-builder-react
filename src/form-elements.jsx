import React from 'react';
import HeaderBar from './header-bar';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import SignaturePad from 'react-signature-canvas';
import PlaceHolder from './form-place-holder';
import ReactBootstrapSlider from  'react-bootstrap-slider';
import ReactDatePicker from 'react-datepicker';
import StarRating from './star-rating';
import xss from 'xss';
import moment from 'moment';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import DropableSection from './dropable-section';



let FormElements = {};
let myxss = new xss.FilterXSS({
  whiteList: {
    u: [],
    br: [],
    b: [],
    i: [],
    ol:['style'],
    ul: ['style'],
    li: [],
    p: ['style'],
    sub: [],
    sup: [],
    div: ['style'],
    em: [],
    strong: [],
    span: ['style']
  }
});

class ComponentLabel extends React.Component {
  render () {
    const hasRequiredLabel = (this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only);
    const hasToolTip = (this.props.data.hasOwnProperty('canHaveTooltip') && this.props.data.canHaveTooltip  && this.props.data.toolTip  &&this.props.data.toolTip.length > 0);
    const toolTilpId = "tooltip-" +this.props.id;
    const tooltip = (
      <Tooltip id={toolTilpId}>
        {this.props.data.toolTip}
      </Tooltip>
    );
    return (
      <label className={this.props.className || ''}>
        <span className="question-label" dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}}/>
        {hasRequiredLabel && <span className="label-required label label-danger">Required</span>}
        {hasToolTip && 
          <OverlayTrigger  overlay={tooltip}>
            <span className="fa fa-info-circle component-tooltip"></span>
          </OverlayTrigger>
        }
      </label>
    );
  }
};

class HelpText extends React.Component {
  render () {
    const hasHelpText = (this.props.data.hasOwnProperty('helpText') && this.props.data.helpText  && this.props.data.helpText.length > 0);
    return (
        {hasHelpText : 
          <div className="help-text">{this.props.data.helpText }</div>
        }
    );
  }
};

class Header extends React.Component {
  render() {
    let headerClasses = 'dynamic-input ' + this.props.data.element + '-input';
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <h3 className={classNames} dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.content) }} />
      </div>
    );
  }
}

class Paragraph extends React.Component {
  render() {
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <p className={classNames} dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.content) }} />
      </div>
    );
  }
}

class Label extends React.Component {
  render() {
    let classNames = 'static';
    if (this.props.data.bold) { classNames += ' bold'; }
    if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <label className={this.props.className || ''}>
          <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.content)}}/>
        </label>
      </div>
    );
  }
}

class LineBreak extends React.Component {
  render() {

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <hr />
      </div>
    );
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    let props = {};
    props.type = "text";
    props.className = "form-control";
    props.datakey = this.props.data.dataKey;
    props.name = this.props.data.field_name;
    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    if(this.props.read_only) {
      props.disabled = "disabled";
    }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <input {...props} />
          
        </div>
      </div>
    );
  }
}

class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    let props = {};
    props.type = "number";
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    if(this.props.read_only) {
      props.disabled = "disabled";
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <input {...props} />
        </div>
      </div>
    );
  }
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    let props = {};
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if(this.props.read_only) {
      props.disabled = "disabled";
    }

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <textarea {...props} />
        </div>
      </div>
    );
  }
}

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    let value, internalValue;

    if(props.data.defaultToday && (props.defaultValue === '' ||  props.defaultValue === undefined) ) {
      value = moment().format('MM/DD/YYYY');
      internalValue = moment();
    } else {
      value = props.defaultValue;

      if(props.defaultValue !== '' && props.defaultValue !== undefined) {
        internalValue = moment(value, 'MM/DD/YYYY');
      }
    }

    this.state = {
      value: value,
      internalValue: internalValue,
      placeholder: 'mm/dd/yyyy',
      defaultToday: props.data.defaultToday
    };
  }

  handleChange = (dt) => {
    if(dt && dt.target) {

      var placeholder = (dt && dt.target && dt.target.value === '') ? 'mm/dd/yyyy': '';
      var formattedDate = (dt.target.value) ? moment(dt.target.value).format('YYYY-MM-DD') : '';

      this.setState({
        value: formattedDate,
        internalValue: formattedDate,
        placeholder: placeholder
      });

    } else {
      this.setState({
        value: (dt) ? dt.format('MM/DD/YYYY') : '',
        internalValue: dt,
        placeholder: placeholder
      });
    }
  };

  componentWillReceiveProps(nextProps) {

    if(this.props.data.defaultToday && !this.state.defaultToday) {
      this.state.value = moment().format('MM/DD/YYYY');
      this.state.internalValue = moment(this.state.value);
    } else if(!this.props.data.defaultToday && this.state.defaultToday) {
      this.state.value = '';
      this.state.internalValue = undefined;
    }

    this.state.defaultToday = this.props.data.defaultToday;
  }

  render() {
    let props = {};
    props.type = "date";
    props.className = "form-control";
    props.name = this.props.data.field_name;

    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    if(this.props.read_only) {
      props.disabled = "disabled";
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <div>
            { this.props.data.readOnly &&
              <input type="text"
                     name={props.name}
                     ref={props.ref}
                     readOnly="true"
                     dateFormat="MM/DD/YYYY"
                     placeholder={this.state.placeholder}
                     value={this.state.value}
                     className="form-control" />
            }
            { iOS && !this.props.data.readOnly &&
              <input type="date"
                     name={props.name}
                     ref={props.ref}
                     onChange={this.handleChange}
                     dateFormat="MM/DD/YYYY"
                     placeholder={this.state.placeholder}
                     value={this.state.value}
                     className = "form-control" />
            }
            { !iOS && !this.props.data.readOnly &&
              <ReactDatePicker
                name={props.name}
                ref={props.ref}
                onChange={this.handleChange}
                selected={this.state.internalValue}
                todayButton={'Today'}
                className = "form-control"
                isClearable={true}
                dateFormat="MM/DD/YYYY"
                placeholderText='mm/dd/yyyy' />
            }
          </div>
        </div>
      </div>
    );
  }
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    let props = {};
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    if(this.props.read_only) {
      props.disabled = "disabled";
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <select {...props}>
            {this.props.data.options.map(function (option) {
              let this_key = 'preview_' + option.key;
              return <option value={option.value} key={this_key}>{option.text}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
}

class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.canvas = React.createRef();
  }

  componentDidMount() {
    if (this.props.defaultValue !== undefined && this.props.defaultValue.length > 0 && !this.props.read_only) {
      //let canvas = this.canvas; // this.refs['canvas_'+this.props.data.field_name];
      //canvas.fromDataURL('data:image/png;base64,' + this.props.defaultValue);
    }
  }

  render() {
    let props = {};
    props.type = "hidden";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }
    let pad_props = {};
    pad_props.clearButton = true;
    if (this.props.mutable) {
      pad_props.defaultValue = this.props.defaultValue;
      pad_props.ref = this.canvas;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    let sourceDataURL
    if (this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0) {
      sourceDataURL = `data:image/png;base64,${this.props.defaultValue}`
    }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0
            ? (<div><img src={sourceDataURL} /></div>)
            : (<SignaturePad {...pad_props} />)
          }
          <input {...props} />
        </div>
      </div>
    );
  }
}

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  state = {value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(",") : []};

  handleChange = (e) => {
    this.setState({value: e});
  };

  render() {
    let options = this.props.data.options.map( option => {
      option.label = option.text;
      return option;
    })
    let props = {};
    props.isMulti = true;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;

    props.options = options;
    if (!this.props.mutable) {props.value = options[0].text} // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.value = this.state.value;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
              <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <Select {...props} />
        </div>
      </div>
    );
  }
}

class Checkboxes extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  render() {
    let self = this;
    let classNames = 'checkbox-label';
    if (this.props.data.inline) { classNames += ' option-inline'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel className="form-label" {...this.props} />
          {this.props.data.options.map((option) => {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = 'option_' + option.key;

            props.type = "checkbox"
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue.indexOf(option.value) > -1 ? true : false;
            }
            return (
              <label className={classNames} key={this_key}>
                <input ref={c => {
                  if (c && self.props.mutable) {
                    self.options[`child_ref_${option.key}`] = c;
                  }
                } } {...props} /> {option.text}
              </label>
            )
          })}
        </div>
      </div>
    );
  }
}

class RadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  render() {
    let self = this;
    let classNames = 'radio-label';
    if (this.props.data.inline) { classNames += ' option-inline'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel className="form-label" {...this.props} />
          {this.props.data.options.map((option) => {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = self.props.data.field_name;

            props.type = "radio"
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = (self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.value) > -1) ? true : false;
            }
            return (
              <label className={classNames} key={this_key}>
                <input ref={c => {
                  if (c && self.props.mutable) {
                    self.options[`child_ref_${option.key}`] = c;
                  }
                } } {...props} /> {option.text}
              </label>
            )
          })}
        </div>
      </div>
    );
  }
}

class Image extends React.Component {

  render() {
    var style = (this.props.data.center) ? { textAlign: 'center' } : null;

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses} style={style}>
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} required={this.props.data.required} />
        }
        { this.props.data.src &&
          <img src={this.props.data.src} width={this.props.data.width} height={this.props.data.height} />
        }
        { !this.props.data.src &&
          <div className="no-image">No Image</div>
        }
      </div>
    );
  }
}

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    let props = {};
    props.name = this.props.data.field_name;
    props.ratingAmount = 5;

    if (this.props.mutable) {
      props.rating = (this.props.defaultValue !== undefined && this.props.defaultValue.length) ? parseFloat(this.props.defaultValue, 10) : 0;
      props.editing = true;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <StarRating {...props} />
        </div>
      </div>
    );
  }
}

class HyperLink extends React.Component {

  render() {
    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <a target="_blank" href={this.props.data.href}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
}

class Download extends React.Component {

  render() {
    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <a href={this.props.download_path + '?id=' + this.props.data.file_path}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
}

class Camera extends React.Component {

  constructor(props) {
    super(props);
    this.state = { img: null };
  }

  displayImage = (e) => {
    var self = this;
    var target = e.target;
    var file, reader;

    if (target.files && target.files.length) {
      file = target.files[0];
      reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function() {
        self.setState({
          img: reader.result
        });
      }
    }
  };

  clearImage = () => {
    this.setState({
      img: null
    })
  };

  render() {
    let baseClasses = 'SortableItem rfb-item';
    const name = this.props.data.field_name;
    const fileInputStyle = this.state.img ? { display: 'none' } : null;
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <div className="image-upload-container">

            <div style={fileInputStyle}>
              <input name={name} type="file" accept="image/*" capture="camera" className="image-upload" onChange={this.displayImage} />
              <div className="image-upload-control">
                <div className="btn btn-default btn-school"><i className="fa fa-camera"></i> Upload Photo</div>
                <p>Select an image from your computer or device.</p>
              </div>
            </div>

            { this.state.img &&
              <div>
                <img src={ this.state.img } height="100" className="image-upload-preview" /><br />
                <div className="btn btn-school btn-image-clear" onClick={this.clearImage}>
                  <i className="fa fa-times"></i> Clear Photo
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.state = {
      value: props.defaultValue !== undefined ? parseInt(props.defaultValue, 10) : parseInt(props.data.default_value, 10)
    }
  }

  changeValue = (e)=>{
    const {target} = e;
    this.setState({
      value: target.value
    });
  }

  render() {
    const props = {};
    const name = this.props.data.field_name;

    props.type = "range";
    props.list = "tickmarks_" + name;
    props.min = this.props.data.min_value;
    props.max = this.props.data.max_value;
    props.step = this.props.data.step;

    props.value = this.state.value;
    props.change = this.changeValue;

    if (this.props.mutable) {
      props.ref = this.inputField;
    }

    let datalist = [];
    for (var i = parseInt(props.min_value, 10); i <= parseInt(props.max_value, 10); i += parseInt(props.step, 10)) {
      datalist.push(i);
    }

    let oneBig = 100 / (datalist.length - 1);

    let _datalist = datalist.map((d,idx) => {
      return <option key={props.list+'_'+idx}>{d}</option>
    })

    let visible_marks = datalist.map((d,idx) => {
      let option_props = {};
      let w = oneBig;
      if (idx === 0 || idx === datalist.length-1)
        w = oneBig/2;
      option_props.key = props.list+'_label_'+idx;
      option_props.style = {width: w + '%'};
      if (idx === datalist.length-1)
        option_props.style = {width: w + '%', textAlign: 'right'};
      return <label {...option_props}>{d}</label>
    })

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <div className="range">
            <div className="clearfix">
              <span className="pull-left">{this.props.data.min_label}</span>
              <span className="pull-right">{this.props.data.max_label}</span>
            </div>
            <ReactBootstrapSlider {...props} />
          </div>
          <div className="visible_marks">
            {visible_marks}
          </div>
          <input name={name} value={this.state.value} type="hidden" />
          <datalist id={props.list}>
            {_datalist}
          </datalist>
        </div>
      </div>
    );
  }
}

class AccordionSection extends React.Component {

  render() {
    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="form-group">
            <div className="panel panel-default">
              <div className="panel-heading"><ComponentLabel {...this.props} /></div>
              <div className="panel-body">
              {/*
                <DropableSection></DropableSection>
              */}
              </div>
            </div>
        </div>
      </div>
    );
  }
}

class PeoplePicker extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }
  UsersList = [];

  render() {
    let props = {};
    props.className = "form-control-people";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    if(this.props.read_only) {
      props.disabled = "disabled";
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses}>
        { !this.props.mutable &&
          <div>
            { this.props.data.pageBreakBefore &&
              <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
          </div>
        }
        <div className="nopadding">
          <ComponentLabel {...this.props} />
          <AsyncSelect {...props} isSearchable isClearable loadOptions={this.loadOptions}/>
        </div>
      </div>
    );
  }
  componentDidMount() { 
    console.log(this.props);
    if (this.props.data.data_source === undefined || this.props.data.data_source === "SPSiteUsersList") {
      this.RetrieveSPUsers();
    }
    else if (this.props.data.data_source === "SPCustomList"){
      this.UsersList = [];
    }
  } 

  RetrieveSPUsers(){ 
    var spRequest = new XMLHttpRequest(); 
    spRequest.open('GET', "/sites/dev-jay/_api/web/SiteUserInfoList/items?$filter=UserName ne null and EMail ne null &$top=5000",true); 
    spRequest.setRequestHeader("Accept","application/json");

    spRequest.onreadystatechange = (() => { 
      if (spRequest.readyState === 4 && spRequest.status === 200){ 
        var result = JSON.parse(spRequest.responseText); 
        this.UsersList = result.value.map((user) => {
          var item =  { 
            label: user.Title,
            value: user.Id 
          };

          if (user.EMail){
            item =  { label: user.Title + " (" + user.EMail +")",
            value: user.Id };
          }

          return item;
        });
      } 
      else if (spRequest.readyState === 4 && spRequest.status !== 200){ 
        console.log('Data Request Error Occured !');   
      } 
    }); 

    spRequest.send(); 

  }
  
  filterUsers = (inputValue) => {
    if (inputValue) {
      return this.UsersList.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    }
    return this.UsersList;
  };
  
  loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(this.filterUsers(inputValue));
    }, 1000);
  };
}

FormElements.Header = Header;
FormElements.Paragraph = Paragraph;
FormElements.Label = Label;
FormElements.LineBreak = LineBreak;
FormElements.TextInput = TextInput;
FormElements.NumberInput = NumberInput;
FormElements.TextArea = TextArea;
FormElements.Dropdown = Dropdown;
FormElements.Signature = Signature;
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = DatePicker;
FormElements.RadioButtons = RadioButtons;
FormElements.Image = Image;
FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download;
FormElements.Camera = Camera;
FormElements.Range = Range;
FormElements.AccordionSection = AccordionSection;
FormElements.PeoplePicker = PeoplePicker;


module.exports = FormElements;
