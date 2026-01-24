import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/storeContext'
const PlaceOrder = () => {
  const {getTotalExpenses}=useContext(StoreContext)
  return (
    <form action="" className="place-order">
      <div className="place-order-left">
        <p className='title'>Delivery indformation</p>
        <div className="multi-fields">
          <input type="text"  placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder="Email address"/>
        <input type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code'/>
          <input type="text" placeholder='Country'/>
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalExpenses()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalExpenses()+2}</b>
            </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO PAYMENT</button>
          </div>
        </div>
    </form>
  )
}

export default PlaceOrder