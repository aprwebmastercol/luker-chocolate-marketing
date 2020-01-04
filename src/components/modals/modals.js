import React from 'react';
import { MdClose } from 'react-icons/md';
import ModalDistributors from './distributors/modal-dist';
import ModalInfoProducts from './info-product/info-product';

class Modals extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { visible, modal, product, title, subtitle } = this.props;
    return (
      <div className={`modal-content modal-content-${visible && 'visible'}`}>
        <div className="modal-content-bkg" onClick={() => this.props.showModalDist()}></div>
        <div className="modal-content-modal">
          <MdClose className="btn-x" onClick={() => this.props.showModalDist()} />
          {modal === 'distributors' &&
            <ModalDistributors />
          }
          {modal === 'info-product' &&
            <ModalInfoProducts product={product} title={title} subtitle={subtitle} />
          }
        </div>
      </div>
    );
  }
};
export default Modals;