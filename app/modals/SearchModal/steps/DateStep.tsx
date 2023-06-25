import { Range } from 'react-date-range';
import React, { Dispatch, SetStateAction } from 'react';
import Heading from '@/shared/components/Heading/Heading';
import Calendar from '@/shared/components/Input/Calendar/Calendar';

interface DateStepProps {
    dateRange: Range;
    setDateRange: Dispatch<SetStateAction<Range>>;
}

const DateStep: React.FC<DateStepProps> = ({ dateRange, setDateRange }) => {

    return (
        <>
            <Heading
                title='Выберите даты'
                subtitle='Отметьте даты на календаре'
                center
            />
            <Calendar
                value={dateRange}
                onChange={(value) => setDateRange(value.selection)}
            />
        </>
    );
};

export default DateStep;
