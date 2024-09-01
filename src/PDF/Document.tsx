import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';

// Estilos del PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    }
});

// Documento PDF
export const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
                <Text>Hola, aquí probando esta chingadera.</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
                <Text style={styles.text}>
                    En un lugar de la Mancha, de cuyo nombre no quiero acordarme...
                </Text>
            </View>
        </Page>
    </Document>
);

// Botón de descarga con estilo
const DownloadButton = () => (
    <PDFDownloadLink document={<MyDocument />} fileName="example.pdf" style={buttonStyle as React.CSSProperties}>
        {({ loading }) =>
            loading ? 'Cargando documento...' : 'Descargar PDF'
        }
    </PDFDownloadLink>
);

// Estilos del botón de descarga
const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as 'center' // Especificamos 'center' como valor compatible
};

// Componente principal que renderiza el botón
const App = () => (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Visualizador de PDF</h1>
        <DownloadButton />
    </div>
);

export default App;
