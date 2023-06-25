import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.wrapper}>
            <p> © {new Date().getFullYear()} {'Бережок'}. {'Все права защищены.'}</p>
        </footer>
    );
};

export default Footer;
