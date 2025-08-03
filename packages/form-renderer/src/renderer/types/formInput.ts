import { UseFormRegister, FieldErrors, UseFormGetValues, UseFormWatch, UseFormSetValue, Control, UseFormTrigger } from "react-hook-form";
/* eslint-disable @typescript-eslint/no-explicit-any */
export type FormInput = Record<string, any>;

export type FormTypes = Partial<{
    register: UseFormRegister<FormInput>;
    errors: FieldErrors<FormInput>;
    getValues: UseFormGetValues<FormInput>;
    watch: UseFormWatch<FormInput>;
    setValue: UseFormSetValue<FormInput>;
    control: Control<FormInput>;
    trigger: UseFormTrigger<FormInput>;
}> | null;