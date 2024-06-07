import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Error404 = () => {
    return (
        <div className='h-screen w-screen flex items-center justify-center flex-col gap-5'>
            <p className='text-2xl font-bold tracking-wide'>404-Not Found</p>
            <Button>
                <Link to={"/"}>Home</Link>
            </Button>
        </div>
    )
}

export default Error404