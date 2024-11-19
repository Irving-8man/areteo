# ARETEO 🧑‍⚕️


 ![Inicio ARETEO](/github/inicio_areteo.jpeg)




**Integrantes**:
- Irving Geyler Cupul Uc
- Joar Honorio Ruiz Peraza
- Didier Andrey Tec Esquivel
- Jesús Alejandro Be Hau
- Juan Carlos Conde Marrufo



## Introducción
El proyecto responde a la necesidad de un módulo de salud perteneciente a la Universidad Autónoma de Yucatán (UADY) en Mérida, Yucatán, de una solución especializada y adaptable para el registro médico y la gestión de instrumentos de evaluación. La falta de una aplicación que abarque estas funciones puede dificultar la evaluación, el control y el seguimiento de casos de manera eficiente. El nombre “ARETEO” es en honor Areteo de Capadocia, el primer médico en describir el cuadro clínico del tétanos, y a él se deben los nombres actuales de la epilepsia o la diabetes. 

La aplicación de escritorio, compatible con Windows 10 y 11, está diseñada para crear, administrar y almacenar registros médicos detallados, así como para facilitar la elaboración de instrumentos de evaluación adaptados a diversas especialidades y casos clínicos. Su enfoque integral permitirá al equipo médico centralizar la información de los pacientes y hacer un seguimiento a lo largo del tiempo, mejorando así la calidad de la atención en el módulo de salud de la UADY.


Se pone especial énfasis en desarrollar una interfaz intuitiva y funcional que optimice el flujo de trabajo del equipo médico, permitiendo una implantación fluida de los instrumentos y funcionalidades adicionales, las cuales se detallarán en secciones posteriores del documento.

## Objetivo del proyecto

El objetivo de este proyecto es crear una aplicación de escritorio que sirva de apoyo al especialista y personal de la salud en la gestión de pacientes y aplicación de instrumentos para la evaluación y control, además de su atención por parte de diversos expertos. Este objetivo deberá poder ser ejecutado en dispositivos con sistemas operativos Windows 10 y 11. Además de que cumplirá con otras funcionalidades que se describirán con más detalle en las otras secciones de este documento.


## Diagrama de caso de uso


Este diseño ilustra la interacción entre el actor y casos de uso, resaltando cómo el usuario interactúa con la aplicación de escritorio.

![Diagrama de caso de uso](/github/caso_uso_ARETEO.png)
Sea el Administrador una persona especialista de la salud o a fin, responsable del uso de la aplicación ARETEO.

## Arquitectura Utilizada


Este diseño ilustra la interacción entre el cliente y la aplicación que alberga las vistas de interfaz y la base de datos. La aplicación se despliega con una arquitectura de tipo monolito utilizando el framework Tauri para desarrollar aplicaciones de escritorio, junto con la librería React y React Router Dom para las interfaces. Este enfoque permite el renderizado de la interfaz del lado nativo en la aplicación de escritorio y la exposición de funciones con el lenguaje Rust a bajo nivel para implementar una arquitectura similar a la de cliente-servidor. Esto proporciona los beneficios de consultar la base de datos y renderizar los datos de inmediato en el cliente. Se utiliza una base de datos local con SQLite para almacenar y recuperar datos con una latencia muy baja, además de bibliotecas con funciones intuitivas del framework que interactúan con las APIs nativas de aplicaciones de escritorio, en este caso Windows 10/11.


![Diagrama de despliegue](/github/despliegue_ARETEO.png)


## Descargar

Plataformas Soportadas:

- **Windows**: [Windows 10/11](https://github.com/Irving-8man/areteo/releases/tag/Beta_ARETEO_0.5.0)


## Manual de uso

[Manual ARETEO en Español](/github/ARETEO_Manual%20de%20usuario_0.5.0v.pdf)


## Desarrollo de la aplicación

#### Requirimientos de entorno para desarrollo

Por favor instalar `Rust` & `NodeJS` siguiendo los pasos de los sitios web oficiales.

- [Rust](https://tauri.app/v1/guides/getting-started/prerequisites/)
- [Node.js](https://nodejs.org/en/)

**NOTA IMPORTANTE**
ARETEO utiliza Tauri v1, en el momento que estes leyendo esto, ya ha sido actulizada la documentación oficial la versión 2, las cuales difieren significativamente.


#### Clonar respositorio
```shell
git clone https://github.com/Irving-8man/areteo.git
```

#### Descargar dependencias del proyecto

```shell
npm install
```

#### Correr el proyecto en modo desarrollo

```shell
npm run tauri dev
```

#### Construir la aplicación


```shell
npm run tauri build
```
