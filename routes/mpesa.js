import express from 'express';
import axios from 'axios';
const router = express.Router();
import { initiateStkPush } from '../controllers/stkPushController.js';
const getTimestamp = () => {
  // returns YYYYMMDDHHmmss
};

const getPassword = (timestamp) => {
  const data = `${process.env.BUSINESS_SHORT_CODE}${process.env.PASS_KEY}${timestamp}`;
  return Buffer.from(data).toString('base64');
};

const getAccessToken = async () => {
  const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');
  const { data } = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: { Authorization: `Basic ${auth}` }
  });
  return data.access_token;
};

router.post('/stk-push', initiateStkPush, async (req, res) => {
  const { phoneNumber, amount, accountReference } = req.body;
  if (!phoneNumber || !amount) return res.status(400).json({ error: 'Missing fields' });

  let msisdn = phoneNumber.startsWith('0') ? `254${phoneNumber.slice(1)}` : phoneNumber.replace(/^\+/, '');
  const token = await getAccessToken();
  const timestamp = getTimestamp();
  const password = getPassword(timestamp);

  const body = {
    BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: msisdn,
    PartyB: process.env.BUSINESS_SHORT_CODE,
    PhoneNumber: msisdn,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: 'Order Payment'
  };

  try {
    const { data } = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.response?.data || err.message });
  }
});

router.post('/callback', express.json(), (req, res) => {
  console.log('Daraja callback:', JSON.stringify(req.body, null, 2));
  // TODO: update order status accordingly in your DB
  res.json({ status: 'success' });
});

export default router;
