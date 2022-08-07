import React, { useState } from "react";

import styles from "../../styles/successMessage.module.css";

const SuccessMessage = ({ children }) => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <div className={styles.container}>
        <div className={styles.successBox}>
          <div className={styles.message}>
            <h1 className={styles.alert}>Updated!</h1>
            <p className={styles.successMessage} onClose={() => setShow(false)}>
              {children}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default SuccessMessage;
