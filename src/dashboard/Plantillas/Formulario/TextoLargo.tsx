import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        width: '100%',
        height: '100px', 
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'vertical', 
    },
});

export default function TextoLargo() {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <textarea
                placeholder="Escribe tu respuesta aquí"
                maxLength={200} 
                className={styles.input}
            />
        </div>
    );
}
