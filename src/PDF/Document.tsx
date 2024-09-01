import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

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

export const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
                <Text>hola aqui probando esta chingadera.</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
                <Text style={styles.text}>
                    En un lugar de la Mancha, de cuyo nombre no quiero acordarme...
                    {/* El resto del texto */}
                </Text>
            </View>
        </Page>
    </Document>
);

const App = () => (
    <div>
        <h1>Visualizador de PDF</h1>
        <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
            {({ loading }) => (loading ? 'Cargando documento...' : 'Guardar PDF')}
        </PDFDownloadLink>
    </div>
);

export default App;
