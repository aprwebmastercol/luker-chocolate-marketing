import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { ReactTitle } from 'react-meta-tags';

class HelmetComponent extends Component {
  render() {
    const { title, description, imageOG, url, keywords, titleOg, descriptionOg } = this.props;
    const fullUrl = 'full-url';
    
    return (
      <Helmet>
        <title>{title.charAt(0).toUpperCase() + title.slice(1)}</title>
        <meta name="description" content={description ? description : 'More than a century of experience has given us what it takes to provide high-quality chocolate products and services around the world with Cacao Fino de Aroma. Sustainability and innovation are key to our process. Get to know us!'} />
        <meta name="keywords" content={keywords ? keywords : "cacao fino de aroma, high-quality chocolate products, chocolate products and services, chocolate"} />
        <meta property="og:type" content="article"/>
        <meta property="og:title" content={title ? titleOg ? titleOg : title.charAt(0).toUpperCase() + title.slice(1) : "Luker Chocolate | Cacao Fino de Aroma"} />
        <meta property="og:description" content={description ? descriptionOg ? descriptionOg : description : "More than a century of experience has given us what it takes to provide high-quality chocolate products and services around the world with Cacao Fino de Aroma. Sustainability and innovation are key to our process. Get to know us!"} />
        <meta property="og:image" content={imageOG || "https://www.back.lukerchocolate.com/wp-content/uploads/2020/01/Home.jpg"} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content="Luker Chocolate." />
        <meta name="twitter:title" content={title ? titleOg ? titleOg : title.charAt(0).toUpperCase() + title.slice(1) : "Luker Chocolate | Cacao Fino de Aroma"} />
        <meta name="twitter:image:alt" content={description ? descriptionOg ? descriptionOg : description : "More than a century of experience has given us what it takes to provide high-quality chocolate products and services around the world with Cacao Fino de Aroma. Sustainability and innovation are key to our process. Get to know us!"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Luker_Chocolate" />
        <meta property="twitter:image" content={imageOG || "https://www.back.lukerchocolate.com/wp-content/uploads/2020/01/Home.jpg"} />
      </Helmet>
    );
  }
}
export default HelmetComponent;                