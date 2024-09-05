import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
    },
});

export default function FechaHora() {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <input type="datetime-local" className={styles.input} />
        </div>
    );
}
