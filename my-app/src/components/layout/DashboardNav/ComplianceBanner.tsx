// components/ComplianceBanner.tsx
import CaduceusIcon from "../../CaduceusIcon"; // Adjust path if needed
import styles from "./ComplianceBanner.module.css";

export default function ComplianceBanner() {
  return (
    <div className={styles.complianceBanner}>
      <CaduceusIcon className={styles.hipaaIcon} />
      <span>
        Client data is secure
      </span>
    </div>
  );
}
