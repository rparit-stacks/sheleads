// Razorpay configuration
export const RAZORPAY_CONFIG = {
  keyId: "rzp_live_BLISzDNKYr86ca",
  keySecret: "OSus7HY9srN9AP4HYnMAkDTV", // Only use on server-side
}

// Load Razorpay script dynamically
export const loadRazorpay = (): Promise<any> => {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => {
      resolve((window as any).Razorpay)
    }
    document.body.appendChild(script)
  })
}
