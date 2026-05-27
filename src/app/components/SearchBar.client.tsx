"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchBarProps = {
  initialQuery: string;
};

export default function SearchBar({ initialQuery }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const updateQuery = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmedValue = nextValue.trim();

    if (trimmedValue) {
      params.set("q", trimmedValue);
    } else {
      params.delete("q");
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(nextUrl, { scroll: false });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    updateQuery(nextValue);
  };

  const handleClear = () => {
    setValue("");
    updateQuery("");
  };

  return (
    <div className="search-bar">
      <label className="search-bar__label" htmlFor="team-search">
        Nome da selecao
      </label>
      <div className="search-bar__field">
        <input
          id="team-search"
          className="search-bar__input"
          type="search"
          value={value}
          onChange={handleChange}
          placeholder="Ex: Brasil, Argentina, Franca..."
          aria-label="Pesquisar selecao"
        />
        {value ? (
          <button type="button" className="search-bar__clear" onClick={handleClear}>
            Limpar
          </button>
        ) : null}
      </div>
    </div>
  );
}