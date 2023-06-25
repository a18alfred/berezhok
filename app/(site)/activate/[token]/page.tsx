import styles from './page.module.scss';
import verifyEmail from '@/app/serverActions/verifyEmail';
import HomeButton from '@/shared/components/Button/HomeButton';
import Heading from '@/shared/components/Heading/Heading';

interface IParams {
    token: string;
}

const activateUser = async (token: string) => {
    const resp = await verifyEmail(token);

    if (!resp) throw new Error('Ошибка подтверждения');
};

const ActivationPage = async ({ params }: { params: IParams }) => {
    await activateUser(params.token);

    return (
        <>
            <Heading
                title='Спасибо за подтверждение адреса электронной почты!'
                subtitle='Ваш аккаунт успешно активирован и готов к использованию. Теперь вы можете войти в свою учетную запись и начать пользоваться нашим сервисом.'
                center
            />
            <div className={styles.btnWrapper}>
                <HomeButton />
            </div>
        </>
    )
        ;
};

export default ActivationPage;
