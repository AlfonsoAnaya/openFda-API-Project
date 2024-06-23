//Icons
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
//CSS
import './PaginationController.css'

//Zustand store
import useSkipStore from "../../Zustand/SkipStores";

interface PaginationControllerProps {
    skip: number
    totalDataPoints: number
    skipSize: number
}

export default function PaginationController({ skip, totalDataPoints, skipSize }: PaginationControllerProps) {

    const updateSkip = useSkipStore((state) => state.updateSkip)

    function nextPage() {
        const newSkip = skip + skipSize;
    
        if (newSkip >= totalDataPoints) {
          return;
        }
    
        updateSkip(newSkip);
      }

    function prevPage() {
        let newSkip = skip - skipSize;
        if (newSkip < 0) {
            newSkip = 0;
        }
        updateSkip(newSkip) ;
    }

    function finalPage() {
        const newSkip = Math.floor(totalDataPoints / skipSize) * skipSize
        updateSkip(newSkip)
    }

    function firstPage() {
        updateSkip(0);
    }

    return (
        <div className="flex-row pagination-controller">
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

