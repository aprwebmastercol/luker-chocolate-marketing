import React from 'react'
import ContactSide from '../../layout/contact-side/contact-side';
import { Link } from 'react-router-dom';
import ProductServices from '../product-services';
import i18n from '../../../i18n';
import { withNamespaces } from 'react-i18next';

import { dosing as dosingEn, panning as panningEn, moulding as mouldingEn, mouldingBars as mouldingBarsEn, mouldingShapes as mouldingShapesEn } from '../../../commons/data/data-en';
import { dosing as dosingEs, panning as panningEs, moulding as mouldingEs, mouldingBars as mouldingBarsEs, mouldingShapes as mouldingShapesEs } from '../../../commons/data/data-es';


class Maquila extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideFormContact: true,
      hasSelected: false,
      showMouldingOption: '',
      itemSelected: [],
      dosing: i18n.language === 'en' ? dosingEn : dosingEs,
      panning: i18n.language === 'en' ? panningEn : panningEs,
      moulding: i18n.language === 'en' ? mouldingEn : mouldingEs,
      mouldingBars: i18n.language === 'en' ? mouldingBarsEn : mouldingBarsEs,
      mouldingShapes: i18n.language === 'en' ? mouldingShapesEn : mouldingShapesEs,
    };
    this.handleSetProductSelected = this.handleSetProductSelected.bind(this);
    this.handleShowFormContact = this.handleShowFormContact.bind(this)
  }

  selectProduct(product) {
    this.clearProducts();
    this.setState({ itemSelected: [] });

    if (product.id === 'bars' || product.id === 'shapes') {
      this.setState({ hasSelected: true });
      this.setState(({ showMouldingOption: product.description.toLowerCase() }), () => { console.log('entro', this.state.showMouldingOption) });
    } else {
      if (this.state.itemSelected.length === 0) {
        this.setState({ hasSelected: true });
        this.setState({ showMouldingOption: '' });
        product.selected = !product.selected;
        this.setState(({
          itemSelected: [product]
        }), () => {
          console.log(this.state.itemSelected);
        })
      } else {
        this.setState({ showMouldingOption: '' });
        product.selected = false;
        this.setState({ itemSelected: [] });
      }
    }
  };

  addProduct(product) {
    this.setState({ hasSelected: !this.state.hasSelected });
    this.setState({ showMouldingOption: '' });
    //this.clearProducts();
    this.setState(({
      itemSelected: this.state.itemSelected.concat(product)
    }), () => {
      console.log(this.state.itemSelected);
    })
    this.handleShowFormContact(true);
  };

  clearProducts() {
    if (this.props.product.id === 'dosing') {
      for (const i in this.state.dosing) {
        this.state.dosing[i].selected = false;
      }
    }
    if (this.props.product.id === 'panning') {
      for (const i in this.state.panning) {
        this.state.panning[i].selected = false;
      }
    }
    if (this.props.product.id === 'moulding') {
      for (const i in this.state.moulding) {
        this.state.moulding[i].selected = false;
      }
      for (const i in this.state.mouldingBars) {
        this.state.mouldingBars[i].selected = false;
      }
      for (const i in this.state.mouldingShapes) {
        this.state.mouldingShapes[i].selected = false;
      }
    }
  }


  handleSetProductSelected(value) {
    this.setState({ hasSelected: false });
    this.setState({ showMouldingOption: '' });
    this.clearProducts();
    this.setState({ itemSelected: [] });
  }

  handleShowFormContact(action) {
    this.setState({ hideFormContact: !action })
  }

  render() {

    const altImg = 'img-example.svg';
    const { product, t } = this.props;
    const { hideFormContact, itemSelected, dosing, panning, moulding, hasSelected, mouldingShapes, mouldingBars, showMouldingOption } = this.state;

    return (
      <div className={`maquila-component ${hideFormContact && 'maquila-component--hide-form'} `} >
        <div className="maquila-component-container">
          <h1 className="maquila-component-title-resp">{t('products-services.branded-chocolate-products')}</h1>
          <h2 className="maquila-component-title-h2">{t('products-services.chocolate')} {product.name}</h2>
          <div className="maquila-component--product-data ">
            <div className={`maquila-item maquila-item--${product.id}`}>
              <img src={require('../../../assets/img/' + (product.img ? product.img : altImg))} alt={product.description} />
            </div>
            <p>{product.description}</p>
          </div>
          <h2 className="maquila-component-title">{t('products-services.customizable-logo-branding')}</h2>
          {hasSelected ?
            showMouldingOption ?
              <div className={`maquila-product`}>
                {showMouldingOption === 'bars' ?
                  Object.keys(mouldingBars).map((i) =>
                    <div key={i} className={`maquila-product-item maquila-product-item--${mouldingBars[i].selected && 'active'}`} onClick={() => this.selectProduct(mouldingBars[i])}>
                      <img src={require('../../../assets/img/' + mouldingBars[i].img)} alt={mouldingBars[i].description} />
                      {mouldingBars[i].description}
                    </div>) :
                  Object.keys(mouldingShapes).map((i) =>
                    <div key={i} className={`maquila-product-item maquila-product-item--${mouldingShapes[i].selected && 'active'}`} onClick={() => this.selectProduct(mouldingShapes[i])}>
                      <img src={require('../../../assets/img/' + mouldingShapes[i].img)} alt={mouldingShapes[i].description} />
                      {mouldingShapes[i].description}
                    </div>)}
              </div> :
              <div className={`maquila-product maquila-product-dmw`}>
                {[t('products-services.dark').toUpperCase(), t('products-services.milk').toUpperCase(), t('products-services.white').toUpperCase()].map((item, i) =>
                  <div key={i} className={`maquila-product-item maquila-product-item-dmw`} onClick={() => this.addProduct(item)}>
                    {item}
                  </div>)}
              </div>
            :
            <div className={`maquila-product maquila-product--${product.id}`}>
              {product.id === 'dosing' && Object.keys(dosing).map((i) =>
                <div key={i} className={`maquila-product-item maquila-product-item--${dosing[i].selected && 'active'}`} onClick={() => this.selectProduct(dosing[i])}>
                  <img src={require('../../../assets/img/' + (dosing[i].img ? dosing[i].img : altImg))} alt={dosing[i].id} />
                  {dosing[i].description}
                </div>)}
              {product.id === 'panning' && Object.keys(panning).map((i) =>
                <div key={i} className="maquila-product-item" onClick={() => this.selectProduct(panning[i])}>
                  <img src={require('../../../assets/img/' + (panning[i].img ? panning[i].img : altImg))} alt={panning[i].id} />
                  {panning[i].description}
                </div>)}
              {product.id === 'moulding' && Object.keys(moulding).map((i) =>
                <div key={i} className="maquila-product-item" onClick={() => this.selectProduct(moulding[i])}>
                  <img src={require('../../../assets/img/' + (moulding[i].img ? moulding[i].img : altImg))} alt={moulding[i].id} />
                  {moulding[i].description}    </div>)}
            </div>}
        </div>
        <div className="btn-back-sticky">
          <Link to={t('route.product-services') + t('route.finished-chocolate-products')}>{t('buttons.back-to-products').toUpperCase()}</Link>
        </div>
        <ContactSide page='maquila' products={itemSelected} handleSetProductSelected={this.handleSetProductSelected} handleShowFormContact={this.handleShowFormContact} />
      </div >
    );
  }
};
export default withNamespaces()(Maquila);