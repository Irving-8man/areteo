import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        marginBottom: '2vh', 
        padding: '2vw',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '75%', 
        minWidth: '250px', 
    },
    inputWrapper: {
        marginBottom: '2vh', 
    },
    input: {
        marginTop: '1vh', 
        padding: '1vh', 
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    label: {
        fontWeight: 'bold',
        marginRight: '1vw', 
    },
});

export default function Titulo() {
    const [titulo, setTitulo] = useState('');
    const [subtitulo, setSubtitulo] = useState('');

    const handleTituloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitulo(event.target.value);
    };

    const handleSubtituloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubtitulo(event.target.value);
    };

    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.inputWrapper}>
                <label className={styles.label}>Título:</label><br />
                <input
                    type="text"
                    value={titulo}
                    onChange={handleTituloChange}
                    placeholder="Introduce el título"
                    className={styles.input}
                />
            </div>
            <div>
                <label className={styles.label}>Subtítulo:</label>
                <input
                    type="text"
                    value={subtitulo}
                    onChange={handleSubtituloChange}
                    placeholder="Introduce el subtítulo"
                    className={styles.input}
                />
            </div>
        </div>
    );
}
