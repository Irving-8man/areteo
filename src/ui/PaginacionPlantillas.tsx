import { generarPaginacion } from '@/utils/GenerarPaginacion';
import { PaginationArrow, PaginationNumber } from './ButtonsPagination';


interface PaginacionPlantillasProps {
    totalPages: number;
    currentPage: number;
    createPageURL: (pageNumber: number | string) => string;
}


export default function PaginacionPlantillas({
    totalPages,
    currentPage,
    createPageURL,
}: PaginacionPlantillasProps) {

    const allPages = generarPaginacion(currentPage, totalPages);

    return (
        <div className='flex justify-center'>
            <div className="inline-flex">
                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />

                <div className="flex -space-x-px ">
                    {allPages.map((page, index) => {
                        let position: 'first' | 'last' | 'single' | 'middle' | undefined;

                        if (index === 0) position = 'first';
                        if (index === allPages.length - 1) position = 'last';
                        if (allPages.length === 1) position = 'single';
                        if (page === '...') position = 'middle';

                        return (
                            <PaginationNumber
                                key={page}
                                href={createPageURL(page)}
                                page={page}
                                position={position}
                                isActive={currentPage === page}
                            />
                        );
                    })}
                </div>

                <PaginationArrow
                    direction="right"

                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />
            </div>
        </div>
    );
}