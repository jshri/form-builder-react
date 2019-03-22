import React from "react";
import {Modal,Button} from 'react-bootstrap';
import store from './src/stores/store'
import ReactFormGenerator from './src/form';

export default class Demobar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false
    }

    const update = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    store.subscribe(state => update(state.data));
  }

  showPreview() {
    console.log(this.props.variables);
    console.log(this.state.data);
    this.setState({
      previewVisible: true
    })
  }

  showSaveForm() {
    alert('Form Saved');
    /*console.log(this.props.variables);
    console.log(this.state.data);
    this.setState({
      saveForm: true
    })*/
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true
    })
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true
    })
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
      saveForm: false
    })
  }

  _onChange(data) {
    this.setState({
      data: data
    });
  }

  _onSubmit(data) {
    console.log('onSubmit', data);
    // Place code to post json data to server here
  }

  render() {
    
    return(
      <div className="clearfix container-fluid">
        <h4 className="pull-left">Preview</h4>
        <a href="#" className="btn btn-primary pull-right" style={{ marginRight: '10px'}} onClick={this.showPreview.bind(this)}>Preview Form</a>
        <a href="#" className="btn btn-default pull-right" style={{ marginRight: '10px'}} onClick={this.showShortPreview.bind(this)}>Alternate/Short Form</a>
        <a href="#" className="btn btn-default pull-right" style={{ marginRight: '10px'}} onClick={this.showRoPreview.bind(this)}>Read Only Form</a>
        <a href="#" className="btn btn-default pull-right" style={{ marginRight: '10px'}} onClick={this.showSaveForm.bind(this)}>Save Form</a>
        
        { this.state.saveForm &&
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <label>
                Form Name
              </label>
              <input type="text" className="form-control" />

            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.closePreview.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        }
        { this.state.previewVisible &&
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <ReactFormGenerator
                    download_path=""
                    back_action="/"
                    back_name="Back"
                    answer_data={{}}
                    action_name="Save"
                    //form_action="http://localhost:8080/"
                    form_method="POST"
                    onSubmit={this._onSubmit}
                    variables={this.props.variables}
                    data={this.state.data} />
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={this.closePreview.bind(this)}>Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
        }

        { this.state.roPreviewVisible &&
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={{}}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  read_only={true}
                  variables={this.props.variables}
                  hide_actions={true} data={this.state.data} />

            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.closePreview.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        }


        { this.state.shortPreviewVisible &&
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <ReactFormGenerator
                  download_path=""
                  back_action=""
                  answer_data={{}}
                  form_action="/"
                  form_method="POST"
                  data={this.state.data}
                  display_short={true}
                  variables={this.props.variables}
                  hide_actions={false} />
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.closePreview.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        }
      </div>
    );
  }

}
