import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
});

export default function TextoCorto() {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Escribe tu respuesta aquí"
                maxLength={50}
                className={styles.input}
            />
        </div>
    );
}
