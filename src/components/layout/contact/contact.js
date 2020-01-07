import React from 'react'
import { Form, Select, Input, Button, Modal } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/Lukerlogo.svg'
import Footer from '../footer/footer';
import termsConditions from '../../../assets/documents/policies/Términos y condiciones de uso sitio web CasaLuker inglés 16dic2019.pdf';
import privacyPolicy from '../../../assets/documents/policies/Política privacidad sitio web CasaLuker inglés 16dic2019.pdf';
import HelmetComponent from '../../../commons/helmet/helmet';
import { withNamespaces } from 'react-i18next';

class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = { feedback: '', name: 'Name', email: 'email@example.com', country: 'Colombia' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  countries = [
    {
      name: 'ARGENTINA',
      abrev: 'ar'
    }, {
      name: 'AUSTRALIA',
      abrev: 'au'
    }, {
      name: 'BAHRAIN',
      abrev: 'bh'
    }, {
      name: 'BELGIUM',
      abrev: 'be'
    }, {
      name: 'BRAZIL',
      abrev: 'br'
    }, {
      name: 'CANADA',
      abrev: 'ca'
    }, {
      name: 'CHILE',
      abrev: 'cl'
    }, {
      name: 'COLOMBIA',
      abrev: 'co'
    }, {
      name: 'CZECH REPUBLIC',
      abrev: 'cz'
    }, {
      name: 'FRANCE',
      abrev: 'fr'
    }, {
      name: 'GERMANY',
      abrev: 'de'
    }, {
      name: 'GREECE',
      abrev: 'gr'
    }, {
      name: 'GUATEMALA',
      abrev: 'gl'
    }, {
      name: 'HUNGARY',
      abrev: 'hu'
    }, {
      name: 'ITALY',
      abrev: 'it'
    }, {
      name: 'JAPAN',
      abrev: 'jp'
    }, {
      name: 'LUXEMBOURG',
      abrev: 'lu'
    }, {
      name: 'MIDDLE EAST',
      abrev: 'me'
    }, {
      name: 'NETHERLANDS',
      abrev: 'nl'
    }, {
      name: 'ROMANIA',
      abrev: 'ro'
    }, {
      name: 'RUSSIA',
      abrev: 'ru'
    }, {
      name: 'SLOVAK REPUBLIK',
      abrev: 'sk'
    }, {
      name: 'TAIWAN',
      abrev: 'tw'
    }, {
      name: 'UKRANIE',
      abrev: 'ua'
    }, {
      name: 'UNITED KINGDOM ',
      abrev: 'uk'
    }, {
      name: 'UNITED STATES',
      abrev: 'us'
    }
  ]

  handleSubmit = e => {
    e.preventDefault();
    const templateId = 'contact_form_luker';
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.sendFeedback(templateId, values);
      }
    });

  };

  sendFeedback(templateId, variables) {
    window.emailjs.send(
      'sendgrid', templateId,
      variables
    ).then(res => {
      console.log('Email successfully sent!');
      this.emailSent('Thank you for getting in touch! ', 'We appreciate you contacting us. One of our colleagues will get back in touch with you soon!');
      this.props.form.resetFields();
    })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => (console.error('Oh well, you failed. Here some thoughts on the error that occured:', err), this.emailSent('Oh well, something failed', 'Check your conection and try again')));
  }

  emailSent(title, content) {
    const modal = Modal.success({
      title: title,
      content: content,
    });

    setTimeout(() => {
      modal.destroy();
    }, 8000);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { t } = this.props;
    const { Option } = Select;
    const { TextArea } = Input;
    return (
      <div className={`contact-us`} >
        <HelmetComponent title="Contact us" />
        <div className="contact-us-header">
          <div className="btn-dist">
            <Link to="/" className="logo"> <img src={logo} alt="Logo Luker" /></Link>
          </div>
          <h1>{t('form.contact-us')}</h1>
        </div >

        <div className={`contact-us-content`}>
          <p>{t('form.contact-message')}</p>
          <Form onSubmit={this.handleSubmit} className="contact-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: t('errors.required-name') }],
              })(
                <Input placeholder={t('form.your-name')} />,
              )}
            </Form.Item>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: t('errors.invalid-email'),
                  },
                  {
                    required: true,
                    message: t('errors.required-email'),
                  },
                ],
              })(<Input placeholder={t('form.your-email')} />)}
            </FormItem>
            <Form.Item>
              {getFieldDecorator('country', {
                rules: [{ required: true, message: t('errors.required-country') }],
              })(
                <Select
                  showSearch
                  placeholder={t('form.your-country')}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Object.keys(this.countries).map(i =>
                    <Option key={i} value={this.countries[i].abrev} key={i}>{this.countries[i].name}</Option>
                  )}
                </Select>,
              )}
            </Form.Item>
            <FormItem>
              {getFieldDecorator('message', {
                rules: [{ required: true, message: t('errors.required-comment') }],
              })(
                <TextArea rows={5} placeholder={t('form.write-message')} />
              )}
            </FormItem>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="contact-form-button">
                {t('buttons.send')}
              </Button>
            </Form.Item>
            <p className="contact-form-terms">{t('form.clicking-send')} <a href={termsConditions} target="_blank">{t('form.terms-conditions')} </a> {t('form.and-our')} <a href={privacyPolicy} target="_blank">{t('form.privacy-policy')}</a>.</p>
          </Form>
        </div>
        <Footer />
      </div >
    );
  }
};

const WrappedContact = Form.create({ name: 'contact_form' })(Contact);
export default withNamespaces()(WrappedContact);