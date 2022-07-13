import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { HandleRetrieve } from "../components/HandleRetrieve";

import type { NextPage } from "next";
import { Container, Box, Heading } from "@chakra-ui/react";

export async function getServerSideProps(context) {
  console.log("payment_intent", context.query.payment_intent);

  const capturedPayment = await fetch(
    `http://localhost:3000/api/get-captured-payment?payment_intent=${context.query.payment_intent}`
  )
    .then((data) => data.json())
    .catch((error) => console.log("ERROR RETRIEVING CAPTURED PAYMENT", error));

  try {
    await fetch("http://localhost:3000/api/create-partnership-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business_name: capturedPayment.charge.metadata.business_name,
        donation_amount: capturedPayment.charge.amount,
      }),
    });
  } catch (error) {
    console.log("ERROR CREATING PARTNERSHIP RECORD", error);
  }

  try {
    await fetch("http://localhost:3000/api/create-instargam-post");
  } catch (error) {
    console.log("ERROR CREATING INSTAGRAM POST", error);
  }

  const { amount, metadata, payment_method_details } = capturedPayment.charge;

  return {
    props: {
      amount: amount,
      charity: metadata.charity,
      business_name: metadata.business_name,
      last4: payment_method_details.card.last4,
    },
  };
}

interface SuccessPageProps {
  amount: string;
  business_name: string;
  charity: string;
  last4: string;
}

const Success: NextPage = ({
  amount,
  charity,
  last4,
  business_name,
}: SuccessPageProps) => {
  console.log({ charity, last4 });
  return (
    <Container maxW="2xl" centerContent mt={24} mb={24}>
      <Box>
        <Heading as="h1" size="md" mb={4}>
          Thank <span style={{ color: "red" }}>{business_name}</span> for to
          donating <span style={{ color: "red" }}>£{amount}</span> to{" "}
          <span style={{ color: "red" }}>{charity}</span> we have charged your
          card ending in <span style={{ color: "red" }}>{last4}</span>
        </Heading>
      </Box>
    </Container>
  );
};

export default Success;

// {
//     "id": "pi_3LKodlKEDCTqfEt301IjBPYj",
//     "object": "payment_intent",
//     "amount": 500,
//     "amount_capturable": 0,
//     "amount_details": {
//         "tip": {}
//     },
//     "amount_received": 500,
//     "application": null,
//     "application_fee_amount": null,
//     "automatic_payment_methods": {
//         "enabled": true
//     },
//     "canceled_at": null,
//     "cancellation_reason": null,
//     "capture_method": "automatic",
//     "charges": {
//         "object": "list",
//         "data": [
//             {
//                 "id": "ch_3LKodlKEDCTqfEt30DNU0HbJ",
//                 "object": "charge",
//                 "amount": 500,
//                 "amount_captured": 500,
//                 "amount_refunded": 0,
//                 "application": null,
//                 "application_fee": null,
//                 "application_fee_amount": null,
//                 "balance_transaction": "txn_3LKodlKEDCTqfEt3020SqZms",
//                 "billing_details": {
//                     "address": {
//                         "city": null,
//                         "country": "GB",
//                         "line1": null,
//                         "line2": null,
//                         "postal_code": "w53tr",
//                         "state": null
//                     },
//                     "email": null,
//                     "name": null,
//                     "phone": null
//                 },
//                 "calculated_statement_descriptor": "Stripe",
//                 "captured": true,
//                 "created": 1657654145,
//                 "currency": "gbp",
//                 "customer": null,
//                 "description": null,
//                 "destination": null,
//                 "dispute": null,
//                 "disputed": false,
//                 "failure_balance_transaction": null,
//                 "failure_code": null,
//                 "failure_message": null,
//                 "fraud_details": {},
//                 "invoice": null,
//                 "livemode": false,
//                 "metadata": {
//                     "charity": "THE ARTS COUNCIL OF ENGLAND"
//                 },
//                 "on_behalf_of": null,
//                 "order": null,
//                 "outcome": {
//                     "network_status": "approved_by_network",
//                     "reason": null,
//                     "risk_level": "normal",
//                     "risk_score": 50,
//                     "seller_message": "Payment complete.",
//                     "type": "authorized"
//                 },
//                 "paid": true,
//                 "payment_intent": "pi_3LKodlKEDCTqfEt301IjBPYj",
//                 "payment_method": "pm_1LKolYKEDCTqfEt3TzzqN2EH",
//                 "payment_method_details": {
//                     "card": {
//                         "brand": "visa",
//                         "checks": {
//                             "address_line1_check": null,
//                             "address_postal_code_check": "pass",
//                             "cvc_check": "pass"
//                         },
//                         "country": "US",
//                         "exp_month": 4,
//                         "exp_year": 2023,
//                         "fingerprint": "NwdSzYTQjRbMu6LC",
//                         "funding": "credit",
//                         "installments": null,
//                         "last4": "4242",
//                         "mandate": null,
//                         "network": "visa",
//                         "three_d_secure": null,
//                         "wallet": null
//                     },
//                     "type": "card"
//                 },
//                 "receipt_email": null,
//                 "receipt_number": null,
//                 "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xR2NGMFpLRURDVHFmRXQzKImXt5YGMgakGQ19N1Q6LBaoqc9pGCr6e4Ow3puuDQ424hknKsevYSXIWUiftONkQFBkYZ7NPy7rURba",
//                 "refunded": false,
//                 "refunds": {
//                     "object": "list",
//                     "data": [],
//                     "has_more": false,
//                     "total_count": 0,
//                     "url": "/v1/charges/ch_3LKodlKEDCTqfEt30DNU0HbJ/refunds"
//                 },
//                 "review": null,
//                 "shipping": null,
//                 "source": null,
//                 "source_transfer": null,
//                 "statement_descriptor": null,
//                 "statement_descriptor_suffix": null,
//                 "status": "succeeded",
//                 "transfer_data": null,
//                 "transfer_group": null
//             }
//         ],
//         "has_more": false,
//         "total_count": 1,
//         "url": "/v1/charges?payment_intent=pi_3LKodlKEDCTqfEt301IjBPYj"
//     },
//     "client_secret": "pi_3LKodlKEDCTqfEt301IjBPYj_secret_6IQm6FAft91bAsVjFWgraiOOB",
//     "confirmation_method": "automatic",
//     "created": 1657653661,
//     "currency": "gbp",
//     "customer": null,
//     "description": null,
//     "invoice": null,
//     "last_payment_error": null,
//     "livemode": false,
//     "metadata": {
//         "charity": "THE ARTS COUNCIL OF ENGLAND"
//     },
//     "next_action": null,
//     "on_behalf_of": null,
//     "payment_method": "pm_1LKolYKEDCTqfEt3TzzqN2EH",
//     "payment_method_options": {
//         "card": {
//             "installments": null,
//             "mandate_options": null,
//             "network": null,
//             "request_three_d_secure": "automatic"
//         }
//     },
//     "payment_method_types": [
//         "card"
//     ],
//     "processing": null,
//     "receipt_email": null,
//     "review": null,
//     "setup_future_usage": null,
//     "shipping": null,
//     "source": null,
//     "statement_descriptor": null,
//     "statement_descriptor_suffix": null,
//     "status": "succeeded",
//     "transfer_data": null,
//     "transfer_group": null
// }
