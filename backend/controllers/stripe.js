import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_API_KEY);

const YOUR_DOMAIN = "http://localhost:3000"

import { db } from "../db.js";

export const createCheckoutSession = async (req, res) => {

   console.log(req.body.lookupKey)
   console.log(req.body.userId)

   const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookupKey],
      expand: ["data.product"],
   });

   console.log(prices)

   const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
         {
         price: prices.data[0].id,
         quantity: 1,
         },
      ],
      mode: "subscription",
      success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      metadata: {
         userId: req.body.userId
      },
      subscription_data: {
         metadata: {
            userId: req.body.userId 
         }
      }
   });

   console.log(session.url)
   // res.redirect(303, session.url);
   const query = "UPDATE users SET `stripe_session_id` = ? WHERE `id` = ?"
   const values = [session.id, req.body.userId]
   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
   })

   return res.json(session.url)
}

export const createPortalSession = (req, res) => {
   const query = "SELECT * FROM users WHERE `id` = ?"
   const value = [req.body.userId]
   db.query(query, value, async(err, data) => {
      if (err) return console.log(err)

      const sessionId = data[0].stripe_session_id
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

      const portalSession = await stripe.billingPortal.sessions.create({
         customer: checkoutSession.customer,
         return_url: YOUR_DOMAIN,
      });

      // res.redirect(303, portalSession.url);
      return res.json(portalSession.url)
   })
}

export const createWebHook = async(req, res) => {
   const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT;
   let event = req.body;

   if (endpointSecret) {
      const signature = req.headers["stripe-signature"];
      try {
         event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
      } catch (err) {
         console.log("⚠️ Webhook signature verification failed:", err.message);
         return res.sendStatus(400);
      }
   }

   const type = event.type;
   const subscription = event.data.object;
   const status = subscription?.status;
   const userId = subscription?.metadata.userId

   switch (type) {
   case "customer.subscription.trial_will_end":
   case "customer.subscription.deleted":
      console.log(`Subscription status is ${status}.`)
      console.log("userId", userId)
      db.query("UPDATE users SET `tier` = 'free' WHERE `id` = ?", [userId], (err, data) => {
         if (err) return console.log(err)
         console.log(data)
         return res.status(200).json(data)
      })
      break
   case "customer.subscription.created":
    console.log(`Subscription status is ${status}.`)
    console.log("userId", userId)
      db.query("UPDATE users SET `tier` = 'pro' WHERE `id` = ?", [userId], (err, data) => {
         if (err) return console.log(err)
         console.log(data)
         return res.status(200).json(data)
      })
      break
   case "customer.subscription.updated":

      break;
   case "entitlements.active_entitlement_summary.updated":
      console.log(`Entitlement update: ${JSON.stringify(subscription)}`);
      break;
   default:
      console.log(`Unhandled event type ${type}.`);
   }
}