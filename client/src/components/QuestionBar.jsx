import useTextToSpeech from '@/hooks/useTextToSpeech';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Volume2 } from 'lucide-react';

const QuestionBar = ({ interviewQuestions, activeQuestion, setActiveQuestion, isRecording, userAns }) => {
    const { speak, cancel, speaking } = useTextToSpeech();
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        if (interviewQuestions) {
            setQuestions(JSON.parse(interviewQuestions));
        }
    }, [interviewQuestions]);
    const handleSpeech = async () => {
        if (speaking) {
            cancel()
        }
        if (questions[activeQuestion]?.question?.trim()) {
            speak(questions[activeQuestion]?.question?.trim())
        }
    }
    return (
        <div className='transition-all flex gap-3 w-full flex-wrap'>
            {questions.map((q, index) => (
                <div key={index}>
                    <Button variant={index == activeQuestion ? 'default' : 'secondary'} className={`rounded-full`} onClick={() => { !speaking && setActiveQuestion(index); }} disabled={isRecording && index != activeQuestion}>Question {index + 1}</Button>
                </div>

            ))}
            <div className='my-10'>
                <strong className='text-lg'>{questions[activeQuestion]?.question}</strong>
                <Volume2 className='w-5 h-5 mt-2 cursor-pointer' onClick={handleSpeech} />
            </div>

            <div className='flex gap-1 justify-center p-3 bg-yellow-100 rounded-md text-yellow-600'>
                <strong>Note:</strong>
                <p className='text-sm'> Please Click on the <em>Record Answer</em> when you want to answer a question.<br />Use <em className='underline underline-offset-2'>Previous</em> and <em className='underline underline-offset-2'>Next</em> Buttons to navigate between the questions.<br />After successfull completion click on <em className='underline underline-offset-2'>End Interview</em> to stop and save the interview.<br /> <strong>Please wait until you see the <em className='underline underline-offset-2'>Saved Successfull</em> message before going to next question.</strong></p>
            </div>
        </div>
    )
}

export default QuestionBar