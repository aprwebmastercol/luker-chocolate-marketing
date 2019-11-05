import React from 'react';

import logo from '../../assets/img/Lukerlogo.svg'
import fifthDim from '../../assets/img/5thdimensions.png'
import doisy from '../../assets/img/Doisy&Dam.png'
import laceys from '../../assets/img/Lacy\'s New.png'
import lyra from '../../assets/img/lyra_eshop.png'
import paul from '../../assets/img/PAUL LAFAYET_Creme.png'
import pots from '../../assets/img/pots&co.png'

import frFlag from '../../assets/img/fr-flag.png'
import usFlag from '../../assets/img/us-flag.png'
import svkFlag from '../../assets/img/svk-flag.png'
import ukFlag from '../../assets/img/uk-flag.png'


function Customer() {

  return (
    <div className='customer-component'>
      <div className="customer-component--header">
        <h1>CLIENTES</h1>
        <div className="btn-dist">
          <img src={logo} className="logo" alt="Logo Luker" />
          <button onClick={() => console.log('hi')}> DISTRIBUIDORES </button>
        </div>
      </div>
      <div className="customer-component--content">
        <div>
          <img src={fifthDim} alt="" />
          <h2>5TH DIMENSIONS</h2>
          <img src={ukFlag} alt="" className="flag-badge" />
        </div>
        <div>
          <img src={doisy} alt="" />
          <h2>DOISY & DAM</h2>
          <img src={ukFlag} alt="" className="flag-badge" />
        </div>
        <div>
          <img src={laceys} alt="" />
          <h2>LACEYS</h2>
          <img src={usFlag} alt="" className="flag-badge" />
        </div>
        <div>
          <img src={lyra} alt="" />
          <h2>LYRA CHOC</h2>
          <img src={svkFlag} alt="" className="flag-badge" />
        </div>
        <div>
          <img src={paul} alt="" />
          <h2>PAUL LAFAYETTE</h2>
          <img src={frFlag} alt="" className="flag-badge" />
        </div>
        <div>
          <img src={pots} alt="" />
          <h2>POTS & CO</h2>
          <img src={ukFlag} alt="" className="flag-badge" />
        </div>
      </div>
    </div>
  );
}

export default Customer;