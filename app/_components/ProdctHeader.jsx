const ProductHeader = ({title, description}) => {
  return (
    <div>
        <h1 className="text-3xl sm:text-4xl font-medium font-oswald">{title}</h1>
        <p className=" text-xs sm:text-xl  font-medium text-gray-400">{description}</p>
    </div>
  )
}
export default ProductHeader