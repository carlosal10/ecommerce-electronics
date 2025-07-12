// routes/mpesa.js
import express from 'express';
import axios from 'axios';
import { getAccessToken } from '../utils/getAccessToken.js';
import { getTimestamp, getPassword } from '../utils/utils.js';

const router = express.Router();

router.post('/stk-push', async (req, res) => {
  const { phoneNumber, amount, accountReference = 'Order', transactionDesc = 'Payment' } = req.body;
  if (!phoneNumber || !amount) return res.status(400).json({ error: 'Phone and amount required' });

  let formatted = phoneNumber;
  if (formatted.startsWith('0')) formatted = `254${formatted.slice(1)}`;
  if (formatted.startsWith('+')) formatted = formatted.slice(1);

  const token = await getAccessToken();
  const timestamp = getTimestamp();
  const password = getPassword(timestamp);

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formatted,
        PartyB: process.env.BUSINESS_SHORT_CODE,
        PhoneNumber: formatted,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: accountReference,
        TransactionDesc: transactionDesc
      },
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('STK Push error:', err.response?.data || err.message);
    return res.status(500).json({ success: false, error: err.response?.data || err.message });
  }
});

// Callback to receive payment result from M-Pesa
router.post('/callback', (req, res) => {
  const callbackData = req.body.Body?.stkCallback;
  console.log('STK Callback:', callbackData);

  // Always send acknowledgment to Safaricom
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });

  if (callbackData?.ResultCode === 0) {
    // Payment successful -> extract details
    const items = callbackData.CallbackMetadata.Item;
    console.log('Payment successful:', items);
    // Optionally, update order in your DB based on AccountReference or CheckoutRequestID
  } else {
    console.warn('Payment failed:', callbackData?.ResultDesc);
  }
});

export default router;
