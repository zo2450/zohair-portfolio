"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@once-ui-system/core";

/**
 * Primary contact action: shows the email address and copies it on click, flashing "Copied!".
 * Falls back to opening the mail app if the clipboard isn't available.
 */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <Button
        variant="primary"
        size="l"
        data-border="rounded"
        prefixIcon={copied ? "check" : "copy"}
        onClick={copy}
        aria-label={copied ? "Email address copied" : `Copy email address ${email}`}
      >
        {copied ? "Copied!" : email}
      </Button>
      <span aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
