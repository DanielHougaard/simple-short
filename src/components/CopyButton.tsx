/* eslint-disable react/destructuring-assignment */
import Image from 'next/image';
import React from 'react';
import Button from './Button';

export default function CopyButton(props: React.ComponentProps<typeof Button>) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    if (copied) return;

    navigator.clipboard.writeText(props.value as string);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [props.value, copied]);

  return (
    <Button
      size="md"
      className="w-full"
      onClick={handleCopy}
    >
      {copied ? 'Copied!' : 'Copy to clipboard'}
      {!copied && (
        <Image src="/clipboard.svg" alt="Copied" width={20} height={20} />
      )}

    </Button>
  );
}
