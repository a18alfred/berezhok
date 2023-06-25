'use client';

import React from 'react';
import {
    DateRange,
    Range,
    RangeKeyDict,
} from 'react-date-range';
import ru from 'date-fns/locale/ru';

import styles from './Calendar.module.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
    value: Range,
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[];
}

const Calendar: React.FC<DatePickerProps> = ({
                                                 value,
                                                 onChange,
                                                 disabledDates,
                                             }) => {
    return (
        <>
            <DateRange
                locale={ru}
                rangeColors={['#262626']}
                ranges={[value]}
                date={new Date()}
                onChange={onChange}
                direction='vertical'
                showDateDisplay={false}
                minDate={new Date()}
                disabledDates={disabledDates}
                weekdayDisplayFormat={'EEEEEE'}
            />
            <div className={styles.dates_wrapper}>
                <p className={styles.date_row}>
                    <span>
                        Заезд:
                    </span>
                    <span className={styles.date}>
                    {value.startDate?.toLocaleDateString()}
                    </span>
                </p>
                <p className={styles.date_row}>
                    <span>
                        Выезд:
                    </span>
                    <span className={styles.date}>
                          {value.endDate?.toLocaleDateString()}
                    </span>
                </p>
                {
                    disabledDates &&
                    <div className={styles.hint_row}>
                        <div className={styles.inactive_dates}></div>
                        <p>
                            даты недоступны
                        </p>
                    </div>
                }

            </div>
        </>
    );
};

export default Calendar;