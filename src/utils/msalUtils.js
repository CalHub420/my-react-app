// msalUtils.js
import { useEffect } from "react";

export const useMsalEffect = (instance) => {
  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      // ... (the provided useEffect code)
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);
};
