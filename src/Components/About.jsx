import './About.css'
import backgroundVideo from '../assets/4496268-hd_1920_1080_25fps.mp4'
function About() {
    return (
        <>
            <div className='w-full justify-center flex '>
                <section className='w-3/4 bg- absolute  h-[450px] flex justify-center '>
                    <div className=' paragraph bg-[#191818] p-10  '>
                        <h1 className=' text-4xl text-yellow-500 font-bold'> Introducing SpeedTyping: Enhance Your Typing Skills</h1>
                        <br />
                        <p className='text-white text-xl'>You Don't have to worry anymore about your typing speed. SpeedTyping is here to help.</p>
                    </div>
                    <div className='background   ' >
                        <video className='' src={backgroundVideo} autoPlay muted loop></video>
                    </div>
                </section>
            </div>
        </>
    )
}

export default About