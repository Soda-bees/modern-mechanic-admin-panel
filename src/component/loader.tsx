import images from "@/services/images"

const Loader = ({ size }: LoaderProps) => {
    const finalSize = size || "7";
    return (
      <div className="flex flex-row items-center justify-center">
        <img
          src={images.loader}
          className={`w-${finalSize} h-${finalSize} filter animate-spin`}
          alt="Loading..."
        />
      </div>
    );
  };

export default Loader