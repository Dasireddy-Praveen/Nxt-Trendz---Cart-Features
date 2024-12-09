import {Component} from 'react'
import {Popup} from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import CartContext from '../../context/CartContext'
import './index.css'
// Write your code here
class CartSummary extends Component {
  state = {
    popup: false,
    cod: false,
    isOrderConfirm: false,
  }

  selectCod = () => {
    this.setState(prevState => ({cod: !prevState.cod}))
  }

  checkout = () => {
    this.setState({popup: true})
  }

  closePopup = () => {
    this.setState({popup: false})
  }

  orderConfirmed = () => {
    this.setState({isOrderConfirm: true, cod: false})
  }

  render() {
    const {popup, cod, isOrderConfirm} = this.state
    const isConfirmOrderEnable = cod
      ? 'confirm-button-on'
      : 'confirm-button-off'
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const itemsCount = cartList.length
          const productsCostList = cartList.map(
            eachProduct => eachProduct.quantity * eachProduct.price,
          )
          const totalCost = productsCostList.reduce(
            (price, sum) => price + sum,
            0,
          )
          const paymentMethods = ['Cards', 'UPI', 'Wallet', 'Net banking']
          return (
            <>
              {isOrderConfirm && (
                <p className="order-confirm-text">
                  Your order has been placed successfully
                </p>
              )}
              <div className="cart-summary-card">
                <h1 className="order-cost">
                  Order Total:{' '}
                  <span className="total-cost">Rs {totalCost}/- </span>
                </h1>
                <p className="items-count">{itemsCount} items in cart</p>
                <Popup
                  modal
                  open={popup}
                  onClose={this.closePopup}
                  closeOnDocumentClick
                  className="popup-overlay "
                >
                  {close => (
                    <div className="popup-card-style">
                      <RiCloseLine
                        onClick={close}
                        className="close-icon-position"
                      />
                      <h1 className="order-cost">
                        Order Total:{' '}
                        <span className="total-cost">Rs {totalCost}/- </span>
                      </h1>
                      <p className="items-count">{itemsCount} items in cart</p>
                      <p className="payment-method-title">
                        Choose Payment method
                      </p>
                      <form>
                        <div className="payment-methods-list">
                          {paymentMethods.map(eachMethod => (
                            <div key={eachMethod} className="each-method-style">
                              {eachMethod === 'Net banking' ? (
                                <>
                                  <input
                                    type="radio"
                                    id={eachMethod}
                                    name="payment"
                                    disabled
                                  />
                                  <label
                                    htmlFor={eachMethod}
                                    className="label-style"
                                  >
                                    {eachMethod}
                                  </label>
                                </>
                              ) : (
                                <>
                                  <input
                                    type="radio"
                                    id={eachMethod}
                                    name="payment"
                                  />
                                  <label
                                    htmlFor={eachMethod}
                                    className="label-style"
                                  >
                                    {eachMethod}
                                  </label>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="cod-button">
                          <input
                            id="cod"
                            type="checkbox"
                            className="check-box"
                            onChange={this.selectCod}
                          />
                          <label htmlFor="cod">Cash on Delivery(COD)</label>
                          <br />
                          <button
                            type="button"
                            className={isConfirmOrderEnable}
                            onClick={() => {
                              this.closePopup()
                              this.orderConfirmed()
                            }}
                            disabled={!cod}
                          >
                            Confirm Order
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </Popup>
                <button
                  type="button"
                  className="checkout-button"
                  onClick={this.checkout}
                >
                  Checkout
                </button>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartSummary
