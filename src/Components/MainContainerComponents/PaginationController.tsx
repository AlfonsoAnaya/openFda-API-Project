//Icons
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface PaginationControllerProps {
    skip: number
    setSkip: any
    totalDataPoints: number
    skipSize: number
}

export default function PaginationController({ skip, setSkip, totalDataPoints, skipSize }: PaginationControllerProps) {

    function nextPage() {
        setSkip((prev: number) => {
            // Calculate the potential new skip value
            const newSkip = prev + skipSize;

            // Check if the new skip value is within the range
            if (newSkip >= totalDataPoints) {
                // Prevent increment if it exceeds the total data points
                return prev;
            }
            return newSkip;
        });
    }

    function prevPage() {
        setSkip((prev: number) => {
            // Calculate the potential new skip value
            const newSkip = prev - skipSize;
            // Prevent decrement if it would go below 0
            if (newSkip < 0) {
                return 0;
            }
            return newSkip;
        });
    }

    function finalPage() {
        setSkip(() => {
            return Math.floor(totalDataPoints / skipSize) * skipSize
        })
    }

    function firstPage() {
        setSkip(0);
    }

    return (
        <div className="flex-row">
            <span>{skip + 1} - {skip + 50 > totalDataPoints ? totalDataPoints : skip + 50} of {totalDataPoints}</span>
            <MdOutlineKeyboardDoubleArrowLeft
                onClick={firstPage}
                className="icon-pagination"
            />
            <MdOutlineKeyboardArrowLeft
                onClick={prevPage}
                className="icon-pagination"
            />
            <MdOutlineKeyboardArrowRight
                onClick={nextPage}
                className="icon-pagination"
            />
            <MdOutlineKeyboardDoubleArrowRight
                onClick={finalPage}
                className="icon-pagination"
            />
        </div>
    )
}

