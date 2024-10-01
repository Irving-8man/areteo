import * as React from "react";
import { useFormContext, ControllerProps, Controller, FieldPath, FieldValues, FormProvider } from "react-hook-form";
import { Input, Label, Text } from "@fluentui/react-components";
import { useId } from "react";
import clsx from "clsx";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
    root: {
        '& > *': {
            textOverflow: 'ellipsis',
        },
        '&:not(:first-child)': {
            marginTop: '0px',
        },
        '& > *:not(.ms-StackItem)': {
            flexShrink: 1,
        },
    },
});

// Definimos el tipo de las props del Stack
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode; // Aquí hacemos que 'children' sea opcional
}

// Componente Stack
const Stack = React.forwardRef<HTMLDivElement, StackProps>(
    ({ className, children, ...props }, ref) => {
        const classes = useStyles();

        return (
            <div
                ref={ref}
                className={clsx("flex flex-col space-y-2", classes.root, className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Stack.displayName = "Stack";


// Reemplazo de FormProvider por react-hook-form
const Form = FormProvider;

// Contexto para mantener la referencia del campo
type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};







// Hook personalizado para obtener los estados del formulario
const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const { getFieldState, formState } = useFormContext();
    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }

    const id = useId();

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};





// Reemplazo del FormItem por Stack de Fluent UI
const FormItem = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <Stack className={clsx("space-y-2", className)} {...props} />
    );
};

// Reemplazo de FormLabel por Label de Fluent UI
const FormLabel = React.forwardRef<
    HTMLLabelElement,
    React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
        <Label
            ref={ref}
            htmlFor={formItemId}
            className={clsx(error && "text-destructive", className)}
            {...props}
        />
    );
});
FormLabel.displayName = "FormLabel";

// Reemplazo de FormControl por Input de Fluent UI
const FormControl = React.forwardRef<
    HTMLInputElement,
    React.ComponentPropsWithoutRef<typeof Input>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
        <Input
            ref={ref}
            id={formItemId}
            aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
            aria-invalid={!!error}
            {...props}
        />
    );
});
FormControl.displayName = "FormControl";

// Reemplazo de FormDescription por Text de Fluent UI
const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <Text
            ref={ref}
            id={formDescriptionId}
            className={clsx("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
});
FormDescription.displayName = "FormDescription";

// Reemplazo de FormMessage por Text de Fluent UI
const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
        return null;
    }

    return (
        <Text
            ref={ref}
            id={formMessageId}
            className={clsx("text-sm font-medium text-destructive", className)}
            {...props}
        >
            {body}
        </Text>
    );
});
FormMessage.displayName = "FormMessage";

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};
