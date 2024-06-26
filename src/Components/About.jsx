import './About.css'
import backgroundVideo from '../assets/keyboardyellow2.png'
function About() {
    return (
        <>
            <div className='w-full justify-center sm:flex '>
                <section className='w-3/4 h-[450px] sm:flex justify-center '>
                    <div className=' sm:paragraph w-screen bg-[#111010] p-10  '>
                        <h1 className=' text-4xl text-yellow-400 font-bold'> Introducing SpeedTyping: Enhance Your Typing Skills</h1>
                        <br />
                        <p className='text-white text-xl font-semibold'>You Don't have to worry anymore about your typing speed. SpeedTyping is here to help.</p>
                    </div>
                    <div className='background w-screen  bg-yellow-500 '>
                        <img className='absolute h-[450px]' src={backgroundVideo}/>
                    </div>
                </section>
            </div>
        </>
    )
}

export default About