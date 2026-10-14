import { getPageItems } from "@/shared/utils/get-page-items";
import { cn } from "cn";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  Pagination as PaginationNav,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalCount: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  onPageChange: (page: number) => void;
};

export function Pagination({
  page,
  pageSize,
  totalCount,
  hasPrevPage,
  hasNextPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);
  const pageItems = getPageItems(page, totalPages);

  const goToPage = (nextPage: number) => {
    if (nextPage === page) {
      return;
    }

    onPageChange(nextPage);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Mostrando {from}–{to} de {totalCount}
      </p>
      <PaginationNav
        aria-label="Paginación"
        className="mx-0 w-auto justify-start sm:justify-end"
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text="Anterior"
              aria-label="Ir a la página anterior"
              aria-disabled={!hasPrevPage}
              tabIndex={hasPrevPage ? undefined : -1}
              className={cn(!hasPrevPage && "pointer-events-none opacity-50")}
              onClick={(event) => {
                event.preventDefault();
                if (hasPrevPage) {
                  goToPage(page - 1);
                }
              }}
            />
          </PaginationItem>
          {pageItems.map((item, index) =>
            item === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={item === page}
                  aria-label={`Ir a la página ${item}`}
                  onClick={(event) => {
                    event.preventDefault();
                    goToPage(item);
                  }}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              text="Siguiente"
              aria-label="Ir a la página siguiente"
              aria-disabled={!hasNextPage}
              tabIndex={hasNextPage ? undefined : -1}
              className={cn(!hasNextPage && "pointer-events-none opacity-50")}
              onClick={(event) => {
                event.preventDefault();
                if (hasNextPage) {
                  goToPage(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationNav>
    </div>
  );
}
