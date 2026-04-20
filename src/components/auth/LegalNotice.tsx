
import { Link } from "react-router-dom";

export function LegalNotice() {
  return (
    <p className="text-xs text-white/60 text-center">
      By continuing, you acknowledge that you understand and agree to the{" "}
      <Link to="/terms-conditions" className="text-white hover:underline">
        Terms & Conditions
      </Link>{" "}
      and{" "}
      <Link to="/privacy-policy" className="text-white hover:underline">
        Privacy Policy
      </Link>
    </p>
  );
}
