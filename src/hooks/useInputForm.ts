import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type FormData = Record<string, string>;

type FormItem = HTMLInputElement | HTMLTextAreaElement;

export const useInputForm = <T extends FormData>(initialData: T) => {
  const [data, setData] = useState(initialData);
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

      setData((prev) => ({ ...prev, [name]: value }));

      validation();
    },
    [validation]
  );

  const register = useCallback(
    (name: keyof T) => ({
      name,
      value: data[name] || "",
      onChange: setValue,
      ref: (element: FormItem | null) => {
        return element && formItems.current.set(name as string, element);
      }
    }),
    [data, setValue]
  );

  const reset = useCallback(() => setData(initialData), [initialData]);

  useEffect(() => {
    validation();
  }, [validation]);

  return { data, register, reset, isValid } as const;
};
