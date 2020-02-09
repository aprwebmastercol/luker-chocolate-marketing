import React from 'react'
import logo from '../../../assets/img/Lukerlogo.svg'
import { Link, withRouter } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { NewContact } from '../../../commons/services/emblueService';
import { notification } from 'antd';
import i18n from '../../../i18n';
import { withNamespaces } from 'react-i18next';

import { termsConditions } from "../../../commons/data/data-en";
import { privacyPolicy } from "../../../commons/data/data-en";
import { antiFraud } from "../../../commons/data/data-en";
import { dataTreatment } from "../../../commons/data/data-en";

import { termsConditions as termsConditionsEs } from "../../../commons/data/data-es";
import { privacyPolicy as privacyPolicyEs } from "../../../commons/data/data-es";
import { antiFraud as antiFraudEs } from "../../../commons/data/data-es";
import { dataTreatment as dataTreatmentEs } from "../../../commons/data/data-es";

class Footer extends React.Component {
  hideNews = ['moulding', 'dosing', 'panning', 'cocoa-powder', 'casaluker', 'our-services'];//VIstas en las que se oculta el newsletter
  hideWorkUs = ["work-with-us", "trabaja-con-nosotros"]
  hideContact = ["contact-us", "contactanos"]

  constructor(props) {
    super(props);
    this.state = {
      emailNewsletter: '',
      newsletterWaiting: false
    };
    this.handleChangeNews = this.handleChangeNews.bind(this);
    this.registerEmailNewsletter = this.registerEmailNewsletter.bind(this);
  }

  handleChangeNews(event) {
    this.setState({ emailNewsletter: event.target.value });
  }

  registerEmailNewsletter(e) {
    e.preventDefault();
    this.setState({ newsletterWaiting: true });
    NewContact(this.state.emailNewsletter).then((response) => this.openNotification(response))
  }

  openNotification = (data) => {
    if (data.AggregatedGroups) {
      if (data.Description === "preexistente") {
        notification.warning({
          message: i18n.t('errors.already-did-it'),
          description:
            i18n.t('errors.registered-email')
        });
      } else {
        notification.success({
          message: i18n.t('messages.welcome-community'),
          description:
            i18n.t('messages.newsletter-ok')
        });
      }
      this.setState({ emailNewsletter: '' });
    } else {
      notification.error({
        message: i18n.t('errors.email-send-error'),
        description:
          i18n.t('errors.try_again')
      });
    }
    this.setState({ newsletterWaiting: false });
  };

  render() {
    const { mode, history, t } = this.props;
    const { emailNewsletter, newsletterWaiting } = this.state;
    const isNewsletterHidden = this.hideNews.some(function (v) { return history.location.pathname.includes(v); });
    const seeWorkUs = this.hideWorkUs.some(function (v) { return history.location.pathname.includes(v); });
    const seeContact = this.hideContact.some(function (v) { return history.location.pathname.includes(v); });

    return (
      <div>
        <div className={`footer-component ${mode == 'vertical' && 'footer-component-vertical'} ${mode == 'responsive' && 'footer-component-responsive'}`}>
          <div className="footer-component-logo">
            <Link to="/" className="logo"> <img src="/static/media/Lukerlogo.af6f7609.svg" alt="Logo Luker" /></Link>
          </div>
          {mode === 'responsive' &&
            <div className="footer-component-social--btn">
              <a href="https://www.linkedin.com/company/lukerchocolate/" target="_blank" ><FaLinkedinIn /></a>
              <a href="https://www.instagram.com/lukerchocolate/" target="_blank" ><FaInstagram /></a>
              <a href="https://www.facebook.com/LukerChocolate/" target="_blank" ><FaFacebookF /></a>
            </div>}
          <div className="footer-component-data">
            <h2>{t('footer.luker-chocolate-colombia')}</h2>
            <ul>
              <li><a href="https://goo.gl/maps/6Ni5hcRznH8yMznv9" target="_blank">{t('footer.street')} 13 # 68-98</a></li>
              <li>Bogotá, Colombia</li>
              <li><a href="mailto:lukercacao@lukerchocolate.com" target="_blank">lukercacao@lukerchocolate.com</a></li>
              <li><a href="tel:+57(1) 4473700">+57(1) 4473700</a></li>
            </ul>
          </div>
          <div className="footer-component-data">
            <h2>{t('footer.luker-chocolate-europe')}</h2>
            <ul>
              <li><a href="https://goo.gl/maps/FvoAnbZQjSMxdRn48" target="_blank">Kortrijksesteenweg 1132</a></li>
              <li>9051 Sint-Denjis-Westrem, {t('footer.belgium')}</li>
              <li><a href="mailto:lukereu@lukerchocolate.com" target="_blank">lukereu@lukerchocolate.com</a></li>
              <li><a href="tel:+32(0) 9 2450460">+32(0) 9 2450460</a></li>
            </ul>
          </div>
          {mode === 'vertical'}
          {(!isNewsletterHidden && mode !== 'responsive') &&
            <div className="footer-component-data footer-component-data-policies">
              <h2>{t('footer.our-policies').toUpperCase()}</h2>
              <ul>
                <li><a href={i18n.language === 'en' ? termsConditions : termsConditionsEs} target='_blank'>{t('footer.terms-conditions')}</a></li>
                <li><a href={i18n.language === 'en' ? privacyPolicy : privacyPolicyEs} target='_blank'>{t('footer.web-privacy-policy')}</a></li>
                <li><a href={i18n.language === 'en' ? antiFraud : antiFraudEs} target='_blank'>{t('footer.anti-fraud-corruption-policy')}</a></li>
                <li><a href={i18n.language === 'en' ? dataTreatment : dataTreatmentEs} target='_blank'>{t('footer.personal-data-processing-policy')}</a></li>
              </ul>
            </div>}
          <div className="footer-component-link">
            {!seeWorkUs && <Link to={t('routes.work-with-us')}>{t('form.work-with-us').toUpperCase()}</Link>}
            {!seeContact && <Link to={t('routes.contact-us')}>{t('form.contact-us')}</Link>}
            <Link to="/blog">{t('footer.visit-our-blog').toUpperCase()}</Link>
          </div>
          {(!isNewsletterHidden && mode !== 'responsive') && <div className="footer-component-social">
            <h2>{t('blog.join-newsletter')}</h2>
            <form onSubmit={this.registerEmailNewsletter}>
              <input type="email" name="email" placeholder={t('form.give-us-email')} value={emailNewsletter} onChange={this.handleChangeNews} />
              <input type="submit" value={t('buttons.send')} disabled={newsletterWaiting} />
            </form>
            <div className="footer-component-social--btn">
              <a href="https://www.linkedin.com/company/lukerchocolate/" target="_blank" ><FaLinkedinIn /></a>
              <a href="https://www.instagram.com/lukerchocolate/" target="_blank" ><FaInstagram /></a>
              <a href="https://www.facebook.com/LukerChocolate/" target="_blank" ><FaFacebookF /></a>
            </div>
          </div>}
        </div>
        {(mode === 'vertical' || mode === 'responsive') &&
          <div className="footer-component-bkg" onClick={this.props.handleShowMoreInfo}></div>
        }
      </div>
    )
  }
}
export default withNamespaces()(withRouter(Footer));
