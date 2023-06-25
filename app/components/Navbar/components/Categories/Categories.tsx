'use client';

import styles from './Categories.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import Container from '@/shared/components/Container/Container';
import categories from '@/shared/constants/categories';
import CategoryBox from '@/shared/components/CategoryBox/CategoryBox';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useEffect, useState } from 'react';

const Categories = () => {
    const [scrolled, setScrolled] = useState(false);
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    useEffect(() => {
        const changeNav = () => {
            if (window.scrollY >= 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', changeNav);
        return () => {
            window.removeEventListener('scroll', changeNav);
        };
    }, [setScrolled]);

    if (!isMainPage) {
        return null;
    }

    return (
        <div className={`${styles.wrapper} ${scrolled && styles['wrapper--scrolled']}`}>
            <Container>
                <ScrollContainer className={`${styles.scrollContainer} ${scrolled && styles['wrapper--scrolled']}`}>
                    {Object.values(categories).map((item) => (
                        <CategoryBox
                            key={item.name}
                            category={item}
                            selected={category === item.name}
                        />
                    ))}
                </ScrollContainer>
            </Container>
        </div>
    );
};

export default Categories;
