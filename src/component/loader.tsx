import images from "@/services/images"

const Loader = () => {
    return (
        <div className="flex flex-row items-center justify-center">
            <img src={images.loader} className='w-7 h-7 filter animate-spin' />
        </div>
    )
}

export default Loader