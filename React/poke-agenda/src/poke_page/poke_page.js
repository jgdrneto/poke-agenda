import React from 'react';

import Page from '../page/Page'

import 'bootstrap/dist/css/bootstrap.min.css';
import './poke_page.css'

class PokePage extends React.Component{

  render(){
    
    return <Page mode={"pokemon"} max={151}/>

  }

}

export default PokePage;