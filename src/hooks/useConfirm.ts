import { useState, useCallback } from 'react';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    setOptions(options);
    setIsOpen(true);
    return new Promise<boolean>((res) => {
      setResolve(() => res);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve(true);
      setIsOpen(false);
    }
  }, [resolve]);

  const handleCancel = useCallback(() => {
    if (resolve) {
      resolve(false);
      setIsOpen(false);
    }
  }, [resolve]);

  return {
    isOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel
  };
}