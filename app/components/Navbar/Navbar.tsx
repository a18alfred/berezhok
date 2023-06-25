import styles from './Navbar.module.scss';
import Container from '@/shared/components/Container/Container';
import Logo from '@/app/components/Navbar/components/Logo/Logo';
import Search from '@/app/components/Navbar/components/Search/Search';
import UserMenu from '@/app/components/Navbar/components/UserMenu/UserMenu';
import Categories from '@/app/components/Navbar/components/Categories/Categories';

const Navbar = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Container>
                    <div className={styles.nav__wrapper}>
                        <Logo />
                        <Search />
                        <UserMenu />
                    </div>
                </Container>
            </nav>
            <Categories />
        </header>
    );
};

export default Navbar;
