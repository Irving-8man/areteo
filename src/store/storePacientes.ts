import { create } from "zustand";
import { PacienteRegistrado, Paciente } from "@/models/types";
import { eliminarPaciente, getAllPacientesRegistrados,  registrarPaciente } from "@/services/PacienteController";

interface PacienteState {
    pacientes: PacienteRegistrado[];
    cargarTodosPacientes: () => Promise<void>;
    registrarPaciente: (nuevoPaciente: Paciente) => Promise<PacienteRegistrado | null>;
    eliminarPaciente: (id: string) => Promise<void>;
}

export const usePacienteStore = create<PacienteState>((set) => ({
    pacientes: [],
    cargarTodosPacientes: async () => {
        try {
            const pacientes: PacienteRegistrado[] = await getAllPacientesRegistrados();
            if (pacientes.length < 0) {
                set({ pacientes: [] });
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
                return pacienteRegistrado;
            } else {
                console.error("Error al registrar paciente:");
                return null;
            }
        } catch (error) {
            console.error("Error al registrar paciente:", error);
            return null;
        }
    },

    // Eliminar paciente por ID
    eliminarPaciente: async (id: string) => {
        try {
            const pacienteEliminado = await eliminarPaciente(id);
            if (pacienteEliminado) {
                set((state) => ({
                    pacientes: state.pacientes.filter((p) => p.id !== id),
                }));
            }
        } catch (error) {
            console.error("Error al eliminar paciente:", error);
        }
    },

   
}));