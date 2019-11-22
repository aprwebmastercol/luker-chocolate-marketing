
import React from 'react';
import logo from '../../assets/img/Lukerlogo.svg'

import { Link } from 'react-router-dom';
import Maquila from '../../components/product-services/maquila/maquila';
import Footer from '../../components/layout/footer/footer';
import ProductServices from '../../components/product-services/product-services';
import Ingredients from '../../components/product-services/ingredients/ingredients';

class ProductsServices extends React.Component {

  render() {
    const { title, item } = this.props.match.params;

    const products = [
      {
        img: 'cocoa-grageas.png',
        name: 'Paning',
        id: 'dragee',
        description: 'We use the panning method for making our delicious chocolate covered dragees. Chocolate is slowly poured over dierent centers; can be dried fruits, cereals, coee beans, among other bite-size treats, creating a thin coating over them.'
      },
      {
        img: 'cocoa-dosing.png',
        name: 'Dosing',
        id: 'dosing',
        description: 'Through a pump-driven chocolate depositor,we have the capacity to make chips, drops and chunks. Playing with the dosage we can offer dierent sizes of these products.'
      }, {
        img: 'cocoa-bars.png',
        name: 'Moulding',
        id: 'bar',
        description: 'We carry seven diﬀerent existing molds. By combining manual and machine production, we can implement very speciﬁc packaging requirements. Below is a selection of our molds and packaging options.'
      }];
    const ingredients = [
      {
        img: 'luker-cacao.png',
        name: 'CasaLuker Cacao',
        subtitle: 'THE BEST INGREDIENTS',
        id: 'cacao',
        description: 'The meticulous selection of ingredients is essential to achieve the unique sensory profile that characterizes our chocolate.We select the best Cacao Fino de Aroma cocoa beans from Colombia, Ecuador, and Peru.We also use 100% natural cocoa butter and vanilla for our couverture with an exquisite and particular flavor, ideal for chocolate products of all kinds.'
      },
      {
        img: 'luker-arauca.png',
        name: 'CasaLuker 1906',
        subtitle: 'Single origin chocolates',
        id: 'arauca',
        description: 'CasaLuker 1906 has a unique flavour that is given by the pureness of its origins. Made from selected beans from the different Cacao Fino de Aroma cocoa growing regions and countries, its flavour does not only reflect the cocoa variety, but also the richness of the soil and the cocoa harvesting and growing culture of its region. CasaLuker 1906, a treat for the senses.'
      }, {
        img: 'luker-maracas.png',
        name: 'CasaLuker Maracas',
        subtitle: 'Chocolate Dragees',
        id: 'maracas',
        description: 'Como aquel instrumento mágico y seductivo que caracteriza el ambiente alegre y festivo del trópico con su ritmo dulce y diverso, CasaLuker Maracas trae una nueva gama de grageas de chocolate. Estos centros de café tostado, cacao tostado y dulces frutas tropicales están cubiertos con nuestro chocolate Fino de Aroma. CasaLuker Maracas, Tropical Dragees son grageas ideales para decorar postres y tortas, como inclusión en preparaciones, topping para helados o simplemente para darle un toque especial a sus recetas. También pueden acompañar cafés y bebidas calientes, mezclarse con cereales y frutos secos para elaborar snacks saludables.'
      }];
    return (
      <div className="services-component">
        <div className={`services-header services-header--${title} ${(item) && 'services-header--title-short'}`}>
          <div className="btn-dist">
            <img src={logo} className="logo" alt="Logo Luker" />
            <Link to="/solution">DISTRIBUTORS</Link>
            <Link to="/solution">BACK TO SERVICES</Link>
          </div>
          <h1>{(title === 'maquila') ? 'FINISHED CHOCOLATE PRODUCTS' : (title === 'ingredients') ? 'CHOCOLATE INGREDIENTS' : 'OUR SERVICES'}</h1>
        </div>
        <div className="services-content">
          {(title === 'our-services') ? <Maquila /> :
            (item) ? (title === 'maquila') ? <Maquila product={products[products.findIndex(product => product.id === item)]} /> : <Ingredients product={ingredients[ingredients.findIndex(i => i.id === item)]} />
              : <ProductServices items={(title === 'maquila') ? products : ingredients} title={(title === 'maquila') ? 'BRANDED CHOCOLATE PRODUCTS' : 'THE WORKS'} page={title} />}
        </div>
        <Footer />
      </div>
    );
  }
};


export default ProductsServices;