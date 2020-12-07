import React from 'react';

import Page from '../page/Page'

import 'bootstrap/dist/css/bootstrap.min.css';
import './type_page.css'

class TypePage extends React.Component{

  render(){
    
    return <Page mode={"type"} max={18}/>

  }

}

export default TypePage;