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

export default function Texto() {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Escribe tu respuesta aquí"
                className={styles.input}
            />
        </div>
    );
}