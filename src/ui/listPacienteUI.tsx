/**    const { pacientes, cargarPacientes } = usePacienteStore((state) => ({
        pacientes: state.pacientes,
        cargarPacientes: state.cargarPacientes,
    }));
import { AvatarPaciente } from "@/componets/AvatarPaciente";
import { usePacienteStore } from "@/store/storePacientes";
import { useEffect } from "react";
    // Cargar pacientes al iniciar el componente
    useEffect(() => {
        cargarPacientes();
    }, [cargarPacientes]); */
import {
    FolderRegular,
    EditRegular,
    OpenRegular,
    DocumentRegular,
    PeopleRegular,
    DocumentPdfRegular,
    VideoRegular,
    DeleteRegular,
} from "@fluentui/react-icons";
import {
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
    PresenceBadgeStatus,
    Button,
    useArrowNavigationGroup,
    useFocusableGroup,
    TableColumnDefinition,
    createTableColumn,
    useTableFeatures,
    useTableSort,
    TableColumnId,
} from "@fluentui/react-components";
import { AvatarPaciente } from "@/componets/AvatarPaciente";


type FileCell = {
    label: string;
    icon: JSX.Element;
};

type LastUpdatedCell = {
    label: string;
    timestamp: number;
};

type LastUpdateCell = {
    label: string;
    icon: JSX.Element;
};

type AuthorCell = {
    label: string;
    status: PresenceBadgeStatus;
};

type Item = {
    file: FileCell;
    author: AuthorCell;
    lastUpdated: LastUpdatedCell;
    lastUpdate: LastUpdateCell;
};

const items: Item[] = [
    {
        file: { label: "Meeting notes", icon: <DocumentRegular /> },
        author: { label: "Max Mustermann", status: "available" },
        lastUpdated: { label: "7h ago", timestamp: 3 },
        lastUpdate: {
            label: "You edited this",
            icon: <EditRegular />,
        },
    },
    {
        file: { label: "Thursday presentation", icon: <FolderRegular /> },
        author: { label: "Erika Mustermann", status: "busy" },
        lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
        lastUpdate: {
            label: "You recently opened this",
            icon: <OpenRegular />,
        },
    },
    {
        file: { label: "Training recording", icon: <VideoRegular /> },
        author: { label: "John Doe", status: "away" },
        lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
        lastUpdate: {
            label: "You recently opened this",
            icon: <OpenRegular />,
        },
    },
    {
        file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
        author: { label: "Jane Doe", status: "offline" },
        lastUpdated: { label: "Tue at 9:30 AM", timestamp: 1 },
        lastUpdate: {
            label: "You shared this in a Teams chat",
            icon: <PeopleRegular />,
        },
    },
];

const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
        columnId: "file",
        compare: (a, b) => {
            return a.file.label.localeCompare(b.file.label);
        },
    }),
    createTableColumn<Item>({
        columnId: "author",
        compare: (a, b) => {
            return a.author.label.localeCompare(b.author.label);
        },
    }),
    createTableColumn<Item>({
        columnId: "lastUpdated",
        compare: (a, b) => {
            return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
        },
    }),
    createTableColumn<Item>({
        columnId: "lastUpdate",
        compare: (a, b) => {
            return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
        },
    }),
];




export const ListPacienteUI = () => {
    const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
    const focusableGroupAttr = useFocusableGroup({
        tabBehavior: "limited-trap-focus",
    });

    const { getRows, sort: { getSortDirection, toggleColumnSort, sort }, } = useTableFeatures(
        {
            columns,
            items,
        },
        [
            useTableSort({
                defaultSortState: { sortColumn: "file", sortDirection: "ascending" },
            }),
        ]
    );

    const headerSortProps = (columnId: TableColumnId) => ({
        onClick: (e: React.MouseEvent) => {
            toggleColumnSort(e, columnId);
        },
        sortDirection: getSortDirection(columnId),
    });

    const rows = sort(getRows());

    

    return (
        <Table
            {...keyboardNavAttr}
            role="grid"
            aria-label="Table with grid keyboard navigation"
            style={{ minWidth: "620px" }}
            sortable

        >
            <TableHeader>
                <TableRow>
                    <TableHeaderCell {...headerSortProps("file")}>File</TableHeaderCell>
                    <TableHeaderCell {...headerSortProps("author")}>
                        Author
                    </TableHeaderCell>
                    <TableHeaderCell {...headerSortProps("lastUpdated")}>
                        Last updated
                    </TableHeaderCell>
                    <TableHeaderCell {...headerSortProps("lastUpdate")}>
                        Last update
                    </TableHeaderCell>
                    <TableHeaderCell {...headerSortProps("author")}>
                        Accions
                    </TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                
                {rows.map(({ item }) => (
                    <TableRow key={item.file.label}>
                        <TableCell>
                            <TableCellLayout media={item.file.icon}>
                                {item.file.label}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            <TableCellLayout
                                media={
                                    <AvatarPaciente
                                        label={item.author.label}
                                        name={item.author.label}
                                        fechaNacimiento=""
                                    />
                                }
                            >
                                {item.author.label}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>{item.lastUpdated.label}</TableCell>
                        <TableCell>
                            <TableCellLayout media={item.lastUpdate.icon}>
                                {item.lastUpdate.label}
                            </TableCellLayout>
                        </TableCell>

                        <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
                            <TableCellLayout>
                                <Button icon={<EditRegular />} aria-label="Edit" />
                                <Button icon={<DeleteRegular />} aria-label="Delete" />
                            </TableCellLayout>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};