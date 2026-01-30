import React, { useState } from 'react'
import axios from 'axios'

const Billing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [loading, setLoading] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: ''
  })

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 9,
      period: 'month',
      features: ['Up to 10 matches per day', 'Basic profile', 'Standard messaging' , 'Access to community events', '']
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 20,
      period: 'month',
      features: ['Unlimited matches', 'Enhanced profile', 'Priority messaging', 'Video calls' , 'See who viewed your profile' ]
    },
    {
      id: 'Enterpries',
      name: 'Enterpries Plan',
      price: 40,
      period: 'month',
      features: ['All Premium features', 'VIP badge', '24/7 support', 'Advanced filters', 'Verified badge' ]
    }
  ]

  // Handle Mastercard Payment
  const handleMastercardPayment = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('/api/payments/mastercard', {
        amount: selectedPlan.price,
        currency: 'USD',
        planId: selectedPlan.id,
        cardDetails: {
          number: cardDetails.cardNumber.replace(/\s/g, ''),
          exp_month: cardDetails.expiryDate.split('/')[0],
          exp_year: cardDetails.expiryDate.split('/')[1],
          cvc: cardDetails.cvc,
          name: cardDetails.cardholderName
        }
      })

      if (response.data.success) {
        alert('Payment successful!')
        setSelectedPlan(null)
        setCardDetails({ cardNumber: '', expiryDate: '', cvc: '', cardholderName: '' })
      }
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle PayPal Payment
  const handlePayPalPayment = async () => {
    setLoading(true)

    try {
      // Create PayPal order
      const response = await axios.post('/api/payments/paypal/create-order', {
        amount: selectedPlan.price,
        planId: selectedPlan.id
      })

      if (response.data.id) {
        // Redirect to PayPal approval URL
        window.location.href = response.data.approvalUrl
      }
    } catch (error) {
      console.error('PayPal payment failed:', error)
      alert('Failed to initiate PayPal payment')
    } finally {
      setLoading(false)
    }
  }

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
  }

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    return cleaned
  }

  return (
    <div className="billing-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto'}}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5em', color: '#333'}}>
        Upgrade Your Plan
      </h1>

      {/* Plans Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            style={{
              border: selectedPlan?.id === plan.id ? '3px solid #FF6B9D' : '2px solid #ddd',
              borderRadius: '10px',
              padding: '30px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backgroundColor: selectedPlan?.id === plan.id ? '#fff5f8' : '#fff',
              transform: selectedPlan?.id === plan.id ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <h2 style={{ marginBottom: '10px', color: '#333' }}>{plan.name}</h2>
            <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#FF6B9D', marginBottom: '20px' }}>
              ${plan.price}/{plan.period}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px', textAlign: 'left' }}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={{ padding: '8px 0', color: '#666' }}>
                  ✓ {feature}
                </li>
              ))}
            </ul>
            <button
              style={{
                backgroundColor: selectedPlan?.id === plan.id ? '#FF6B9D' : '#f0f0f0',
                color: selectedPlan?.id === plan.id ? '#fff' : '#333',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Section */}
      {selectedPlan && (
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          border: '2px solid #ddd',
          borderRadius: '10px',
          padding: '30px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>
            Complete Payment: {selectedPlan.name}
          </h2>

          {/* Payment Method Selection */}
          <div style={{ marginBottom: '30px' }}>
            <p style={{ marginBottom: '15px', fontWeight: 'bold', color: '#333' }}>Select Payment Method:</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontWeight: paymentMethod === 'paypal' ? 'bold' : 'normal' }}>PayPal</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="payment"
                  value="mastercard"
                  checked={paymentMethod === 'mastercard'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontWeight: paymentMethod === 'mastercard' ? 'bold' : 'normal' }}>Mastercard</span>
              </label>
            </div>
          </div>

          {/* Mastercard Form */}
          {paymentMethod === 'mastercard' && (
            <form onSubmit={handleMastercardPayment} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.cardholderName}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    fontSize: '1em'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: formatCardNumber(e.target.value) })}
                  maxLength="19"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    fontSize: '1em'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: formatExpiryDate(e.target.value) })}
                    maxLength="5"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      fontSize: '1em'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                    maxLength="3"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      fontSize: '1em'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#FF6B9D',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '5px',
                  fontSize: '1em',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Processing...' : `Pay $${selectedPlan.price}`}
              </button>
            </form>
          )}

          {/* PayPal Button */}
          {paymentMethod === 'paypal' && (
            <button
              onClick={handlePayPalPayment}
              disabled={loading}
              style={{
                backgroundColor: '#0070BA',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '5px',
                fontSize: '1em',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Redirecting to PayPal...' : `Pay with PayPal - $${selectedPlan.price}`}
            </button>
          )}

          <button
            onClick={() => setSelectedPlan(null)}
            style={{
              width: '100%',
              marginTop: '15px',
              backgroundColor: '#f0f0f0',
              color: '#333',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default Billing
