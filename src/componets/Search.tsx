import { Input, Label } from "@fluentui/react-components";
import { Search20Filled } from "@fluentui/react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
    // Para acceder y actualizar los query params
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        // Reemplazamos la URL actual con los nuevos parámetros
        navigate(`?${params.toString()}`, { replace: true });
    }, 400)


    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <Label htmlFor="search" className="sr-only">
                Search
            </Label>
            <Input
                type="search"
                contentBefore={<Search20Filled />}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}
