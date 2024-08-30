import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        marginTop: '10px',
        marginBottom: '20px',
    },
    optionContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    radio: {
        width: '30px',
        textAlign: 'center',
        marginRight: '10px',
    },
    input: {
        flex: 1,
        marginRight: '-4px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    optionWrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        marginBottom: '1px',
    },
    removeButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '7px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    addButton: {
        backgroundColor: '#0078ff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '5px',
    },
});

export default function OpcionM() {
    const styles = useStyles();
    const [options, setOptions] = useState<string[]>(['', '']);

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index: number) => {
        // Solo permitir eliminar opciones después de las dos primeras
        if (index >= 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    return (
        <div className={styles.container}>
            <div>
                {options.map((option, index) => (
                    <div key={index} className={styles.optionWrapper}>
                        <div className={styles.radio}>
                            <input
                                type="radio"
                                name="radio-group" // Asegura que solo se pueda seleccionar una opción
                            />
                        </div>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Opción ${index + 1}`}
                            className={styles.input}
                        />
                        {/* Solo mostrar el botón de eliminar para opciones después de la segunda */}
                        {index >= 2 && (
                            <button
                                onClick={() => removeOption(index)}
                                className={styles.removeButton}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={addOption}
                className={styles.addButton}
            >
                Agregar opción
            </button>
        </div>
    );
}
