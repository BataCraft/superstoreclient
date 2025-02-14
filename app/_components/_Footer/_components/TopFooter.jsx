const TopFooter = () => {
    return (
        <div className="bg-gray-200 w-full h-screen py-16">
            <div className="container mx-auto">
                <div>
                    <div>
                        <h4 className="font-bold text-2xl relative p-2 after:content-[' '] after:w-8 after:h-[2px] after:bg-primaryColor after:mt-1">Buyer Central</h4>
                        <ul>
                            <li className="relative  p-2 after:content-[''] after:block after:w-8 after:h-[2px] after:bg-primaryColor after:mt-1 mt-4 text-lg">
                                Sign in
                            </li>
                        </ul>



                    </div>
                </div>
            </div>
        </div>
    )
}
export default TopFooter