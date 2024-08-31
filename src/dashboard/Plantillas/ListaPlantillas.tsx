import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => ( 
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>

  //Guardar el archivo
  ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);


  //Render
  ReactPDF.renderToStream(<MyDocument />);

  //render in DOM
  const App = () => (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );
  
  ReactDOM.render(<App />, document.getElementById('root'));
