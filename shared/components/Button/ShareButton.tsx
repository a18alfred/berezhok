'use client';

import styles from './Button.module.scss';
import { useShare } from '@/app/hooks/useShare';
import { FiShare } from 'react-icons/fi';

const ShareButton = ({ title }: { title: string }) => {
    const { canShare, onShare } = useShare();

    if (!canShare) return null;

    const handleShare = () => {
        onShare({ title });
    };

    return (
        <div className={styles.shareButton} onClick={handleShare}>
            <FiShare size={18} />
            <span>Поделиться</span>
        </div>
    );
};

export default ShareButton;
