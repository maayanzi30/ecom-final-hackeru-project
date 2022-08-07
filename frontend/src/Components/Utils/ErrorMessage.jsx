import React, { useState } from "react";

import styles from "../../styles/errorMessage.module.css";

const Message = ({ children }) => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          <div className={styles.message}>
            <p className={styles.errorMessage} onClose={() => setShow(false)}>
              {children}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Message;
