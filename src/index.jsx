/**
  * <ReactFormBuilder />
*/

import React from 'react';
import Preview from './preview';
import Toolbar from './toolbar';
import ReactFormGenerator from './form';
import store from './stores/store';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class ReactFormBuilder extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null
    }
    this.onDocumentClick = this.editModeOff.bind(this);
    document.addEventListener("click", this.onDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick, false);
  }
  
  editModeOn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.editMode) {
      this.setState({editMode: !this.state.editMode, editElement: null});
    } else {
      this.setState({editMode: !this.state.editMode, editElement: data});
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null
      });
    }
  }

  editModeOff(e) {
    let click_is_outside_menu = !(e.target && e.target.closest(".edit-form")) && e.screenX > 0;
  
    if (click_is_outside_menu) {
      //this.manualEditModeOff();
    }
  }

 render() {
   
   let toolbarProps = {};
   if (this.props.toolbarItems)
     toolbarProps.items = this.props.toolbarItems;
   return (
       <div className="clearfix container-fluid">
         <div className="react-form-builder">
            <div>
              <Toolbar {...this.props.toolbarItems} />
              <Preview files={this.props.files}
                 manualEditModeOff={this.manualEditModeOff.bind(this)}
                 parent={this}
                 url={this.props.url}
                 saveUrl={this.props.saveUrl}
                 onLoad={this.props.onLoad}
                 onPost={this.props.onPost}
                 editModeOn={this.editModeOn}
                 editMode={this.state.editMode}
                 variables={this.props.variables}
                 editElement={this.state.editElement}  />
            </div>
         </div>
       </div>
    );
  }
}

const FormBuilders = {};

FormBuilders.ReactFormBuilder = DragDropContext(HTML5Backend)(ReactFormBuilder);
FormBuilders.ReactFormGenerator = ReactFormGenerator;
FormBuilders.ElementStore = store;

module.exports = FormBuilders;
