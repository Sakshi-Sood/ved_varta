import React from 'react'
import Link from "next/link";
import Button from "./Button";

const CTA = () => {
  return (
    <div className="text-center mt-16 bg-white/50 rounded-lg p-8 border border-amber-200">
          <h3 className="text-2xl font-semibold mb-4 textGradient">
            Ready to Transform Your Life?
          </h3>
          <p className="text-gray-700 mb-6">
            Get personalized guidance from Acharya Anoop Tripathi and discover the solutions to your life's challenges through ancient Vedic wisdom.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/contact"
            >
              <Button text="Book Consultation" fill />
            </Link>
            <Link
              href="https://wa.me/+916284219106"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button text="WhatsApp Us" />
            </Link>
          </div>
        </div>
  )
}

export default CTA