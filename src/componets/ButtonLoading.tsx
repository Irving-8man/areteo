import * as React from "react";
import {
    buttonClassNames,
    makeStyles,
    tokens,
    Button,
    Spinner,
    useTimeout,
} from "@fluentui/react-components";
import { CheckmarkFilled } from "@fluentui/react-icons";

const useStyles = makeStyles({
    wrapper: {
        columnGap: "15px",
        display: "flex",
    },
    buttonNonInteractive: {
        backgroundColor: tokens.colorNeutralBackground1,
        border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
        color: tokens.colorNeutralForeground1,
        cursor: "default",
        pointerEvents: "none",

        [`& .${buttonClassNames.icon}`]: {
            color: tokens.colorStatusSuccessForeground1,
        },
    },
});

type LoadingState = "initial" | "loading" | "loaded";

interface ButtonLoadingProps {
    loadingText?: string;
    loadedText?: string;
    initialText?: string;
    loadTime?: number;
    resetAfterLoad?: number; // Nuevo prop: tiempo para reiniciar el estado a "initial"
    onLoaded?: () => void;
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({
    loadingText = "Cargando...",
    loadedText = "¡Completado!",
    initialText = "Iniciar",
    loadTime = 3000,
    resetAfterLoad = 3000, // 3 segundos por defecto para reiniciar a "initial"
    onLoaded,
}) => {
    const styles = useStyles();
    const [loadingState, setLoadingState] =
        React.useState<LoadingState>("initial");

    const [setTimeout] = useTimeout();

    const onButtonClick = () => {
        setLoadingState("loading");
        setTimeout(() => {
            setLoadingState("loaded");
            if (onLoaded) {
                onLoaded(); // Ejecuta la función de "éxito"
            }

            // Después de que esté en "loaded", reinicia el botón a "initial" tras el tiempo indicado
            setTimeout(() => {
                setLoadingState("initial");
            }, resetAfterLoad);
        }, loadTime);
    };

    const buttonContent =
        loadingState === "loading"
            ? loadingText
            : loadingState === "loaded"
                ? loadedText
                : initialText;

    const buttonIcon =
        loadingState === "loading" ? (
            <Spinner size="tiny" />
        ) : loadingState === "loaded" ? (
            <CheckmarkFilled />
        ) : null;

    const buttonClassName =
        loadingState === "initial" ? undefined : styles.buttonNonInteractive;

    return (
        <div className={styles.wrapper}>
            <Button
                className={buttonClassName}
                disabledFocusable={loadingState !== "initial"}
                icon={buttonIcon}
                onClick={onButtonClick}
                appearance="primary"
                type="submit"
            >
                {buttonContent}
            </Button>
        </div>
    );
};
