import Link from "next/link";
import Button from "./Button";

const CTA = ({ title, description, className = "" }) => {
  return (
    <div
      className={`text-center mt-4 bg-white/50 rounded-xl p-8 border border-amber-200 ${className}`}
    >
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 textGradient">
        {title ? title : "Need Personalized Vedic Guidance?"}
      </h3>
      <p className="text-gray-700 text-sm mb-6">
        {description
          ? description
          : "Get personalized guidance from Acharya Anoop Tripathi and discover the solutions to your life's challenges through ancient Vedic wisdom."}
      </p>
      <div className="flex justify-center gap-2 sm:gap-4">
        <Link href="tel:+919090252584">
          <Button
            text="Book Consultation"
            fill
            className="text-sm whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2"
          />
        </Link>
        <Link
          href="https://wa.me/+919090252584"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            text="WhatsApp Us"
            className="text-sm whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2"
          />
        </Link>
      </div>
    </div>
  );
};

export default CTA;
