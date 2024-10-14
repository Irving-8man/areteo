import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import {
    FolderRegular,
    EditRegular,
    OpenRegular,
    DocumentRegular,
    PeopleRegular,
    DocumentPdfRegular,
    VideoRegular,
} from "@fluentui/react-icons";
import {
    PresenceBadgeStatus,
    Avatar,
    useScrollbarWidth,
    useFluent,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
    createTableColumn,
    useTableFeatures,
    TableRowData as RowStateBase,
} from "@fluentui/react-components";




type Item = {
    file: {
        label: string;
        icon: JSX.Element;
    };
    author: {
        label: string;
        status: PresenceBadgeStatus;
    };
    lastUpdated: {
        label: string;
        timestamp: number;
    };
    lastUpdate: {
        label: string;
        icon: JSX.Element;
    };
};

interface TableRowData extends RowStateBase<Item> {
    onClick: (e: React.MouseEvent) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    selected: boolean;
}




interface ReactWindowRenderFnProps extends ListChildComponentProps {
    data: TableRowData[];
}

const baseItems: Item[] = [
    {
        file: { label: "Meeting notes", icon: <DocumentRegular /> },
        author: { label: "Max Mustermann", status: "available" },
        lastUpdated: { label: "7h ago", timestamp: 1 },
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
        lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
        lastUpdate: {
            label: "You shared this in a Teams chat",
            icon: <PeopleRegular />,
        },
    },
];

const items = new Array(100)
    .fill(0)
    .map((_, i) => baseItems[i % baseItems.length]);

const columns = [
    createTableColumn<Item>({
        columnId: "file",
    }),
    createTableColumn<Item>({
        columnId: "author",
    }),
    createTableColumn<Item>({
        columnId: "lastUpdated",
    }),
    createTableColumn<Item>({
        columnId: "lastUpdate",
    }),
];



const RenderRow = ({ index, style, data }: ReactWindowRenderFnProps) => {
    const { item, onClick, onKeyDown } = data[index];
    return (
        <TableRow
            aria-rowindex={index + 2}
            style={style}
            key={item.file.label}
            onKeyDown={onKeyDown}
            onClick={onClick}
        >
            <TableCell>
                <TableCellLayout media={item.file.icon}>
                    <strong>[{index}] </strong>
                    {item.file.label}
                </TableCellLayout>
            </TableCell>
            <TableCell>
                <TableCellLayout
                    media={
                        <Avatar
                            aria-label={item.author.label}
                            name={item.author.label}
                            badge={{ status: item.author.status as PresenceBadgeStatus }}
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
        </TableRow>
    );
};

export const Virtualization = () => {
    const { targetDocument } = useFluent();
    const scrollbarWidth = useScrollbarWidth({ targetDocument });

    const {
        getRows,
        selection: {
            toggleRow,
            isRowSelected,
        },
    } = useTableFeatures(
        {
            columns,
            items,
        }
    );

    const rows: TableRowData[] = getRows((row) => {
        const selected = isRowSelected(row.rowId);
        return {
            ...row,
            onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
            onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === " ") {
                    e.preventDefault();
                    toggleRow(e, row.rowId);
                }
            },
            selected,
        };
    });

    return (
        <Table
            noNativeElements
            aria-label="Table with selection"
            aria-rowcount={rows.length}
            style={{ minWidth: "650px" }}
        >
            <TableHeader>
                <TableRow aria-rowindex={1}>
                    <TableHeaderCell>File</TableHeaderCell>
                    <TableHeaderCell>Author</TableHeaderCell>
                    <TableHeaderCell>Last updated</TableHeaderCell>
                    <TableHeaderCell>Last update</TableHeaderCell>
                    {/** Scrollbar alignment for the header */}
                    <div role="presentation" style={{ width: scrollbarWidth }} />
                </TableRow>
            </TableHeader>
            <TableBody>
                <List
                    height={800}
                    itemCount={items.length}
                    itemSize={45}
                    width="100%"
                    itemData={rows}
                >
                    {RenderRow}
                </List>
            </TableBody>
        </Table>
    );
};
