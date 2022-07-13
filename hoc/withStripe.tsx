import { Elements } from "@stripe/react-stripe-js";
import React from "react";

// This function takes a component...
export const WithStripe = (WrappedComponent, clientSecret) => {
  // and page is not success
  if (!clientSecret) {
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <WrappedComponent data={this.state.data} {...this.props} />;
    </Elements>
  );
};
