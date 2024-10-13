import { create } from "zustand";
import { invoke } from "@tauri-apps/api/tauri";
import { PacienteRegistrado, Paciente } from "@/models/types";
import { getAllPacientesRegistrados, registrarPaciente } from "@/services/PacienteController";
import { mockpacientesRegis } from "@/mocks/listPacientesRe";

interface PacienteState {
    pacientes: PacienteRegistrado[];
    cargarPacientes:() => Promise<void>;
    registrarPaciente: (nuevoPaciente: Paciente) => Promise<boolean>;
    eliminarPaciente: (id: string) => Promise<void>;
}


export const usePacienteStore = create<PacienteState>((set) => ({
    pacientes: [],
    cargarPacientes: async () => {
        try {
            const pacientes: PacienteRegistrado[] = await getAllPacientesRegistrados();
            if (pacientes.length<0) {
                set({ pacientes:mockpacientesRegis });
            }
            set({ pacientes });
        } catch (error) {
            console.error("Error al cargar pacientes:", error);
        }
    },

    // Registrar un nuevo paciente
    registrarPaciente: async (nuevoPaciente: Paciente) => {
        try {
            const pacienteRegistrado: PacienteRegistrado | null = await registrarPaciente(nuevoPaciente);
            if (pacienteRegistrado) {
                set((state) => ({
                    pacientes: [...state.pacientes, pacienteRegistrado],
                }));
                return true;
            } else {
                console.error("Error al registrar paciente:");
                return false;
            }
        } catch (error) {
            console.error("Error al registrar paciente:", error);
            return false;
        }
    },

    // Eliminar paciente por ID
    eliminarPaciente: async (id: string) => {
        try {
            await invoke("eliminar_paciente", { id });
            set((state) => ({
                pacientes: state.pacientes.filter((p) => p.id !== id),
            }));
        } catch (error) {
            console.error("Error al eliminar paciente:", error);
        }
    },
}));



/**
const initialState: PacienteRegistrado[] = (()=>{
    return mockpacientesRegis;
})()
*/
/** 
export const usePacienteStore = create<PacienteState>()(
    persist(
        (set) => ({
            pacientes: initialState,
            // Registrar un nuevo paciente
            registrarPaciente: async (nuevoPaciente: Paciente) => {
                try {
                    await invoke("registrar_paciente", { paciente: nuevoPaciente });
                    set((state) => ({
                        pacientes: [...state.pacientes,{id:"222" ,...nuevoPaciente}],
                    }));
                } catch (error) {
                    console.error("Error al registrar paciente:", error);
                }
            },

            // Eliminar paciente por ID
            eliminarPaciente: async (id: string) => {
                try {
                    await invoke("eliminar_paciente", { id });
                    // Actualizar la lista local de pacientes
                    set((state) => ({
                        pacientes: state.pacientes.filter((p) => p.id !== id),
                    }));
                } catch (error) {
                    console.error("Error al eliminar paciente:", error);
                }
            },
        }),
        {
            name: "paciente-storage", // Nombre para el almacenamiento persistente
        }
    )
);

**/