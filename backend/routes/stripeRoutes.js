import express from "express"
import { createCheckoutSession, createPortalSession, createWebHook } from "../controllers/stripe.js"

const router = express.Router()

router.post("/create-checkout-session", createCheckoutSession)
router.post("/create-portal-session", createPortalSession)
router.post("/create-webhook", express.raw({ type: "application/json" }), createWebHook)

export default router