import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePaymentMethod } from '../../../redux/Reducers/paymentMethod';
import './PaymentMethod.css';

function PaymentMethod(props) {
  const dispatch = useDispatch();
  const [method, setMethod] = useState('momo');
  const handleChangeMethod = (e) => {
    dispatch(changePaymentMethod(e.target.id));
    setMethod(e.target.id);
  };
  return (
    <div className="card payment-method">
      <div className="payment-method__header">
        <div>Phương thức thanh toán</div>
      </div>
      <div>
        <div className="card-body payment-method__body">
          <div className="payment-method__item" >
            <input
              type="radio"
              name="payment-method"
              id="momo"
              value={method}
              checked={method === 'momo'}
              onChange={handleChangeMethod}
            />
            <label htmlFor="momo" >
              <div className="inline-block" style={{ width: 45 }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                  alt="zalo-pay-icon"
                  height="25px"
                />
              </div>
              Momo
            </label>
          </div>

          <div className="payment-method__item">
            <input
              type="radio"
              name="payment-method"
              id="shopeepay"
              value={method}
              checked={method === 'shopeepay'}
              onChange={handleChangeMethod}
            />
            <label htmlFor="shopeepay">
              <div className="d-inline-block" style={{ width: 45 }}>
                <img
                  src="https://th.bing.com/th/id/R.40b34cc7214ad54ebd38c121e76bfea1?rik=6EiuP6UW6Y4EzQ&riu=http%3a%2f%2fwww.mlsisland.com%2fvisa_logo_7.gif&ehk=p1p%2b14LcVZpd8TUwmQoX7AnKWolT2gpGwleprtwyN1M%3d&risl=&pid=ImgRaw&r=0"
                  alt="zalo-pay-icon"
                  width="40px"
                />
              </div>
              Credit Card
            </label>
          </div>
          <div className="payment-method__item">
            <input
              type="radio"
              name="payment-method"
              id="paypal"
              value={method}
              checked={method === 'paypal'}
              onChange={handleChangeMethod}
            />
            <label htmlFor="paypal">
              <div className="d-inline-block" style={{ width: 45 }}>
                <img
                  src="https://timo.vn/wp-content/uploads/paypal-784404_1280.png"
                  alt="paypal-pay-icon"
                  height="25px"
                  width="40px"
                />
              </div>
              Paypal
            </label>
          </div>

          <div className="payment-method__item">
            <input
              type="radio"
              name="payment-method"
              id="shipcod"
              value={method}
              checked={method === 'shipcod'}
              onChange={handleChangeMethod}
            />
            <label htmlFor="shipcod">
              <div className="d-inline-block" style={{ width: 45 }}>
                <img
                  src=""
                  alt=""
                  width="40px"
                />
              </div>
              Ship COD
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

PaymentMethod.propTypes = {};

export default PaymentMethod;
