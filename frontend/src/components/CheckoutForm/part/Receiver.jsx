import React from 'react';
import './Receiver.css';

function Receiver(props) {
  return (
    <div className="card receiver">
      <div className="receiver__header">
        <div>Thông tin nhận hàng</div>
      </div>
      <div>
        <div className="card-body receiver__body">
          <input
            type="text"
            className="receiver__form-control mt-2"
            placeholder="Tên người nhận"
          />
          <input
            type="text"
            className="receiver__form-control mt-2"
            placeholder="Số điện thoại"
          />
          <input
            type="text"
            className="receiver__form-control mt-2"
            placeholder="Địa chỉ người nhận"
          />
          <input
            type="text"
            className="receiver__form-control mt-2"
            placeholder="Ghi chú nhận hàng"
          />
        </div>
      </div>
    </div>
  );
}

Receiver.propTypes = {};

export default Receiver;
