import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/payment/create-order', { amount: parseInt(amount) });
      const { id, amount: orderAmount } = response.data;

      const options = {
        key: 'rzp_test_aW7DqW01jZE3ba', // Replace with your Razorpay test key
        amount: orderAmount,
        currency: 'INR',
        name: 'Razorpay UPI Demo',
        description: 'Test Transaction',
        order_id: id,
        handler: function (response) {
          alert('Payment successful: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#3399cc'
        },
        method: {
          upi: true,           // Show UPI only
          netbanking: false,   // Disable other methods
          card: false,
          wallet: false,
          paylater: false
        },
        upi: {
          flow: 'collect',     // Use 'collect' or 'intent' flow
          qrCodeTemplate: 'template_1' // QR Code template
        },
        // Disabling default "Recommended" methods
        config: {
          display: {
            blocks: {
              hdfc: { hide: true },  // hide all banks
              other: { hide: true }  // hide everything except UPI
            },
            sequence: ['upi'],  // Only UPI should be displayed
            preferences: {
              show_default_blocks: false  // Disable default recommended blocks
            }
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="App">
      <h1>Razorpay UPI Demo</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment}>Pay with UPI</button>
    </div>
  );
}

export default App;
