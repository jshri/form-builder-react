import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import FormBuilder from "./src/index";
import ReactFormGenerator from './src/form';
import * as variables from './variables'
import { get, post} from './src/stores/requests';
// Add our stylesheets for the demo.
require('./scss/application.scss');

const url = '/api/formdata1'; //sharepoint url form
const saveUrl ='/api/formdata2';
//const preloadFormData = [];
const preloadFormData = [{"id":"F1B2484E-5066-4766-A11D-3702C522DD4C","element":"TextInput","text":"Text Input","required":true,"dataKey":"key","canHaveTooltip":true,"toolTip":"","canHaveAnswer":true,"field_name":"text_input_17D1C330-A05B-4333-B6C4-FA2096624F16","label":"<div><strong>Input1</strong></div>\n"}];
const preloadAnswerData = [{name: "text_input_17D1C330-A05B-4333-B6C4-FA2096624F16", value: "rgdfgdfg"}];

const onLoad = function() {

  //return get(url);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(preloadFormData);
    }, 1000);
  });
  
}

const onPost = function(data) {
  console.log('onPost', data);
}

const _onSubmit = function(data) {
  console.log('_onSubmit', data);
}

/*
ReactDOM.render(
  <FormBuilder.ReactFormBuilder variables={variables} 
    url={url}
    saveUrl={saveUrl}
  />,
  document.getElementById('form-builder')
)
*/

ReactDOM.render(
   <FormBuilder.ReactFormBuilder variables={variables} 
     onLoad={onLoad}
     onPost={onPost}
   />,
   document.getElementById('form-builder')
)


ReactDOM.render(
  <DemoBar variables={variables} />,
  document.getElementById('demo-bar')
)

/*
ReactDOM.render(
  <ReactFormGenerator
    download_path=""
    back_action="/"
    back_name="Back"
    answer_data={preloadAnswerData}
    action_name="Save"
    form_action="/"
    form_method="POST"
    onSubmit={_onSubmit}
    variables={variables}
    data={preloadFormData} 
    />,
  document.getElementById('form-builder')
)

*/