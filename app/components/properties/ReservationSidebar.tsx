'use client'

import { useState, useEffect } from 'react'
import { Range } from 'react-date-range'
import { differenceInDays, eachDayOfInterval, format } from 'date-fns'
import DataPicker from '../forms/Calendar'
import apiService from '@/app/services/apiService'
import useLoginModal from '@/app/hooks/useLoginModal'

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

export type Property = {
    id: string;
    guests: number;
    price_per_night: number;
}

interface ReservationSidebarProps {
    userId: string | null,
    property: Property
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
    property,
    userId
}) => {

    const loginModal = useLoginModal();

    const [fee, setFee] = useState<number>(0)
    const [nigths, setNights] = useState<number>(1)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)
    const [minDate, setMinDate] = useState<Date>(new Date())
    const [bookedDates, serBookedDates] = useState<Date[]>([])
    const [guests, setGuests] = useState<string>('1')
    const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1)

    const performBooking = async () => {
        console.log('performBooking', userId)

        if (userId) {
            if (dateRange.startDate && dateRange.endDate) {
                const formData = new FormData();
                formData.append('guest', guests);
                formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
                formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
                formData.append('number_of_nights', nigths.toString());
                formData.append('total_price', totalPrice.toString());
    
                const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);
    
                if (response.success) { 
                    alert('Booking successful');
                } else {
                    alert('Booking failed');
                }
            } else {
                loginModal.open();
            }
        }
    }
    

    const _setDataRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate)
        const newEndDate = new Date(selection.endDate)

        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1)
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate
        })
    }

    const getReservations = async () => {
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)

        let dates: Date[] = []

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date)
            })

            dates = [...dates, ...range]
        })

        serBookedDates(dates)
    }

    useEffect(() => {
        getReservations()
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && property.price_per_night) {
                const _fee = ((dayCount * property.price_per_night) / 100) * 5

                setFee(_fee)
                setTotalPrice((dayCount * property.price_per_night) + _fee)
                setNights(dayCount)
            } else {
                const _fee = (property.price_per_night / 100) * 5

                setFee(_fee)
                setTotalPrice(property.price_per_night + _fee)
                setNights(1)
            }
        }
    }, [dateRange])

    return (
        <aside className="p-6 col-span-2 rounded-xl border border-gary-300 shadow-xl">
            <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>

            <div className="mb-6 p-3 border border-gray-400 rounded-xl">

                <DataPicker
                    value={dateRange}
                    bookedDates={bookedDates}
                    onChange={(value) => _setDataRange(value.selection)}
                />
                <label className="mb-2 block font-bold text-xs">Guests</label>
                <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-black -ml-1 text-xm text-white appearance-none">
                    {guestsRange.map((number) => (
                        <option key={number} value={number}>{number}</option>
                    ))}
                </select>
            </div>
            <div
                onClick={performBooking}
                className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl">Book</div>
            <div className="mb-4 flex justify-between align-center">
                <p>${property.price_per_night} * {nigths} nights</p>
                <p>${property.price_per_night * nigths}</p>
            </div>
            <div className="mb-4 flex justify-between align-center">
                <p>Django fee</p>
                <p>${fee}</p>
            </div>
            <hr />
            <div className="mt-4 flex justify-between align-center font-bold">
                <p>Total</p>
                <p>${totalPrice}</p>
            </div>
        </aside>
    )
}

export default ReservationSidebar;
