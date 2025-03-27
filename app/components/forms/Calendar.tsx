'use clienrt';

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DataPickerProps {
    value: Range,
    onChange: (value: RangeKeyDict) => void;
    bookedDates?: Date[];
}

const DataPicker: React.FC<DataPickerProps> = ({
    value,
    onChange,
    bookedDates
}) => {
    return (
        <DateRange
            className='w-full border border-gray-300 rounded-xl mb-4'
            rangeColors={['#262626']}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction='vertical'
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={bookedDates}
        />
    )
}

export default DataPicker;