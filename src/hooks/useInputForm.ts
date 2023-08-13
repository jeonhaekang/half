import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type FormData = Record<string, string>;

type FormItem = HTMLInputElement | HTMLTextAreaElement;

export const useInputForm = <T extends FormData>(initialData: T) => {
  const [formData, setFormData] = useState(initialData);
  const [isValid, setIsValid] = useState(false);

  const formItems = useRef(new Map<string, FormItem>());

  const validation = useCallback(() => {
    const _isValid = Array.from(formItems.current.values()).every((item) => {
      const { required, validity } = item;

      return !required || validity.valid;
    });

    setIsValid(_isValid);
  }, []);

  const setValue = useCallback(
    (event: ChangeEvent<FormItem>) => {
      const { name, value } = event.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      validation();
    },
    [validation]
  );

  const register = useCallback(
    (name: keyof T) => ({
      name,
      value: formData[name] || "",
      onChange: setValue,
      ref: (element: FormItem | null) => {
        return element && formItems.current.set(name as string, element);
      },
    }),
    [formData, setValue]
  );

  const reset = useCallback(() => setFormData(initialData), [initialData]);

  useEffect(() => {
    validation();
  }, [validation]);

  return { formData, register, reset, isValid } as const;
};
