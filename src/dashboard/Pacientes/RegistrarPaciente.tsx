import { Field, Input, Label, Select, useId, InfoLabel } from "@fluentui/react-components";

export default function RegistrarPaciente() {
    const inputId = useId('firstNameLabel-');
    const selectId = useId();

    return (
        <section className="border border-pink-500 min-h-screen p-[20px] z-[3]">
            <ul className="flex flex-col gap-[30px]">
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
                            <InfoLabel info="kg">
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
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </section>
    )
}