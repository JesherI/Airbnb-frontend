interface CustomButtonProps {
    label: string;
    className?: string;
    onclick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onclick
}) => {
    return (
        <div onClick={onclick} className={`w-full py-4 bg-airbnb hover:bg-airbnb-dark text-center text-white rounded-xl transition cursor-pointer ${className}`}>
            {label}
        </div>
    )
}

export default CustomButton;