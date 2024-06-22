import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAxios from "@/hooks/useAxios"
import { Loader } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "./ui/use-toast"

const AddInterview = () => {

    const API = useAxios()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [addInterviewData, setAddInterviewData] = useState({
        jobPosition: '',
        skills: '',
        experience: 0
    })
    const navigation = useNavigate()
    const handleAdd = async () => {
        try {
            setLoading(true);
            await API.post(`generate-questions`, {
                jobPosition: addInterviewData.jobPosition,
                skills: addInterviewData.skills,
                experience: addInterviewData.experience
            }).then((data) => {
                toast({
                    description: data?.data?.message
                })
                return navigation(`/dashboard/interview_onboard/${data?.data?.id}`)

            })
                .catch((err) => {
                    if (err?.response?.data) {
                        return toast({
                            description: err?.response?.data
                        })
                    }
                })

        } catch (error) {
            console.log(error)
            return toast({
                description: error
            });
        }
        finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddInterviewData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><h1 className="text-xl mr-1 -mt-0.5">+</h1> Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Interview</DialogTitle>
                    <DialogDescription>
                        Fill out the details and get ready for the AI Interview😎
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label>
                            Job Position
                        </Label>
                        <Input
                            placeholder="Eg. Full Stack Developer"
                            className="col-span-3"
                            onChange={handleChange}
                            name="jobPosition"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label>
                            Skills
                        </Label>
                        <Input
                            placeholder="Eg. React.Js, PHP"
                            className="col-span-3"
                            onChange={handleChange}
                            name="skills"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label>
                            Experience
                        </Label>
                        <Input
                            placeholder="Eg. 0, 1"
                            className="col-span-3"
                            onChange={handleChange}
                            name="experience"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAdd} disabled={loading}>
                        {
                            loading ? <Loader className="w-4 h-4 animate-spin" /> : 'Create Now'
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddInterview