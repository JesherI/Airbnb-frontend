'use client'

import Select from 'react-select'
import useCountries from '@/app/hooks/useCountries'

export type SelectCountryValue = {
    label: string;
    value: string;
}

interface SelectCountryProps {
    value?: SelectCountryValue;
    onChange: (value: SelectCountryValue) => void;
}

const SelectCountry: React.FC<SelectCountryProps> = ({
    value,
    onChange
}) => {

    const {getAll} = useCountries();

    return (
        <>
            <Select
                className='text-black'
                isClearable
                placeholder="Anywhere"
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as SelectCountryValue)}
                ></Select>
        </>
    )
}

export default SelectCountry;