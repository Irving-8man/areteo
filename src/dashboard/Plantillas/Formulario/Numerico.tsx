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
        textAlign: 'left',
    },
});

export default function EntradaNumerica() {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <input
                type="number"
                placeholder="Introduce un número aquí"
                className={styles.input}
                min="0"
                max="1000"
                step="0.01" 
            />
        </div>
    );
}
