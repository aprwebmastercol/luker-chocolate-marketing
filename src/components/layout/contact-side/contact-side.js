import React from 'react'
import { withRouter } from 'react-router-dom';
import i18n from '../../../i18n';
import { Form, Select, Input, Button, InputNumber, Modal, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { termsConditions } from "../../../commons/data/data-en";
import { privacyPolicy } from "../../../commons/data/data-en";
import { termsConditions as termsConditionsEs } from "../../../commons/data/data-es";
import { privacyPolicy as privacyPolicyEs } from "../../../commons/data/data-es";
import { withNamespaces } from 'react-i18next';
import { countries as dataCountries } from '../../../commons/data/data-en';
import { countries as paises } from '../../../commons/data/data-es';
import { RegisterCustomerSaleforce } from '../../../commons/services/salesforce';

class ContactSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feedback: '', name: 'Name', email: 'email@example.com', phone: '', country: 'Colombia', products: [], isLoading: false, countryCode: ['1'] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  countries = i18n.language === 'en' ? dataCountries : paises;

  handleSubmit = e => {
    e.preventDefault();
    const templateId = 'contact_form_luker';
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //  values.push();        
        this.setState({ isLoading: true });
        values.products = 'And get some information about this products: ' + this.props.products.filter(item => item.selected).map(a => a.description).join(', ');
        values.productsString = this.props.products.filter(item => item.selected).map(a => a.description).join(', ');
        //this.sendFeedback(templateId, values);
        console.log('Received values of form: ', values);
        this.SendSalesForce(values)
      }
    });
  };

  SendSalesForce(data) {
    let bodyData = {
      payload: {
        FirstName: data.username.replace(/ .*/, ''),
        LastName: data.username.substr(data.username.indexOf(" ") + 1),
        CLK_DescriptionoFirstTouchPoint__c: `Luker web Product Form`,
        CLK_CommentMessage__c: data.message,
        products__c: data.productsString,
        Country: data.country,
        Email: data.email,
        LeadSource: "Website",
        MobilePhone: data.phone || "",
        Company: data.companyName || "No company",
        Description: data.message
      }
    }

    let emailData = `<h3>Hi</h3>
    <p>Our customer <strong>${data.username}</strong> from <strong>${data.country}</strong> wants to get in touch with us from this email: ${data.email}</p>    
    ${data.productsString ? `<p>${data.products}</p>` : ''}
    <p></p>
    <p>Here is what he says:</p>
    <blockquote>${data.message}</blockquote>
    Best wishes, greetings from <strong>Luker WEB</strong> !!
    `;

    RegisterCustomerSaleforce(bodyData, emailData).then(() => this.setState({ isLoading: false }))
  }


  sendFeedback(templateId, variables) {
    window.emailjs.send(
      'sendgrid', templateId,
      variables
    ).then(res => {
      console.log('Email successfully sent!');
      this.emailSent('Thank you for getting in touch! ', 'We appreciate you contacting us. One of our colleagues will get back in touch with you soon!');
      this.props.form.resetFields();
      this.props.handleSetProductSelected(this.props.products.filter(item => item.selected));
      this.goBackProducts();
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

  goBackProducts() {
    let newRoute = (this.props.page === 'maquila') ? '/finished-chocolate-products' : (this.props.page === 'service') ? '' : '/ingredients';
    this.props.history.push(i18n.t('routes.products-services') + newRoute);
  }

  handleChangeInd(e) {
    let inds = this.countries.filter(a => a.name.includes(e))
    this.setState({ countryCode: inds[0].ind });
  }

  redirectContactUs = () => {
    if(i18n.language === 'en')
      window.location.replace('https://info.lukercacao.com/luker/ContactUs/en/')
    else  
      window.location.replace('https://info.lukercacao.com/luker/Contactanos/es/')
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, countryCode } = this.state;
    const { products, page, t } = this.props;
    const { Option } = Select;
    const { TextArea } = Input;
    const altImg = 'img-example.svg';

    const selectBefore = (
      <Select defaultValue="" className="select-before">
        <Option value="" disabled>+(--)</Option>
        {countryCode.map((code, i) =>
          <Option key={i} value={code} key={i}>+{code}</Option>
        )}
      </Select>
    );

    return (
      <div className={`contact-component contact-component--${page}`} >
        <div className={`contact-component-content`}>
          <h1>{t('form.give-us-details')}</h1>
          <Button type="primary" className="contact-form-button" onClick={this.redirectContactUs}>
            {t('buttons.contact_us_get_quote')}
          </Button>
          {/*!isLoading ?
            <Form onSubmit={this.handleSubmit} className="contact-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: t('errors.required-name') }],
                })(
                  <Input placeholder={t('form.your-name')} />,
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('companyName', {
                  rules: [{ required: true, message: t('errors.required-company') }],
                })(
                  <Input placeholder={t('form.company')} />,
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
                    onChange={(e) => this.handleChangeInd(e)}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.countries.map((country, i) =>
                      <Option key={i} value={country.name} key={i}>{country.name}</Option>
                    )}
                  </Select>,
                )}
              </Form.Item>

              {page === 'service' &&
                <Form.Item>
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: t('errors.required-number') }],
                  })(
                    <Input type="number" addonBefore={selectBefore} minLength={7} maxLength={20} placeholder={t('form.phone-number')} style={{ width: '100%' }} />,
                  )}
                </Form.Item>
              }

              {(page === 'maquila' || page === 'ingredients' || page === 'cacao' || page === 'maracas') &&
                <div className="contact-form-products">
                  <p>{t('form.characteristics')}</p>
                  {products &&
                    <div className="contact-form-products--list">
                      {products.filter(item => item.selected).length > 0 ?
                        Object.keys(products.filter(item => item.selected)).map(i =>
                          <div key={i} className={`contact-form-products--list-item contact-form-products--list-item-${page} contact-form-products--list-item-maquila`} onClick={() => this.props.handleSetProductSelected(products.filter(item => item.selected)[i])}>
                            <img src={require('../../../assets/img/' + (products.filter(item => item.selected)[i].img ? products.filter(item => item.selected)[i].img : altImg))} alt={products.filter(item => item.selected)[i].id} />
                            <p className={``} >{products.filter(item => item.selected)[i].description}</p>
                          </div>)

                        : <span>{page === 'maquila' ? t('form.choose-option') : t('form.choose-products')}</span>
                      }
                    </div>
                  }
                </div>
              }
              <FormItem>
                {getFieldDecorator('message', {
                  rules: [{ required: true, message: t('errors.required-comment') }],
                })(
                  <TextArea rows={3} placeholder={t('form.write-message')} />
                )}
              </FormItem>
              <Form.Item>
                <Button type="primary" className="contact-form-button contact-form-button-back" onClick={() => this.props.handleShowFormContact(false)}>
                  {t('buttons.back')}
                </Button>
                <div className="terms-and-conditions">
                  <input type="checkbox" required />
                  <div>
                    {i18n.t('messages.click_accept')}&nbsp;
                    <a href={i18n.language === 'en' ? termsConditions : termsConditionsEs} target="_blank">{t('messages.terms_and_conditions')}</a>&nbsp;
                    {i18n.t('messages.and')}&nbsp;
                    <a href={i18n.language === 'en' ? privacyPolicy : privacyPolicyEs} target="_blank">{t('messages.privacy_policy')}</a>
                  </div>
                </div>

                <Button type="primary" htmlType="submit" className="contact-form-button">
                  {t('buttons.send')}
                </Button>
              </Form.Item>
            </Form>
            : <Spin size="large" />
                */}
        </div>
      </div >
    );
  }
};

const WrappedContactSide = Form.create({ name: 'contact_form' })(ContactSide);
export default withNamespaces()(withRouter(WrappedContactSide));