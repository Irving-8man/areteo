import { Field, Input, Label, Select, useId, InfoLabel } from "@fluentui/react-components";
import { ChangeEvent, useState } from "react";


const NIVLESESTUDIO = [
    "Sin estudio", "Primaria", "Secundaria", "Preparatoria", "Licenciatura", "Otro"
];

const ESTADOCIVIL = [
    "Soltero", "Casado", "Unión libre", "Divorciado/ separado", "Viudo"
];


export default function RegistrarPaciente() {
    const inputId = useId('firstNameLabel-');
    const selectId = useId();
    const [tratInyect, setTratInyect] = useState(0);
    const [tratOral, setTratOral] = useState(0);

    const handleSelectChangeInyect = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTratInyect(Number(e.target.value));
    };

    const handleSelectChangeOral = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTratOral(Number(e.target.value));
    };



    return (
        <section className="border border-pink-500 min-h-screen p-[20px] z-[3]">
            <ul className="flex flex-col gap-[40px]">
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Label htmlFor={inputId} required>Fecha</Label>
                        <Input type="date" id={inputId} />
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Label htmlFor={inputId} required>Edad</Label>
                        <Input min={0} max={200} type="number" id={inputId} />
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Label htmlFor={selectId} required>Sexo</Label>
                        <Select id={selectId} >
                            <option>Masculino</option>
                            <option>Femenino</option>
                        </Select>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Field label={
                            <InfoLabel info="en kg">
                                <Label htmlFor={inputId} required>Peso </Label>
                            </InfoLabel>
                        }>

                            <Input min={0} max={200} step={0.01} type="number" id={inputId} />
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Field label={
                            <InfoLabel info="mmHg">
                                <Label htmlFor={inputId} required>Presión arterial, en 0 min.</Label>
                            </InfoLabel>
                        }>

                            <Input min={0} max={200} step={0.01} type="number" id={inputId} />
                        </Field>

                        <Field label={
                            <InfoLabel info="mmHg">
                                <Label htmlFor={inputId} required>Presión arterial, en 5 min.</Label>
                            </InfoLabel>
                        }>

                            <Input min={0} max={200} step={0.01} type="number" id={inputId} />
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Field label={
                            <InfoLabel info="en %">
                                <Label htmlFor={inputId} required>HbA1c, ultimos 6 meses</Label>
                            </InfoLabel>
                        }>

                            <Input min={0} max={100} step={0.01} type="number" id={inputId} />
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Label htmlFor={selectId} required>Año de diagnóstico</Label>
                        <Select id={selectId} >
                            <option>0 a 5 años</option>
                            <option>6 a 10 años</option>
                            <option> &gt; 10 años</option>
                        </Select>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Label htmlFor={selectId} required>Antecedentes familiares de infarto o muerte cardiovascular de los padres a edades menores de 60 años</Label>
                        <Select id={selectId} >
                            <option value={0}>No</option>
                            <option value={1}>Si</option>
                        </Select>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Field label={
                            <Label htmlFor={inputId} required>HDL, ultimos 6 meses</Label>
                        }>

                            <Input min={0} max={100} step={0.01} type="number" id={inputId} />
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Field label={
                            <Label htmlFor={inputId} required>TGG, ultimos 6 meses</Label>
                        }>
                            <Input min={0} max={100} step={0.01} type="number" id={inputId} />
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Label htmlFor={selectId} required>Nivel de educación</Label>
                        <Select id={selectId} >
                            {
                                NIVLESESTUDIO.map((estudio, idx) => (
                                    <option key={idx}>{estudio}</option>
                                ))
                            }
                        </Select>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col max-w-[400px]">
                        <Label htmlFor={selectId} required>Estado civil</Label>
                        <Select id={selectId} >
                            {
                                ESTADOCIVIL.map((estado, idx) => (
                                    <option key={idx}>{estado}</option>
                                ))
                            }
                        </Select>
                    </div>
                </li>
                <li>
                    <div className="flex flex-row min-w-[400px] max-w-[800px] gap-10">
                            <div className="flex flex-col max-w-[400px]">
                                <Label htmlFor={selectId} required>Utiliza tratamiento inyectable</Label>
                                <Select id={selectId} value={tratInyect} onChange={handleSelectChangeInyect}>
                                    <option value={0}>No</option>
                                    <option value={1}>Sí</option>
                                </Select>
                            </div>
                            {tratInyect === 1 && (
                                <div className="flex flex-row gap-5 max-w-[400px]">
                                    <div className="flex flex-col max-w-[400px]">
                                        <Label htmlFor="desde-cuando" required>Desde cuándo</Label>
                                        <Input id="desde-cuando" type="text" />
                                    </div>
                                    <div className="flex flex-col max-w-[400px]">
                                        <Label htmlFor="desde-cuando" required>Dosis</Label>
                                        <Input id="desde-cuando" type="text" />
                                    </div>
                                    <div className="flex flex-col max-w-[400px]">
                                        <Label htmlFor="desde-cuando" required>Tipo o nombre</Label>
                                        <Input id="desde-cuando" type="text" />
                                    </div>

                                </div>
                            )}
                        </div>
                </li>
                <li>
                    <div className="flex flex-row min-w-[400px] max-w-[800px] gap-10">
                            <div className="flex flex-col max-w-[400px]">
                                <Label htmlFor={selectId} required>Utiliza tratamiento inyectable</Label>
                                <Select id={selectId} value={tratOral} onChange={handleSelectChangeOral}>
                                    <option value={0}>No</option>
                                    <option value={1}>Sí</option>
                                </Select>
                            </div>
                            {tratOral === 1 && (
                                <div className="flex flex-row gap-5 max-w-[400px]">
                                    <div className="flex flex-col max-w-[400px]">
                                        <Label htmlFor="desde-cuando" required>Desde cuándo</Label>
                                        <Input id="desde-cuando" type="text" />
                                    </div>
                                    <div className="flex flex-col max-w-[400px]">
                                        <Label htmlFor="desde-cuando" required>Dosis</Label>
                                        <Input id="desde-cuando" type="text" />
                                    </div>
                                    <div className="flex flex-col max-w-[400px]">
                                        <Label htmlFor="desde-cuando" required>Nombre del medicamento</Label>
                                        <Input id="desde-cuando" type="text" />
                                    </div>

                                </div>
                            )}
                        </div>
                </li>
            </ul>
        </section>
    )
}