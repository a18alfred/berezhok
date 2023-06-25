'use client';

import styles from './Search.module.scss';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import useModal from '@/app/hooks/useModal';

const Search = () => {
    const { openSearch } = useModal();
    return (
        <div className={styles.wrapper} onClick={openSearch}>
            <p>
                Поиск
            </p>
            <div className={styles.search__icon}>
                <BiSearch size={18} />
            </div>
        </div>
    );
};

export default Search;
