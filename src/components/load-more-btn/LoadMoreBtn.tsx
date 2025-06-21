import { FC } from 'react';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
    onPaginate: () => void;
}

export const LoadMoreBtn: FC <LoadMoreBtnProps>= ({ onPaginate }) => {
    return <button className={css.loadMoreBtn} onClick={onPaginate}>Load more</button>
};